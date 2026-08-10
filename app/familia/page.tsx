import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { familyCookieName, isValidFamilySession } from '@/data/family-auth'

export const metadata: Metadata = {
  title: 'Acceso privado',
  robots: { index: false, follow: false, noarchive: true },
}

export const dynamic = 'force-dynamic'

export default async function PrivateEntryPage() {
  const cookieStore = await cookies()
  if (isValidFamilySession(cookieStore.get(familyCookieName)?.value)) {
    redirect('/familia/viajes')
  }

  notFound()
}
