import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  Clock3,
  Map,
  MapPin,
  NotebookPen,
  Route,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import { LivingStatement } from '@/components/living-statement'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { trips } from '@/data/site'
import { travelJournals } from '@/src/data/travelJournals'
import { contentUpdatedAt, defaultSocialImage, siteName, siteUrl } from '@/src/data/siteSeo'

export function generateStaticParams() {
  return trips.filter((trip) => trip.slug !== 'costa-rica-2026').map((trip) => ({ slug: trip.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const trip = trips.find((item) => item.slug === slug && item.slug !== 'costa-rica-2026')
  const journal = travelJournals[slug]
  if (!trip || !journal) return {}
  const description = `${journal.introTitle} Diario personal de Andrea y Alejandro: datos confirmados, mapa y recuerdos pendientes de completar.`
  const socialImage = trip.hasPersonalPhotos ? trip.image.url : defaultSocialImage

  return {
    title: trip.title,
    description,
    alternates: { canonical: `/viajes/${trip.slug}` },
    openGraph: {
      type: 'article',
      url: `/viajes/${trip.slug}`,
      title: `${trip.title} | Viajan2Juntos`,
      description,
      images: [{ url: socialImage, alt: trip.image.alt }],
    },
  }
}

export default async function TravelJournalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tripIndex = trips.findIndex((item) => item.slug === slug && item.slug !== 'costa-rica-2026')
  const trip = trips[tripIndex]
  const journal = travelJournals[slug]
  if (!trip || !journal) notFound()

  const previous = trips[(tripIndex - 1 + trips.length) % trips.length]
  const next = trips[(tripIndex + 1) % trips.length]
  const hasRoute = journal.route.length > 0
  const hasPlaces = journal.places.length > 0
  const hasNotes = journal.reflections.length > 0 || journal.practical.length > 0

  return (
    <main
      className="travel-journal-page destination-blog-guide"
      style={{
        '--journal-accent': trip.accent,
        '--journal-secondary': trip.secondary,
      } as CSSProperties}
    >
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: trip.title,
          description: journal.introTitle,
          url: `${siteUrl}/viajes/${trip.slug}`,
          dateModified: contentUpdatedAt,
          inLanguage: 'es-ES',
          author: [
            { '@type': 'Person', name: 'Andrea', url: `${siteUrl}/nosotros` },
            { '@type': 'Person', name: 'Alejandro', url: `${siteUrl}/nosotros` },
          ],
          publisher: { '@type': 'Organization', name: siteName, url: siteUrl },
        }}
      />
      <SiteHeader overlay />

      <section className="travel-journal-hero">
        <img src={trip.image.url} alt={trip.image.alt} />
        <div className="travel-journal-hero-shade" />
        <Reveal className="travel-journal-hero-copy">
          <span><MapPin size={16} /> {journal.kicker}</span>
          <h1>{trip.title}</h1>
          <p>{trip.subtitle}</p>
          <a className="button button-light" href="#historia">Abrir la guía <ArrowRight size={17} /></a>
        </Reveal>
        <div className="travel-journal-status">
          <small>{trip.status}</small>
          <strong>Guía del destino</strong>
        </div>
      </section>

      <nav className="trip-section-nav journal-section-nav" aria-label={`Secciones del viaje a ${trip.title}`}>
        <a href="#historia">La guía</a>
        <a href="#mapa">Mapa</a>
        {hasRoute && <a href="#ruta">Ruta</a>}
        {hasPlaces && <a href="#lugares">Lugares</a>}
        {hasNotes && <a href="#notas">Notas</a>}
        <a href="#fotos">Fotos</a>
      </nav>

      <section className="journal-intro" id="historia">
        <div className="section-shell journal-intro-grid">
          <Reveal>
            <span className="eyebrow">Guía del viaje</span>
            <h2>{journal.introTitle}</h2>
          </Reveal>
          <Reveal className="journal-intro-copy" delay={0.1}>
            {journal.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </Reveal>
        </div>
        <div className="section-shell journal-facts">
          <div><MapPin /><small>Destino</small><strong>{trip.territory}</strong></div>
          <div><CalendarDays /><small>Cuándo</small><strong>{trip.dates}</strong></div>
          <div><Clock3 /><small>Duración</small><strong>{trip.duration}</strong></div>
          <div><Route /><small>Tipo de viaje</small><strong>{journal.tripType}</strong></div>
          <div><Users /><small>Con quién</small><strong>{journal.companions}</strong></div>
        </div>
      </section>

      <section className="journal-map-section" id="mapa">
        <div className="section-shell journal-map-grid">
          <Reveal className="journal-map-copy">
            <span className="eyebrow eyebrow-light">Ponlo en el mapa</span>
            <h2>Antes de contar la ruta, hay que saber <em>dónde estamos.</em></h2>
            <p>Este mapa sitúa el viaje sin inventar paradas. Cuando recuperemos el recorrido exacto, añadiremos aquí cada etapa en su orden real.</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(journal.mapQuery)}`} target="_blank" rel="noreferrer">
              Abrir en Google Maps <ArrowRight />
            </a>
          </Reveal>
          <Reveal className="journal-map-frame" delay={0.1}>
            <iframe
              title={`Mapa de ${trip.title}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(journal.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      <section className="journal-confirmed">
        <div className="section-shell">
          <Reveal className="journal-section-heading">
            <span className="eyebrow">Lo que sí sabemos</span>
            <h2>Recuerdos confirmados.<br /><em>Sin rellenar los huecos.</em></h2>
          </Reveal>
          <div className="journal-confirmed-grid">
            {journal.confirmed.map((item, index) => (
              <Reveal className="journal-confirmed-card" delay={index * 0.05} key={item}>
                <span>0{index + 1}</span><Check /><p>{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {hasRoute && (
        <section className="journal-route" id="ruta">
          <div className="section-shell">
            <Reveal className="journal-section-heading">
              <span className="eyebrow eyebrow-light">La ruta que podemos confirmar</span>
              <h2>Paradas que ya tienen <em>nombre propio.</em></h2>
            </Reveal>
            <div className="journal-route-list">
              {journal.route.map((stop, index) => (
                <Reveal className="journal-route-stop" key={`${stop.title}-${index}`}>
                  <span className="journal-route-number">{String(index + 1).padStart(2, '0')}</span>
                  <div><small>{stop.label}</small><h3>{stop.title}</h3><p>{stop.text}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="journal-statement">
        <div className="section-shell">
          <LivingStatement {...journal.statement} />
        </div>
      </section>

      {hasPlaces && (
        <section className="journal-places" id="lugares">
          <div className="section-shell">
            <Reveal className="journal-section-heading">
              <span className="eyebrow">Los lugares</span>
              <h2>Lo que ya podemos contar <em>con honestidad.</em></h2>
            </Reveal>
            <div className="journal-places-grid">
              {journal.places.map((place, index) => (
                <Reveal className="journal-place-card" delay={index * 0.06} key={place.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span><MapPin /><h3>{place.title}</h3><p>{place.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasNotes && (
        <section className="journal-notes" id="notas">
          <div className="section-shell">
            <Reveal className="journal-section-heading">
              <span className="eyebrow eyebrow-light">Notas al margen</span>
              <h2>Lo que el viaje nos dejó.</h2>
            </Reveal>
            <div className="journal-notes-grid">
              {[...journal.reflections, ...journal.practical].map((note) => (
                <Reveal className="journal-note" key={note.title}>
                  <NotebookPen /><h3>{note.title}</h3><p>{note.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="journal-gallery" id="fotos">
        <div className="section-shell">
          <Reveal className="journal-section-heading">
            <span className="eyebrow">Diario visual</span>
            <h2>{journal.gallery.length ? 'Las imágenes que ya forman parte del viaje.' : 'Aquí irán nuestras fotos, no imágenes de catálogo.'}</h2>
          </Reveal>
          {journal.gallery.length ? (
            <div className="journal-gallery-grid">
              {journal.gallery.map((image, index) => (
                <Reveal className={`journal-gallery-photo journal-gallery-photo-${index + 1}`} key={image.id}>
                  <img src={image.url} alt={image.alt} />
                  <span><Camera /> {image.alt}</span>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="journal-photo-placeholders">
              {journal.todoPhotos.map((item, index) => (
                <Reveal className="journal-photo-placeholder" key={item}>
                  <Camera /><span>Foto {String(index + 1).padStart(2, '0')}</span><p>{item.replace('TODO: ', '')}</p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="journal-pending">
        <div className="section-shell journal-pending-grid">
          <Reveal>
            <span className="eyebrow eyebrow-light">Esta guía seguirá creciendo</span>
            <h2>Lo próximo es volver a nuestras reservas, fotos y notas.</h2>
            <p>No verás datos personales inventados. Estos son exactamente los detalles que faltan para convertir esta base en nuestra historia completa.</p>
          </Reveal>
          <ul>
            {journal.todoDetails.map((item) => <li key={item}><span>→</span>{item.replace('TODO: completar con Alejandro — ', '')}</li>)}
          </ul>
        </div>
      </section>

      <nav className="journal-neighbours section-shell" aria-label="Otros viajes">
        <Link href={`/viajes/${previous.slug}`}><ArrowLeft /><span><small>Viaje anterior</small>{previous.title}</span></Link>
        <Link href="/viajes"><Map /><span><small>Ver el atlas</small>Todos los viajes</span></Link>
        <Link href={`/viajes/${next.slug}`}><span><small>Siguiente viaje</small>{next.title}</span><ArrowRight /></Link>
      </nav>
      <SiteFooter />
    </main>
  )
}
