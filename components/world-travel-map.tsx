'use client'

import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { MapPin, Maximize2, X } from 'lucide-react'
import Link from 'next/link'
import { trips } from '@/data/site'

type CountryFeature = GeoJSON.Feature<GeoJSON.Geometry, { name?: string }> & { id?: string | number }

export function WorldTravelMap() {
  const [activeCountryId, setActiveCountryId] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const expandedCanvasRef = useRef<HTMLDivElement>(null)

  const countries = useMemo(
    () =>
      feature(
        world as unknown as Parameters<typeof feature>[0],
        (world as unknown as { objects: { countries: Parameters<typeof feature>[1] } }).objects.countries,
      ) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, { name?: string }>,
    [],
  )

  const countryGroups = useMemo(() => {
    const grouped = new Map<string, {
      id: string
      name: string
      accent: string
      coordinates: [number, number]
      trips: typeof trips
    }>()

    trips.forEach((trip) => {
      const current = grouped.get(trip.mapId)
      if (current) {
        const total = current.trips.length
        current.coordinates = [
          (current.coordinates[0] * total + trip.mapCoordinates[0]) / (total + 1),
          (current.coordinates[1] * total + trip.mapCoordinates[1]) / (total + 1),
        ]
        current.trips.push(trip)
        return
      }

      grouped.set(trip.mapId, {
        id: trip.mapId,
        name: trip.countryGroup,
        accent: trip.accent,
        coordinates: trip.mapCoordinates,
        trips: [trip],
      })
    })

    return Array.from(grouped.values())
  }, [])

  const countryById = useMemo(
    () => new Map(countryGroups.map((country) => [country.id, country])),
    [countryGroups],
  )
  const projection = useMemo(
    () => geoNaturalEarth1().fitExtent([[18, 18], [982, 512]], countries),
    [countries],
  )
  const path = useMemo(() => geoPath(projection), [projection])
  const activeCountry = activeCountryId ? countryById.get(activeCountryId) : undefined

  useEffect(() => {
    if (!expanded) return
    const previousOverflow = document.body.style.overflow
    const centerMapFrame = window.requestAnimationFrame(() => {
      const canvas = expandedCanvasRef.current
      if (canvas && window.matchMedia('(max-width: 760px)').matches) {
        canvas.scrollLeft = (canvas.scrollWidth - canvas.clientWidth) / 2
      }
    })
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.cancelAnimationFrame(centerMapFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [expanded])

  const renderMap = (isExpanded = false) => (
    <div
      className={`world-map-canvas ${isExpanded ? 'world-map-canvas-expanded' : ''}`}
      ref={isExpanded ? expandedCanvasRef : undefined}
    >
      <svg role="img" aria-label="Mapa mundial con nuestros países visitados" viewBox="0 0 1000 530">
        <defs>
          <pattern id={isExpanded ? 'map-dots-expanded' : 'map-dots'} width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" opacity=".13" />
          </pattern>
        </defs>
        <rect width="1000" height="530" rx={isExpanded ? 18 : 30} fill={`url(#${isExpanded ? 'map-dots-expanded' : 'map-dots'})`} />
        <g>
          {countries.features.map((country, index) => {
            const countryFeature = country as CountryFeature
            const id = String(countryFeature.id ?? '')
            const group = countryById.get(id)
            return (
              <path
                className={`world-country ${group ? 'visited' : ''} ${activeCountryId === id ? 'selected' : ''}`}
                d={path(country) ?? undefined}
                fill={group?.accent}
                key={`${id}-${index}`}
                onClick={() => group && setActiveCountryId(id)}
                onKeyDown={(event) => {
                  if (group && (event.key === 'Enter' || event.key === ' ')) setActiveCountryId(id)
                }}
                role={group ? 'button' : undefined}
                tabIndex={group ? 0 : -1}
                aria-label={group ? `Abrir ${group.name}, ${group.trips.length} ${group.trips.length === 1 ? 'viaje' : 'viajes'}` : undefined}
              />
            )
          })}
        </g>
        <g className="travel-map-markers" aria-label="Países visitados">
          {countryGroups.map((country) => {
            const point = projection(country.coordinates)
            if (!point) return null
            const selected = activeCountryId === country.id
            return (
              <g
                className={`travel-map-marker country-cluster ${selected ? 'selected' : ''}`}
                key={country.id}
                transform={`translate(${point[0]} ${point[1]})`}
                onClick={() => setActiveCountryId(country.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') setActiveCountryId(country.id)
                }}
                role="button"
                tabIndex={0}
                aria-label={`Abrir ${country.name}, ${country.trips.length} ${country.trips.length === 1 ? 'viaje' : 'viajes'}`}
              >
                <circle className="marker-wave" r={selected ? 20 : 15} style={{ fill: country.accent }} />
                <circle className="marker-core" r={country.trips.length > 1 ? 10 : 8} style={{ fill: country.accent }} />
                {country.trips.length > 1 && (
                  <text className="marker-number marker-count" textAnchor="middle" y="4">{country.trips.length}</text>
                )}
              </g>
            )
          })}
        </g>
      </svg>

      {activeCountry && (
        <div className="map-active-card map-country-card" style={{ '--trip-accent': activeCountry.accent } as CSSProperties}>
          <button className="map-card-close" onClick={() => setActiveCountryId(null)} type="button" aria-label="Cerrar información">
            <X size={17} />
          </button>
          <span><MapPin size={15} /> País visitado</span>
          <strong>{activeCountry.name}</strong>
          <small>{activeCountry.trips.length} {activeCountry.trips.length === 1 ? 'guía disponible' : 'viajes para explorar'}</small>
          <div className="map-country-links">
            {activeCountry.trips.map((trip) => (
              <Link href={`/viajes/${trip.slug}`} key={trip.slug}>
                <span>{trip.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="world-map-card">
      <div className="world-map-toolbar">
        <div>
          <span className="eyebrow">Nuestro mundo</span>
          <h3>Explora el mapa sin perderte entre etiquetas</h3>
          <p>{countryGroups.length} países · {trips.length} viajes</p>
        </div>
        <button className="map-expand-button" onClick={() => setExpanded(true)} type="button">
          <Maximize2 size={18} /> Ampliar mapa
        </button>
      </div>

      {renderMap()}

      <p className="map-note">
        Los países coloreados ya forman parte del blog. Pulsa una zona o un punto; si hay varios viajes, podrás elegirlos en la tarjeta.
      </p>

      {expanded && createPortal(
        <div className="world-map-modal" role="dialog" aria-modal="true" aria-label="Mapa de viajes ampliado">
          <div className="world-map-modal-panel">
            <div className="world-map-modal-head">
              <div>
                <span className="eyebrow">Atlas Viajan2Juntos</span>
                <strong>El mundo, con espacio para explorarlo</strong>
              </div>
              <button onClick={() => setExpanded(false)} type="button" aria-label="Cerrar mapa ampliado">
                <X size={22} />
              </button>
            </div>
            {renderMap(true)}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
