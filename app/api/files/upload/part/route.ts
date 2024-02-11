import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { uploadPart } from '@/services/storage'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const userId = formData.get('userId') as string
    const fileName = formData.get('fileName') as string
    const uploadId = formData.get('uploadId') as string
    const partNumber = Number(formData.get('partNumber'))
    const body = (await (
      formData.get('body') as File
    ).arrayBuffer()) as Uint8Array

    const idToken = cookies().get('IdToken')!
    const data = await uploadPart(
      idToken.value,
      `users/${userId}/${fileName}`,
      body,
      uploadId,
      partNumber
    )

    return NextResponse.json({
      message: 'Successfully uploaded chunk!',
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
