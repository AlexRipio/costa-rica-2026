import {
  ArrowDown,
  ArrowRight,
  Compass,
  MapPin,
  MoveUpRight,
  PlaneTakeoff,
  Quote,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { HeroLine, HeroMotion, Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { StoryMap } from '@/components/story-map'
import { brand, travelStats, trips } from '@/data/site'
import { images } from '@/src/data/images'
import { initialTripData } from '@/src/data/tripData'

const featured = trips[0]

export default function HomePage() {
  return (
    <main>
      <SiteHeader overlay />
      <section className="home-hero">
        <div className="hero-background">
          <img src={featured.image.url} alt={featured.image.alt} />
        </div>
        <div className="home-hero-overlay" />
        <HeroMotion>
          <HeroLine className="hero-kicker">
            <Compass size={16} /> Diario de dos viajeros
          </HeroLine>
          <HeroLine delay={0.12}>
            <h1>
              Viajan<span>2</span>
              <br />
              Juntos
            </h1>
          </HeroLine>
          <HeroLine className="hero-lead" delay={0.24}>
            <p>{brand.tagline}</p>
          </HeroLine>
          <HeroLine className="hero-home-actions" delay={0.36}>
            <Link className="button button-light" href="/viajes">
              Explorar viajes <ArrowRight size={17} />
            </Link>
            <a className="button button-glass" href="#ultimo-viaje">
              Nuestra última ruta <ArrowDown size={17} />
            </a>
          </HeroLine>
        </HeroMotion>
        <div className="hero-postcard">
          <span>PRÓXIMA PARADA</span>
          <strong>Costa Rica</strong>
          <small>09°56′N · 84°05′W</small>
        </div>
        <div className="hero-scroll">
          <span>Desliza para viajar</span>
          <i />
        </div>
      </section>

      <section className="intro-section">
        <div className="section-shell intro-grid">
          <Reveal className="intro-title">
            <span className="eyebrow">Nuestro cuaderno abierto</span>
            <h2>No coleccionamos países. Coleccionamos momentos.</h2>
          </Reveal>
          <Reveal className="intro-copy" delay={0.12}>
            <p>
              Viajan2Juntos es nuestro rincón para guardar las carreteras que nos sorprendieron, los planes que salieron
              regular y esos lugares que ya sentimos un poco nuestros.
            </p>
            <Link className="text-arrow" href="/#nosotros">
              Conócenos un poco más <MoveUpRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="featured-trip-section" id="ultimo-viaje">
        <div className="section-shell">
          <Reveal className="featured-trip-head">
            <span className="eyebrow eyebrow-light">{featured.status}</span>
            <p>{featured.dates}</p>
          </Reveal>
          <div className="featured-trip-grid">
            <Reveal className="featured-trip-image">
              <img src={images.santaTeresa.url} alt={images.santaTeresa.alt} />
              <span className="photo-index">01 / 06</span>
            </Reveal>
            <Reveal className="featured-trip-copy" delay={0.15}>
              <span className="script-label">Pura vida</span>
              <h2>
                Costa Rica <em>2026</em>
              </h2>
              <p>{featured.subtitle}. Una ruta de océano a océano que cambia de paisaje casi cada dos días.</p>
              <div className="featured-meta">
                <span>
                  <PlaneTakeoff size={17} /> {featured.duration}
                </span>
                <span>
                  <MapPin size={17} /> {featured.bases}
                </span>
              </div>
              <Link className="button button-coral" href="/viajes/costa-rica-2026">
                Abrir el viaje <ArrowRight size={17} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="map-story-section" id="mapa">
        <div className="section-shell">
          <Reveal className="center-heading">
            <span className="eyebrow">La ruta sobre el mapa</span>
            <h2>Del Pacífico al Caribe</h2>
            <p>Seis bases, dos costas y una carretera que atraviesa el corazón verde de Costa Rica.</p>
          </Reveal>
          <StoryMap destinations={initialTripData.destinations} />
        </div>
      </section>

      <section className="manifesto-section" id="nosotros">
        <div className="manifesto-photo manifesto-photo-one">
          <img src={images.fortuna.url} alt={images.fortuna.alt} />
        </div>
        <div className="manifesto-photo manifesto-photo-two">
          <img src={images.puntaUva.url} alt={images.puntaUva.alt} />
        </div>
        <Reveal className="manifesto-card">
          <Quote size={34} />
          <span className="eyebrow">Por qué viajamos</span>
          <blockquote>
            Para volver con menos certezas, más historias y la sensación de haber vivido un poco más despacio.
          </blockquote>
          <p>Andrea & Alejandro</p>
        </Reveal>
      </section>

      <section className="stats-section">
        <div className="section-shell">
          <div className="stats-grid">
            {travelStats.map((stat, index) => (
              <Reveal className="stat-item" delay={index * 0.08} key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </Reveal>
            ))}
          </div>
          <Reveal className="next-trip-banner">
            <div>
              <Sparkles />
              <span>El mundo todavía es muy grande</span>
              <h2>La próxima historia aún no tiene coordenadas.</h2>
            </div>
            <Link href="/viajes">
              Ver nuestro mapa <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
