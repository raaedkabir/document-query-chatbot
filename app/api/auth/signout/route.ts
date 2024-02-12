import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { signOut } from '@/services/cognito'

export async function POST(_req: NextRequest) {
  try {
    const accessToken = cookies().get('AccessToken')
    if (accessToken) {
      signOut(accessToken.value)
    }

    cookies().delete('UserId')
    cookies().delete('IdToken')
    cookies().delete('AccessToken')
    cookies().delete('RefreshToken')

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
