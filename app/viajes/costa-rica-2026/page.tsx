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
import { CostaRicaRouteProvider } from '@/components/costa-rica-route-context'
import { CostaRicaExperienceGuide } from '@/components/costa-rica-experience-guide'
import { CostaRicaPlacesMap } from '@/components/costa-rica-places-map'
import { JsonLd } from '@/components/json-ld'
import { IatiContextualText, IatiEditorialCard } from '@/components/iati-affiliate'
import { LivingStatement } from '@/components/living-statement'
import { GoogleRouteCard } from '@/components/google-route-card'
import { ProtectedImage } from '@/components/protected-image'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { StoryMap } from '@/components/story-map'
import { TravelAutoCarousel } from '@/components/travel-auto-carousel'
import { TripItineraryPlanner } from '@/components/trip-itinerary-planner'
import { TripTimeline } from '@/components/trip-timeline'
import { TripUpdateSignup } from '@/components/trip-update-signup'
import { costaRicaGuides } from '@/src/data/costaRicaGuides'
import { costaRicaExperienceFaq } from '@/src/data/costaRicaExperience'
import { images } from '@/src/data/images'
import { initialTripData } from '@/src/data/tripData'
import { contentUpdatedAt, siteLaunchedAt, siteName, siteUrl } from '@/src/data/siteSeo'

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
    publishedTime: `${siteLaunchedAt}T12:00:00+02:00`,
    modifiedTime: `${contentUpdatedAt}T12:00:00+02:00`,
    authors: [`${siteUrl}/nosotros`],
    images: [{ url: images.arenal.url, alt: images.arenal.alt }],
  },
}

const gallery = [
  images.personalSantaTeresaBeach,
  images.personalMonkeyManuelAntonio,
  images.personalManuelAntonioSunset,
  images.personalMariposaPool,
  images.fortuna,
  images.monteverde,
]

const contents = [
  { number: '01', title: 'Elige tu ruta', text: 'Versiones de 10, 15 y 20 días.', href: '#itinerarios' },
  { number: '02', title: 'Mira el mapa', text: 'Distancias, orden y rutas guardables.', href: '#mapa-ruta' },
  { number: '03', title: 'Conoce cada lugar', text: 'Qué hay, dónde está y cuántos días darle.', href: '#destinos' },
  { number: '04', title: 'Prepara el viaje', text: 'Coche, clima, dinero, reservas y comida.', href: '#preparar' },
  { number: '05', title: 'Haz la maleta', text: 'Una lista completa en su propia página.', href: '/viajes/costa-rica-2026/maleta' },
  { number: '06', title: 'Guarda sitios reales', text: 'Hoteles, sodas y lugares enlazados a Maps.', href: '#mapa-lugares' },
  { number: '07', title: 'Mira otras rutas', text: 'Paradas recomendadas que nosotros no hicimos.', href: '#extras' },
]

const extraStops = [
  {
    name: 'Corcovado',
    area: 'Península de Osa · Pacífico Sur',
    ideal: '3–4 días extra',
    fit: 'Para una ruta de 20 días o más',
    text: 'La alternativa más salvaje. Merece una ruta propia con base en Drake Bay o Puerto Jiménez; no lo añadiríamos como excursión rápida desde Manuel Antonio.',
    practical: 'Reserva previa obligatoria. Para las travesías largas se necesita guía y SINAC recomienda contratar guía local para las caminatas.',
    source: 'https://www.sinac.go.cr/ES/ac/acosa/pnc/Paginas/default.aspx',
    map: 'https://www.google.com/maps/search/?api=1&query=Parque+Nacional+Corcovado+Costa+Rica',
  },
  {
    name: 'Tortuguero',
    area: 'Caribe Norte',
    ideal: '2–3 noches',
    fit: 'Mejor al principio o al final',
    text: 'Canales, selva y observación de fauna. No encaja como una parada de coche convencional: el último tramo se hace en lancha y obliga a reorganizar la ruta.',
    practical: 'Se llega únicamente por agua o aire. Las entradas del parque se compran en el sistema oficial de SINAC.',
    source: 'https://www.sinac.go.cr/ES/ac/acto/pnt/Paginas/default.aspx',
    map: 'https://www.google.com/maps/search/?api=1&query=Parque+Nacional+Tortuguero+Costa+Rica',
  },
  {
    name: 'Río Celeste',
    area: 'Bijagua · Volcán Tenorio',
    ideal: '1–2 noches',
    fit: 'El extra más fácil de encajar',
    text: 'Una parada razonable si se añade Bijagua cerca de la etapa de Arenal. Dormir allí evita convertir el sendero y la carretera en una carrera contra el reloj.',
    practical: 'El acceso al sendero cierra a las 14:00 y la entrada se compra únicamente en la web oficial de SINAC.',
    source: 'https://www.sinac.go.cr/ES/ac/acat/pnvt/Paginas/default.aspx',
    map: 'https://www.google.com/maps/search/?api=1&query=Rio+Celeste+Volcan+Tenorio+Costa+Rica',
  },
  {
    name: 'Uvita',
    area: 'Costa Ballena · Pacífico Sur',
    ideal: '1–2 noches',
    fit: 'Después de Manuel Antonio',
    text: 'Playas, la Cola de Ballena y opciones de avistamiento según la temporada. Es la ampliación más natural si se quiere seguir bajando por la costa sin llegar hasta Corcovado.',
    practical: 'Consulta la tabla de mareas: solo se puede caminar hasta la Cola de Ballena durante la marea baja.',
    source: 'https://sinac.go.cr/es/ac/acosa/pnmb/paginas/default.aspx',
    map: 'https://www.google.com/maps/search/?api=1&query=Parque+Nacional+Marino+Ballena+Uvita',
  },
  {
    name: 'Rincón de la Vieja',
    area: 'Guanacaste',
    ideal: '1–2 noches',
    fit: 'Como ruta alternativa por el norte',
    text: 'Fumarolas, pailas de barro, bosque seco y senderos volcánicos. Está fuera del trazado actual y funciona mejor sustituyendo otra zona, no sumándolo a la fuerza.',
    practical: 'El sector Las Pailas cierra los lunes. Las entradas se adquieren en el sistema oficial de reservas.',
    source: 'https://sinac.go.cr/ES/ac/acg/pnrv/Paginas/default.aspx',
    map: 'https://www.google.com/maps/search/?api=1&query=Parque+Nacional+Rincon+de+la+Vieja+Costa+Rica',
  },
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
              '@id': `${siteUrl}/viajes/costa-rica-2026#article`,
              mainEntityOfPage: `${siteUrl}/viajes/costa-rica-2026`,
              headline: 'Costa Rica por libre: rutas de 10, 15 y 20 días',
              description: 'Guía práctica de Costa Rica con itinerarios, mapa, lugares y preparación.',
              url: `${siteUrl}/viajes/costa-rica-2026`,
              image: [images.arenal.url],
              datePublished: siteLaunchedAt,
              dateModified: contentUpdatedAt,
              inLanguage: 'es-ES',
              author: [
                { '@type': 'Person', name: 'Andrea', url: `${siteUrl}/nosotros` },
                { '@type': 'Person', name: 'Alejandro', url: `${siteUrl}/nosotros` },
              ],
              publisher: { '@id': `${siteUrl}/#publisher`, '@type': 'Organization', name: siteName, url: siteUrl },
              isPartOf: { '@id': `${siteUrl}/#website` },
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
            {
              '@type': 'FAQPage',
              mainEntity: costaRicaExperienceFaq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
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
        <a href="#extras">Extras</a>
        <a href="#preparar">Preparar</a>
        <a href="#experiencia">Experiencia real</a>
        <a href="#seguro">Seguro</a>
        <Link href="/viajes/costa-rica-2026/lugares-recomendados">Sitios guardados</Link>
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
              Esta no es una lista de “imprescindibles” escrita desde un escritorio. Ya hemos hecho la ruta completa y
              aquí contamos <strong>qué salió bien, qué fue prescindible, cuánto pagamos y qué cambiaríamos</strong>.
              Cada recomendación personal está separada de los datos que pueden cambiar.
            </p>
            <div className="personal-note">
              <strong>Nuestra idea:</strong> ayudarte a montar tu propio viaje, no convencerte de que copies el nuestro.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="living-statement-section costa-guide-statement" aria-label="La idea principal de la guía">
        <Reveal className="section-shell">
          <LivingStatement
            before="Costa Rica se disfruta mejor cuando eliges"
            accent="menos lugares"
            after="y les das mucho más tiempo."
          />
        </Reveal>
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
            <Reveal><Car /><h3>Waze nos salvó tiempo</h3><p>En carreteras de un carril, un accidente puede bloquear la ruta. Waze reflejó mejor los atascos que Google Maps durante nuestro viaje.</p></Reveal>
            <Reveal><WalletCards /><h3>El efectivo sigue haciendo falta</h3><p>Pagamos casi todo con tarjeta, pero sodas, souvenirs y un hotel exigieron cash. Con 400 USD fuimos tranquilos.</p></Reveal>
            <Reveal><CloudRain /><h3>La lluvia no nos paró</h3><p>Nos mojamos en senderos y cataratas. Chubasquero, muda seca y flexibilidad funcionaron mejor que esperar un día perfecto.</p></Reveal>
            <Reveal><ShieldCheck /><h3>El 4×4 nos dio tranquilidad</h3><p>No fue necesario en cada carretera, pero sí muy útil en baches, accesos de tierra y el regreso nocturno desde Montezuma.</p></Reveal>
          </div>
        </div>
      </section>

      <div className="section-shell"><AdSpace /></div>

      <CostaRicaRouteProvider>
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

      </CostaRicaRouteProvider>

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
                    <div className={`destination-photo ${image.id.startsWith('personal-') ? 'personal-photo-frame' : ''}`}>
                      {image.id.startsWith('personal-') ? (
                        <ProtectedImage src={image.url} alt={image.alt} loading="lazy" />
                      ) : (
                        <img src={image.url} alt={image.alt} loading="lazy" />
                      )}
                      <span>0{index + 1}</span>
                      {image.id.startsWith('personal-') && <small>© Viajan2Juntos</small>}
                    </div>
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

      <section className="costa-places-section" id="mapa-lugares">
        <div className="section-shell">
          <Reveal className="split-heading costa-places-heading">
            <div><span className="eyebrow">Nuestros sitios de Costa Rica</span><h2>Los lugares que apuntaríamos antes de volver.</h2></div>
            <p>Alojamientos, sodas, restaurantes y paradas que usamos o que tenemos guardadas. Pulsa cualquiera para verlo en Google Maps.</p>
          </Reveal>
          <CostaRicaPlacesMap />
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

      <section className="extra-stops-section" id="extras">
        <div className="section-shell">
          <Reveal className="extra-stops-heading">
            <span className="eyebrow">Más allá de nuestra ruta</span>
            <h2>No estuvimos aquí.<br /><em>Pero merece la pena tenerlos en el mapa.</em></h2>
            <p>
              Estas no son recomendaciones basadas en nuestra experiencia. Son alternativas que aparecen de forma
              recurrente en rutas de viajeros y que hemos contrastado con la información oficial de los parques.
            </p>
          </Reveal>
          <div className="extra-stops-grid">
            {extraStops.map((stop, index) => (
              <Reveal className={`extra-stop-card ${index === 0 ? 'extra-stop-featured' : ''}`} delay={index * 0.04} key={stop.name}>
                <div className="extra-stop-topline">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>No estuvimos aquí</small>
                </div>
                <p className="extra-stop-area"><MapPin /> {stop.area}</p>
                <h3>{stop.name}</h3>
                <p className="extra-stop-text">{stop.text}</p>
                <div className="extra-stop-fit">
                  <span><strong>{stop.ideal}</strong>Tiempo recomendado</span>
                  <span><strong>{stop.fit}</strong>Cómo encajarlo</span>
                </div>
                <p className="extra-stop-practical"><strong>Antes de ir:</strong> {stop.practical}</p>
                <div className="extra-stop-links">
                  <a href={stop.map} target="_blank" rel="noreferrer">Ver en el mapa <ArrowRight /></a>
                  <a href={stop.source} target="_blank" rel="noreferrer">Información oficial</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="extra-stops-note">
            <strong>Una ruta no mejora por tener más puntos.</strong>
            <p>Corcovado o Tortuguero pueden ser lo mejor del viaje, pero solo si les das tiempo. Para incluirlos, quitaríamos otra etapa antes de encadenar más horas de coche.</p>
          </Reveal>
        </div>
      </section>

      <section className="prepare-guide-section" id="preparar">
        <div className="section-shell">
          <Reveal className="prepare-guide-heading">
            <span className="eyebrow">Preparar Costa Rica por libre</span>
            <h2>¿Qué necesitas saber antes de comprar los vuelos?</h2>
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
                Para nuestra ruta, alquilar coche compensó rotundamente. El Suzuki Jimny 4×4 nos dio libertad en montaña,
                accesos secundarios y caminos de tierra. <strong>Usamos Waze</strong> y evitamos los trayectos nocturnos largos.
              </p>
            </Reveal>
            <Reveal className="prepare-article">
              <WalletCards />
              <span>Cuánto cuesta</span>
              <h3>Presupuesto medio-alto, incluso viajando por libre.</h3>
              <p>
                Lo que más pesó fue coche, alojamiento y actividades. Comer en <strong>sodas locales</strong>, cocinar alguna
                cena y elegir experiencias por su valor real —no por acumular tours— nos ayudó a equilibrarlo.
              </p>
            </Reveal>
            <Reveal className="prepare-article">
              <BookOpen />
              <span>Qué reservar</span>
              <h3>Parques y ferris antes; playas y tardes libres después.</h3>
              <p>
                En nuestra visita, Místico, Extremo Park y el bosque nuboso exigían o aconsejaban compra online.
                Reserva lo que tenga cupo y <strong>mantén flexibles las playas y actividades que dependen del clima</strong>.
                {' '}Para una ruta con surf, tirolinas y senderismo, también llevaríamos el <IatiContextualText text="seguro de viaje" slug="costa-rica-2026" /> resuelto antes de salir.
              </p>
              <a href="https://serviciosenlinea.sinac.go.cr/" target="_blank" rel="noreferrer">Entradas oficiales SINAC <ArrowRight /></a>
            </Reveal>
            <Reveal className="prepare-article">
              <Coffee />
              <span>Qué comer</span>
              <h3>Casados, gallo pinto y cocina caribeña.</h3>
              <p>
                El casado de una soda solía rondar 8–10 USD y era un plato completo. Pedimos agua filtrada y cocinamos
                alguna noche; en las zonas turísticas <strong>comparar antes de sentarse</strong> marcó diferencia.
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

      <CostaRicaExperienceGuide />

      <IatiEditorialCard slug="costa-rica-2026" scope="internacional" destination="Costa Rica" variant="dark" />

      <section className="media-journal-section">
        <div className="section-shell">
          <Reveal className="blog-section-heading">
            <span className="eyebrow eyebrow-light">Diario visual</span>
            <h2>Hay lugares que se cuentan mejor con imágenes.</h2>
            <p>Una pausa visual entre carreteras, bosque y costa.</p>
          </Reveal>
          <div className="media-journal-grid">
            {gallery.slice(0, 4).map((image, index) => (
              <Reveal
                className={`media-photo media-photo-${index + 1} personal-photo-frame`}
                delay={index * 0.06}
                key={image.id}
              >
                <figure>
                  <ProtectedImage src={image.url} alt={image.alt} loading="lazy" />
                  <figcaption>{image.alt}<small>Foto propia · Viajan2Juntos</small></figcaption>
                </figure>
              </Reveal>
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

      <section className="blog-faq-section" id="dudas-experiencia">
        <div className="section-shell blog-faq-grid">
          <Reveal>
            <span className="eyebrow">Después de volver</span>
            <h2>Lo que nos preocupaba antes de viajar y ahora podemos responder.</h2>
            <p>Son respuestas desde nuestra experiencia. Salud, visados, normas de parques y condiciones de acceso deben comprobarse de nuevo antes de viajar.</p>
          </Reveal>
          <div>
            {costaRicaExperienceFaq.map((item) => (
              <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>
            ))}
          </div>
        </div>
      </section>

      <div className="section-shell"><AdSpace compact /></div>

      <section className="trip-closing">
        <Reveal>
          <span>UN VIAJE VIVIDO, UNA GUÍA EN MOVIMIENTO</span>
          <h2>Ya volvimos. Ahora te contamos lo que de verdad nos habría ayudado saber.</h2>
          <Link className="button button-light" href="/viajes">Todos los viajes <ArrowRight size={17} /></Link>
          <TripUpdateSignup />
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  )
}
