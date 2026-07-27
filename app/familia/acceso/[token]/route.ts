import { timingSafeEqual } from 'crypto'
import { NextResponse } from 'next/server'
import { familyCookieName, familySessionValue } from '@/data/family-auth'

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const expected = process.env.FAMILY_ACCESS_TOKEN ?? ''
  const origin = new URL(request.url).origin
  if (!expected || !safeEqual(token, expected)) {
    return NextResponse.redirect(new URL('/familia', origin), 303)
  }

  const response = NextResponse.redirect(new URL('/familia/directo', origin), 303)
  response.headers.set('Referrer-Policy', 'no-referrer')
  response.cookies.set(familyCookieName, familySessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
  return response
}
