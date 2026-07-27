'use client'

import {
  BedDouble,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Heart,
  History,
  MapPin,
  Navigation,
  Phone,
  Plane,
  RefreshCw,
  Route,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { LiveTravelState } from '@/data/live-types'
import { statusCopy } from '@/data/live-types'

function clock(now: Date, timeZone: string) {
  try {
    return new Intl.DateTimeFormat('es-ES', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(now)
  } catch {
    return new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(now)
  }
}

function updatedLabel(value: string, now: Date) {
  if (!value) return 'Aún sin actualizaciones'
  const minutes = Math.max(0, Math.round((now.getTime() - new Date(value).getTime()) / 60_000))
  if (minutes < 1) return 'Actualizado ahora mismo'
  if (minutes === 1) return 'Actualizado hace 1 minuto'
  if (minutes < 60) return `Actualizado hace ${minutes} minutos`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Actualizado hace ${hours} h`
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(
    new Date(value),
  )
}

function mapUrl(state: LiveTravelState) {
  if (state.latitude === null || state.longitude === null) return ''
  const padding = 0.12
  return `https://www.openstreetmap.org/export/embed.html?bbox=${state.longitude - padding}%2C${state.latitude - padding}%2C${state.longitude + padding}%2C${state.latitude + padding}&layer=mapnik&marker=${state.latitude}%2C${state.longitude}`
}

export function FamilyLiveView({ initialState }: { initialState: LiveTravelState }) {
  const [state, setState] = useState(initialState)
  const [now, setNow] = useState(() => new Date())
  const [refreshing, setRefreshing] = useState(false)

  async function refresh() {
    setRefreshing(true)
    try {
      const response = await fetch('/api/familia/state', { cache: 'no-store' })
      if (response.ok) setState(await response.json())
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    const clockTimer = window.setInterval(() => setNow(new Date()), 60_000)
    const liveTimer = window.setInterval(refresh, 30_000)
    return () => {
      window.clearInterval(clockTimer)
      window.clearInterval(liveTimer)
    }
  }, [])

  const status = statusCopy[state.status]
  const liveMap = mapUrl(state)

  return (
    <main className="parent-live-page">
      <header className="parent-live-header">
        <Link href="/" className="parent-live-brand">
          <span className="logo-symbol" />
          <span>Viajan2Juntos</span>
        </Link>
        <div className="parent-private-label">
          <ShieldCheck />
          Zona privada
        </div>
      </header>

      <section className={`parent-status-hero ${state.active ? 'is-active' : 'is-home'}`}>
        <div className="parent-status-top">
          <span className="parent-live-pill">
            <i />
            {state.active ? 'Viaje en directo' : 'Próximamente'}
          </span>
          <button className="parent-refresh" type="button" onClick={refresh} disabled={refreshing}>
            <RefreshCw className={refreshing ? 'spin' : ''} />
            Actualizar
          </button>
        </div>
        <span className="parent-trip-name">{state.tripName}</span>
        <h1>{status.label}</h1>
        <p>{state.message || status.reassurance}</p>
        <div className="parent-updated">
          <CheckCircle2 />
          {updatedLabel(state.updatedAt, now)}
        </div>
      </section>

      {state.active ? (
        <>
          <section className="parent-now-grid">
            <article className="parent-big-card parent-current-card">
              <div className="parent-card-kicker">
                <Navigation />
                Ahora
              </div>
              <h2>{state.currentPlace || 'En ruta'}</h2>
              <p>{state.currentActivity || status.reassurance}</p>
            </article>
            <article className="parent-big-card parent-next-card">
              <div className="parent-card-kicker">
                <Route />
                Después
              </div>
              <h2>{state.nextActivity || 'Actualizaremos el siguiente paso'}</h2>
              {state.nextTime && <p><Clock3 /> {state.nextTime}</p>}
            </article>
          </section>

          <section className="parent-map-section">
            <div className="parent-section-heading">
              <div>
                <span>Ubicación compartida</span>
                <h2>Dónde estamos</h2>
              </div>
              {state.latitude !== null && <strong><i /> Ubicación reciente</strong>}
            </div>
            {liveMap ? (
              <div className="parent-live-map">
                <iframe title={`Ubicación en ${state.currentPlace}`} src={liveMap} loading="lazy" />
                <div><MapPin /> {state.currentPlace || 'Posición compartida'}</div>
              </div>
            ) : (
              <div className="parent-map-empty">
                <MapPin />
                <h3>No estamos compartiendo el GPS ahora mismo</h3>
                <p>La actividad y el lugar escritos arriba son la referencia más reciente.</p>
              </div>
            )}
          </section>

          <section className="parent-details-grid">
            <article className="parent-detail-card">
              <BedDouble />
              <span>Alojamiento actual</span>
              <h3>{state.hotelName || 'Pendiente de actualizar'}</h3>
              <div className="parent-detail-actions">
                {state.hotelPhone && <a href={`tel:${state.hotelPhone}`}><Phone /> Llamar</a>}
                {state.hotelUrl && <a href={state.hotelUrl} target="_blank" rel="noreferrer">Abrir hotel <ExternalLink /></a>}
              </div>
            </article>
            <article className="parent-detail-card">
              <Plane />
              <span>Vuelo</span>
              <h3>{state.flightNumber || 'Sin vuelo activo'}</h3>
              {state.flightUrl && <a className="parent-flight-link" href={state.flightUrl} target="_blank" rel="noreferrer">
                Seguir el vuelo <ExternalLink />
              </a>}
            </article>
          </section>
        </>
      ) : (
        <section className="parent-home-message">
          <Heart />
          <h2>Ahora mismo estamos en casa.</h2>
          <p>Cuando activemos el próximo viaje, este mismo enlace mostrará dónde estamos, el plan del momento y el alojamiento.</p>
        </section>
      )}

      <section className="parent-time-strip">
        <div><span>Hora en {state.timeZoneLabel || 'destino'}</span><strong>{clock(now, state.timeZone)}</strong></div>
        <div><span>Hora en España</span><strong>{clock(now, 'Europe/Madrid')}</strong></div>
      </section>

      <footer className="parent-live-footer">
        <p><ShieldCheck /> Si no contestamos, probablemente estamos conduciendo, sin cobertura o disfrutando de la actividad.</p>
        <Link href="/familia/viajes"><History /> Consultar viajes anteriores</Link>
      </footer>
    </main>
  )
}
