import type { Metadata } from 'next'
import { ArrowRight, Map, MapPin } from 'lucide-react'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { trips } from '@/data/site'
import { siteName, siteUrl } from '@/src/data/siteSeo'

export const metadata: Metadata = {
  title: 'Guías de viaje, rutas e itinerarios',
  description: 'Guías de viaje de Viajan2Juntos organizadas por continente y país: rutas por libre, mapas, itinerarios y consejos útiles para preparar cada destino.',
  alternates: { canonical: '/viajes' },
}

export default function TripsPage() {
  const international = trips.filter((trip) => trip.scope === 'internacional')
  const national = trips.filter((trip) => trip.scope === 'nacional')
  const renderTrip = (trip: (typeof trips)[number], index: number) => (
    <Reveal className="trip-index-card" key={trip.slug}>
      <Link href={`/viajes/${trip.slug}`} aria-label={`Abrir viaje a ${trip.title}`}>
        <div className="trip-index-number">{String(index + 1).padStart(2, '0')}</div>
        <div className="trip-index-image">
          <img src={trip.image.url} alt={trip.image.alt} />
        </div>
        <div className="trip-index-copy">
          <span>{trip.status}</span>
          <h2>
            {trip.title}
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
  )

  return (
    <main className="cream-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${siteUrl}/viajes#collection`,
          url: `${siteUrl}/viajes`,
          name: 'Guías de viaje, rutas e itinerarios',
          description: 'Archivo de viajes de Viajan2Juntos organizado por destinos.',
          isPartOf: { '@id': `${siteUrl}/#website` },
          publisher: { '@id': `${siteUrl}/#publisher`, '@type': 'Organization', name: siteName },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: trips.map((trip, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: trip.title,
              url: `${siteUrl}/viajes/${trip.slug}`,
            })),
          },
        }}
      />
      <SiteHeader />
      <section className="page-heading">
        <div className="section-shell">
          <Reveal>
            <span className="eyebrow">Atlas de viajes</span>
            <h1>Viajes</h1>
            <p>Cada lugar tiene una ruta, una banda sonora y una historia que merece ser recordada.</p>
          </Reveal>
        </div>
      </section>
      <section className="trips-index">
        <div className="section-shell trips-list">
          <Reveal className="trips-group-heading">
            <span>01</span><div><small>Más allá de España</small><h2>Viajes internacionales</h2></div>
          </Reveal>
          {international.map((trip, index) => renderTrip(trip, index))}
          <Reveal className="trips-group-heading trips-group-heading-national">
            <span>02</span><div><small>Cerca de casa</small><h2>Viajes por España</h2></div>
          </Reveal>
          {national.map((trip, index) => renderTrip(trip, international.length + index))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
