import { NextRequest, NextResponse } from 'next/server'
import { signUp } from '@/services/cognito'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, planType } = await req.json()
    const sessionData = await signUp(name, email, password, planType)

    return NextResponse.json({
      message: 'Successfully signed up!',
      userId: sessionData.UserSub,
      userConfirmed: sessionData.UserConfirmed,
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
