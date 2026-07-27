import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { FamilyLiveView } from '@/components/family-live-view'
import { familyCookieName, isValidFamilySession } from '@/data/family-auth'
import { getLiveState } from '@/data/live-state'

export const metadata: Metadata = {
  title: 'Seguimiento familiar',
  description: 'Estado y ubicación compartida del viaje activo.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function FamilyLivePage() {
  const store = await cookies()
  if (!isValidFamilySession(store.get(familyCookieName)?.value)) redirect('/familia')
  return <FamilyLiveView initialState={await getLiveState()} />
}
