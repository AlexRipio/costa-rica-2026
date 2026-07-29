'use client'

import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { trips } from '@/data/site'

const cardRanges = [
  { input: [0, .2, .36], opacity: [1, 1, 0], scale: [1, 1, .9], y: [0, 0, -55] },
  { input: [.22, .45, .67], opacity: [0, 1, 0], scale: [.88, 1, .92], y: [70, 0, -45] },
  { input: [.56, .8, 1], opacity: [0, 1, 1], scale: [.9, 1, 1], y: [70, 0, 0] },
]

const featuredTrips = ['costa-rica-2026', 'sri-lanka-2025', 'filipinas-2024']
  .map((slug) => trips.find((trip) => trip.slug === slug))
  .filter((trip): trip is (typeof trips)[number] => Boolean(trip))

function TravelChapterCard({
  index,
  progress,
  active,
  desktop,
}: {
  index: number
  progress: MotionValue<number>
  active: boolean
  desktop: boolean
}) {
  const trip = featuredTrips[index]
  const range = cardRanges[index]
  const opacity = useTransform(progress, range.input, range.opacity)
  const scale = useTransform(progress, range.input, range.scale)
  const y = useTransform(progress, range.input, range.y)

  return (
    <motion.article
      className={`travel-chapter-card travel-chapter-card-${index + 1}`}
      style={desktop ? { opacity, scale, y } : undefined}
      aria-hidden={desktop && !active}
    >
      <Link href={`/viajes/${trip.slug}`} tabIndex={desktop && !active ? -1 : 0}>
        <img src={trip.image.url} alt={trip.image.alt} />
        <span className="travel-chapter-shade" />
        <span className="travel-chapter-number">0{index + 1}</span>
        <div className="travel-chapter-copy">
          <small>{trip.status}</small>
          <h3>{trip.country}</h3>
          <p>{trip.subtitle}</p>
          <span className="travel-chapter-link">Abrir el viaje <ArrowRight size={18} /></span>
        </div>
      </Link>
    </motion.article>
  )
}

export function TravelChapters() {
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useMotionValue(0)
  const [active, setActive] = useState(0)
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 761px) and (prefers-reduced-motion: no-preference)')
    const syncMedia = () => setDesktop(media.matches)
    syncMedia()
    media.addEventListener('change', syncMedia)
    return () => media.removeEventListener('change', syncMedia)
  }, [])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1)
      const next = Math.min(Math.max((window.scrollY - section.offsetTop) / distance, 0), 1)
      progress.set(next)
      setActive(next < .32 ? 0 : next < .7 ? 1 : 2)
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [progress])

  const goToChapter = (index: number) => {
    const section = sectionRef.current
    if (!section) return
    const targets = [0, .46, .84]
    const distance = Math.max(section.offsetHeight - window.innerHeight, 1)
    window.scrollTo({ top: section.offsetTop + targets[index] * distance, behavior: 'smooth' })
  }

  return (
    <section className="travel-chapters" ref={sectionRef} aria-labelledby="travel-chapters-title">
      <div className="travel-chapters-sticky">
        <div className="travel-chapters-intro">
          <span className="eyebrow eyebrow-light">Historias en el mapa</span>
          <h2 id="travel-chapters-title">Tres historias.<br /><em>Un atlas que crece.</em></h2>
          <p>Empezamos por Filipinas, Sri Lanka y Costa Rica. El resto de nuestros viajes ya espera dentro del atlas.</p>
          <div className="travel-chapter-tabs" aria-label="Elegir viaje">
            {featuredTrips.map((trip, index) => (
              <button
                type="button"
                className={active === index ? 'is-active' : ''}
                onClick={() => goToChapter(index)}
                aria-pressed={active === index}
                key={trip.slug}
              >
                <span>0{index + 1}</span>{trip.country}
              </button>
            ))}
          </div>
        </div>
        <div className="travel-chapters-stage">
          {featuredTrips.map((trip, index) => (
            <TravelChapterCard
              index={index}
              progress={progress}
              active={active === index}
              desktop={desktop}
              key={trip.slug}
            />
          ))}
        </div>
        <div className="travel-chapters-progress" aria-hidden="true">
          <i style={{ transform: `scaleX(${(active + 1) / featuredTrips.length})` }} />
        </div>
      </div>
    </section>
  )
}
