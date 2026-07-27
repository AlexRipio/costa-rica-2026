import { NextResponse } from 'next/server'
import { editorCookieName, editorSessionValue, isValidEditorPassword } from '@/data/editor-auth'
import { rateLimit } from '@/data/live-state'

export async function POST(request: Request) {
  const formData = await request.formData()
  const password = String(formData.get('password') ?? '')
  const origin = request.headers.get('origin') ?? new URL(request.url).origin
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const allowed = await rateLimit(`editor-login:${forwarded}`, 6, 15 * 60)

  if (!allowed || !isValidEditorPassword(password)) {
    return NextResponse.redirect(new URL('/actualizar?error=1', origin), 303)
  }

  const response = NextResponse.redirect(new URL('/actualizar', origin), 303)
  response.cookies.set(editorCookieName, editorSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
  return response
}
