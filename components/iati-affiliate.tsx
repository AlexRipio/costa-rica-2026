import type { ReactNode } from 'react'
import { ArrowRight, BadgePercent, Check, ShieldCheck } from 'lucide-react'
import { IATI_AFFILIATE_URL, getInsuranceEditorial } from '@/src/lib/iati'
import { IatiBrand } from './iati-brand'
import { Reveal } from './reveal'

type EditorialCardProps = {
  slug: string
  scope: 'internacional' | 'nacional'
  destination: string
  variant?: 'light' | 'dark'
}

type ContextualTextProps = {
  text: string
  slug: string
}

const insuranceMentionPattern =
  /(seguro de viaje|viajar con seguro|viajar asegurad[oa]s?|asistencia m[eé]dica|repatriaci[oó]n)/gi

export function IatiContextualText({ text, slug }: ContextualTextProps) {
  const fragments: ReactNode[] = []
  let cursor = 0

  for (const match of text.matchAll(insuranceMentionPattern)) {
    const index = match.index ?? 0
    fragments.push(text.slice(cursor, index))
    fragments.push(
      <a
        className="iati-contextual-link"
        href={IATI_AFFILIATE_URL}
        target="_blank"
        rel="sponsored noopener noreferrer"
        data-analytics-event="affiliate_click"
        data-analytics-label={`iati_${slug}_contextual`}
        key={`${index}-${match[0]}`}
      >
        {match[0]}
      </a>,
    )
    cursor = index + match[0].length
  }

  if (cursor === 0) return text
  fragments.push(text.slice(cursor))
  return <>{fragments}</>
}

export function IatiSidebarCard({ slug, destination }: { slug: string; destination: string }) {
  return (
    <aside className="iati-sidebar-card" aria-label={`Seguro de viaje para ${destination}`}>
      <IatiBrand compact label="Seguro recomendado" />
      <span>Seguro de viaje</span>
      <strong>Viaja con IATI y consigue un 5% de descuento.</strong>
      <p>Se aplica automáticamente al entrar desde Viajan2Juntos. No necesitas ningún código.</p>
      <a
        href={IATI_AFFILIATE_URL}
        target="_blank"
        rel="sponsored noopener noreferrer"
        data-analytics-event="affiliate_click"
        data-analytics-label={`iati_${slug}_sidebar`}
      >
        Calcular mi seguro <ArrowRight aria-hidden="true" />
      </a>
      <small>Enlace de afiliado. Podemos recibir una comisión sin que tú pagues más.</small>
    </aside>
  )
}

export function IatiEditorialCard({ slug, scope, destination, variant = 'light' }: EditorialCardProps) {
  const editorial = getInsuranceEditorial(slug, scope)

  return (
    <section className={`iati-editorial-section iati-editorial-${variant}`} id="seguro">
      <div className="section-shell">
        <Reveal className="iati-editorial-card">
          <div className="iati-editorial-heading">
            <IatiBrand label="Nosotros viajamos con" />
            <span className="eyebrow"><ShieldCheck /> {editorial.eyebrow}</span>
            <h2>{editorial.title}</h2>
            <p>{editorial.body}</p>
          </div>
          <div className="iati-editorial-action">
            <div className="iati-discount-badge">
              <BadgePercent />
              <span><strong>5%</strong> de descuento automático</span>
            </div>
            <ul>
              {editorial.checks.map((item) => <li key={item}><Check />{item}</li>)}
            </ul>
            <a
              className="button iati-primary-cta"
              href={IATI_AFFILIATE_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              data-analytics-event="affiliate_click"
              data-analytics-label={`iati_${slug}_editorial`}
            >
              Calcular seguro para {destination} <ArrowRight />
            </a>
            <small>Entra desde este enlace, completa los datos y comprueba el descuento antes de pagar. No necesitas código.</small>
          </div>
          <p className="iati-affiliate-disclosure">
            Enlace de afiliado: si contratas, podemos recibir una comisión sin que pagues más. La recomendación sigue siendo nuestra.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function IatiLandingCta({ label, placement }: { label: string; placement: string }) {
  return (
    <a
      className="button iati-primary-cta"
      href="#cotiza"
      data-analytics-event="insurance_landing_cta"
      data-analytics-label={placement}
    >
      {label} <ArrowRight />
    </a>
  )
}
