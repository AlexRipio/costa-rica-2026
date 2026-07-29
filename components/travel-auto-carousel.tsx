'use client'

import { ArrowRight, Pause, Play } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { costaRicaGuides } from '@/src/data/costaRicaGuides'
import { images } from '@/src/data/images'
import { initialTripData } from '@/src/data/tripData'

export function TravelAutoCarousel() {
  const scroller = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      const element = scroller.current
      if (!element) return
      const card = element.querySelector<HTMLElement>('.travel-carousel-card')
      const step = (card?.offsetWidth ?? 300) + 16
      const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - step
      element.scrollTo({ left: atEnd ? 0 : element.scrollLeft + step, behavior: 'smooth' })
    }, 3800)
    return () => window.clearInterval(timer)
  }, [playing])

  return (
    <div className="travel-carousel-shell">
      <div className="travel-carousel-controls">
        <span>Desliza o deja que avance solo</span>
        <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pausar carrusel' : 'Reproducir carrusel'}>
          {playing ? <Pause /> : <Play />}
        </button>
      </div>
      <div className="travel-auto-carousel" ref={scroller}>
        {initialTripData.destinations.map((destination) => {
          const guide = costaRicaGuides.find((item) => item.destinationId === destination.id)
          const image = images[destination.image]
          return (
            <Link className="travel-carousel-card" href={`/viajes/costa-rica-2026/${guide?.slug}`} key={destination.id}>
              <img src={image.url} alt={image.alt} />
              <span>{guide?.bestFor}</span>
              <div><strong>{guide?.title}</strong><ArrowRight /></div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
