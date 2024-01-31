import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

/**
 * Load the PDF document and split it into chunks
 */
export async function loadDocuments(path: string) {
  // Load in the file we want to do question answering over
  const loader = new PDFLoader(path, {
    pdfjs: () =>
      import('pdfjs-dist/legacy/build/pdf.js').then((m) => m.default),
  })

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
