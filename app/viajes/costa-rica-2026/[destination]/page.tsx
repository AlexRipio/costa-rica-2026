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
  HelpCircle,
  Hotel,
  Utensils,
  LocateFixed,
  MapPin,
  Navigation,
  Route,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import { AdSpace } from '@/components/ad-space'
import { IatiContextualText, IatiSidebarCard } from '@/components/iati-affiliate'
import { ProtectedImage } from '@/components/protected-image'
import { Reveal } from '@/components/reveal'
import { LivingStatement } from '@/components/living-statement'
import { DroneScrollStory } from '@/components/drone-scroll-story'
import {
  DestinationExperienceOpening,
  DestinationExperiencePractical,
} from '@/components/destination-experience'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { costaRicaGuideBySlug, costaRicaGuides } from '@/src/data/costaRicaGuides'
import { costaRicaGuideExtras } from '@/src/data/costaRicaGuideExtras'
import { destinationExperiences } from '@/src/data/costaRicaExperience'
import { images } from '@/src/data/images'
import {
  contentUpdatedAt,
  costaRicaGuidesPublishedAt,
  defaultSocialImage,
  siteName,
  siteUrl,
} from '@/src/data/siteSeo'
import { initialTripData } from '@/src/data/tripData'

type GuidePageProps = { params: Promise<{ destination: string }> }

export function generateStaticParams() {
  return costaRicaGuides.map((guide) => ({ destination: guide.slug }))
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { destination } = await params
  const guide = costaRicaGuideBySlug[destination]
  if (!guide) return {}
  const destinationData = initialTripData.destinations.find((item) => item.id === guide.destinationId)
  const image = destinationData ? images[destinationData.image] : undefined
  const canonical = `/viajes/costa-rica-2026/${guide.slug}`
  const description = `${guide.title} por libre: qué ver, cuántos días dedicar, dónde dormir, cómo moverse, reservas y consejos prácticos para organizar la ruta.`
  return {
    title: `${guide.title}: guía práctica por libre`,
    description,
    keywords: [guide.title, `${guide.title} Costa Rica`, `qué ver en ${guide.title}`, `dónde dormir en ${guide.title}`, 'Costa Rica por libre'],
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: `${guide.title}: guía práctica por libre`,
      description,
      siteName,
      locale: 'es_ES',
      publishedTime: `${costaRicaGuidesPublishedAt}T12:00:00+02:00`,
      modifiedTime: `${contentUpdatedAt}T12:00:00+02:00`,
      authors: [`${siteUrl}/nosotros`],
      images: [{ url: image?.url ?? defaultSocialImage, alt: image?.alt ?? guide.title }],
    },
    twitter: { card: 'summary_large_image', title: `${guide.title}: guía práctica`, description, images: [image?.url ?? defaultSocialImage] },
    other: { 'article:modified_time': `${contentUpdatedAt}T12:00:00+02:00`, 'geo.region': 'CR' },
  }
}

export default async function CostaRicaDestinationGuide({ params }: GuidePageProps) {
  const { destination } = await params
  const guide = costaRicaGuideBySlug[destination]
  const extra = costaRicaGuideExtras[destination]
  const experience = destinationExperiences[destination]
  if (!guide || !extra || !experience) notFound()

  const destinationData = initialTripData.destinations.find((item) => item.id === guide.destinationId)
  if (!destinationData) notFound()
  const image = images[destinationData.image]
  const momentImages =
    destination === 'santa-teresa'
      ? [null, images.personalSantaTeresaBeach, null]
      : destination === 'manuel-antonio'
        ? [
            images.personalMariposaPool,
            images.personalMonkeyManuelAntonio,
            images.personalManuelAntonioSunset,
          ]
        : []
  const currentIndex = costaRicaGuides.findIndex((item) => item.slug === guide.slug)
  const previous = costaRicaGuides[currentIndex - 1]
  const next = costaRicaGuides[currentIndex + 1]
  const googleMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(extra.mapQuery)}&z=10&output=embed`
  const googleOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(extra.mapQuery)}`
  const canonicalUrl = `${siteUrl}/viajes/costa-rica-2026/${guide.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        mainEntityOfPage: canonicalUrl,
        headline: `${guide.title}: guía práctica por libre`,
        description: guide.intro,
        image: [image.url],
        datePublished: costaRicaGuidesPublishedAt,
        dateModified: contentUpdatedAt,
        inLanguage: 'es-ES',
        author: [
          { '@type': 'Person', name: 'Andrea', url: `${siteUrl}/nosotros` },
          { '@type': 'Person', name: 'Alejandro', url: `${siteUrl}/nosotros` },
        ],
        publisher: { '@id': `${siteUrl}/#publisher`, '@type': 'Organization', name: siteName, url: siteUrl },
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@type': 'Place', name: guide.title, address: { '@type': 'PostalAddress', addressCountry: 'CR' } },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Viajes', item: `${siteUrl}/viajes` },
          { '@type': 'ListItem', position: 3, name: 'Costa Rica', item: `${siteUrl}/viajes/costa-rica-2026` },
          { '@type': 'ListItem', position: 4, name: guide.title, item: canonicalUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [...extra.faq, ...experience.personalFaq].map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }

  return (
    <main className="destination-guide-page costa-rica-public destination-blog-guide">
      <JsonLd data={structuredData} />
      <SiteHeader overlay showTripYears={false} showCostaRicaSections />

      <section className={`guide-hero ${image.id.startsWith('personal-') ? 'personal-photo-frame' : ''}`}>
        {image.id.startsWith('personal-') ? (
          <ProtectedImage src={image.url} alt={image.alt} />
        ) : (
          <img src={image.url} alt={image.alt} />
        )}
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
        <a href="#entender">Entender la zona</a>
        <a href="#nuestra-experiencia">Nuestra experiencia</a>
        <a href="#que-ver">Qué hacer</a>
        <a href="#organizar">Organizar los días</a>
        <a href="#dormir">Dormir y comer</a>
        <a href="#dudas">Dudas</a>
        <Link href="/viajes/costa-rica-2026/lugares-recomendados">Sitios guardados</Link>
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

      {guide.slug === 'puerto-viejo' && <DroneScrollStory />}

      <DestinationExperienceOpening experience={experience} momentImages={momentImages} />

      <section className="guide-article-section" id="entender">
        <div className="section-shell guide-article-layout">
          <Reveal className="guide-article-aside">
            <span className="eyebrow">Primero, entiende el lugar</span>
            <h2>Lo que conviene saber antes de reservar.</h2>
            <nav aria-label={`Índice de la guía de ${guide.title}`}>
              <a href="#situarse">01 · Situarse en el mapa</a>
              <a href="#que-ver">02 · Qué merece la pena</a>
              <a href="#organizar">03 · Repartir los días</a>
              <a href="#dormir">04 · Dormir, comer y reservar</a>
              <a href="#consejos">05 · Consejos prácticos</a>
              <a href="#dudas">06 · Dudas frecuentes</a>
            </nav>
            <IatiSidebarCard slug={`costa-rica-2026-${guide.slug}`} destination={guide.title} />
          </Reveal>
          <Reveal className="guide-long-copy">
            {extra.understand.map((paragraph, index) => <p key={index}><IatiContextualText text={paragraph} slug={`costa-rica-2026-${guide.slug}`} /></p>)}
          </Reveal>
        </div>
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

      <section className="living-statement-section" aria-label="Una idea para recordar">
        <Reveal className="section-shell">
          <LivingStatement {...extra.highlight} />
        </Reveal>
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
                  <article className={supportingImage.id.startsWith('personal-') ? 'personal-photo-frame' : undefined}>
                    {supportingImage.id.startsWith('personal-') ? (
                      <ProtectedImage src={supportingImage.url} alt={supportingImage.alt} loading="lazy" />
                    ) : (
                      <img src={supportingImage.url} alt={supportingImage.alt} loading="lazy" />
                    )}
                    <div><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

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

      <section className="guide-stay-section" id="dormir">
        <div className="section-shell">
          <Reveal className="guide-section-heading">
            <span className="eyebrow">Decisiones que cambian el viaje</span>
            <h2>Dónde dormir, qué probar y qué reservar.</h2>
            <p>La parte práctica explicada antes de que una mala ubicación o una reserva innecesaria te complique el día.</p>
          </Reveal>
          <div className="guide-stay-grid">
            <Reveal className="guide-stay-card guide-stay-card-wide">
              <Hotel />
              <span className="eyebrow">Dónde dormir</span>
              <div className="guide-stay-options">
                {extra.stayAreas.map((area) => <div key={area.title}><h3>{area.title}</h3><p>{area.text}</p></div>)}
              </div>
              <div className="guide-place-list" aria-label={`Alojamientos recomendados en ${guide.title}`}>
                {extra.stayRecommendations.map((place) => (
                  <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" key={place.name}>
                    <span><small>{place.label}</small><strong>{place.name}</strong></span>
                    <p>{place.text}</p>
                    <span className="guide-place-map">Ver en Google Maps <ExternalLink /></span>
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal className="guide-stay-card">
              <Utensils />
              <span className="eyebrow">Comer sin caer en la lista de moda</span>
              <p>{extra.eat}</p>
              <div className="guide-place-list" aria-label={`Restaurantes recomendados en ${guide.title}`}>
                {extra.eatRecommendations.map((place) => (
                  <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" key={place.name}>
                    <span><small>{place.label}</small><strong>{place.name}</strong></span>
                    <p>{place.text}</p>
                    <span className="guide-place-map">Ver en Google Maps <ExternalLink /></span>
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal className="guide-stay-card guide-booking-card">
              <Check />
              <span className="eyebrow">Reserva con sentido</span>
              <ul>{extra.reserve.map((item) => <li key={item}>{item}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </section>

      <DestinationExperiencePractical experience={experience} />

      <section className="guide-advice-section" id="consejos">
        <Reveal className="section-shell guide-advice-grid">
          <div className="guide-advice-title">
            <span className="eyebrow">Apunta esto</span>
            <h2>Detalles que evitan perder tiempo.</h2>
            <p>Consejos concretos para este lugar, no frases que sirven para cualquier país.</p>
          </div>
          <ul className="guide-advice-list">
            {guide.advice.map((tip) => <li key={tip}><Check size={18} /><span><IatiContextualText text={tip} slug={`costa-rica-2026-${guide.slug}`} /></span></li>)}
          </ul>
        </Reveal>
      </section>

      <div className="section-shell"><AdSpace /></div>

      <section className="guide-practical-section">
        <Reveal className="section-shell guide-practical-grid">
          <article className="guide-mobility-card">
            <span className="guide-card-display-word" aria-hidden="true">MOVERSE</span>
            <Car /><span className="eyebrow eyebrow-light">Cómo moverse</span>
            <h2>Lo práctico al llegar.</h2><p>{guide.gettingAround}</p>
          </article>
          <article className="guide-list-card">
            <span className="guide-card-display-word" aria-hidden="true">LLEVAR</span>
            <Backpack /><span className="guide-card-kicker">Para ir cómodo</span><h3>Qué llevar ese día</h3>
            <ul>{guide.pack.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link href="/viajes/costa-rica-2026/maleta">Ver la maleta completa <ArrowRight /></Link>
          </article>
          <article className="guide-list-card guide-avoid-card">
            <span className="guide-card-display-word" aria-hidden="true">EVITAR</span>
            <Ban /><span className="guide-card-kicker">Para no perder el día</span><h3>Lo que evitaríamos</h3>
            <ul>{guide.avoid.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </Reveal>
      </section>

      <figure className={`guide-photo-break guide-photo-only ${images[extra.photoKeys[1]].id.startsWith('personal-') ? 'personal-photo-frame' : ''}`}>
        {images[extra.photoKeys[1]].id.startsWith('personal-') ? (
          <ProtectedImage src={images[extra.photoKeys[1]].url} alt={images[extra.photoKeys[1]].alt} loading="lazy" />
        ) : (
          <img src={images[extra.photoKeys[1]].url} alt={images[extra.photoKeys[1]].alt} loading="lazy" />
        )}
        {images[extra.photoKeys[1]].id.startsWith('personal-') && <figcaption>Foto propia · Viajan2Juntos</figcaption>}
      </figure>

      <section className="guide-faq-section" id="dudas">
        <div className="section-shell guide-faq-layout">
          <Reveal className="guide-faq-heading">
            <HelpCircle />
            <span className="eyebrow">Dudas reales</span>
            <h2>Lo que querríamos saber antes de llegar.</h2>
            <p>Respuestas cortas para tomar decisiones. Si algo depende del clima o de una norma, compruébalo de nuevo justo antes del viaje.</p>
          </Reveal>
          <div className="guide-faq-list">
            {[...experience.personalFaq, ...extra.faq].map((item, index) => (
              <Reveal key={item.question} delay={index * 0.04}>
                <details>
                  <summary><span>0{index + 1}</span>{item.question}</summary>
                  <p><IatiContextualText text={item.answer} slug={`costa-rica-2026-${guide.slug}`} /></p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
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
        <Reveal className="section-shell guide-editorial-note">
          <img src="/about/aventura-montana.jpeg" alt="Andrea y Alejandro durante su viaje por Costa Rica" />
          <div>
            <span className="eyebrow">Quién ha preparado esta guía</span>
            <h2>Andrea y Alejandro, detrás de Viajan2Juntos.</h2>
            <p>Escribimos para resolver las dudas que también tuvimos nosotros. Separamos la experiencia personal de los datos que pueden cambiar y enlazamos las fuentes oficiales para comprobar entradas, normas y reservas.</p>
            <small>Contenido revisado el 29 de julio de 2026 · <Link href="/nosotros">Conoce cómo viajamos y contamos cada lugar</Link></small>
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
