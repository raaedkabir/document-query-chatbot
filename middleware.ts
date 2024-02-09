import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// https://nextjs.org/docs/app/building-your-application/authentication
export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (searchParams.has('code')) {
    const response = await fetch(new URL('/api/auth/token', request.url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: searchParams.get('code') }),
    })

    const { user_id, id_token, access_token, refresh_token, expires_in } =
      await response.json()

    if (response.ok) {
      const response = NextResponse.redirect(new URL('/dashboard', request.url))

      response.cookies.set({
        name: 'UserId',
        value: user_id,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      response.cookies.set({
        name: 'IdToken',
        value: id_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expires_in || 3600, // 1 hour
        path: '/',
      })

      response.cookies.set({
        name: 'AccessToken',
        value: access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expires_in || 3600, // 1 hour
        path: '/',
      })

      response.cookies.set({
        name: 'RefreshToken',
        value: refresh_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      return response
    }
  }

  if (pathname.startsWith('/dashboard')) {
    if (!request.cookies.has('RefreshToken')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const refreshToken = request.cookies.get('RefreshToken')!
    const userId = request.cookies.get('UserId')!

    const response = await fetch(new URL('/api/auth/refresh', request.url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `RefreshToken=${refreshToken.value};UserId=${userId.value}`,
      },
    })

    const { IdToken, AccessToken, ExpiresIn } = await response.json()

    if (response.ok) {
      const response = NextResponse.next()

      response.cookies.set({
        name: 'IdToken',
        value: IdToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ExpiresIn || 3600, // 1 hour
        path: '/',
      })

      response.cookies.set({
        name: 'AccessToken',
        value: AccessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ExpiresIn || 3600, // 1 hour
        path: '/',
      })

      return response
    } else {
      const response = NextResponse.redirect(new URL('/login', request.url))

      response.cookies.delete('UserId')
      response.cookies.delete('IdToken')
      response.cookies.delete('AccessToken')
      response.cookies.delete('RefreshToken')

      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
