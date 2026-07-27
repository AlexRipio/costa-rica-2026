import { NextResponse } from 'next/server'
import { editorCookieName } from '@/data/editor-auth'

export async function POST(request: Request) {
  const origin = request.headers.get('origin') ?? new URL(request.url).origin
  const response = NextResponse.redirect(new URL('/actualizar', origin), 303)
  response.cookies.set(editorCookieName, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  })
  return response
}
