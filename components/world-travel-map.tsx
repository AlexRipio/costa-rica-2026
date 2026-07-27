'use client'

import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import { useMemo, useState, type CSSProperties } from 'react'
import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { trips } from '@/data/site'

type CountryFeature = GeoJSON.Feature<GeoJSON.Geometry, { name?: string }> & { id?: string | number }

export function WorldTravelMap() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const tripById = useMemo(() => new Map(trips.map((trip) => [trip.mapId, trip])), [])
  const countries = useMemo(
    () =>
      feature(
        world as unknown as Parameters<typeof feature>[0],
        (world as unknown as { objects: { countries: Parameters<typeof feature>[1] } }).objects.countries,
      ) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, { name?: string }>,
    [],
  )
  const projection = useMemo(
    () => geoNaturalEarth1().fitExtent([[18, 18], [982, 512]], countries),
    [countries],
  )
  const path = useMemo(() => geoPath(projection), [projection])
  const activeTrip = activeId ? tripById.get(activeId) : undefined

  return (
    <div className="world-map-card">
      <div className="world-map-toolbar">
        <div><span className="eyebrow">Nuestro mundo</span><h3>Los lugares que ya forman parte de nosotros</h3></div>
        <div className="map-legend" aria-label="Viajes del mapa">
          {trips.map((trip) => (
            <button className={activeId === trip.mapId ? 'active' : ''} key={trip.mapId} onClick={() => setActiveId(trip.mapId)} type="button">
              <i style={{ background: trip.accent }} />{trip.country} <small>{trip.year}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="world-map-canvas">
        <svg role="img" aria-label="Mapa mundial con nuestros países visitados" viewBox="0 0 1000 530">
          <defs><pattern id="map-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor" opacity=".13" /></pattern></defs>
          <rect width="1000" height="530" rx="30" fill="url(#map-dots)" />
          <g>
            {countries.features.map((country, index) => {
              const countryFeature = country as CountryFeature
              const id = String(countryFeature.id ?? '')
              const trip = tripById.get(id)
              return (
                <path
                  className={`world-country ${trip ? 'visited' : ''} ${activeId === id ? 'selected' : ''}`}
                  d={path(country) ?? undefined}
                  fill={trip?.accent}
                  key={`${id}-${index}`}
                  onClick={() => trip && setActiveId(id)}
                  tabIndex={trip ? 0 : -1}
                  onFocus={() => trip && setActiveId(id)}
                  aria-label={trip?.mapLabel}
                />
              )
            })}
          </g>
          <g className="travel-map-markers" aria-label="Destinos señalados">
            {trips.map((trip, index) => {
              const point = projection(trip.mapCoordinates)
              if (!point) return null
              const selected = activeId === trip.mapId
              return (
                <g
                  className={`travel-map-marker ${selected ? 'selected' : ''}`}
                  key={trip.mapId}
                  transform={`translate(${point[0]} ${point[1]})`}
                  onClick={() => setActiveId(trip.mapId)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') setActiveId(trip.mapId)
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Mostrar ${trip.mapLabel}`}
                >
                  <circle className="marker-wave" r={selected ? 18 : 14} style={{ fill: trip.accent }} />
                  <circle className="marker-core" r={8} style={{ fill: trip.accent }} />
                  <text className="marker-number" textAnchor="middle" y="3">{index + 1}</text>
                  <g className="marker-label" transform="translate(13 -23)">
                    <rect width={trip.country.length * 7.2 + 28} height="28" rx="14" />
                    <text x="14" y="18">{trip.country}</text>
                  </g>
                </g>
              )
            })}
          </g>
        </svg>
        {activeTrip && (
          <div className="map-active-card" style={{ '--trip-accent': activeTrip.accent } as CSSProperties}>
            <span><MapPin size={15} /> En nuestro mapa</span>
            <strong>{activeTrip.country}</strong>
            <small>{activeTrip.year} · {activeTrip.subtitle}</small>
            <Link href={`/viajes/${activeTrip.slug}`}>Abrir el viaje <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </div>
      <p className="map-note">Todos nuestros viajes están señalados. Pulsa un marcador para abrir su historia.</p>
    </div>
  )
}
