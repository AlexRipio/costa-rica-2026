'use client'

import { ChevronDown, Compass, LockKeyhole, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Logo } from './logo'
import { trips } from '@/data/site'

export function SiteHeader({
  overlay = false,
  showTripYears = true,
}: {
  overlay?: boolean
  showTripYears?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [tripsOpen, setTripsOpen] = useState(true)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', close)
    }
  }, [open])

  return (
    <>
      <header className={`site-header ${overlay ? 'site-header-overlay' : ''}`}>
        <div className="nav-shell">
          <Logo light={overlay} />
          <div className="header-caption">Historias, rutas y recuerdos de Andrea & Alejandro</div>
          <button className="menu-toggle menu-toggle-visible" type="button" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu />
            <span>Menú</span>
          </button>
        </div>
      </header>

      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`nav-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <span>Explorar Viajan2Juntos</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X /></button>
        </div>
        <nav aria-label="Navegación principal">
          <Link className="drawer-main-link" href="/" onClick={() => setOpen(false)}>Inicio</Link>
          <button className="drawer-main-link drawer-trip-toggle" type="button" onClick={() => setTripsOpen((value) => !value)} aria-expanded={tripsOpen}>
            Viajes <ChevronDown className={tripsOpen ? 'rotated' : ''} />
          </button>
          <div className={`drawer-trips ${tripsOpen ? 'open' : ''}`}>
            {trips.map((trip) => (
              <Link href={`/viajes/${trip.slug}`} key={trip.slug} onClick={() => setOpen(false)}>
                <img src={trip.image.url} alt="" />
                <span>
                  <strong>{trip.country}</strong>
                  <small>{showTripYears ? `${trip.year} · ` : ''}{trip.status}</small>
                </span>
              </Link>
            ))}
            <Link className="all-trips-link" href="/viajes" onClick={() => setOpen(false)}>Ver todos los viajes</Link>
          </div>
          <Link className="drawer-main-link" href="/#mapa" onClick={() => setOpen(false)}>Mapa del mundo</Link>
          <Link className="drawer-main-link" href="/nosotros" onClick={() => setOpen(false)}>Conócenos</Link>
        </nav>
        <div className="drawer-family">
          <LockKeyhole />
          <div><span>Acceso privado</span><strong>Zona Familia</strong></div>
          <Link href="/familia" onClick={() => setOpen(false)}>Entrar</Link>
        </div>
        <div className="drawer-signoff"><Compass /> Dos personas, una brújula y muchas historias.</div>
      </aside>
    </>
  )
}
