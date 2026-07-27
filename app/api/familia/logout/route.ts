import { NextResponse } from 'next/server'
import { familyCookieName } from '@/data/family-auth'

export async function POST(request: Request) {
  const origin = request.headers.get('origin') ?? new URL(request.url).origin
  const response = NextResponse.redirect(new URL('/familia', origin), 303)
  response.cookies.set(familyCookieName, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  })
  return response
}
