import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteS3Object } from '@/services/storage'

export async function POST(req: NextRequest) {
  try {
    const { userId, fileName } = await req.json()
    const idToken = cookies().get('IdToken')!
    const data = await deleteS3Object(
      idToken.value,
      `users/${userId}/uploads/${fileName}`
    )

    return NextResponse.json({
      message: 'Successfully deleted file!',
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
