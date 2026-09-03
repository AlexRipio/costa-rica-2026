import { ArrowUpRight, Wifi } from 'lucide-react'

export const holaflyAffiliateUrl = 'https://holafly.sjv.io/c/7542907/3856277/24764'

type HolaflyAffiliateCardProps = {
  compact?: boolean
}

export function HolaflyAffiliateCard({ compact = false }: HolaflyAffiliateCardProps) {
  return (
    <aside className={`holafly-affiliate-card ${compact ? 'holafly-affiliate-card-compact' : ''}`}>
      <Wifi aria-hidden="true" />
      <div>
        <span className="eyebrow">Conexión durante el viaje</span>
        <h3>Internet desde que aterrizas.</h3>
        <p>
          Nosotros viajamos con una eSIM de Holafly. Si te encaja, usa el código{' '}
          <strong>2JUNTOS</strong> para tener un <strong>5% de descuento</strong>.
        </p>
      </div>
      <a href={holaflyAffiliateUrl} target="_blank" rel="sponsored noopener noreferrer">
        Ver eSIM para Costa Rica <ArrowUpRight aria-hidden="true" />
      </a>
      <small>
        Enlace de afiliación: si compras desde aquí, podemos recibir una comisión sin que el precio cambie para ti.
      </small>
    </aside>
  )
}
