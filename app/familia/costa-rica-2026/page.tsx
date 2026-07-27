import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { FamilyDashboard } from '@/components/family-dashboard'
import { familyCookieName, isValidFamilySession } from '@/data/family-auth'
import { initialTripData } from '@/src/data/tripData'

export const metadata: Metadata = {
  title: 'Seguimiento Costa Rica 2026',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function FamilyCostaRicaPage() {
  const cookieStore = await cookies()
  if (!isValidFamilySession(cookieStore.get(familyCookieName)?.value)) {
    redirect('/familia')
  }

  return (
    <main className="family-private-page">
      <FamilyDashboard
        days={initialTripData.days}
        destinations={initialTripData.destinations}
        hotels={initialTripData.hotels}
        flights={initialTripData.flights.legs}
      />
    </main>
  )
}
