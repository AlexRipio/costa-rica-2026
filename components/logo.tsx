import Link from 'next/link'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`logo ${light ? 'logo-light' : ''}`} href="/" aria-label="Viajan2Juntos, inicio">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path d="M8 34c8-18 24-25 32-18M10 34c8-5 18-4 27 2" />
          <circle cx="13" cy="31" r="3" />
          <circle cx="36" cy="17" r="3" />
        </svg>
      </span>
      <span>
        Viajan<span>2</span>Juntos
      </span>
    </Link>
  )
}
