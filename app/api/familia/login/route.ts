import { NextResponse } from 'next/server'
import { familyCookieName, familySessionValue, isValidFamilyPassword } from '@/data/family-auth'

export async function POST(request: Request) {
  const formData = await request.formData()
  const password = String(formData.get('password') ?? '')
  const origin = request.headers.get('origin') ?? new URL(request.url).origin
  const destination = new URL('/familia/costa-rica-2026', origin)

  if (!isValidFamilyPassword(password)) {
    return NextResponse.redirect(new URL('/familia?error=1', origin), 303)
  }

  const response = NextResponse.redirect(destination, 303)
  response.cookies.set(familyCookieName, familySessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}
