import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, BedDouble, Binoculars, MapPinned, Utensils } from 'lucide-react'
import Link from 'next/link'
import { CostaRicaPlacesMap } from '@/components/costa-rica-places-map'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { costaRicaPlaceCategories, costaRicaSavedPlaces } from '@/src/data/costaRicaSavedPlaces'

export const metadata: Metadata = {
  title: 'Lugares recomendados de Costa Rica',
  description: 'Alojamientos, sodas, restaurantes y lugares guardados por Viajan2Juntos para preparar una ruta por Costa Rica.',
  alternates: { canonical: '/viajes/costa-rica-2026/lugares-recomendados' },
}

const categoryIcons = {
  Dormir: BedDouble,
  Comer: Utensils,
  'Ver y hacer': Binoculars,
}

const placeLandscapePhotos = {
  mountain: {
    src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=82',
    alt: 'Bosque tropical de montaña en Costa Rica',
  },
  arenal: {
    src: 'https://images.unsplash.com/photo-1639417443882-8d710bccf8b2?auto=format&fit=crop&w=1400&q=82',
    alt: 'Volcán Arenal entre la vegetación de Costa Rica',
  },
  cloudForest: {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=82',
    alt: 'Bosque verde y húmedo',
  },
  pacific: {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=82',
    alt: 'Costa tropical del Pacífico',
  },
  caribbean: {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=82',
    alt: 'Vegetación y costa del Caribe',
  },
  rainforest: {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=82',
    alt: 'Paisaje de selva tropical',
  },
} as const

function getPlacePhoto(place: (typeof costaRicaSavedPlaces)[number]) {
  if (place.image) return { src: place.image, alt: place.name }

  const zone = place.zone.toLowerCase()
  if (zone.includes('fortuna') || zone.includes('arenal') || zone.includes('bijagua') || zone.includes('poás')) return placeLandscapePhotos.arenal
  if (zone.includes('monteverde') || zone.includes('dota')) return placeLandscapePhotos.cloudForest
  if (zone.includes('santa teresa') || zone.includes('nicoya') || zone.includes('manuel antonio') || zone.includes('quepos') || zone.includes('uvita') || zone.includes('osa')) return placeLandscapePhotos.pacific
  if (zone.includes('puerto viejo') || zone.includes('caribe') || zone.includes('tortuguero')) return placeLandscapePhotos.caribbean
  if (zone.includes('alajuela') || zone.includes('bajos del toro')) return placeLandscapePhotos.mountain
  return placeLandscapePhotos.rainforest
}

export default function CostaRicaSavedPlacesPage() {
  return (
    <main className="saved-places-page">
      <SiteHeader />
      <section className="saved-places-hero">
        <Reveal className="section-shell saved-places-hero-grid">
          <div className="saved-places-hero-copy">
            <Link href="/viajes/costa-rica-2026"><ArrowLeft /> Volver a Costa Rica</Link>
            <span className="eyebrow">Nuestra lista de Costa Rica</span>
            <h1>Sitios que merece la pena guardar.</h1>
            <p>Primero están los alojamientos y restaurantes que probamos nosotros. Después, otros sitios que tenemos apuntados y que revisaríamos antes de una próxima ruta.</p>
          </div>
          <div className="saved-places-hero-card">
            <MapPinned />
            <strong>{costaRicaSavedPlaces.length}</strong>
            <span>sitios reunidos en el mapa</span>
            <p>Cuando añadamos un alojamiento, una soda o una parada nueva, aparecerá también en el mapa de la guía.</p>
          </div>
        </Reveal>
      </section>

      <nav className="saved-places-nav" aria-label="Categorías de lugares recomendados">
        <a href="#mapa-completo">Mapa completo</a>
        {costaRicaPlaceCategories.map((category) => <a href={`#${category.toLowerCase().replaceAll(' ', '-').replace('y-', '')}`} key={category}>{category}</a>)}
      </nav>

      <section className="saved-places-map-section section-shell" id="mapa-completo">
        <Reveal className="saved-places-map-intro">
          <span className="eyebrow">Todos juntos, de un vistazo</span>
          <h2>Ubica los destinos.</h2>
          <p>Explora el mapa libremente, encuentra tu ubicación y abre cualquier parada en Google Maps cuando quieras llegar hasta ella.</p>
        </Reveal>
        <CostaRicaPlacesMap showListLink={false} />
      </section>

      <section className="saved-places-content section-shell">
        {costaRicaPlaceCategories.map((category) => {
          const Icon = categoryIcons[category]
          const places = costaRicaSavedPlaces.filter((place) => place.category === category)
          const id = category.toLowerCase().replaceAll(' ', '-').replace('y-', '')
          return (
            <div className="saved-places-group" id={id} key={category}>
              <Reveal className="saved-places-heading">
                <Icon />
                <div><span className="eyebrow">{places.length} lugares</span><h2>{category}</h2></div>
              </Reveal>
              <div className="saved-places-grid">
                {places.map((place, index) => (
                  <Reveal delay={(index % 3) * 0.04} key={`${place.category}-${place.name}`}>
                    <a className="saved-place-card saved-place-card-with-image" href={place.mapUrl} target="_blank" rel="noopener noreferrer">
                      {(() => {
                        const photo = getPlacePhoto(place)
                        return (
                          <span className="saved-place-image">
                            <img src={photo.src} alt={photo.alt} loading="lazy" />
                          </span>
                        )
                      })()}
                      <span className="saved-place-body">
                        <span className="saved-place-meta"><span className={`saved-place-status status-${place.status.toLowerCase().replaceAll(' ', '-')}`}>{place.status}</span><small>{place.zone}</small></span>
                        <h3>{place.name}</h3>
                        <p>{place.note}</p>
                        <strong>Ver ficha en Google Maps <ArrowUpRight /></strong>
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <section className="saved-places-note">
        <Reveal className="section-shell">
          <MapPinned />
          <h2>Antes de reservar, échales un vistazo.</h2>
          <p>Comprueba las reseñas recientes, la ubicación, los horarios y el precio final. Si pone “guardado para valorar”, significa que todavía no lo hemos probado nosotros.</p>
          <Link className="button button-light" href="/viajes/costa-rica-2026">Seguir con la guía <ArrowUpRight /></Link>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  )
}
