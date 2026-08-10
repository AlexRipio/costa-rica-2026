import { NextResponse } from 'next/server'
import {
  familyCookieName,
  isValidFamilyAccessToken,
} from '@/data/family-auth'

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const origin = new URL(request.url).origin

  if (!isValidFamilyAccessToken(token)) {
    return new NextResponse(null, {
      status: 404,
      headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' },
    })
  }

  const response = NextResponse.redirect(new URL('/familia/viajes', origin), 303)
  response.headers.set('Referrer-Policy', 'no-referrer')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  // Keep the already validated private token in an HttpOnly cookie. This makes
  // link access independent from AUTH_SECRET while preserving password-based
  // sessions when that environment variable is configured.
  response.cookies.set(familyCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
  return response
}
