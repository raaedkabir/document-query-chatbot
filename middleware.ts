import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  ResponseCookies,
  RequestCookies,
} from 'next/dist/server/web/spec-extension/cookies'

/**
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 * https://github.com/vercel/next.js/discussions/50374
 */
function applySetCookie(req: NextRequest, res: NextResponse) {
  // 1. Parse Set-Cookie header from the response
  const setCookies = new ResponseCookies(res.headers)

  // 2. Construct updated Cookie header for the request
  const newReqHeaders = new Headers(req.headers)
  const newReqCookies = new RequestCookies(newReqHeaders)
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie))

  // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
  //    on a dummy response
  // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
  const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } })

  // 4. Copy the “request header overrides” headers from our dummy response to the real response
  dummyRes.headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value)
    }
  })
}

// https://nextjs.org/docs/app/building-your-application/authentication
export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (searchParams.has('code')) {
    const response = await fetch('https://www.mydocqa.com/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: searchParams.get('code') }),
    })

    const { user_id, id_token, access_token, refresh_token, expires_in } =
      await response.json()

    if (response.ok) {
      const response = NextResponse.redirect(
        'https://www.mydocqa.com/dashboard'
      )

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
      return NextResponse.redirect('https://www.mydocqa.com/login')
    }

    const refreshToken = request.cookies.get('RefreshToken')!
    const userId = request.cookies.get('UserId')!

    const response = await fetch('https://www.mydocqa.com/api/auth/refresh', {
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

      // Apply those cookies to the request
      applySetCookie(request, response)

      return response
    } else {
      const response = NextResponse.redirect('https://www.mydocqa.com/login')

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
