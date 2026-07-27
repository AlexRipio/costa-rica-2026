import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ArrowRight, Clock3, Heart, LogOut, Radio, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { familyCookieName, isValidFamilySession } from '@/data/family-auth'
import { getLiveState } from '@/data/live-state'
import { trips } from '@/data/site'

export const metadata: Metadata = {
  title: 'Viajes · Zona Familia',
  description: 'Selector privado de viajes para la familia.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function FamilyTripsPage() {
  const cookieStore = await cookies()
  if (!isValidFamilySession(cookieStore.get(familyCookieName)?.value)) redirect('/familia')
  const liveState = await getLiveState()

  return (
    <main className="family-hub-page">
      <div className="family-hub-shell">
        <header className="family-hub-header">
          <Link className="family-mini-brand" href="/">
            <span>V<span>2</span>J</span>
            <div><strong>Viajan2Juntos</strong><small>Zona Familia</small></div>
          </Link>
          <form action="/api/familia/logout" method="post">
            <button className="logout-button" type="submit"><LogOut size={16} /> Salir</button>
          </form>
        </header>

        <section className="family-hub-intro">
          <div>
            <span className="eyebrow">Hola, familia</span>
            <h1>¿Qué viaje quieres consultar?</h1>
            <p>Elige una historia para ver su información. Cuando estemos viajando, aquí aparecerá claramente el seguimiento en directo.</p>
          </div>
          <div className={`family-live-empty ${liveState.active ? 'is-live' : ''}`}>
            <span className="family-live-label"><i /> {liveState.active ? 'En directo' : 'Próximamente'}</span>
            <Radio />
            <strong>{liveState.active ? liveState.tripName : 'Sin viaje en directo'}</strong>
            <p>{liveState.active ? liveState.message : 'Ahora mismo estamos en casa. Activaremos este espacio en nuestra próxima aventura.'}</p>
            {liveState.active && <Link href="/familia/directo">Abrir seguimiento ahora <ArrowRight /></Link>}
          </div>
        </section>

        <section className="family-trip-selector" aria-label="Seleccionar viaje">
          {trips.map((trip) => {
            const isCostaRica = trip.slug === 'costa-rica-2026'
            return (
              <article className="family-trip-choice" key={trip.slug}>
                <Link href={isCostaRica ? '/familia/costa-rica-2026' : `/viajes/${trip.slug}`}>
                  <div className="family-trip-photo"><img src={trip.image.url} alt={trip.image.alt} /><span>{trip.year}</span></div>
                  <div className="family-trip-choice-copy">
                    <span className="family-trip-status"><Clock3 /> Viaje finalizado</span>
                    <h2>{trip.country}</h2>
                    <p>{trip.subtitle}</p>
                    <strong>{isCostaRica ? 'Ver seguimiento archivado' : 'Abrir diario del viaje'} <ArrowRight /></strong>
                  </div>
                </Link>
              </article>
            )
          })}
        </section>

        <footer className="family-hub-note">
          <ShieldCheck />
          <div><strong>Un espacio sencillo y privado</strong><p>Tu acceso queda recordado en este dispositivo. No compartimos ninguna ubicación en directo cuando no hay un viaje activo.</p></div>
          <Heart />
        </footer>
      </div>
    </main>
  )
}
