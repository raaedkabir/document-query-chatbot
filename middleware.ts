import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// https://nextjs.org/docs/app/building-your-application/authentication
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/dashboard')) {
    if (!request.cookies.has('RefreshToken')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const refreshToken = request.cookies.get('RefreshToken')!

    const response = await fetch(new URL('/api/auth/refresh', request.url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `RefreshToken=${refreshToken.value}`,
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

      response.cookies.delete('IdToken')
      response.cookies.delete('AccessToken')
      response.cookies.delete('RefreshToken')

      return response
    }
  }
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
