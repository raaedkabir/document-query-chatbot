import { NextRequest, NextResponse } from 'next/server'
import { confirm } from '@/services/cognito'

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json()
    await confirm(email, code)

    return NextResponse.json({
      message: 'Successfully confrimed email!',
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
