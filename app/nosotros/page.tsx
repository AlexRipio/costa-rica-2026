import type { Metadata } from 'next'
import { ArrowRight, Camera, Compass, Heart, Map, NotebookPen, Route, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { trips } from '@/data/site'
import { siteUrl } from '@/src/data/siteSeo'

export const metadata: Metadata = {
  title: 'Conócenos',
  description: 'La historia y la forma de viajar de Andrea y Alejandro, creadores de Viajan2Juntos.',
  alternates: { canonical: '/nosotros' },
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: {
            '@type': 'Organization',
            name: 'Viajan2Juntos',
            url: siteUrl,
            founder: [
              { '@type': 'Person', name: 'Andrea' },
              { '@type': 'Person', name: 'Alejandro' },
            ],
          },
        }}
      />
      <SiteHeader overlay />
      <section className="about-hero">
        <img src="/about/barco-costa-rica.jpeg" alt="Andrea y Alejandro navegando junto a la costa de Costa Rica" />
        <div className="about-hero-shade" />
        <Reveal className="about-hero-copy">
          <span>Andrea & Alejandro</span>
          <h1>Dos personas,<br />una misma forma<br />de mirar el mundo.</h1>
          <p>Viajan2Juntos es el lugar en el que guardamos todo lo que un viaje nos deja cuando ya hemos vuelto.</p>
        </Reveal>
      </section>

      <section className="about-story-section">
        <div className="section-shell about-story-grid">
          <Reveal className="about-portrait-placeholder about-real-portrait">
            <img src="/about/aventura-montana.jpeg" alt="Andrea y Alejandro preparados para una aventura de montaña en Costa Rica" />
            <div><strong>Nosotros, en ruta</strong><span>Costa Rica · 2026</span></div>
          </Reveal>
          <Reveal className="about-story-copy" delay={0.1}>
            <span className="eyebrow">Quiénes somos</span>
            <h2>No vivimos viajando. Viajamos para vivir un poco más.</h2>
            <p>Somos Andrea y Alejandro, una pareja que disfruta tanto imaginando una ruta como recorriéndola. Nos gusta investigar, organizar lo importante y dejar espacio suficiente para que el viaje también nos sorprenda.</p>
            <p>Este blog no nace para presumir de destinos. Nace para conservar los pequeños detalles: aquella carretera, una comida inesperada, un paisaje que obligó a parar o el plan que salió distinto y acabó siendo el mejor recuerdo.</p>
            <div className="about-handwritten">Nuestro álbum, nuestra guía, nuestra historia.</div>
            <figure className="about-candid-photo">
              <img src="/about/senderismo-selva.jpg" alt="Andrea y Alejandro haciendo senderismo por la selva de Costa Rica" />
              <figcaption>Una ruta por la selva, tal y como somos: disfrutando del camino.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="about-values">
        <div className="section-shell">
          <Reveal className="about-section-heading"><span className="eyebrow eyebrow-light">Nuestra manera de viajar</span><h2>Con curiosidad, sin correr y siempre juntos.</h2></Reveal>
          <div className="about-value-grid">
            <Reveal><Compass /><span>01</span><h3>Mirar con curiosidad</h3><p>Intentamos entender cada lugar más allá de la fotografía y regresar con preguntas nuevas.</p></Reveal>
            <Reveal delay={.07}><Route /><span>02</span><h3>Planear sin encorsetarnos</h3><p>Llevamos una ruta clara, pero dejamos hueco para desviarnos cuando el camino lo merece.</p></Reveal>
            <Reveal delay={.14}><Heart /><span>03</span><h3>Compartir el recuerdo</h3><p>Viajar juntos convierte cada anécdota en una parte de nuestra propia historia.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="about-timeline-section">
        <div className="section-shell about-timeline-grid">
          <Reveal><span className="eyebrow">Nuestro recorrido</span><h2>Un mapa que sólo acaba de empezar.</h2><p>Cada año ha añadido un color nuevo a Viajan2Juntos.</p></Reveal>
          <div className="about-trip-years">
            {[...trips].reverse().map((trip, index) => (
              <Reveal delay={index * .06} key={trip.slug}>
                <Link href={`/viajes/${trip.slug}`}>
                  <span>{trip.year}</span><div><h3>{trip.country}</h3><p>{trip.subtitle}</p></div><ArrowRight />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-blog-section">
        <div className="section-shell">
          <Reveal className="about-section-heading"><span className="eyebrow">Qué encontrarás aquí</span><h2>Un blog hecho para recordar y para ayudar.</h2></Reveal>
          <div className="about-blog-grid">
            <Reveal><Map /><h3>Rutas reales</h3><p>Itinerarios que hemos recorrido, con sus paradas y el orden que tuvo sentido para nosotros.</p></Reveal>
            <Reveal delay={.06}><NotebookPen /><h3>Diarios honestos</h3><p>Lo que funcionó, lo que cambiaríamos y las sensaciones que no caben en una lista.</p></Reveal>
            <Reveal delay={.12}><Camera /><h3>Álbumes vivos</h3><p>Imágenes propias que iremos incorporando para que el blog se parezca cada vez más a nosotros.</p></Reveal>
            <Reveal delay={.18}><Sparkles /><h3>Próximas historias</h3><p>Ideas y lugares que todavía no tienen fecha, pero ya nos hacen abrir el mapa.</p></Reveal>
          </div>
          <Reveal className="about-final-cta"><p>¿Empezamos por el mapa?</p><Link className="button button-coral" href="/viajes">Descubrir nuestros viajes <ArrowRight /></Link></Reveal>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
