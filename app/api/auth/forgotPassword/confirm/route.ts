import { NextRequest, NextResponse } from 'next/server'
import { confirmForgotPassword } from '@/services/cognito'

export async function POST(req: NextRequest) {
  try {
    const { code, email, newPassword } = await req.json()
    await confirmForgotPassword(code, email, newPassword)

    return NextResponse.json({
      message: 'Successfully confrimed new password!',
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
