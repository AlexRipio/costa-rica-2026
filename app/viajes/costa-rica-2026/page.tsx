import type { Metadata } from 'next'
import { ArrowDown, ArrowRight, Backpack, BookOpen, Camera, Car, CloudRain, MapPin, Moon, Plane, Route, ShieldCheck, Smartphone, WalletCards } from 'lucide-react'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { StoryMap } from '@/components/story-map'
import { TravelAutoCarousel } from '@/components/travel-auto-carousel'
import { TripItineraryPlanner } from '@/components/trip-itinerary-planner'
import { TripTimeline } from '@/components/trip-timeline'
import { costaRicaGuides } from '@/src/data/costaRicaGuides'
import { images } from '@/src/data/images'
import { initialTripData } from '@/src/data/tripData'

export const metadata: Metadata = {
  title: 'Costa Rica',
  description: 'Nuestro itinerario de 17 días por volcanes, selva, Pacífico y Caribe en Costa Rica.',
}

const gallery = [images.fortuna, images.monteverde, images.santaTeresa, images.manuelAntonio, images.cahuita]

export default function CostaRicaPage() {
  const trip = initialTripData

  return (
    <main className="costa-rica-public">
      <SiteHeader overlay showTripYears={false} showCostaRicaSections />
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
            <a className="button button-light" href="#itinerarios">
              Diseña tu ruta <ArrowDown size={17} />
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

      <nav className="trip-section-nav" aria-label="Secciones de la guía de Costa Rica">
        <a href="#itinerarios">Itinerarios</a>
        <a href="#mapa-ruta">Mapa</a>
        <a href="#destinos">Lugares</a>
        <a href="#maleta">Maleta</a>
        <a href="#consejos">Consejos</a>
      </nav>

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
                <Route /> 17 días de viaje
              </span>
              <span>
                <Moon /> 6 bases diferentes
              </span>
              <span>
                <Plane /> Madrid ↔ San José
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="route-options-section" id="itinerarios">
        <div className="section-shell">
          <Reveal className="route-options-heading">
            <span className="eyebrow">Elige tu ritmo</span>
            <h2>Una ruta que se adapta a tus días.</h2>
            <p>Diez días para lo esencial, quince para sumar el Pacífico y veinte para cruzar también hasta el Caribe.</p>
          </Reveal>
          <TripItineraryPlanner />
        </div>
      </section>

      <section className="trip-route-section" id="mapa-ruta">
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

      <section className="destinations-editorial" id="destinos">
        <div className="section-shell">
          <Reveal className="center-heading">
            <span className="eyebrow">Seis mundos</span>
            <h2>Los lugares que marcan el viaje</h2>
          </Reveal>
          <div className="editorial-destination-grid">
            {trip.destinations.map((destination, index) => {
              const image = images[destination.image]
              const guide = costaRicaGuides.find((item) => item.destinationId === destination.id)
              return (
                <Reveal className={`destination-story destination-story-${(index % 3) + 1}`} key={destination.id}>
                  <Link
                    className="destination-story-link"
                    href={`/viajes/costa-rica-2026/${guide?.slug}`}
                  >
                    <div className="destination-photo">
                      <img src={image.url} alt={image.alt} />
                      <span>0{index + 1}</span>
                    </div>
                    <div className="destination-story-copy">
                      <small>Etapa 0{index + 1}</small>
                      <h3>{destination.name}</h3>
                      <p>
                        {destination.activities
                          .filter((activity) => !/fútbol|mundial|partido/i.test(activity))
                          .slice(0, 3)
                          .join(' · ')}
                      </p>
                      <div className="destination-card-footer">
                        <span><Moon size={14} /> {destination.nights} {destination.nights === 1 ? 'noche' : 'noches'}</span>
                        <strong><BookOpen size={14} /> Guía práctica</strong>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="travel-carousel-section" aria-label="Explora las guías por destino">
        <div className="section-shell">
          <Reveal className="split-heading gallery-heading">
            <div><span className="eyebrow">Explora a tu manera</span><h2>Seis lugares, seis ritmos distintos.</h2></div>
          </Reveal>
          <TravelAutoCarousel />
        </div>
      </section>

      <section className="packing-section" id="maleta">
        <div className="section-shell packing-grid">
          <Reveal className="packing-heading">
            <span className="eyebrow eyebrow-light">Maleta inteligente</span>
            <h2>Menos cosas. Las cosas correctas.</h2>
            <p>En una misma ruta tendrás humedad, lluvia, montaña fresca, playa y caminos de tierra.</p>
          </Reveal>
          <div className="packing-cards">
            {[
              { icon: CloudRain, title: 'Lluvia', text: 'Chubasquero ligero, funda de mochila y bolsas para separar ropa mojada.' },
              { icon: Backpack, title: 'Senderos', text: 'Calzado cerrado con agarre, botella reutilizable y mochila pequeña.' },
              { icon: Smartphone, title: 'Conexión', text: 'Mapas sin conexión, batería externa y capturas de entradas y reservas.' },
              { icon: ShieldCheck, title: 'Sol y fauna', text: 'Protector biodegradable, repelente y nada de alimentar animales.' },
            ].map(({ icon: Icon, title, text }) => (
              <Reveal className="packing-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="travel-tips-section" id="consejos">
        <div className="section-shell">
          <Reveal className="center-heading">
            <span className="eyebrow">Antes de arrancar</span>
            <h2>Consejos que evitan problemas.</h2>
          </Reveal>
          <div className="travel-tips-grid">
            <Reveal><Car /><span>01</span><h3>Conduce con luz</h3><p>Las distancias engañan. Curvas, lluvia y tráfico convierten pocos kilómetros en varias horas.</p></Reveal>
            <Reveal><WalletCards /><span>02</span><h3>Combina tarjeta y efectivo</h3><p>La mayoría de lugares aceptan tarjeta, pero aparcamientos, propinas y pequeños negocios pueden no hacerlo.</p></Reveal>
            <Reveal><CloudRain /><span>03</span><h3>Decide cada mañana</h3><p>Conserva alternativas de lluvia y mueve playa, volcán o senderos según las condiciones reales.</p></Reveal>
            <Reveal><ShieldCheck /><span>04</span><h3>Reserva lo limitado</h3><p>Parques nacionales y ferris primero; playas y paseos flexibles después.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="itinerary-section" id="diario">
        <div className="section-shell itinerary-grid">
          <Reveal className="itinerary-heading">
            <span className="eyebrow">Nuestra ruta</span>
            <h2>El viaje original, día a día.</h2>
            <p>Una referencia completa para combinar lugares o ampliar cualquiera de los itinerarios anteriores.</p>
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
