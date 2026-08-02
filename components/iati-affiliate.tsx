import { ArrowRight, BadgePercent, Check, ShieldCheck } from 'lucide-react'
import { IATI_AFFILIATE_URL, getInsuranceEditorial } from '@/src/lib/iati'
import { Reveal } from './reveal'

type EditorialCardProps = {
  slug: string
  scope: 'internacional' | 'nacional'
  destination: string
  variant?: 'light' | 'dark'
}

export function IatiEditorialCard({ slug, scope, destination, variant = 'light' }: EditorialCardProps) {
  const editorial = getInsuranceEditorial(slug, scope)

  return (
    <section className={`iati-editorial-section iati-editorial-${variant}`} id="seguro">
      <div className="section-shell">
        <Reveal className="iati-editorial-card">
          <div className="iati-editorial-heading">
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
