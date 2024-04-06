import { NextRequest, NextResponse } from 'next/server'
import { login, getUserDetails } from '@/services/cognito'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const sessionData = await login(email, password)
    const { IdToken, AccessToken, RefreshToken, ExpiresIn } =
      sessionData.AuthenticationResult!

    const user = await getUserDetails(AccessToken!)

    return NextResponse.json({
      message: 'Successfully logged in!',
      IdToken,
      AccessToken,
      RefreshToken,
      ExpiresIn,
      UserId: user.Username,
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
