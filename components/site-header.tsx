'use client'

import { Menu, ShieldCheck, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from './logo'

const links = [
  { href: '/viajes', label: 'Viajes' },
  { href: '/#mapa', label: 'Mapa' },
  { href: '/#nosotros', label: 'Nosotros' },
]

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className={`site-header ${overlay ? 'site-header-overlay' : ''}`}>
      <div className="nav-shell">
        <Logo light={overlay} />
        <nav className="desktop-links" aria-label="Navegación principal">
          {links.map((link) => (
            <Link key={link.href} className={pathname === link.href ? 'active' : ''} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="family-link" href="/familia">
            <ShieldCheck size={16} />
            Familia
          </Link>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-links" aria-label="Navegación móvil">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/familia" onClick={() => setOpen(false)}>
            Zona Familia
          </Link>
        </nav>
      )}
    </header>
  )
}
