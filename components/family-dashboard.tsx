'use client'

import {
  ArrowUpRight,
  ArrowLeft,
  CalendarDays,
  Clock3,
  ExternalLink,
  Hotel as HotelIcon,
  LogOut,
  MapPin,
  Navigation,
  Phone,
  Plane,
  Route,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { Destination, FlightLeg, Hotel, TripDay } from '@/src/data/tripData'
import { getFamilyMoment } from '@/data/family-live'

function clock(now: Date, timeZone: string) {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(now)
}

function mapUrl(destination?: Destination) {
  const [lat, lon] = destination?.coordinates ?? [9.9281, -84.0907]
  const padding = 0.18
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lon - padding}%2C${lat - padding}%2C${lon + padding}%2C${lat + padding}&layer=mapnik&marker=${lat}%2C${lon}`
}

export function FamilyDashboard({
  days,
  destinations,
  hotels,
  flights,
}: {
  days: TripDay[]
  destinations: Destination[]
  hotels: Hotel[]
  flights: FlightLeg[]
}) {
  const [now, setNow] = useState(() => new Date())
  const moment = useMemo(
    () => getFamilyMoment(now, days, destinations, hotels, flights),
    [now, days, destinations, hotels, flights],
  )

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const status =
    moment.phase === 'before'
      ? 'El viaje todavía no ha empezado'
      : moment.phase === 'after'
        ? 'Viaje finalizado'
        : 'En ruta ahora'
  const hotel = moment.hotel
  const flight = moment.flight

  return (
    <div className="family-dashboard">
      <header className="family-dashboard-header">
        <div>
          <Link className="family-back-link" href="/familia/viajes"><ArrowLeft /> Todos los viajes</Link>
          <span className="eyebrow">Costa Rica 2026 · Archivo familiar</span>
          <h1>Viaje finalizado</h1>
          <p>La ruta completa sigue disponible para consultar alojamientos, vuelos y lo que hicimos cada día.</p>
        </div>
        <form action="/api/familia/logout" method="post">
          <button className="logout-button" type="submit">
            <LogOut size={16} /> Salir
          </button>
        </form>
      </header>

      <section className="family-now">
        <div className="family-now-copy">
          <span className="live-pill">
            <i /> {status}
          </span>
          <p className="family-day-label">Día {moment.day.day} · {moment.day.dateLabel}</p>
          <h2>{moment.day.destination}</h2>
          <p>{moment.day.summary}</p>
          <div className="now-activity">
            <Clock3 />
            <div>
              <span>Plan de referencia</span>
              <strong>{moment.day.schedule[0]}</strong>
            </div>
          </div>
        </div>
        <div className="family-clock-panel">
          <div>
            <span>Costa Rica</span>
            <strong>{clock(now, 'America/Costa_Rica')}</strong>
          </div>
          <div>
            <span>España</span>
            <strong>{clock(now, 'Europe/Madrid')}</strong>
          </div>
          <small>La hora se actualiza automáticamente cada minuto.</small>
        </div>
      </section>

      <section className="family-map-grid">
        <div className="family-map">
          <iframe
            key={moment.destination?.id}
            title={`Mapa de ${moment.destination?.name ?? moment.day.destination}`}
            src={mapUrl(moment.destination)}
            loading="lazy"
          />
          <div className="map-current-card">
            <Navigation size={18} />
            <div>
              <span>Punto previsto</span>
              <strong>{moment.destination?.name ?? moment.day.destination}</strong>
            </div>
          </div>
        </div>
        <div className="family-schedule-card">
          <div className="family-card-title">
            <CalendarDays />
            <div>
              <span>Hoy</span>
              <h3>Plan del día</h3>
            </div>
          </div>
          <ol>
            {moment.day.schedule.map((entry, index) => (
              <li className={index === 0 ? 'active' : ''} key={entry}>
                <span>{index + 1}</span>
                {entry}
              </li>
            ))}
          </ol>
          {moment.day.transfers.length > 0 && (
            <div className="transfer-note">
              <Route size={17} /> {moment.day.transfers.join(' · ')}
            </div>
          )}
        </div>
      </section>

      <section className="family-card-grid">
        <article className="family-info-card hotel-info-card">
          <div className="family-card-title">
            <HotelIcon />
            <div>
              <span>Alojamiento</span>
              <h3>{hotel?.name ?? 'Sin hotel activo'}</h3>
            </div>
          </div>
          {hotel ? (
            <>
              <p>
                <MapPin size={15} /> {hotel.address}
              </p>
              <p>
                <CalendarDays size={15} /> Entrada {hotel.checkIn.replace('2026-', '').replace(' ', ' · ')} · salida{' '}
                {hotel.checkOut.replace('2026-', '').replace(' ', ' · ')}
              </p>
              <div className="family-card-actions">
                <a href={hotel.link} target="_blank" rel="noreferrer">
                  Abrir mapa <ExternalLink size={14} />
                </a>
                {hotel.phone.startsWith('+') ? (
                  <a href={`tel:${hotel.phone}`}>
                    <Phone size={14} /> Llamar
                  </a>
                ) : (
                  <span>
                    <Phone size={14} /> Teléfono en la ficha
                  </span>
                )}
              </div>
            </>
          ) : (
            <p>Hoy es un día de vuelo o traslado final. El mapa y el plan superior son la mejor referencia.</p>
          )}
        </article>

        <article className="family-info-card flight-info-card">
          <div className="family-card-title">
            <Plane />
            <div>
              <span>Vuelos</span>
              <h3>{flight ? `${flight.operator} ${flight.flightNumber}` : 'Sin vuelo activo'}</h3>
            </div>
          </div>
          {flight ? (
            <>
              <div className="flight-route-row">
                <div>
                  <span>Salida</span>
                  <strong>{flight.from}</strong>
                  <small>{flight.departLocal}</small>
                </div>
                <Plane />
                <div>
                  <span>Llegada</span>
                  <strong>{flight.to}</strong>
                  <small>{flight.arriveLocal}</small>
                </div>
              </div>
              <a className="flight-tracker" href={flight.trackerUrl} target="_blank" rel="noreferrer">
                Seguir en FlightRadar24 <ArrowUpRight size={15} />
              </a>
            </>
          ) : (
            <p>En este momento no hay ningún vuelo próximo o en curso.</p>
          )}
        </article>

        <article className="family-info-card calm-info-card">
          <div className="family-card-title">
            <ShieldCheck />
            <div>
              <span>Para estar tranquilos</span>
              <h3>Si no contestamos</h3>
            </div>
          </div>
          <p>
            Probablemente estaremos conduciendo, sin cobertura, dentro de una actividad o simplemente disfrutando del
            viaje con el móvil guardado.
          </p>
          <p className="privacy-copy">
            Esta zona es privada. El punto mostrado sigue el itinerario previsto y no comparte ubicación GPS permanente.
          </p>
        </article>
      </section>
    </div>
  )
}
