'use client'

import { ArrowUpRight, BedDouble, Binoculars, MapPinned, Utensils } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
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

export function CostaRicaPlacesMap() {
  const [category, setCategory] = useState<CostaRicaPlaceCategory>('Dormir')
  const places = useMemo(
    () => costaRicaSavedPlaces.filter((place) => place.category === category),
    [category],
  )
  const [selectedName, setSelectedName] = useState(costaRicaSavedPlaces[0]?.name ?? '')
  const selectedPlace = places.find((place) => place.name === selectedName) ?? places[0]
  const mapQuery = selectedPlace ? `${selectedPlace.name}, ${selectedPlace.zone}, Costa Rica` : 'Costa Rica'

  const selectCategory = (nextCategory: CostaRicaPlaceCategory) => {
    setCategory(nextCategory)
    const firstPlace = costaRicaSavedPlaces.find((place) => place.category === nextCategory)
    setSelectedName(firstPlace?.name ?? '')
  }

  const selectPlace = (name: string) => {
    setSelectedName(name)
    trackAnalyticsEvent('costa_rica_saved_place_select', {
      place: name,
      category,
      interaction_source: 'homepage_map',
    })
  }

  return (
    <div className="costa-places-map-card">
      <div className="costa-places-map-frame">
        <iframe
          key={mapQuery}
          title={`Mapa de ${selectedPlace?.name ?? 'lugares recomendados de Costa Rica'}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {selectedPlace && (
          <div className="costa-places-map-current">
            <small>{selectedPlace.zone}</small>
            <strong>{selectedPlace.name}</strong>
            <a
              href={selectedPlace.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="open_google_maps_place"
              data-analytics-label={selectedPlace.name}
            >
              Abrir y guardar en Google Maps <ArrowUpRight />
            </a>
          </div>
        )}
      </div>

      <div className="costa-places-map-browser">
        <div className="costa-places-map-heading">
          <span><MapPinned /> {costaRicaSavedPlaces.length} sitios guardados</span>
          <h3>Busca un sitio y míralo en el mapa.</h3>
          <p>Empieza por los lugares en los que estuvimos. También dejamos separados los que tenemos apuntados para otra ruta.</p>
        </div>

        <div className="costa-places-map-tabs" aria-label="Filtrar lugares del mapa">
          {costaRicaPlaceCategories.map((item) => {
            const Icon = categoryIcons[item]
            return (
              <button
                className={category === item ? 'active' : ''}
                type="button"
                onClick={() => selectCategory(item)}
                aria-pressed={category === item}
                key={item}
              >
                <Icon /> {item}
              </button>
            )
          })}
        </div>

        <div className="costa-places-map-list" aria-label={`Lugares para ${category.toLowerCase()}`}>
          {places.map((place) => (
            <button
              className={selectedPlace?.name === place.name ? 'active' : ''}
              type="button"
              onClick={() => selectPlace(place.name)}
              key={`${place.category}-${place.name}`}
            >
              <span><strong>{place.name}</strong><small>{place.zone} · {place.status}</small></span>
              <MapPinned />
            </button>
          ))}
        </div>

        <Link className="costa-places-map-all" href="/viajes/costa-rica-2026/lugares-recomendados">
          Ver la lista completa y nuestras notas <ArrowUpRight />
        </Link>
      </div>
    </div>
  )
}
