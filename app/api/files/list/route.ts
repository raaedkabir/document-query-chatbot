import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { listObjects } from '@/services/storage'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()
    const idToken = cookies().get('IdToken')!
    const data = await listObjects(idToken.value, `users/${userId}/`)

    return NextResponse.json({
      message: 'Successfully retrieved files!',
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
