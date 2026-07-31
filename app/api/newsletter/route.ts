import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/data/live-state'
import { saveSubscriber } from '@/data/newsletter'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
type PendingItemPayload = { id?: string; text?: string; category?: string }

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const allowed = await rateLimit(`newsletter:${ip}`, 5, 60 * 10)
  if (!allowed) {
    return NextResponse.json({ ok: false, message: 'Demasiados intentos seguidos. Prueba en unos minutos.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const source = body?.source === 'costa-rica-updates' ? 'costa-rica-updates' : 'costa-rica-packing'
  const pendingItems = Array.isArray(body?.pendingItems)
    ? body.pendingItems
        .filter((item: PendingItemPayload) => typeof item?.text === 'string' && typeof item?.category === 'string')
        .slice(0, 80)
    : []
  const skippedCount = typeof body?.skippedCount === 'number' ? body.skippedCount : 0
  const packedCount = typeof body?.packedCount === 'number' ? body.packedCount : 0

  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, message: 'Ese correo no parece válido.' }, { status: 400 })
  }

  const subscriber = await saveSubscriber(email, source, { pendingItems, skippedCount, packedCount })
  if (!subscriber.saved) {
    return NextResponse.json({ ok: false, message: 'Ahora mismo no podemos guardar el correo. Inténtalo más tarde.' }, { status: 503 })
  }

  return NextResponse.json({
    ok: true,
    message: source === 'costa-rica-packing'
      ? 'Listo. Hemos guardado tu lista pendiente para enviártela cuando activemos los avisos por email.'
      : 'Perfecto. Te avisaremos cuando publiquemos nuevos itinerarios o ampliemos esta guía.',
  }, { headers: { 'Cache-Control': 'no-store' } })
}
