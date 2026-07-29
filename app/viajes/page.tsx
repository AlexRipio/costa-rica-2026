import type { Metadata } from 'next'
import { ArrowRight, Map, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { trips } from '@/data/site'

export const metadata: Metadata = {
  title: 'Viajes',
  description: 'Todas las rutas y diarios de viaje de Viajan2Juntos.',
  alternates: { canonical: '/viajes' },
}

export default function TripsPage() {
  return (
    <main className="cream-page">
      <SiteHeader />
      <section className="page-heading">
        <div className="section-shell">
          <Reveal>
            <span className="eyebrow">Nuestro atlas personal</span>
            <h1>Viajes</h1>
            <p>Cada lugar tiene una ruta, una banda sonora y una historia que merece ser recordada.</p>
          </Reveal>
        </div>
      </section>
      <section className="trips-index">
        <div className="section-shell trips-list">
          {trips.map((trip, index) => (
            <Reveal className="trip-index-card" key={trip.slug}>
              <Link href={`/viajes/${trip.slug}`} aria-label={`Abrir viaje a ${trip.country}`}>
                <div className="trip-index-number">0{index + 1}</div>
                <div className="trip-index-image">
                  <img src={trip.image.url} alt={trip.image.alt} />
                </div>
                <div className="trip-index-copy">
                  <span>{trip.status}</span>
                  <h2>
                    {trip.title} <em>{trip.year}</em>
                  </h2>
                  <p>{trip.subtitle}</p>
                  <div>
                    <span>
                      <MapPin size={15} /> {trip.bases}
                    </span>
                    <span>
                      <Map size={15} /> {trip.duration}
                    </span>
                  </div>
                </div>
                <ArrowRight className="trip-card-arrow" />
              </Link>
            </Reveal>
          ))}
          <Reveal className="coming-trip-card">
            <span>04</span>
            <div>
              <p>Siguiente aventura</p>
              <h2>Destino por descubrir</h2>
            </div>
          </Reveal>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
