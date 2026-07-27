import type { Metadata } from 'next'
import { ArrowDown, ArrowRight, CalendarDays, Camera, MapPin, Moon, Plane, Route } from 'lucide-react'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { StoryMap } from '@/components/story-map'
import { TripTimeline } from '@/components/trip-timeline'
import { images } from '@/src/data/images'
import { initialTripData } from '@/src/data/tripData'

export const metadata: Metadata = {
  title: 'Costa Rica 2026',
  description: 'Nuestro itinerario de 17 días por volcanes, selva, Pacífico y Caribe en Costa Rica.',
}

const gallery = [images.fortuna, images.monteverde, images.santaTeresa, images.manuelAntonio, images.cahuita]

export default function CostaRicaPage() {
  const trip = initialTripData

  return (
    <main>
      <SiteHeader overlay />
      <section className="trip-hero">
        <div className="trip-hero-media">
          <img src={images.arenal.url} alt={images.arenal.alt} />
        </div>
        <div className="trip-hero-overlay" />
        <div className="trip-hero-copy">
          <Reveal>
            <span className="hero-kicker">
              <MapPin size={15} /> Centroamérica · Viaje finalizado
            </span>
            <h1>
              Costa
              <br />
              Rica
            </h1>
            <p>Volcanes, selva, surf y Caribe.</p>
            <a className="button button-light" href="#itinerario">
              Ver itinerario <ArrowDown size={17} />
            </a>
          </Reveal>
        </div>
        <div className="trip-hero-facts">
          <span>
            <strong>17</strong> días
          </span>
          <span>
            <strong>06</strong> bases
          </span>
          <span>
            <strong>02</strong> océanos
          </span>
        </div>
      </section>

      <section className="trip-intro-section">
        <div className="section-shell trip-intro-grid">
          <Reveal>
            <span className="eyebrow">La aventura</span>
            <h2>Una carretera entre dos océanos.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="large-copy">
              Diecisiete días atravesando un país pequeño que parece contener todos los paisajes: volcanes cubiertos de
              nubes, selva húmeda, carreteras imposibles y playas donde el tiempo se mide en atardeceres.
            </p>
            <div className="trip-intro-details">
              <span>
                <CalendarDays /> 9–25 julio 2026
              </span>
              <span>
                <Route /> Alajuela → Puerto Viejo
              </span>
              <span>
                <Plane /> Madrid ↔ San José
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="trip-route-section">
        <div className="section-shell">
          <Reveal className="split-heading">
            <div>
              <span className="eyebrow eyebrow-light">La ruta completa</span>
              <h2>Pacífico, montaña y Caribe.</h2>
            </div>
            <p>Una ruta circular en 4×4 que cambia de clima y ritmo casi cada dos días.</p>
          </Reveal>
          <StoryMap destinations={trip.destinations} />
        </div>
      </section>

      <section className="destinations-editorial">
        <div className="section-shell">
          <Reveal className="center-heading">
            <span className="eyebrow">Seis mundos</span>
            <h2>Los lugares que marcan el viaje</h2>
          </Reveal>
          <div className="editorial-destination-grid">
            {trip.destinations.map((destination, index) => {
              const image = images[destination.image]
              return (
                <Reveal className={`destination-story destination-story-${(index % 3) + 1}`} key={destination.id}>
                  <div className="destination-photo">
                    <img src={image.url} alt={image.alt} />
                    <span>0{index + 1}</span>
                  </div>
                  <div className="destination-story-copy">
                    <small>{destination.dates}</small>
                    <h3>{destination.name}</h3>
                    <p>{destination.activities.slice(0, 3).join(' · ')}</p>
                    <span>
                      <Moon size={14} /> {destination.nights} noches
                    </span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="itinerary-section" id="itinerario">
        <div className="section-shell itinerary-grid">
          <Reveal className="itinerary-heading">
            <span className="eyebrow">Día a día</span>
            <h2>El itinerario completo</h2>
            <p>Abre cada jornada para ver el ritmo, los traslados y los momentos principales.</p>
            <Link className="private-hint" href="/familia">
              ¿Eres de la familia? Accede al seguimiento privado <ArrowRight size={15} />
            </Link>
          </Reveal>
          <Reveal>
            <TripTimeline days={trip.days} />
          </Reveal>
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-shell">
          <Reveal className="split-heading gallery-heading">
            <div>
              <span className="eyebrow">Postales de la ruta</span>
              <h2>Un país difícil de guardar en una sola foto.</h2>
            </div>
            <Camera size={34} />
          </Reveal>
          <div className="travel-gallery">
            {gallery.map((image, index) => (
              <Reveal className={`gallery-item gallery-item-${index + 1}`} delay={index * 0.05} key={image.id}>
                <img src={image.url} alt={image.alt} />
                <span>{image.alt}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="trip-closing">
        <Reveal>
          <span>VIAJE COMPLETADO</span>
          <h2>Pura vida, Costa Rica.</h2>
          <Link className="button button-light" href="/viajes">
            Todos los viajes <ArrowRight size={17} />
          </Link>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  )
}
