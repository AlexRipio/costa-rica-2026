import { ArrowDown, ArrowRight, Camera, Compass, Map, MoveUpRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { HeroLine, HeroMotion, Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { WorldTravelMap } from '@/components/world-travel-map'
import { travelStats, trips } from '@/data/site'
import { images } from '@/src/data/images'

export default function HomePage() {
  return (
    <main>
      <SiteHeader overlay />
      <section className="journal-hero">
        <div className="journal-hero-image"><img src={images.palawanBay.url} alt={images.palawanBay.alt} /></div>
        <div className="journal-hero-shade" />
        <HeroMotion>
          <HeroLine className="hero-kicker"><Compass size={16} /> Un blog de viajes en pareja</HeroLine>
          <HeroLine delay={0.12}><h1>El mundo se vive mejor <em>juntos.</em></h1></HeroLine>
          <HeroLine className="journal-hero-copy" delay={0.24}><p>Somos Andrea y Alejandro. Viajamos para descubrir lugares, guardar historias y volver mirando el mundo de otra manera.</p></HeroLine>
          <HeroLine className="hero-home-actions" delay={0.36}>
            <Link className="button button-light" href="/viajes">Ver nuestros viajes <ArrowRight size={17} /></Link>
            <a className="button button-glass" href="#nosotros">Conócenos <ArrowDown size={17} /></a>
          </HeroLine>
        </HeroMotion>
        <div className="hero-memory-strip">
          <figure><img src={images.sigiriya.url} alt={images.sigiriya.alt} /><figcaption>Sri Lanka · 2025</figcaption></figure>
          <figure><img src={images.arenal.url} alt={images.arenal.alt} /><figcaption>Costa Rica · 2026</figcaption></figure>
        </div>
        <div className="hero-year-mark">VIAJAN<em>2</em>JUNTOS</div>
      </section>

      <section className="home-purpose">
        <div className="section-shell purpose-grid">
          <Reveal><span className="eyebrow">Nuestro cuaderno abierto</span><h2>No contamos países. Contamos las historias que nos trajimos de ellos.</h2></Reveal>
          <Reveal delay={0.12}><p>Aquí reunimos itinerarios que de verdad usamos, rincones que repetiríamos y recuerdos que no queremos perder. Una guía personal para viajar con curiosidad, calma y los ojos muy abiertos.</p><Link className="text-arrow" href="/viajes">Entrar en el archivo <MoveUpRight size={17} /></Link></Reveal>
        </div>
      </section>

      <section className="travel-archive-preview">
        <div className="section-shell">
          <Reveal className="archive-heading"><div><span className="eyebrow eyebrow-light">Historias en el mapa</span><h2>Tres viajes.<br />Mil recuerdos.</h2></div><p>De las lagunas de Palawan a los campos de té de Sri Lanka, con una nueva ruta entre dos océanos esperando en Costa Rica.</p></Reveal>
          <div className="journey-cards">
            {trips.map((trip, index) => (
              <Reveal className={`journey-card journey-card-${index + 1}`} delay={index * .08} key={trip.slug}>
                <Link href={`/viajes/${trip.slug}`}><img src={trip.image.url} alt={trip.image.alt} /><span className="journey-number">0{trips.length - index}</span><div className="journey-overlay"><small>{trip.status}</small><h3>{trip.country}</h3><p>{trip.year}</p><i><ArrowRight /></i></div></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="world-section" id="mapa">
        <div className="section-shell">
          <Reveal className="map-intro"><span className="eyebrow">Atlas en movimiento</span><h2>Un mapa que crece con nosotros.</h2><p>Cada país coloreado es un viaje vivido. El resto, posibilidades.</p></Reveal>
          <Reveal delay={0.1}><WorldTravelMap /></Reveal>
        </div>
      </section>

      <section className="about-us-section" id="nosotros">
        <div className="section-shell about-us-grid">
          <Reveal className="couple-photo-placeholder"><div><Camera /><strong>Nuestra foto, aquí</strong><span>Este espacio está preparado para la foto de los dos que nos pasarás.</span></div></Reveal>
          <Reveal className="about-us-copy" delay={0.12}>
            <span className="eyebrow">Andrea & Alejandro</span><h2>Viajar es nuestra forma favorita de estar juntos.</h2>
            <p>No somos viajeros a tiempo completo ni pretendemos saberlo todo. Somos dos personas a las que les encanta preparar una ruta, desviarse de ella y convertir cada viaje en una historia compartida.</p>
            <p>En 2024 nos perdimos entre las islas de Filipinas. En 2025 cruzamos Sri Lanka entre trenes, templos y plantaciones de té. En 2026 Costa Rica nos espera con volcanes, selva y dos océanos.</p>
            <div className="about-signature">Andrea <span>&</span> Alejandro</div>
          </Reveal>
        </div>
      </section>

      <section className="stats-section home-stats">
        <div className="section-shell">
          <div className="stats-grid">{travelStats.map((stat, index) => <Reveal className="stat-item" delay={index * .06} key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></Reveal>)}</div>
          <Reveal className="next-trip-banner"><div><Sparkles /><span>El mundo todavía es muy grande</span><h2>La siguiente historia empieza con una idea.</h2></div><Link href="/viajes">Abrir el atlas <Map /></Link></Reveal>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
