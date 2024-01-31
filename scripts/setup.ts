import * as dotenv from 'dotenv'
import { getPineconeClient } from '@/lib/pinecone'
import { loadDocuments } from '@/lib/pdf-loader'
import { embed } from '@/lib/embeddings'

dotenv.config({ path: '.env.local' })

const main = async () => {
  try {
    const pineconeClient = await getPineconeClient()
    console.log('Preparing chunks from PDF file')
    const docs = await loadDocuments('public/DocQA_Outline_V5.pdf')
    console.log(`Loading ${docs.length} chunks into Pinecone...`)
    await embed(pineconeClient, docs, 'DocQA_Outline_V5.pdf', '12345')
    console.log('Data embedded and stored in Pinecone index')
  } catch (error) {
    console.error('Initialize Pinecone index script failed with error: ', error)
  }
}

main()
