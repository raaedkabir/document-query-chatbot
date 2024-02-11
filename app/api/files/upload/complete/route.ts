import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { completeMultipartUpload } from '@/services/storage'

export async function POST(req: NextRequest) {
  try {
    const { userId, fileName, uploadId, parts } = await req.json()
    const idToken = cookies().get('IdToken')!

    const data = await completeMultipartUpload(
      idToken.value,
      `users/${userId}/${fileName}`,
      uploadId,
      parts
    )

    return NextResponse.json({
      message: 'Successfully completed upload!',
      data,
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
