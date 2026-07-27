import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { familyCookieName, isValidFamilySession } from '@/data/family-auth'
import { getLiveState } from '@/data/live-state'

export async function GET() {
  const store = await cookies()
  if (!isValidFamilySession(store.get(familyCookieName)?.value)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  return NextResponse.json(await getLiveState(), { headers: { 'Cache-Control': 'no-store' } })
}
