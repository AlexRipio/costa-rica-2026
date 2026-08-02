import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, BedDouble, Binoculars, MapPinned, Utensils } from 'lucide-react'
import Link from 'next/link'
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

export default function CostaRicaSavedPlacesPage() {
  return (
    <main className="saved-places-page">
      <SiteHeader />
      <section className="saved-places-hero">
        <Reveal className="section-shell saved-places-hero-grid">
          <div>
            <Link href="/viajes/costa-rica-2026"><ArrowLeft /> Volver a Costa Rica</Link>
            <span className="eyebrow">El mapa que sigue creciendo</span>
            <h1>Lugares que guardaríamos en Costa Rica.</h1>
            <p>Aquí reunimos nuestras elecciones reales y otros sitios concretos que queremos valorar. No todo lo guardado es una recomendación personal: cada ficha indica claramente qué probamos y qué sigue pendiente.</p>
          </div>
          <div className="saved-places-hero-card">
            <MapPinned />
            <strong>{costaRicaSavedPlaces.length}</strong>
            <span>lugares revisados y ordenados</span>
            <p>Cuando encontremos un alojamiento, una soda o una parada nueva, la añadiremos a esta colección.</p>
          </div>
        </Reveal>
      </section>

      <nav className="saved-places-nav" aria-label="Categorías de lugares recomendados">
        {costaRicaPlaceCategories.map((category) => <a href={`#${category.toLowerCase().replaceAll(' ', '-').replace('y-', '')}`} key={category}>{category}</a>)}
      </nav>

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
                    <a className="saved-place-card" href={place.mapUrl} target="_blank" rel="noopener noreferrer">
                      <div><span className={`saved-place-status status-${place.status.toLowerCase().replaceAll(' ', '-')}`}>{place.status}</span><small>{place.zone}</small></div>
                      <h3>{place.name}</h3>
                      <p>{place.note}</p>
                      <strong>Ver ficha en Google Maps <ArrowUpRight /></strong>
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
          <h2>Una lista útil, no una colección de nombres.</h2>
          <p>Antes de reservar, comprueba siempre reseñas recientes, ubicación exacta, horarios y precio final. Los lugares marcados como “guardado para valorar” todavía no forman parte de nuestra experiencia personal.</p>
          <Link className="button button-light" href="/viajes/costa-rica-2026">Seguir con la guía <ArrowUpRight /></Link>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  )
}
