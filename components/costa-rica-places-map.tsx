'use client'

import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet'
import { ArrowUpRight, BedDouble, Binoculars, LocateFixed, MapPinned, RotateCcw, Star, Utensils, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  costaRicaPlaceCategories,
  costaRicaSavedPlaces,
  type CostaRicaPlaceCategory,
} from '@/src/data/costaRicaSavedPlaces'
import { trackAnalyticsEvent } from '@/src/lib/analytics'
import { costaRicaGuideExtras, type PlaceRecommendation } from '@/src/data/costaRicaGuideExtras'

const categoryIcons = {
  Dormir: BedDouble,
  Comer: Utensils,
  'Ver y hacer': Binoculars,
}

type MapFilter = 'Todos' | CostaRicaPlaceCategory

const recommendationDetails = Object.values(costaRicaGuideExtras)
  .flatMap((guide) => [...guide.stayRecommendations, ...guide.eatRecommendations])
  .reduce((details, place) => details.set(place.name, place), new Map<string, PlaceRecommendation>())

const markerDrawings = {
  bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18v-7m16 7v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5m0-7V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3M4 16h16"/></svg>',
  soda: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11h16c-.4 5-3.1 8-8 8s-7.6-3-8-8Zm3-3c0-1 .7-2 1.8-3M12 8c0-1 .7-2 1.8-3M17 8c0-.8.5-1.5 1.2-2.2"/></svg>',
  cafe: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Zm11 2h2a2 2 0 0 1 0 4h-2M8 5c0-1 .7-1.5 1.4-2M12 5c0-1 .7-1.5 1.4-2"/></svg>',
  food: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v7m-3-7v4a3 3 0 0 0 6 0V3M7 10v11M16 3v18m0-18c3 2 4 5 4 9h-4"/></svg>',
  water: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16c2-2 4-2 6 0s4 2 6 0 4-2 5-1M4 20c2-2 4-2 6 0s4 2 6 0 4-2 5-1M12 3c2 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2-5 4-8Z"/></svg>',
  nature: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21v-8m0 4-4-3m4 1 4-3M6 13l6-10 6 10H6Z"/></svg>',
}

function getPlaceDrawing(name: string, category: CostaRicaPlaceCategory) {
  const detail = recommendationDetails.get(name)
  if (category === 'Dormir') return markerDrawings.bed
  if (detail?.category === 'Soda') return markerDrawings.soda
  if (detail?.category === 'Café y desayuno' || /café|coffee|choco|bakery/i.test(name)) return markerDrawings.cafe
  if (category === 'Comer') return markerDrawings.food
  if (/playa|río|terma|ballena/i.test(name)) return markerDrawings.water
  return markerDrawings.nature
}

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
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true,
        zoomSnap: .5,
        zoomDelta: .5,
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
            html: `<span>${getPlaceDrawing(place.name, place.category)}</span>`,
            iconAnchor: [19, 38],
            iconSize: [38, 38],
          }),
          keyboard: true,
          title: place.name,
        }).addTo(map)

        marker.bindTooltip(place.name, { direction: 'top', offset: [0, -28] })
        marker.on('click', () => {
          setSelectedName(place.name)
          map.flyTo([...place.coordinates], Math.max(map.getZoom(), 14.5), { animate: true, duration: .55 })
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
        map.fitBounds(L.latLngBounds(coordinates), { animate: false, padding: [54, 54], maxZoom: category === 'Todos' ? 8 : 11 })
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
    map?.flyTo([...place.coordinates], Math.max(map.getZoom(), 14.5), { animate: true, duration: .55 })
    marker?.openTooltip()
    trackAnalyticsEvent('costa_rica_saved_place_select', {
      place: name,
      category: place.category,
      interaction_source: 'complete_map_list',
    })
  }

  const resetMap = () => {
    const map = mapRef.current
    if (!map || places.length === 0) return
    map.fitBounds(places.map((place) => [...place.coordinates]), { animate: true, padding: [54, 54], maxZoom: category === 'Todos' ? 8 : 11 })
    setSelectedName('')
  }

  const selectedDetail = selectedPlace ? recommendationDetails.get(selectedPlace.name) : undefined

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
        <button className="costa-places-reset" type="button" onClick={resetMap} aria-label="Volver a ver todos los puntos">
          <RotateCcw /> Ver todos
        </button>
        {locationState === 'error' && <span className="costa-places-location-error">Activa la ubicación del navegador para encontrarte en el mapa.</span>}
        {selectedPlace && (
          <div className={`costa-places-map-current ${selectedPlace.image ? 'has-image' : ''}`}>
            {selectedPlace.image && <img src={selectedPlace.image} alt={`Foto de ${selectedPlace.name}`} />}
            <div className="costa-places-map-current-body">
              <button type="button" onClick={() => setSelectedName('')} aria-label="Cerrar ficha"><X /></button>
              <small>{selectedDetail?.category ?? selectedPlace.category} · {selectedPlace.zone}{selectedPlace.coordinatesApproximate ? ' · Zona orientativa' : ''}</small>
              <strong>{selectedPlace.name}</strong>
              <span>{selectedDetail?.text ?? selectedPlace.note}</span>
              {selectedPlace.coordinatesApproximate && <span className="costa-places-approximate">El marcador ubica la zona; abre Google Maps para ver la entrada exacta.</span>}
              <div className="costa-places-map-facts">
                {selectedDetail && <b>{selectedDetail.priceRange} <em>{selectedDetail.priceBasis}</em></b>}
                <a href={selectedPlace.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`Consultar la valoración actual de ${selectedPlace.name} en Google`}><Star /> Valoración actual en Google</a>
              </div>
              <a
                className="costa-places-map-google"
                href={selectedPlace.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="open_google_maps_place"
                data-analytics-label={selectedPlace.name}
              >
                Abrir ficha y cómo llegar <ArrowUpRight />
              </a>
            </div>
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
              <span><strong>{place.name}</strong><small>{place.zone} · {place.category}{place.coordinatesApproximate ? ' · zona orientativa' : ''}</small></span>
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
