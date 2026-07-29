import type { Metadata } from 'next'
import { ArrowLeft, Backpack, CloudRain, Footprints, Lightbulb, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { PublicPackingList } from '@/components/public-packing-list'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { images } from '@/src/data/images'
import { initialTripData } from '@/src/data/tripData'

export const metadata: Metadata = {
  title: 'Qué llevar a Costa Rica · Maleta completa',
  description: 'Lista práctica e interactiva para preparar la maleta de un viaje a Costa Rica.',
  alternates: { canonical: '/viajes/costa-rica-2026/maleta' },
}

export default function CostaRicaPackingPage() {
  return (
    <main className="packing-guide-page costa-rica-public">
      <SiteHeader overlay showTripYears={false} showCostaRicaSections />
      <section className="packing-guide-hero">
        <img src={images.monteverde.url} alt={images.monteverde.alt} />
        <div />
        <Reveal className="section-shell">
          <Link href="/viajes/costa-rica-2026"><ArrowLeft /> Volver a la guía de Costa Rica</Link>
          <span>Guía de equipaje</span>
          <h1>La maleta para Costa Rica.</h1>
          <p>Playa, lluvia, bosque nuboso y humedad. Todo cabe sin llevar media casa.</p>
        </Reveal>
      </section>

      <section className="packing-guide-intro">
        <div className="section-shell">
          <Reveal className="blog-intro-grid">
            <div><span className="eyebrow">Nuestra regla</span><h2>Ropa que se seque rápido y calzado que no resbale.</h2></div>
            <div>
              <p className="large-copy">
                No necesitas vestirte de explorador. Sí necesitas prendas cómodas, una capa impermeable y una forma de
                separar lo mojado. <strong>En Monteverde refresca; en la costa sobra casi todo.</strong>
              </p>
            </div>
          </Reveal>
          <div className="packing-principles">
            <Reveal><CloudRain /><strong>Lluvia</strong><p>Chubasquero ligero y bolsas estancas.</p></Reveal>
            <Reveal><Footprints /><strong>Senderos</strong><p>Zapatilla cerrada con suela que agarre.</p></Reveal>
            <Reveal><ShieldCheck /><strong>Sol y mosquitos</strong><p>Protector, gorra y repelente.</p></Reveal>
            <Reveal><Backpack /><strong>Para el día</strong><p>Mochila pequeña, agua y funda de lluvia.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="interactive-packing-section">
        <div className="section-shell">
          <Reveal className="blog-section-heading">
            <span className="eyebrow">Lista interactiva</span>
            <h2>Marca lo que ya tienes preparado.</h2>
            <p>El progreso se guarda en este dispositivo para que puedas cerrar la página y seguir después.</p>
          </Reveal>
          <PublicPackingList categories={initialTripData.packing} />
        </div>
      </section>

      <section className="packing-final-tip">
        <Reveal className="section-shell">
          <Lightbulb />
          <div><span>Un consejo de verdad</span><h2>Deja espacio libre.</h2><p>La lavandería es fácil de encontrar y volver con una mochila que apenas cierra no mejora ningún viaje.</p></div>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  )
}
