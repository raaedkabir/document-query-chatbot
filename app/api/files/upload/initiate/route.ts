import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createMultipartUpload } from '@/services/storage'

export async function POST(req: NextRequest) {
  try {
    const { userId, fileName } = await req.json()
    const idToken = cookies().get('IdToken')!
    const data = await createMultipartUpload(
      idToken.value,
      `users/${userId}/uploads/${fileName}`
    )

    return NextResponse.json({
      message: 'Successfully initiated upload!',
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
