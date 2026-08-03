import type { Metadata } from 'next'
import { ArrowRight, Check, HeartPulse, Luggage, Route, ShieldCheck } from 'lucide-react'
import { IatiLandingCta } from '@/components/iati-affiliate'
import { IatiBrand } from '@/components/iati-brand'
import { IatiHorizontalWidget } from '@/components/iati-widgets'
import { JsonLd } from '@/components/json-ld'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { IATI_AFFILIATE_URL } from '@/src/lib/iati'
import { siteName, siteUrl } from '@/src/data/siteSeo'

export const metadata: Metadata = {
  title: 'Seguro de viaje IATI con 5% de descuento',
  description: 'Calcula tu seguro de viaje IATI con un 5% de descuento automático desde Viajan2Juntos. Sin código y con el cotizador oficial.',
  alternates: { canonical: '/seguro-de-viaje' },
  openGraph: {
    title: 'Seguro de viaje IATI con 5% de descuento | Viajan2Juntos',
    description: 'Cotiza tu seguro de viaje con un 5% de descuento automático y elige la cobertura que encaje con tu ruta.',
    url: '/seguro-de-viaje',
    type: 'website',
  },
}

const faq = [
  { question: '¿Necesito un código de descuento?', answer: 'No. El 5% se aplica automáticamente al entrar desde el enlace o el cotizador de Viajan2Juntos. Comprueba que aparece reflejado antes de finalizar el pago.' },
  { question: '¿Qué seguro de IATI debo elegir?', answer: 'Depende del destino, la duración, la edad de los viajeros y las actividades previstas. Compara límites y exclusiones en el cotizador y lee las condiciones antes de contratar.' },
  { question: '¿Viajan2Juntos vende o gestiona la póliza?', answer: 'No. La contratación, el pago, la póliza y la asistencia se realizan directamente con IATI. Nosotros facilitamos el acceso con descuento mediante un enlace de afiliado.' },
  { question: '¿El enlace de afiliado encarece el seguro?', answer: 'No. Al acceder desde Viajan2Juntos se aplica un 5% de descuento. Si contratas, podemos recibir una comisión de IATI sin añadir un coste extra para ti.' },
]

export default function TravelInsurancePage() {
  return (
    <main className="insurance-page">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'WebPage', '@id': `${siteUrl}/seguro-de-viaje#page`, url: `${siteUrl}/seguro-de-viaje`, name: 'Seguro de viaje IATI con 5% de descuento', isPartOf: { '@id': `${siteUrl}/#website` }, publisher: { '@id': `${siteUrl}/#publisher`, '@type': 'Organization', name: siteName } },
          { '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
        ],
      }} />
      <SiteHeader />

      <section className="insurance-hero">
        <div className="section-shell insurance-hero-grid">
          <Reveal className="insurance-hero-copy">
            <IatiBrand label="Nosotros viajamos con" />
            <span className="eyebrow insurance-hero-eyebrow"><ShieldCheck /> Viajar con tranquilidad</span>
            <h1>El seguro no hace el viaje.<br /><em>Pero puede salvarlo.</em></h1>
            <p>Nosotros viajamos con IATI. Desde Viajan2Juntos puedes calcular tu póliza con un <strong>5% de descuento automático</strong>, sin códigos ni pasos escondidos.</p>
            <div className="insurance-hero-actions">
              <IatiLandingCta label="Calcular mi seguro" placement="hero" />
              <a className="insurance-text-link" href="#como-funciona">Cómo funciona <ArrowRight /></a>
            </div>
            <small className="insurance-disclosure">Esta página contiene enlaces de afiliado. Si contratas, podemos recibir una comisión sin coste adicional para ti.</small>
          </Reveal>
          <Reveal className="insurance-hero-card" delay={0.1}>
            <IatiBrand compact label="Descuento con" />
            <span>Descuento Viajan2Juntos</span>
            <strong>5%</strong>
            <p>Se aplica al entrar desde nuestros enlaces. Antes de pagar, comprueba que aparece en el resumen.</p>
          </Reveal>
        </div>
      </section>

      <section className="insurance-principles">
        <div className="section-shell">
          <Reveal className="insurance-section-heading">
            <span className="eyebrow">Nuestra forma de verlo</span>
            <h2>No recomendamos contratar a ciegas.</h2>
            <p>Un seguro sirve cuando encaja con el viaje real. Antes de elegir, nosotros miramos estos tres puntos y leemos las condiciones completas.</p>
          </Reveal>
          <div className="insurance-principles-grid">
            <Reveal><HeartPulse /><span>01</span><h3>Asistencia médica</h3><p>Revisa el límite, la forma de contactar y cómo actuar si necesitas atención.</p></Reveal>
            <Reveal delay={0.05}><Route /><span>02</span><h3>Tu tipo de viaje</h3><p>Confirma que las actividades, países y desplazamientos previstos están incluidos.</p></Reveal>
            <Reveal delay={0.1}><Luggage /><span>03</span><h3>Lo que ya has pagado</h3><p>Valora equipaje, demoras y cancelación según tus reservas y el coste de la ruta.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="insurance-how" id="como-funciona">
        <div className="section-shell insurance-how-grid">
          <Reveal>
            <span className="eyebrow eyebrow-light">Sin código promocional</span>
            <h2>Cuatro pasos y el descuento aparece solo.</h2>
          </Reveal>
          <ol>
            <li><span>01</span><p>Entra desde el cotizador o un enlace de Viajan2Juntos.</p></li>
            <li><span>02</span><p>Completa destino, fechas y datos de los viajeros.</p></li>
            <li><span>03</span><p>Compara opciones, límites, actividades y exclusiones.</p></li>
            <li><span>04</span><p>Comprueba el 5% de descuento antes de finalizar el pago.</p></li>
          </ol>
        </div>
      </section>

      <section className="insurance-quote" id="cotiza">
        <div className="section-shell">
          <Reveal className="insurance-section-heading insurance-quote-heading">
            <IatiBrand className="iati-brand-centered" label="Cotizador oficial de" />
            <span className="eyebrow">Cotizador oficial de IATI</span>
            <h2>Calcula tu seguro de viaje con un 5% de descuento.</h2>
            <p>Introduce los datos de tu viaje y consulta las opciones disponibles. El descuento se aplica automáticamente al acceder desde Viajan2Juntos.</p>
          </Reveal>
          <Reveal delay={0.08}><IatiHorizontalWidget /></Reveal>
          <p className="insurance-check-note"><Check /> Comprueba que el 5% de descuento aparece reflejado antes de finalizar el pago.</p>
        </div>
      </section>

      <section className="insurance-faq">
        <div className="section-shell insurance-faq-grid">
          <Reveal><span className="eyebrow">Preguntas claras</span><h2>Antes de contratar.</h2></Reveal>
          <div>{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="insurance-closing">
        <Reveal>
          <IatiBrand className="iati-brand-centered iati-brand-on-dark" label="Contratación directa con" />
          <span>Una decisión pequeña antes de salir</span>
          <h2>Viaja por la historia, no por los imprevistos.</h2>
          <a className="button button-light" href={IATI_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer" data-analytics-event="affiliate_click" data-analytics-label="iati_landing_final">
            Ver opciones con un 5% de descuento <ArrowRight />
          </a>
          <small>Contratación y asistencia gestionadas directamente por IATI. Revisa las condiciones de la póliza elegida.</small>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  )
}
