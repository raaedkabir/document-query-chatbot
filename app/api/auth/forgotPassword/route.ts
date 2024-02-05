import { NextRequest, NextResponse } from 'next/server'
import { forgotPassword } from '@/services/cognito'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    await forgotPassword(email)

    return NextResponse.json({
      message: 'Successfully sent reset password request!',
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
