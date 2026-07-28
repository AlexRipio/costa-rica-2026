'use client'

import { geoMercator, geoPath } from 'd3-geo'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { feature } from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import { useMemo, useRef } from 'react'
import type { Destination } from '@/src/data/tripData'

type CountryFeature = GeoJSON.Feature<GeoJSON.Geometry, { name?: string }> & { id?: string | number }

export function StoryMap({ destinations }: { destinations: Destination[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, margin: '-15%' })
  const reduceMotion = useReducedMotion()
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

  return (
    <div className="story-map" ref={ref}>
      <div className="map-grid" />
      <span className="map-coordinates map-coordinates-top">10.2736° N</span>
      <span className="map-coordinates map-coordinates-bottom">84.0739° W</span>
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
          <g
            className="route-map-marker"
            style={{
              opacity: reduceMotion || visible ? 1 : 0,
              transitionDelay: `${0.25 + index * 0.22}s`,
            }}
            key={destination.id}
          >
            <circle className="route-marker-halo" cx={x} cy={y} r="23" />
            <circle className="route-marker-core" cx={x} cy={y} r="16" />
            <text textAnchor="middle" x={x} y={y + 5}>{index + 1}</text>
          </g>
        ))}
      </svg>
      <div className="story-map-legend" aria-label="Paradas de la ruta">
        {points.map(({ destination }, index) => (
          <div key={destination.id}>
            <span>{index + 1}</span>
            <strong>{destination.name.split(' / ')[0]}</strong>
            <small>{destination.dates}</small>
          </div>
        ))}
      </div>
      <div className="map-watermark">COSTA RICA</div>
    </div>
  )
}
