'use client'

import { geoMercator, geoPath } from 'd3-geo'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { feature } from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import { useMemo, useRef, useState } from 'react'
import type { Destination } from '@/src/data/tripData'

type CountryFeature = GeoJSON.Feature<GeoJSON.Geometry, { name?: string }> & { id?: string | number }

const routeStages: Record<string, { anchor: string; days: string; summary: string }> = {
  alajuela: {
    anchor: '2026-07-09',
    days: 'Días 1–2',
    summary: 'Llegada, primera noche y cataratas de Bajos del Toro.',
  },
  arenal: {
    anchor: '2026-07-10',
    days: 'Días 2–4',
    summary: 'La Fortuna, volcán Arenal, catarata y puentes colgantes.',
  },
  monteverde: {
    anchor: '2026-07-13',
    days: 'Días 5–6',
    summary: 'Bosque nuboso, paseo nocturno y tirolinas.',
  },
  'santa-teresa': {
    anchor: '2026-07-15',
    days: 'Días 7–11',
    summary: 'Ferry, playas del Pacífico, surf y Montezuma.',
  },
  'manuel-antonio': {
    anchor: '2026-07-20',
    days: 'Días 12–14',
    summary: 'Playas, cascadas y Parque Nacional Manuel Antonio.',
  },
  'puerto-viejo': {
    anchor: '2026-07-23',
    days: 'Días 15–17',
    summary: 'Puerto Viejo, Cahuita, Punta Uva y regreso a San José.',
  },
}

export function StoryMap({ destinations }: { destinations: Destination[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, margin: '-15%' })
  const reduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState('')
  const geography = useMemo(() => {
    const countries = feature(
      world as unknown as Parameters<typeof feature>[0],
      (world as unknown as { objects: { countries: Parameters<typeof feature>[1] } }).objects.countries,
    ) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, { name?: string }>
    const costaRica = countries.features.find((country) => String((country as CountryFeature).id) === '188')
    if (!costaRica) return null
    const projection = geoMercator().fitExtent([[115, 42], [885, 465]], costaRica)
    return {
      outline: geoPath(projection)(costaRica) ?? '',
      projection,
    }
  }, [])
  const points = destinations.map((destination) => {
    const projected = geography?.projection([destination.coordinates[1], destination.coordinates[0]])
    return {
      destination,
      x: projected?.[0] ?? 500,
      y: projected?.[1] ?? 265,
    }
  })
  const route = points.map((point) => `${point.x},${point.y}`).join(' ')
  const activeDestination = destinations.find((destination) => destination.id === activeId)
  const activeStage = activeDestination ? routeStages[activeDestination.id] : undefined

  return (
    <div className={`story-map ${activeDestination ? 'has-selection' : ''}`} ref={ref}>
      <div className="map-grid" />
      <span className="map-coordinates map-coordinates-top">10.2736° N</span>
      <span className="map-coordinates map-coordinates-bottom">84.0739° W</span>
      <span className="story-map-hint">Pulsa una parada para abrir esos días</span>
      <svg className="route-svg" viewBox="330 60 570 420" role="img" aria-label="Mapa de Costa Rica con las seis paradas de nuestra ruta">
        <path className="costa-rica-outline" d={geography?.outline} />
        <motion.polyline
          className="costa-rica-route"
          points={route}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : undefined}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        {points.map(({ destination, x, y }, index) => (
          <a
            href={`#day-${routeStages[destination.id]?.anchor}`}
            aria-label={`${destination.name}. ${routeStages[destination.id]?.days}. Abrir itinerario`}
            onClick={(event) => {
              event.preventDefault()
              setActiveId(destination.id)
            }}
            key={destination.id}
          >
            <g
              className={`route-map-marker ${activeId === destination.id ? 'active' : ''}`}
              style={{
                opacity: reduceMotion || visible ? 1 : 0,
                transitionDelay: `${0.25 + index * 0.22}s`,
              }}
            >
              <circle className="route-marker-halo" cx={x} cy={y} r="25" />
              <circle className="route-marker-core" cx={x} cy={y} r="17" />
              <text textAnchor="middle" x={x} y={y + 5}>{index + 1}</text>
            </g>
          </a>
        ))}
      </svg>
      {activeDestination && activeStage && (
        <div className="story-map-selection">
          <span>{activeStage.days}</span>
          <strong>{activeDestination.name.split(' / ')[0]}</strong>
          <p>{activeStage.summary}</p>
          <a
            href={`#day-${activeStage.anchor}`}
            onClick={(event) => {
              event.preventDefault()
              window.location.hash = `day-${activeStage.anchor}`
              window.setTimeout(() => {
                document.getElementById(`day-${activeStage.anchor}`)?.scrollIntoView({
                  behavior: reduceMotion ? 'auto' : 'smooth',
                  block: 'start',
                })
              }, 420)
            }}
          >
            Ver estos días <span aria-hidden="true">↓</span>
          </a>
        </div>
      )}
      <div className="story-map-legend" aria-label="Paradas de la ruta">
        {points.map(({ destination }, index) => (
          <button
            type="button"
            className={activeId === destination.id ? 'active' : ''}
            onClick={() => setActiveId(destination.id)}
            key={destination.id}
          >
            <span>{index + 1}</span>
            <strong>{destination.name.split(' / ')[0]}</strong>
            <small>{routeStages[destination.id]?.days}</small>
          </button>
        ))}
      </div>
      <div className="map-watermark">COSTA RICA</div>
    </div>
  )
}
