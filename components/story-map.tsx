'use client'

import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap } from 'leaflet'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCostaRicaRoute, type CostaRicaRouteDays } from '@/components/costa-rica-route-context'
import type { Destination } from '@/src/data/tripData'

type RouteStage = {
  days: Record<CostaRicaRouteDays, string>
  summary: string
  guide: string
}

const routeStages: Record<string, RouteStage> = {
  alajuela: {
    days: { 10: 'Día 1', 15: 'Días 1–2', 20: 'Días 1–2' },
    summary: 'Llegada, primera noche y cataratas de Bajos del Toro.',
    guide: 'alajuela-bajos-del-toro',
  },
  arenal: {
    days: { 10: 'Días 2–4', 15: 'Días 3–5', 20: 'Días 3–5' },
    summary: 'La Fortuna, volcán Arenal, catarata y puentes colgantes.',
    guide: 'la-fortuna-arenal',
  },
  monteverde: {
    days: { 10: 'Días 5–6', 15: 'Días 6–7', 20: 'Días 6–7' },
    summary: 'Bosque nuboso, paseo nocturno y tirolinas.',
    guide: 'monteverde',
  },
  'santa-teresa': {
    days: { 10: 'No incluida', 15: 'Días 8–11', 20: 'Días 8–12' },
    summary: 'Ferry, playas del Pacífico, surf y Montezuma.',
    guide: 'santa-teresa',
  },
  'manuel-antonio': {
    days: { 10: 'Días 7–9', 15: 'Días 12–14', 20: 'Días 13–15' },
    summary: 'Playas, cascadas y Parque Nacional Manuel Antonio.',
    guide: 'manuel-antonio',
  },
  'puerto-viejo': {
    days: { 10: 'No incluida', 15: 'No incluida', 20: 'Días 16–19' },
    summary: 'Puerto Viejo, Cahuita, Punta Uva y regreso a San José.',
    guide: 'puerto-viejo',
  },
}

const destinationIdsByDays: Record<CostaRicaRouteDays, string[]> = {
  10: ['alajuela', 'arenal', 'monteverde', 'manuel-antonio'],
  15: ['alajuela', 'arenal', 'monteverde', 'santa-teresa', 'manuel-antonio'],
  20: ['alajuela', 'arenal', 'monteverde', 'santa-teresa', 'manuel-antonio', 'puerto-viejo'],
}

export function StoryMap({ destinations }: { destinations: Destination[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const [activeId, setActiveId] = useState('')
  const { selectedDays } = useCostaRicaRoute()
  const visibleDestinations = useMemo(
    () => destinations.filter((destination) => destinationIdsByDays[selectedDays].includes(destination.id)),
    [destinations, selectedDays],
  )

  useEffect(() => {
    setActiveId('')
  }, [selectedDays])

  useEffect(() => {
    let cancelled = false

    void import('leaflet').then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
      }).addTo(map)

      const coordinates = visibleDestinations.map(
        (destination) => [destination.coordinates[0], destination.coordinates[1]] as [number, number],
      )

      L.polyline(coordinates, {
        color: '#ffffff',
        opacity: 0.92,
        weight: 8,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map)

      L.polyline(coordinates, {
        color: '#e9684e',
        opacity: 1,
        weight: 4,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map)

      visibleDestinations.forEach((destination, index) => {
        const marker = L.marker([destination.coordinates[0], destination.coordinates[1]], {
          icon: L.divIcon({
            className: 'route-map-div-icon',
            html: `<span>${index + 1}</span>`,
            iconAnchor: [18, 18],
            iconSize: [36, 36],
          }),
          keyboard: true,
          title: destination.name,
        }).addTo(map)

        marker.on('click', () => setActiveId(destination.id))
      })

      map.fitBounds(L.latLngBounds(coordinates), {
        animate: false,
        padding: [34, 34],
      })
      mapRef.current = map
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [visibleDestinations])

  const activeDestination = visibleDestinations.find((destination) => destination.id === activeId)
  const activeStage = activeDestination ? routeStages[activeDestination.id] : undefined

  const selectDestination = (destination: Destination) => {
    setActiveId(destination.id)
    mapRef.current?.setView(
      [destination.coordinates[0], destination.coordinates[1]],
      Math.max(mapRef.current.getZoom(), 8),
      { animate: false },
    )
  }

  return (
    <div className="story-map real-story-map">
      <div className="real-map-heading">
        <strong>Ruta de {selectedDays} días</strong>
        <span>{visibleDestinations.length} paradas · mueve el mapa, amplía o pulsa un punto.</span>
      </div>
      <div
        className="real-route-map"
        ref={containerRef}
        role="region"
        aria-label={`Mapa cartográfico interactivo de la ruta de ${selectedDays} días por Costa Rica`}
      />

      {activeDestination && activeStage && (
        <div className="story-map-selection" aria-live="polite">
          <span>{activeStage.days[selectedDays]}</span>
          <strong>{activeDestination.name.split(' / ')[0]}</strong>
          <p>{activeStage.summary}</p>
          <a href={`/viajes/costa-rica-2026/${activeStage.guide}`}>
            Ver guía del lugar <span aria-hidden="true">→</span>
          </a>
        </div>
      )}

      <div className="story-map-legend" aria-label={`Paradas de la ruta de ${selectedDays} días`}>
        {visibleDestinations.map((destination, index) => (
          <button
            type="button"
            className={activeId === destination.id ? 'active' : ''}
            onClick={() => selectDestination(destination)}
            key={destination.id}
          >
            <span>{index + 1}</span>
            <strong>{destination.name.split(' / ')[0]}</strong>
            <small>{routeStages[destination.id]?.days[selectedDays]}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
