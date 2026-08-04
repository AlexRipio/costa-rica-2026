import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TripsShowcase } from '@/components/trips-showcase'
import { trips } from '@/data/site'
import { siteName, siteUrl } from '@/src/data/siteSeo'

export const metadata: Metadata = {
  title: 'Guías de viaje, rutas e itinerarios',
  description: 'Guías de viaje de Viajan2Juntos organizadas por continente y país: rutas por libre, mapas, itinerarios y consejos útiles para preparar cada destino.',
  alternates: { canonical: '/viajes' },
}

export default function TripsPage() {
  return (
    <main>
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
      <TripsShowcase trips={trips} />
      <SiteFooter />
    </main>
  )
}
