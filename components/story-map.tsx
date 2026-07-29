'use client'

import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap } from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import type { Destination } from '@/src/data/tripData'

const routeStages: Record<string, { day: number; days: string; summary: string }> = {
  alajuela: {
    day: 1,
    days: 'Días 1–2',
    summary: 'Llegada, primera noche y cataratas de Bajos del Toro.',
  },
  arenal: {
    day: 2,
    days: 'Días 2–4',
    summary: 'La Fortuna, volcán Arenal, catarata y puentes colgantes.',
  },
  monteverde: {
    day: 5,
    days: 'Días 5–6',
    summary: 'Bosque nuboso, paseo nocturno y tirolinas.',
  },
  'santa-teresa': {
    day: 7,
    days: 'Días 7–11',
    summary: 'Ferry, playas del Pacífico, surf y Montezuma.',
  },
  'manuel-antonio': {
    day: 12,
    days: 'Días 12–14',
    summary: 'Playas, cascadas y Parque Nacional Manuel Antonio.',
  },
  'puerto-viejo': {
    day: 15,
    days: 'Días 15–17',
    summary: 'Puerto Viejo, Cahuita, Punta Uva y regreso a San José.',
  },
}

export function StoryMap({ destinations }: { destinations: Destination[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const [activeId, setActiveId] = useState('')

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

      const coordinates = destinations.map(
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

      destinations.forEach((destination, index) => {
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
  }, [destinations])

  const activeDestination = destinations.find((destination) => destination.id === activeId)
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
        <strong>Explora la ruta</strong>
        <span>Mueve el mapa, amplía o pulsa una parada.</span>
      </div>
      <div
        className="real-route-map"
        ref={containerRef}
        role="region"
        aria-label="Mapa cartográfico interactivo de la ruta por Costa Rica"
      />

      {activeDestination && activeStage && (
        <div className="story-map-selection" aria-live="polite">
          <span>{activeStage.days}</span>
          <strong>{activeDestination.name.split(' / ')[0]}</strong>
          <p>{activeStage.summary}</p>
          <a
            href={`#day-${activeStage.day}`}
            onClick={(event) => {
              event.preventDefault()
              window.location.hash = `day-${activeStage.day}`
              window.setTimeout(() => {
                const target = document.getElementById(`day-${activeStage.day}`)
                if (!target) return
                window.scrollTo({
                  behavior: 'auto',
                  left: 0,
                  top: target.getBoundingClientRect().top + window.scrollY - 96,
                })
              }, 40)
            }}
          >
            Ver estos días <span aria-hidden="true">↓</span>
          </a>
        </div>
      )}

      <div className="story-map-legend" aria-label="Paradas de la ruta">
        {destinations.map((destination, index) => (
          <button
            type="button"
            className={activeId === destination.id ? 'active' : ''}
            onClick={() => selectDestination(destination)}
            key={destination.id}
          >
            <span>{index + 1}</span>
            <strong>{destination.name.split(' / ')[0]}</strong>
            <small>{routeStages[destination.id]?.days}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
