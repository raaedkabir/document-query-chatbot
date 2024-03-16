import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getUser } from '@/services/cognito'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    console.info(
      `POST [request]  ${process.env.USER_POOL_DOMAIN_URL}/oauth2/token`
    )
    const response = await fetch(
      `${process.env.USER_POOL_DOMAIN_URL}/oauth2/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${process.env.USER_POOL_CLIENT_ID}:${process.env.USER_POOL_CLIENT_SECRET}`).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.USER_POOL_CLIENT_ID!,
          code,
          redirect_uri: 'http://localhost:3000/',
        }),
      }
    )

    if (!response.ok) {
      console.error(
        `POST [error]    ${process.env.USER_POOL_DOMAIN_URL}/oauth2/token -- Status: ${response.status} | Status Text: ${response.statusText} | Response:`,
        await response.json()
      )
      throw new Error('Failed to get tokens!')
    }

    const { id_token, access_token, refresh_token, expires_in } =
      await response.json()

    const user = await getUser(access_token)

    return NextResponse.json({
      message: 'Successfully retrieved tokens!',
      user_id: user.Username,
      id_token,
      access_token,
      refresh_token,
      expires_in,
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
