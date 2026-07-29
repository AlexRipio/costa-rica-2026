'use client'

import { ChevronDown, Compass, LockKeyhole, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Logo } from './logo'
import { trips, type Trip } from '@/data/site'

type CountryGroup = { country: string; trips: Trip[] }
type ContinentGroup = { continent: Trip['continent']; countries: CountryGroup[] }

const continentOrder: Trip['continent'][] = ['América', 'Europa', 'Asia', 'África']

const travelNavigation: ContinentGroup[] = continentOrder
  .map((continent) => {
    const countries = new Map<string, Trip[]>()
    trips.filter((trip) => trip.continent === continent).forEach((trip) => {
      countries.set(trip.countryGroup, [...(countries.get(trip.countryGroup) ?? []), trip])
    })
    return {
      continent,
      countries: [...countries].map(([country, countryTrips]) => ({ country, trips: countryTrips })),
    }
  })
  .filter((group) => group.countries.length)

export function SiteHeader({
  overlay = false,
}: {
  overlay?: boolean
  showTripYears?: boolean
  showCostaRicaSections?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [tripsOpen, setTripsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', close)
    }
  }, [open])

  const closeDrawer = () => setOpen(false)

  return (
    <>
      <header className={`site-header ${overlay ? 'site-header-overlay' : ''}`}>
        <div className="nav-shell">
          <Logo light={overlay} />
          <div className="header-caption">Guías, rutas y recuerdos de Andrea & Alejandro</div>
          <button className="menu-toggle menu-toggle-visible" type="button" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu />
            <span>Menú</span>
          </button>
        </div>
      </header>

      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={closeDrawer} />
      <aside className={`nav-drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Menú principal">
        <div className="drawer-head">
          <span>Explorar Viajan2Juntos</span>
          <button type="button" onClick={closeDrawer} aria-label="Cerrar menú"><X /></button>
        </div>

        <div className="drawer-scroll-area">
          <nav aria-label="Navegación principal">
            <Link className="drawer-main-link" href="/" onClick={closeDrawer}>Inicio</Link>

            <div className="drawer-main-row">
              <Link className="drawer-main-link" href="/viajes" onClick={closeDrawer}>Viajes</Link>
              <button
                className="drawer-expand-button"
                type="button"
                onClick={() => setTripsOpen((value) => !value)}
                aria-expanded={tripsOpen}
                aria-controls="drawer-travel-tree"
                aria-label={tripsOpen ? 'Ocultar destinos' : 'Mostrar destinos'}
              >
                <ChevronDown className={tripsOpen ? 'rotated' : ''} />
              </button>
            </div>

            <div className={`drawer-travel-tree ${tripsOpen ? 'open' : ''}`} id="drawer-travel-tree">
              <Link className="drawer-all-trips" href="/viajes" onClick={closeDrawer}>
                <span>Ver el atlas completo</span><small>Todos los viajes en una página</small>
              </Link>

              {travelNavigation.map((continent) => (
                <details className="drawer-continent" key={continent.continent}>
                  <summary>
                    <span>{continent.continent}</span>
                    <small>{continent.countries.length} {continent.countries.length === 1 ? 'país' : 'países'}</small>
                    <ChevronDown />
                  </summary>
                  <div className="drawer-continent-content">
                    {continent.countries.map((country) => (
                      <details className="drawer-country" key={country.country} open={country.trips.length === 1}>
                        <summary>
                          <span>{country.country}</span>
                          <small>{country.trips.length} {country.trips.length === 1 ? 'guía' : 'viajes'}</small>
                          <ChevronDown />
                        </summary>
                        <div className="drawer-country-trips">
                          {country.trips.map((trip) => (
                            <Link href={`/viajes/${trip.slug}`} onClick={closeDrawer} key={trip.slug}>
                              <img src={trip.image.url} alt="" />
                              <span>
                                <strong>{trip.title}</strong>
                                <small>{trip.status}</small>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <Link className="drawer-main-link" href="/#mapa" onClick={closeDrawer}>Mapa del mundo</Link>
            <Link className="drawer-main-link" href="/nosotros" onClick={closeDrawer}>Conócenos</Link>
          </nav>

          <div className="drawer-family">
            <LockKeyhole />
            <div><span>Acceso privado</span><strong>Zona Familia</strong></div>
            <Link href="/familia" onClick={closeDrawer}>Entrar</Link>
          </div>
          <div className="drawer-signoff"><Compass /> Dos personas, una brújula y muchas historias.</div>
        </div>
      </aside>
    </>
  )
}
