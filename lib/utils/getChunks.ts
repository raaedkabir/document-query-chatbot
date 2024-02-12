// import dynamic from 'next/dynamic'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

export const chunkFileForS3 = (file: Uint8Array) => {
  const chunkSize = 1024 * 1024 * 5 // 5 MB
  const totalParts = Math.ceil(file.length / chunkSize)
  let start = 0
  let end = Math.min(file.length, start + chunkSize)

  const chunks: Uint8Array[] = []

  for (let i = 0; i < totalParts; i++) {
    const chunk = file.slice(start, end)
    chunks.push(chunk)
    start = end
    end = Math.min(file.length, start + chunkSize)
  }

  return chunks
}

/**
 * Load the PDF document and split it into chunks
 */
export const chunkFileForPinecone = async (file: Blob) => {
  // Load in the file we want to do question answering over
  const loader = new PDFLoader(file)

  /**
   * Split the PDF into chunks so that when we query ChatGPT,
   * we can pick only the chunks that are relevant to the question
   */
  return loader.loadAndSplit(
    /**
     * This will split documents recursively by different characters - starting with "\n\n", then "\n", then " "
     * This is nice because it will try to keep all the semantically relevant content in the same place for as long as possible
     */
    new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })
  )
}
