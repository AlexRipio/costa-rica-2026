import type { Metadata } from 'next'
import {
  ArrowDown,
  ArrowRight,
  Backpack,
  BookOpen,
  CalendarDays,
  Camera,
  Car,
  CloudRain,
  Coffee,
  MapPin,
  Moon,
  Plane,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'
import Link from 'next/link'
import { AdSpace } from '@/components/ad-space'
import { JsonLd } from '@/components/json-ld'
import { GoogleRouteCard } from '@/components/google-route-card'
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
import { contentUpdatedAt, siteName, siteUrl } from '@/src/data/siteSeo'

export const metadata: Metadata = {
  title: 'Costa Rica por libre: rutas de 10, 15 y 20 días',
  description: 'Guía de Costa Rica por libre con itinerarios de 10, 15 y 20 días, mapa, lugares, coche, presupuesto, maleta y consejos prácticos.',
  keywords: ['Costa Rica por libre', 'ruta Costa Rica 15 días', 'itinerario Costa Rica', 'viaje Costa Rica en coche', 'qué ver en Costa Rica'],
  alternates: { canonical: '/viajes/costa-rica-2026' },
  openGraph: {
    type: 'article',
    url: '/viajes/costa-rica-2026',
    title: 'Costa Rica por libre: rutas de 10, 15 y 20 días',
    description: 'Itinerarios, mapa, lugares y consejos claros para preparar Costa Rica por libre.',
    images: [{ url: images.arenal.url, alt: images.arenal.alt }],
  },
}

const gallery = [images.fortuna, images.monteverde, images.santaTeresa, images.manuelAntonio, images.cahuita]

const contents = [
  { number: '01', title: 'Elige tu ruta', text: 'Versiones de 10, 15 y 20 días.', href: '#itinerarios' },
  { number: '02', title: 'Mira el mapa', text: 'Distancias, orden y rutas guardables.', href: '#mapa-ruta' },
  { number: '03', title: 'Conoce cada lugar', text: 'Qué hay, dónde está y cuántos días darle.', href: '#destinos' },
  { number: '04', title: 'Prepara el viaje', text: 'Coche, clima, dinero, reservas y comida.', href: '#preparar' },
  { number: '05', title: 'Haz la maleta', text: 'Una lista completa en su propia página.', href: '/viajes/costa-rica-2026/maleta' },
]

export default function CostaRicaPage() {
  const trip = initialTripData

  return (
    <main className="costa-rica-public costa-rica-blog">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              headline: 'Costa Rica por libre: rutas de 10, 15 y 20 días',
              description: 'Guía práctica de Costa Rica con itinerarios, mapa, lugares y preparación.',
              url: `${siteUrl}/viajes/costa-rica-2026`,
              image: [images.arenal.url],
              dateModified: contentUpdatedAt,
              inLanguage: 'es-ES',
              author: [
                { '@type': 'Person', name: 'Andrea', url: `${siteUrl}/nosotros` },
                { '@type': 'Person', name: 'Alejandro', url: `${siteUrl}/nosotros` },
              ],
              publisher: { '@type': 'Organization', name: siteName, url: siteUrl },
            },
            {
              '@type': 'ItemList',
              name: 'Lugares de la ruta por Costa Rica',
              itemListElement: costaRicaGuides.map((guide, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: guide.title,
                url: `${siteUrl}/viajes/costa-rica-2026/${guide.slug}`,
              })),
            },
          ],
        }}
      />
      <SiteHeader overlay showTripYears={false} showCostaRicaSections />

      <section className="trip-hero">
        <div className="trip-hero-media"><img src={images.arenal.url} alt={images.arenal.alt} /></div>
        <div className="trip-hero-overlay" />
        <div className="trip-hero-copy">
          <Reveal>
            <span className="hero-kicker"><MapPin size={15} /> Nuestra guía para viajar por libre</span>
            <h1>Costa<br />Rica</h1>
            <p>Lo que vimos, lo que aprendimos y la ruta que volveríamos a hacer.</p>
            <a className="button button-light" href="#empezar">Empezar a preparar <ArrowDown size={17} /></a>
          </Reveal>
        </div>
        <div className="trip-hero-facts trip-hero-useful-facts">
          <span><strong>15–20</strong> días ideales</span>
          <span><strong>4×4</strong> recomendado</span>
          <span><strong>$$$</strong> no es barato</span>
        </div>
      </section>

      <nav className="trip-section-nav" aria-label="Secciones de la guía de Costa Rica">
        <a href="#empezar">La guía</a>
        <a href="#itinerarios">Itinerarios</a>
        <a href="#mapa-ruta">Mapa</a>
        <a href="#destinos">Lugares</a>
        <a href="#preparar">Preparar</a>
        <Link href="/viajes/costa-rica-2026/maleta">Maleta</Link>
      </nav>

      <section className="trip-intro-section blog-intro-section" id="empezar">
        <div className="section-shell blog-intro-grid">
          <Reveal className="blog-intro-title">
            <span className="eyebrow">De Andrea y Alejandro</span>
            <h2>Ojalá hubiéramos encontrado una guía así antes de ir.</h2>
          </Reveal>
          <Reveal className="blog-intro-copy" delay={0.1}>
            <p>
              Costa Rica parece pequeño en el mapa, pero <strong>las carreteras cambian todos los cálculos</strong>.
              Entre un volcán y una playa pueden irse muchas horas, y querer verlo todo es la forma más rápida de
              pasarse el viaje dentro del coche.
            </p>
            <p>
              Esta no es una lista de “imprescindibles” escrita desde un escritorio. Es la guía que estamos construyendo
              con nuestra ruta: qué zonas encajan juntas, dónde merece la pena quedarse más tiempo y qué cosas conviene
              reservar antes. Cuando añadamos nuestras fotos y vídeos, también contaremos lo que salió bien y lo que
              cambiaríamos.
            </p>
            <div className="personal-note">
              <strong>Nuestra idea:</strong> ayudarte a montar tu propio viaje, no convencerte de que copies el nuestro.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="blog-contents-section">
        <div className="section-shell">
          <Reveal className="blog-section-heading">
            <span className="eyebrow">Por dónde empezar</span>
            <h2>Todo está aquí. En el orden en que lo necesitas.</h2>
          </Reveal>
          <div className="blog-contents-grid">
            {contents.map((item) => (
              <Reveal key={item.number}>
                <Link className="blog-content-card" href={item.href}>
                  <span>{item.number}</span>
                  <div><strong>{item.title}</strong><small>{item.text}</small></div>
                  <ArrowRight />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="honest-facts-section">
        <div className="section-shell">
          <Reveal className="blog-section-heading">
            <span className="eyebrow eyebrow-light">Lo primero que debes saber</span>
            <h2>Costa Rica es una pasada. Pero no siempre es fácil.</h2>
          </Reveal>
          <div className="honest-facts-grid">
            <Reveal><Car /><h3>Los kilómetros engañan</h3><p>Una carretera de 150 km puede ocupar buena parte del día. Planifica por horas de conducción, no por distancia.</p></Reveal>
            <Reveal><WalletCards /><h3>Es más caro de lo esperado</h3><p>Entradas, actividades y coche pesan mucho. Las sodas, una ruta más corta y reservar con tiempo ayudan a controlar el gasto.</p></Reveal>
            <Reveal><CloudRain /><h3>La lluvia no arruina el viaje</h3><p>El Pacífico y el Caribe no siguen el mismo calendario. Lleva alternativas y decide algunas cosas al despertar.</p></Reveal>
            <Reveal><ShieldCheck /><h3>La naturaleza manda</h3><p>Entradas oficiales, guías responsables y nada de alimentar animales. Aquí viajar bien también significa molestar poco.</p></Reveal>
          </div>
        </div>
      </section>

      <div className="section-shell"><AdSpace /></div>

      <section className="route-options-section" id="itinerarios">
        <div className="section-shell">
          <Reveal className="route-options-heading">
            <span className="eyebrow">Tres viajes posibles</span>
            <h2>¿Tienes 10, 15 o 20 días?</h2>
            <p>No hemos comprimido la misma ruta. Cada opción elimina desvíos para que el viaje siga teniendo sentido.</p>
          </Reveal>
          <TripItineraryPlanner />
        </div>
      </section>

      <section className="trip-route-section" id="mapa-ruta">
        <div className="section-shell">
          <Reveal className="split-heading">
            <div><span className="eyebrow eyebrow-light">La ruta, de un vistazo</span><h2>Primero entiende el país. Luego elige las paradas.</h2></div>
            <p>Haz zoom, pulsa cada punto y fíjate en algo importante: el Caribe queda al otro lado de la cordillera.</p>
          </Reveal>
          <StoryMap destinations={trip.destinations} />
          <GoogleRouteCard />
        </div>
      </section>

      <section className="destinations-editorial blog-destinations" id="destinos">
        <div className="section-shell">
          <Reveal className="blog-section-heading">
            <span className="eyebrow">¿Dónde vas exactamente?</span>
            <h2>Seis paradas que no se parecen entre sí.</h2>
            <p>Cada guía explica dónde está el lugar, cómo llegar, qué merece la pena y cómo encajarlo en la ruta.</p>
          </Reveal>
          <div className="editorial-destination-grid">
            {trip.destinations.map((destination, index) => {
              const image = images[destination.image]
              const guide = costaRicaGuides.find((item) => item.destinationId === destination.id)
              return (
                <Reveal className={`destination-story destination-story-${(index % 3) + 1}`} key={destination.id}>
                  <Link className="destination-story-link" href={`/viajes/costa-rica-2026/${guide?.slug}`}>
                    <div className="destination-photo"><img src={image.url} alt={image.alt} /><span>0{index + 1}</span></div>
                    <div className="destination-story-copy">
                      <small>{guide?.bestFor}</small>
                      <h3>{guide?.title}</h3>
                      <p>{guide?.intro}</p>
                      <div className="destination-card-footer">
                        <span><Moon size={14} /> {guide?.stay}</span>
                        <strong>Entender esta parada <ArrowRight size={14} /></strong>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="travel-carousel-section" aria-label="Más imágenes de los destinos">
        <div className="section-shell">
          <Reveal className="split-heading gallery-heading">
            <div><span className="eyebrow">Para ir abriendo boca</span><h2>Así cambia el paisaje durante la ruta.</h2></div>
            <Camera size={34} />
          </Reveal>
          <TravelAutoCarousel />
        </div>
      </section>

      <section className="prepare-guide-section" id="preparar">
        <div className="section-shell">
          <Reveal className="prepare-guide-heading">
            <span className="eyebrow">Preparar Costa Rica por libre</span>
            <h2>Las preguntas que aparecen antes de comprar los vuelos.</h2>
            <p>Respuestas directas, con lo importante en negrita y sin esconder la información útil entre párrafos eternos.</p>
          </Reveal>

          <div className="prepare-article-grid">
            <Reveal className="prepare-article">
              <CalendarDays />
              <span>Cuándo ir</span>
              <h3>No hay una única temporada para todo el país.</h3>
              <p>
                En el Pacífico, la época más seca suele ir de diciembre a marzo; el Caribe tiene otro patrón y puede
                funcionar mejor en septiembre y octubre. <strong>Elige la fecha según las zonas</strong>, no según una tabla genérica.
              </p>
              <a href="https://www.visitcostarica.com/planning-your-trip/climate" target="_blank" rel="noreferrer">Clima oficial por regiones <ArrowRight /></a>
            </Reveal>
            <Reveal className="prepare-article">
              <Car />
              <span>Cómo moverse</span>
              <h3>El coche da libertad, pero también marca el ritmo.</h3>
              <p>
                Para esta ruta, un coche alto resulta cómodo en montaña y accesos secundarios. <strong>Evita conducir de noche</strong>,
                descarga mapas sin conexión y pregunta siempre si el seguro incluye lo que te están prometiendo.
              </p>
            </Reveal>
            <Reveal className="prepare-article">
              <WalletCards />
              <span>Cuánto cuesta</span>
              <h3>Presupuesto medio-alto, incluso viajando por libre.</h3>
              <p>
                Lo que más pesa suele ser coche, alojamiento y actividades. Comer en <strong>sodas locales</strong>, alternar tours
                con senderos y no cambiar de hotel cada noche reduce bastante el gasto.
              </p>
            </Reveal>
            <Reveal className="prepare-article">
              <BookOpen />
              <span>Qué reservar</span>
              <h3>Parques y ferris antes; playas y tardes libres después.</h3>
              <p>
                Compra entradas de parques en canales oficiales y reserva alojamientos si viajas en temporada alta.
                Mantén flexibles las actividades que dependen del clima.
              </p>
              <a href="https://serviciosenlinea.sinac.go.cr/" target="_blank" rel="noreferrer">Entradas oficiales SINAC <ArrowRight /></a>
            </Reveal>
            <Reveal className="prepare-article">
              <Coffee />
              <span>Qué comer</span>
              <h3>Casados, gallo pinto y cocina caribeña.</h3>
              <p>
                Las sodas son una forma sencilla de comer bien. En el Caribe busca rice and beans cocinado con coco;
                en las zonas turísticas compara precios antes de sentarte.
              </p>
            </Reveal>
            <Reveal className="prepare-article prepare-packing-link">
              <Backpack />
              <span>Qué llevar</span>
              <h3>Una maleta para lluvia, montaña y playa.</h3>
              <p>Hemos separado la lista completa para que puedas abrirla mientras preparas el equipaje y no mezclarla con la ruta.</p>
              <Link href="/viajes/costa-rica-2026/maleta">Abrir la guía de equipaje <ArrowRight /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="media-journal-section">
        <div className="section-shell">
          <Reveal className="blog-section-heading">
            <span className="eyebrow eyebrow-light">Diario visual</span>
            <h2>Hay lugares que se cuentan mejor con imágenes.</h2>
            <p>Una pausa visual entre carreteras, bosque y costa.</p>
          </Reveal>
          <div className="media-journal-grid">
            {gallery.slice(0, 3).map((image, index) => (
              <figure className={`media-photo media-photo-${index + 1}`} key={image.id}>
                <img src={image.url} alt={image.alt} />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="itinerary-section" id="diario">
        <div className="section-shell itinerary-grid">
          <Reveal className="itinerary-heading">
            <span className="eyebrow">Nuestro viaje</span>
            <h2>La ruta original, día a día.</h2>
            <p>No es la única forma de hacerlo. Es la nuestra, contada para que puedas quedarte con lo que te sirva.</p>
            <Link className="private-hint" href="/familia">¿Eres de la familia? Accede al seguimiento privado <ArrowRight size={15} /></Link>
          </Reveal>
          <Reveal><TripTimeline days={trip.days} /></Reveal>
        </div>
      </section>

      <section className="blog-faq-section">
        <div className="section-shell blog-faq-grid">
          <Reveal><span className="eyebrow">Preguntas rápidas</span><h2>Lo que siempre acaba saliendo en el grupo de viaje.</h2></Reveal>
          <div>
            <details><summary>¿Cuántos días merece Costa Rica?</summary><p>Con 10 días hay que elegir tres zonas. Con 15 se puede sumar el Pacífico. Entre 18 y 20 días el Caribe empieza a encajar sin convertir el viaje en una carrera.</p></details>
            <details><summary>¿Hace falta un 4×4?</summary><p>No para cada carretera, pero un coche alto aporta tranquilidad en Monteverde, Bajos del Toro y accesos secundarios. Pregunta al alojamiento por el último tramo.</p></details>
            <details><summary>¿Es un destino barato?</summary><p>No especialmente. La naturaleza parece gratuita, pero parques, guías, coche y actividades suman rápido. Se puede ajustar el viaje alternando experiencias de pago con playas y senderos.</p></details>
            <details><summary>¿Se puede hacer en transporte público?</summary><p>Sí, pero exige más tiempo y planificación. Para una ruta con muchas paradas, los buses y shuttles funcionan mejor si reduces el número de cambios de base.</p></details>
          </div>
        </div>
      </section>

      <div className="section-shell"><AdSpace compact /></div>

      <section className="trip-closing">
        <Reveal>
          <span>UNA GUÍA QUE SEGUIRÁ CRECIENDO</span>
          <h2>Nos falta lo mejor: contaros lo que vivimos.</h2>
          <Link className="button button-light" href="/viajes">Todos los viajes <ArrowRight size={17} /></Link>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  )
}
