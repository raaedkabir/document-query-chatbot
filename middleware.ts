import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { applySetCookie } from '@/lib/utils/applySetCookie'

function clearCookies(response: NextResponse) {
  response.cookies.delete('UserId')
  response.cookies.delete('IdToken')
  response.cookies.delete('AccessToken')
  response.cookies.delete('RefreshToken')
}

function redirectToLogin() {
  const nextResponse = NextResponse.redirect(`${process.env.DOMAIN_NAME}/login`)
  clearCookies(nextResponse)
  return nextResponse
}

// https://nextjs.org/docs/app/building-your-application/authentication
export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (searchParams.has('code')) {
    console.info('POST [request]  /api/auth/token')
    const response = await fetch(`${process.env.DOMAIN_NAME}/api/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: searchParams.get('code') }),
    })

    if (response.ok) {
      const { user_id, id_token, access_token, refresh_token, expires_in } =
        await response.json()

      const dashboardResponse = NextResponse.redirect(
        `${process.env.DOMAIN_NAME}/dashboard`
      )

      dashboardResponse.cookies.set({
        name: 'UserId',
        value: user_id,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      dashboardResponse.cookies.set({
        name: 'IdToken',
        value: id_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expires_in || 3600, // 1 hour
        path: '/',
      })

      dashboardResponse.cookies.set({
        name: 'AccessToken',
        value: access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expires_in || 3600, // 1 hour
        path: '/',
      })

      dashboardResponse.cookies.set({
        name: 'RefreshToken',
        value: refresh_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      return dashboardResponse
    } else {
      console.error(
        `POST [error]    /api/auth/token -- Status: ${response.status} | Status Text: ${response.statusText} | Response:`,
        await response.json()
      )
    }
  }

  if (pathname.startsWith('/login')) {
    if (request.cookies.has('RefreshToken') && request.cookies.has('UserId')) {
      return NextResponse.redirect(`${process.env.DOMAIN_NAME}/dashboard`)
    }
  }

  if (pathname.startsWith('/dashboard')) {
    if (
      !request.cookies.has('RefreshToken') ||
      !request.cookies.has('UserId')
    ) {
      return redirectToLogin()
    }

    if (request.cookies.has('AccessToken') && request.cookies.has('IdToken')) {
      return NextResponse.next()
    }

    const refreshToken = request.cookies.get('RefreshToken')!
    const userId = request.cookies.get('UserId')!

    console.info('POST [request]  /api/auth/refresh')
    const response = await fetch(
      `${process.env.DOMAIN_NAME}/api/auth/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `RefreshToken=${refreshToken.value};UserId=${userId.value}`,
        },
      }
    )

    if (response.ok) {
      console.info('POST [response] /api/auth/refresh')

      const { IdToken, AccessToken, ExpiresIn } = await response.json()

      const nextResponse = NextResponse.next()

      nextResponse.cookies.set({
        name: 'IdToken',
        value: IdToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ExpiresIn || 3600, // 1 hour
        path: '/',
      })

      nextResponse.cookies.set({
        name: 'AccessToken',
        value: AccessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ExpiresIn || 3600, // 1 hour
        path: '/',
      })

      // Apply those cookies to the request
      applySetCookie(request, nextResponse)

      return nextResponse
    } else {
      console.error(
        `POST [error]    /api/auth/refresh -- Status: ${response.status} | Status Text: ${response.statusText} | Response:`,
        await response.json()
      )

      return redirectToLogin()
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
