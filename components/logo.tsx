import Link from 'next/link'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`logo ${light ? 'logo-light' : ''}`} href="/" aria-label="Viajan2Juntos, inicio">
      <span className="logo-mark" aria-hidden="true">
        <span className="logo-symbol" />
      </span>
      <span>
        Viajan<span>2</span>Juntos
      </span>
    </Link>
  )
}
