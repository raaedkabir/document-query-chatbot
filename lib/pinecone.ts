import { Pinecone } from '@pinecone-database/pinecone'

let pineconeClientInstance: Pinecone | null = null

/**
 * Initialize a new Pinecone client, which will automatically
 * read the env vars: PINECONE_API_KEY which come from the
 * Pinecone dashboard at https://app.pinecone.io
 */
async function initPineconeClient() {
  const pinecone = new Pinecone()

  try {
    // Create the index if it doesn't already exist
    const indexList = await pinecone.listIndexes()
    if (
      !indexList.indexes?.some(
        (index) => index.name === process.env.PINECONE_INDEX_NAME!
      )
    ) {
      await pinecone.createIndex({
        name: process.env.PINECONE_INDEX_NAME!,
        dimension: 1536,
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-west-2',
          },
        },
        waitUntilReady: true,
      })
    }

    return pinecone
  } catch (error) {
    console.error(error)

    throw new Error('Failed to initialize Pinecone Client')
  }
}

/**
 * Get the Pinecone client
 */
export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient()
  }

  return pineconeClientInstance
}
