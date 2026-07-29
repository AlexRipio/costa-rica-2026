import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Backpack, Ban, Car, Check, Clock3, Compass, ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { costaRicaGuideBySlug, costaRicaGuides } from '@/src/data/costaRicaGuides'
import { images } from '@/src/data/images'
import { initialTripData } from '@/src/data/tripData'

type GuidePageProps = {
  params: Promise<{ destination: string }>
}

export function generateStaticParams() {
  return costaRicaGuides.map((guide) => ({ destination: guide.slug }))
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { destination } = await params
  const guide = costaRicaGuideBySlug[destination]
  if (!guide) return {}
  return {
    title: `${guide.title} · Guía práctica`,
    description: guide.intro,
  }
}

export default async function CostaRicaDestinationGuide({ params }: GuidePageProps) {
  const { destination } = await params
  const guide = costaRicaGuideBySlug[destination]
  if (!guide) notFound()

  const destinationData = initialTripData.destinations.find((item) => item.id === guide.destinationId)
  if (!destinationData) notFound()
  const image = images[destinationData.image]

  return (
    <main className="destination-guide-page costa-rica-public">
      <SiteHeader overlay showTripYears={false} />

      <section className="guide-hero">
        <img src={image.url} alt={image.alt} />
        <div className="guide-hero-shade" />
        <div className="section-shell guide-hero-copy">
          <Link href="/viajes/costa-rica-2026#destinos">
            <ArrowLeft size={16} /> Volver a la ruta
          </Link>
          <span>Guía práctica · Costa Rica</span>
          <h1>{guide.title}</h1>
          <p>{guide.subtitle}</p>
        </div>
      </section>

      <section className="guide-intro">
        <div className="section-shell guide-intro-grid">
          <div>
            <span className="eyebrow">Lo esencial</span>
            <h2>Lo que conviene saber antes de llegar.</h2>
          </div>
          <div>
            <p className="large-copy">{guide.intro}</p>
            <div className="guide-quick-facts">
              <span><Clock3 /> <small>Tiempo ideal</small><strong>{guide.stay}</strong></span>
              <span><Compass /> <small>Ritmo</small><strong>{guide.pace}</strong></span>
              <span><MapPin /> <small>Lo mejor</small><strong>{guide.bestFor}</strong></span>
            </div>
          </div>
        </div>
      </section>

      <section className="guide-essentials">
        <div className="section-shell">
          <div className="guide-section-heading">
            <span className="eyebrow eyebrow-light">Prioridades</span>
            <h2>Si solo haces tres cosas.</h2>
          </div>
          <div className="guide-essential-grid">
            {guide.essentials.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-advice-section">
        <div className="section-shell guide-advice-grid">
          <div className="guide-advice-title">
            <span className="eyebrow">Consejos útiles</span>
            <h2>Detalles que cambian el viaje.</h2>
            <p>Decisiones sencillas para aprovechar el lugar sin convertirlo en una lista de tareas.</p>
          </div>
          <ul className="guide-advice-list">
            {guide.advice.map((tip) => (
              <li key={tip}><Check size={18} /><span>{tip}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="guide-plan-section">
        <div className="section-shell">
          <div className="guide-section-heading guide-section-heading-dark">
            <span className="eyebrow">Plan sencillo</span>
            <h2>Una forma lógica de organizarlo.</h2>
          </div>
          <div className="guide-plan-grid">
            {guide.simplePlan.map((step) => (
              <article key={step.title}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-practical-section">
        <div className="section-shell guide-practical-grid">
          <article className="guide-mobility-card">
            <Car />
            <span className="eyebrow eyebrow-light">Cómo moverse</span>
            <h2>Sin perder tiempo.</h2>
            <p>{guide.gettingAround}</p>
          </article>
          <article className="guide-list-card">
            <Backpack />
            <h3>Qué llevar</h3>
            <ul>{guide.pack.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="guide-list-card guide-avoid-card">
            <Ban />
            <h3>Qué evitar</h3>
            <ul>{guide.avoid.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="guide-sources">
        <div className="section-shell guide-sources-inner">
          <div>
            <span className="eyebrow">Fuentes reales</span>
            <h2>Para ampliar y comprobar.</h2>
            <p>Información resumida y contrastada. Revisa siempre horarios, accesos y condiciones antes de salir.</p>
          </div>
          <div className="guide-source-links">
            {guide.sources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                <span>{source.name}</span><ExternalLink size={15} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-next">
        <div className="section-shell">
          <Link href="/viajes/costa-rica-2026#destinos">
            Ver los demás destinos <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
