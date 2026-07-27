'use client'

import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import { useMemo, useState, type CSSProperties } from 'react'
import { MapPin } from 'lucide-react'
import { trips } from '@/data/site'

type CountryFeature = GeoJSON.Feature<GeoJSON.Geometry, { name?: string }> & { id?: string | number }

export function WorldTravelMap() {
  const [activeId, setActiveId] = useState(trips[0].mapId)
  const tripById = useMemo(() => new Map(trips.map((trip) => [trip.mapId, trip])), [])
  const countries = useMemo(
    () =>
      feature(
        world as unknown as Parameters<typeof feature>[0],
        (world as unknown as { objects: { countries: Parameters<typeof feature>[1] } }).objects.countries,
      ) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, { name?: string }>,
    [],
  )
  const path = useMemo(() => geoPath(geoNaturalEarth1().fitExtent([[18, 18], [982, 512]], countries)), [countries])
  const activeTrip = tripById.get(activeId) ?? trips[0]

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
                  onMouseEnter={() => trip && setActiveId(id)}
                  tabIndex={trip ? 0 : -1}
                  onFocus={() => trip && setActiveId(id)}
                  aria-label={trip?.mapLabel}
                />
              )
            })}
          </g>
        </svg>
        <div className="map-active-card" style={{ '--trip-accent': activeTrip.accent } as CSSProperties}>
          <span><MapPin size={15} /> En nuestro mapa</span><strong>{activeTrip.country}</strong><small>{activeTrip.year} · {activeTrip.subtitle}</small>
        </div>
      </div>
      <p className="map-note">El mapa crecerá con cada nueva historia. Pulsa un país coloreado para recordarla.</p>
    </div>
  )
}
