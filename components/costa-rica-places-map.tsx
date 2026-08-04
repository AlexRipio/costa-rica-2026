'use client'

import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet'
import { ArrowUpRight, BedDouble, Binoculars, LocateFixed, MapPinned, Utensils } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  costaRicaPlaceCategories,
  costaRicaSavedPlaces,
  type CostaRicaPlaceCategory,
} from '@/src/data/costaRicaSavedPlaces'
import { trackAnalyticsEvent } from '@/src/lib/analytics'

const categoryIcons = {
  Dormir: BedDouble,
  Comer: Utensils,
  'Ver y hacer': Binoculars,
}

type MapFilter = 'Todos' | CostaRicaPlaceCategory

export function CostaRicaPlacesMap({ showListLink = true }: { showListLink?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef(new Map<string, LeafletMarker>())
  const userLayerRef = useRef<{ remove: () => void } | null>(null)
  const [category, setCategory] = useState<MapFilter>('Todos')
  const [selectedName, setSelectedName] = useState('')
  const [locationState, setLocationState] = useState<'idle' | 'locating' | 'error'>('idle')
  const places = useMemo(
    () => category === 'Todos'
      ? costaRicaSavedPlaces
      : costaRicaSavedPlaces.filter((place) => place.category === category),
    [category],
  )
  const selectedPlace = costaRicaSavedPlaces.find((place) => place.name === selectedName)

  useEffect(() => {
    let cancelled = false

    void import('leaflet').then((L) => {
      if (cancelled || !containerRef.current) return

      mapRef.current?.remove()
      markersRef.current.clear()
      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map)

      places.forEach((place) => {
        const marker = L.marker([...place.coordinates], {
          icon: L.divIcon({
            className: `saved-place-map-icon marker-${place.category.toLowerCase().replaceAll(' ', '-').replace('y-', '')}`,
            html: '<span></span>',
            iconAnchor: [15, 30],
            iconSize: [30, 30],
          }),
          keyboard: true,
          title: place.name,
        }).addTo(map)

        marker.bindTooltip(place.name, { direction: 'top', offset: [0, -28] })
        marker.on('click', () => {
          setSelectedName(place.name)
          trackAnalyticsEvent('costa_rica_saved_place_select', {
            place: place.name,
            category: place.category,
            interaction_source: 'complete_map_marker',
          })
        })
        markersRef.current.set(place.name, marker)
      })

      const coordinates = places.map((place) => [...place.coordinates] as [number, number])
      if (coordinates.length > 0) {
        map.fitBounds(L.latLngBounds(coordinates), { animate: false, padding: [38, 38] })
      }
      mapRef.current = map
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [places])

  const selectCategory = (nextCategory: MapFilter) => {
    setCategory(nextCategory)
    setSelectedName('')
    setLocationState('idle')
  }

  const selectPlace = (name: string) => {
    const place = costaRicaSavedPlaces.find((item) => item.name === name)
    if (!place) return
    setSelectedName(name)
    const map = mapRef.current
    const marker = markersRef.current.get(name)
    map?.setView([...place.coordinates], Math.max(map.getZoom(), 14), { animate: true })
    marker?.openTooltip()
    trackAnalyticsEvent('costa_rica_saved_place_select', {
      place: name,
      category: place.category,
      interaction_source: 'complete_map_list',
    })
  }

  const locateUser = () => {
    if (!navigator.geolocation || !mapRef.current) {
      setLocationState('error')
      return
    }
    setLocationState('locating')
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const L = await import('leaflet')
        const map = mapRef.current
        if (!map) return
        userLayerRef.current?.remove()
        const layer = L.circleMarker([coords.latitude, coords.longitude], {
          radius: 9,
          color: '#ffffff',
          weight: 3,
          fillColor: '#2878ff',
          fillOpacity: 1,
        }).addTo(map).bindTooltip('Estás aquí', { permanent: true, direction: 'top' })
        userLayerRef.current = layer
        map.setView([coords.latitude, coords.longitude], 13, { animate: true })
        setLocationState('idle')
        trackAnalyticsEvent('costa_rica_map_use_location', { interaction_source: 'complete_map' })
      },
      () => setLocationState('error'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  return (
    <div className="costa-places-map-card">
      <div className="costa-places-map-frame">
        <div
          className="costa-places-leaflet-map"
          ref={containerRef}
          role="region"
          aria-label={`Mapa interactivo con ${places.length} lugares recomendados de Costa Rica`}
        />
        <button className="costa-places-locate" type="button" onClick={locateUser} disabled={locationState === 'locating'}>
          <LocateFixed /> {locationState === 'locating' ? 'Buscando…' : 'Mi ubicación'}
        </button>
        {locationState === 'error' && <span className="costa-places-location-error">Activa la ubicación del navegador para encontrarte en el mapa.</span>}
        {selectedPlace && (
          <div className="costa-places-map-current">
            <small>{selectedPlace.category} · {selectedPlace.zone}</small>
            <strong>{selectedPlace.name}</strong>
            <span>{selectedPlace.note}</span>
            <a
              href={selectedPlace.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="open_google_maps_place"
              data-analytics-label={selectedPlace.name}
            >
              Abrir este punto en Google Maps <ArrowUpRight />
            </a>
          </div>
        )}
      </div>

      <div className="costa-places-map-browser">
        <div className="costa-places-map-heading">
          <span><MapPinned /> {costaRicaSavedPlaces.length} sitios en un mismo mapa</span>
          <h3>Muévete por Costa Rica y descubre cada parada.</h3>
          <p>Todos los puntos aparecen juntos. Amplía, desplaza el mapa o pulsa un marcador para abrir su ficha en Google Maps.</p>
        </div>

        <div className="costa-places-map-tabs" aria-label="Filtrar lugares del mapa">
          <button className={category === 'Todos' ? 'active' : ''} type="button" onClick={() => selectCategory('Todos')} aria-pressed={category === 'Todos'}>
            <MapPinned /> Todos
          </button>
          {costaRicaPlaceCategories.map((item) => {
            const Icon = categoryIcons[item]
            return (
              <button className={category === item ? 'active' : ''} type="button" onClick={() => selectCategory(item)} aria-pressed={category === item} key={item}>
                <Icon /> {item}
              </button>
            )
          })}
        </div>

        <div className="costa-places-map-list" aria-label={`Lugares mostrados: ${category.toLowerCase()}`}>
          {places.map((place) => (
            <button className={selectedPlace?.name === place.name ? 'active' : ''} type="button" onClick={() => selectPlace(place.name)} key={`${place.category}-${place.name}`}>
              <span><strong>{place.name}</strong><small>{place.zone} · {place.category}</small></span>
              <MapPinned />
            </button>
          ))}
        </div>

        {showListLink && (
          <Link className="costa-places-map-all" href="/viajes/costa-rica-2026/lugares-recomendados">
            Ver la lista completa y nuestras notas <ArrowUpRight />
          </Link>
        )}
      </div>
    </div>
  )
}
