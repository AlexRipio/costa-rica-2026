import type { Metadata } from 'next'
import {
  ArrowLeft,
  ArrowRight,
  Backpack,
  Ban,
  Car,
  Check,
  Clock3,
  Compass,
  ExternalLink,
  LocateFixed,
  MapPin,
  Navigation,
  Route,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AdSpace } from '@/components/ad-space'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { costaRicaGuideBySlug, costaRicaGuides } from '@/src/data/costaRicaGuides'
import { costaRicaGuideExtras } from '@/src/data/costaRicaGuideExtras'
import { images } from '@/src/data/images'
import { initialTripData } from '@/src/data/tripData'

type GuidePageProps = { params: Promise<{ destination: string }> }

export function generateStaticParams() {
  return costaRicaGuides.map((guide) => ({ destination: guide.slug }))
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { destination } = await params
  const guide = costaRicaGuideBySlug[destination]
  if (!guide) return {}
  return { title: `${guide.title} · Costa Rica`, description: guide.intro }
}

export default async function CostaRicaDestinationGuide({ params }: GuidePageProps) {
  const { destination } = await params
  const guide = costaRicaGuideBySlug[destination]
  const extra = costaRicaGuideExtras[destination]
  if (!guide || !extra) notFound()

  const destinationData = initialTripData.destinations.find((item) => item.id === guide.destinationId)
  if (!destinationData) notFound()
  const image = images[destinationData.image]
  const currentIndex = costaRicaGuides.findIndex((item) => item.slug === guide.slug)
  const previous = costaRicaGuides[currentIndex - 1]
  const next = costaRicaGuides[currentIndex + 1]
  const googleMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(extra.mapQuery)}&z=10&output=embed`
  const googleOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(extra.mapQuery)}`

  return (
    <main className="destination-guide-page costa-rica-public destination-blog-guide">
      <SiteHeader overlay showTripYears={false} showCostaRicaSections />

      <section className="guide-hero">
        <img src={image.url} alt={image.alt} />
        <div className="guide-hero-shade" />
        <Reveal className="section-shell guide-hero-copy">
          <nav className="guide-breadcrumbs" aria-label="Migas de pan">
            <Link href="/viajes/costa-rica-2026">Costa Rica</Link>
            <span>›</span>
            <Link href="/viajes/costa-rica-2026#destinos">Lugares</Link>
            <span>›</span>
            <strong>{guide.title}</strong>
          </nav>
          <span>{extra.routePosition}</span>
          <h1>{guide.title}</h1>
          <p>{guide.subtitle}</p>
        </Reveal>
      </section>

      <nav className="guide-section-nav" aria-label={`Secciones de ${guide.title}`}>
        <a href="#situarse">Dónde está</a>
        <a href="#que-ver">Qué ver</a>
        <a href="#organizar">Cómo organizarlo</a>
        <a href="#consejos">Consejos</a>
        <Link href="/viajes/costa-rica-2026/maleta">Maleta</Link>
      </nav>

      <section className="guide-intro guide-personal-intro">
        <Reveal className="section-shell guide-intro-grid">
          <div>
            <span className="eyebrow">Antes de llegar</span>
            <h2>Qué lugar ocupa en la ruta.</h2>
          </div>
          <div>
            <p className="large-copy">{guide.intro}</p>
            <p className="guide-our-route"><strong>En nuestra ruta:</strong> {extra.ourRoute}</p>
            <div className="guide-quick-facts">
              <span><Clock3 /><small>Tiempo que le daríamos</small><strong>{guide.stay}</strong></span>
              <span><LocateFixed /><small>Mejor base</small><strong>{extra.base}</strong></span>
              <span><Compass /><small>Cómo se siente</small><strong>{extra.feel}</strong></span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="guide-location-section" id="situarse">
        <div className="section-shell guide-location-grid">
          <Reveal className="guide-location-copy">
            <span className="eyebrow eyebrow-light">Sitúate primero</span>
            <h2>{extra.region}</h2>
            <p>
              <strong>{guide.title}</strong> está en {extra.region.toLowerCase()}. {extra.arrival}.
              Estas son las referencias que conviene reconocer cuando mires la ruta:
            </p>
            <ul>{extra.nearby.map((place) => <li key={place}><MapPin /> {place}</li>)}</ul>
            <a href={googleOpenUrl} target="_blank" rel="noreferrer">Abrir esta zona en Google Maps <ExternalLink /></a>
          </Reveal>
          <Reveal className="guide-location-map">
            <iframe title={`Mapa de ${guide.title}`} src={googleMapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <span><Navigation /> Mapa real de la zona</span>
          </Reveal>
        </div>
      </section>

      <section className="guide-essentials" id="que-ver">
        <div className="section-shell">
          <Reveal className="guide-section-heading">
            <span className="eyebrow eyebrow-light">Qué merece la pena</span>
            <h2>Tres buenos motivos para parar aquí.</h2>
            <p>No son casillas para tachar. Elige según el tiempo, el clima y lo que más te apetezca.</p>
          </Reveal>
          <div className="guide-essential-grid guide-essential-rich-grid">
            {guide.essentials.map((item, index) => {
              const supportingImage = images[extra.photoKeys[index]]
              return (
                <Reveal key={item.title}>
                  <article>
                    <img src={supportingImage.url} alt={supportingImage.alt} />
                    <div><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <div className="section-shell"><AdSpace compact /></div>

      <section className="guide-plan-section" id="organizar">
        <div className="section-shell">
          <Reveal className="guide-section-heading guide-section-heading-dark">
            <span className="eyebrow">Una ruta sencilla</span>
            <h2>Cómo repartir los días sin correr.</h2>
          </Reveal>
          <div className="guide-plan-grid">
            {guide.simplePlan.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <article><span>{step.label}</span><h3>{step.title}</h3><p>{step.text}</p></article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-advice-section" id="consejos">
        <Reveal className="section-shell guide-advice-grid">
          <div className="guide-advice-title">
            <span className="eyebrow">Apunta esto</span>
            <h2>Detalles que evitan perder tiempo.</h2>
            <p>Consejos concretos para este lugar, no frases que sirven para cualquier país.</p>
          </div>
          <ul className="guide-advice-list">
            {guide.advice.map((tip) => <li key={tip}><Check size={18} /><span>{tip}</span></li>)}
          </ul>
        </Reveal>
      </section>

      <section className="guide-practical-section">
        <Reveal className="section-shell guide-practical-grid">
          <article className="guide-mobility-card">
            <Car /><span className="eyebrow eyebrow-light">Cómo moverse</span>
            <h2>Lo práctico al llegar.</h2><p>{guide.gettingAround}</p>
          </article>
          <article className="guide-list-card">
            <Backpack /><h3>Qué llevar ese día</h3>
            <ul>{guide.pack.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link href="/viajes/costa-rica-2026/maleta">Ver la maleta completa <ArrowRight /></Link>
          </article>
          <article className="guide-list-card guide-avoid-card">
            <Ban /><h3>Lo que evitaríamos</h3>
            <ul>{guide.avoid.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </Reveal>
      </section>

      <section className="guide-photo-break">
        <img src={images[extra.photoKeys[1]].url} alt={images[extra.photoKeys[1]].alt} />
        <Reveal><span>Cuando lleguen nuestras fotos</span><strong>este será el espacio para contar la historia real del lugar.</strong></Reveal>
      </section>

      <section className="guide-sources">
        <Reveal className="section-shell guide-sources-inner">
          <div>
            <span className="eyebrow">Para comprobar antes de ir</span>
            <h2>Fuentes y reservas.</h2>
            <p>Los horarios, precios y accesos cambian. Aquí dejamos las páginas que merece la pena revisar antes de cerrar el día.</p>
          </div>
          <div className="guide-source-links">
            {guide.sources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>{source.name}</span><ExternalLink size={15} /></a>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="destination-route-navigation">
        <div className="section-shell">
          <div className="route-progress-label"><Route /> Estás en la etapa {currentIndex + 1} de {costaRicaGuides.length}</div>
          <div className="destination-prev-next">
            {previous ? (
              <Link href={`/viajes/costa-rica-2026/${previous.slug}`}><ArrowLeft /><span><small>Parada anterior</small><strong>{previous.title}</strong></span></Link>
            ) : <span />}
            {next ? (
              <Link href={`/viajes/costa-rica-2026/${next.slug}`}><span><small>Siguiente parada</small><strong>{next.title}</strong></span><ArrowRight /></Link>
            ) : (
              <Link href="/viajes/costa-rica-2026"><span><small>Fin de la ruta</small><strong>Volver a Costa Rica</strong></span><ArrowRight /></Link>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
