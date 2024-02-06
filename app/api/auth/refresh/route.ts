import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { refresh } from '@/services/cognito'

export async function POST(_req: NextRequest) {
  try {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get('RefreshToken')
    if (!refreshToken) {
      throw new Error('No refresh token found!')
    }
    const sessionData = await refresh(refreshToken.value)
    const { IdToken, AccessToken, ExpiresIn } =
      sessionData.AuthenticationResult!

    return NextResponse.json({
      message: 'Successfully refreshed tokens!',
      IdToken,
      AccessToken,
      ExpiresIn,
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
