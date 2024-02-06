import { NextRequest, NextResponse } from 'next/server'
import { resendConfirmationCode } from '@/services/cognito'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    await resendConfirmationCode(email)

    return NextResponse.json({
      message: 'Successfully sent new confirmation code!',
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
