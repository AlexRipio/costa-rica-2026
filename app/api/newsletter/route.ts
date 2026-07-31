import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/data/live-state'
import { saveSubscriber } from '@/data/newsletter'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const allowed = await rateLimit(`newsletter:${ip}`, 5, 60 * 10)
  if (!allowed) {
    return NextResponse.json({ ok: false, message: 'Demasiados intentos seguidos. Prueba en unos minutos.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const source = body?.source === 'costa-rica-packing' ? body.source : 'costa-rica-packing'

  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, message: 'Ese correo no parece válido.' }, { status: 400 })
  }

  const subscriber = await saveSubscriber(email, source)
  if (!subscriber.saved) {
    return NextResponse.json({ ok: false, message: 'Ahora mismo no podemos guardar el correo. Inténtalo más tarde.' }, { status: 503 })
  }

  return NextResponse.json({
    ok: true,
    message: 'Perfecto. Te avisaremos cuando ampliemos esta guía.',
  }, { headers: { 'Cache-Control': 'no-store' } })
}
