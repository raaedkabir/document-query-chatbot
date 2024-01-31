import { OpenAIEmbeddings } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'
import { Pinecone } from '@pinecone-database/pinecone'
import { Document } from '@langchain/core/documents'

/**
 * Embed the PDF documents into the Pinecone index
 * https://js.langchain.com/docs/integrations/vectorstores/pinecone#index-docs
 */
export async function embed(
  client: Pinecone,
  docs: Document<Record<string, any>>[],
  fileName: string,
  userId: string
) {
  try {
    const index = client.Index(process.env.PINECONE_INDEX_NAME!)

    // Add identifiers to the metadata
    docs.map((doc) => {
      doc.metadata = {
        ...doc.metadata,
        fileName,
        userId,
      }
      return doc
    })

    // Embed the PDF documents
    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      pineconeIndex: index,
      namespace: `${userId}-${fileName}`,
    })
  } catch (error) {
    console.error('Embed PDF into Pinecone index failed with error: ', error)
    throw new Error('Failed to embed PDF into Pinecone index')
  }
}

/**
 * Delete the PDF documents from the Pinecone index
 * https://js.langchain.com/docs/integrations/vectorstores/pinecone#delete-docs
 */
export async function deleteEmbed(
  client: Pinecone,
  fileName: string,
  userId: string
) {
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME!)
  const pineconeStore = new PineconeStore(new OpenAIEmbeddings(), {
    pineconeIndex,
    namespace: `${userId}-${fileName}`,
  })
  try {
    await pineconeStore.delete({
      deleteAll: true,
    })
  } catch (error) {
    console.error('Delete PDF from Pinecone index failed with error: ', error)
    throw new Error('Failed to delete PDF from Pinecone index')
  }
}

/**
 * Get the vector store from the Pinecone index
 * https://js.langchain.com/docs/integrations/vectorstores/pinecone#query-docs
 */
export async function getVectorStore(
  client: Pinecone,
  fileName: string,
  userId: string
) {
  try {
    const index = client.Index(process.env.PINECONE_INDEX_NAME!)

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      {
        pineconeIndex: index,
        namespace: `${userId}-${fileName}`,
      }
    )

    return vectorStore
  } catch (error) {
    console.error(
      'Get vector store from Pinecone index failed with error: ',
      error
    )
    throw new Error('Failed to get vector store from Pinecone index')
  }
}
