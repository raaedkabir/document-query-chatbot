import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { login, getUserDetails } from '@/services/cognito'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const sessionData = await login(email, password)
    const { IdToken, AccessToken, RefreshToken, ExpiresIn } =
      sessionData.AuthenticationResult!

    cookies().set('IdToken', IdToken || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: ExpiresIn || 3600, // 1 hour
      path: '/',
    })

    cookies().set('AccessToken', AccessToken || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: ExpiresIn || 3600, // 1 hour
      path: '/',
    })

    cookies().set('RefreshToken', RefreshToken || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    const user = await getUserDetails(AccessToken!)

    cookies().set('UserId', user.Username || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return NextResponse.json({
      message: 'Successfully logged in!',
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
