import { getVectorStore } from './embeddings'
import { getPineconeClient } from './pinecone'
import { StreamingTextResponse } from 'ai'
import { formatDocumentsAsString } from 'langchain/util/document'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'

/**
 * Initialize a ChatGPT model to generate answers to questions
 * based on the context of a document and the question asked
 */
const model = new ChatOpenAI({
  // List of OpenAI API Models: https://platform.openai.com/docs/models/gpt-3-5-turbo
  modelName: 'gpt-3.5-turbo-0125',
  streaming: true,
  verbose: true,
  temperature: 0,
})

/**
 * Create a prompt template for generating an answer based on context and
 * a question
 *
 * Chat history will be an empty string if it's the first question
 *
 * inputVariables: ["chatHistory", "context", "question"]
 */
const questionPrompt = PromptTemplate.fromTemplate(
  `You are provided a PDF document with the file name {fileName}. Use it to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. DO NOT try to make up an answer.
  If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
  ----------------
  DOCUMENT: {context}
  ----------------
  CHAT HISTORY: {chatHistory}
  ----------------
  QUESTION: {question}
  ----------------
  Helpful Answer:`
)

/**
 * Query ChatGPT with the document for the answer to the question
 */
export async function queryDocument({
  fileName,
  question,
  chatHistory,
  userId,
}: {
  fileName: string
  question: string
  chatHistory: string
  userId: string
}) {
  try {
    // Get the Pinecone client
    const pineconeClient = await getPineconeClient()
    // Get the vector store
    // https://js.langchain.com/docs/modules/data_connection/vectorstores/
    const vectorStore = await getVectorStore(pineconeClient, fileName, userId)
    // Initialize a retriever wrapper around the vector store
    // to query the index for relevant chunks
    // and return the most relevant chunks as a string
    // https://js.langchain.com/docs/modules/data_connection/retrievers/
    const retriever = vectorStore.asRetriever()

    /**
     * Conversational Retrieval QA based on:
     * https://js.langchain.com/docs/modules/chains/popular/chat_vector_db
     */
    const chain = RunnableSequence.from([
      {
        question: (input: {
          question: string
          fileName: string
          chatHistory?: string
        }) => input.question,
        chatHistory: (input: {
          question: string
          fileName: string
          chatHistory?: string
        }) => input.chatHistory ?? '',
        fileName: (input: {
          question: string
          fileName: string
          chatHistory?: string
        }) => input.fileName,
        context: async (input: {
          question: string
          fileName: string
          chatHistory?: string
        }) => {
          /**
           * We received chunks from Pinecone and converted them to vectors,
           * now we need to take the question and convert it to a vector too,
           * and then query the Pinecone index for the most relevant chunks in the vector store
           */
          const relevantDocs = await retriever.getRelevantDocuments(
            input.question
          )
          const serialized = formatDocumentsAsString(relevantDocs)
          return serialized
        },
      },
      questionPrompt,
      model,
      new StringOutputParser(),
    ])

    const stream = await chain.stream({
      question,
      chatHistory,
      fileName,
    })

    // Return the readable stream
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Error querying document failed with: ', error)
    throw new Error('Failed to query document')
  }
}
