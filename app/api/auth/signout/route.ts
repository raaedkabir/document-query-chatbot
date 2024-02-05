import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { signOut } from '@/services/cognito'

export async function POST(_req: NextRequest) {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('AccessToken')
    if (accessToken) {
      await signOut(accessToken.value)
    }

    cookieStore.delete('IdToken')
    cookieStore.delete('AccessToken')
    cookieStore.delete('RefreshToken')

    return NextResponse.json({
      message: 'Successfully signed out!',
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
