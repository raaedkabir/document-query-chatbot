import { NextRequest, NextResponse } from 'next/server'
import { embed } from '@/services/embeddings'

export async function POST(req: NextRequest) {
  try {
    const { userId, fileName, chunk } = await req.json()
    await embed([chunk], fileName, userId)

    return NextResponse.json({
      message: 'Successfully uploaded chunk to Pinecone!',
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.name || 'Internal Server Error',
        message: error?.message || 'Something went wrong. Try again!',
      },
      { status: error?.$metadata?.httpStatusCode || 500 }
    )
  }
}
