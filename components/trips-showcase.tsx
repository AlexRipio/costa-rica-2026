'use client'

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, ChevronDown, MapPin, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Trip } from '@/data/site'
import styles from './trips-showcase.module.css'

const continents = ['Todos', 'América', 'Europa', 'Asia', 'África'] as const
type ContinentFilter = (typeof continents)[number]

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')

function DestinationPanel({ trip, index }: { trip: Trip; index: number }) {
  const panelRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const copyY = useTransform(scrollYProgress, [0, 1], [34, -34])

  useEffect(() => {
    const video = videoRef.current
    const panel = panelRef.current
    if (!video || !panel || reduceMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(panel)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <motion.article
      className={styles.panel}
      id={`destino-${trip.slug}`}
      ref={panelRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      <motion.div className={styles.media} style={reduceMotion ? undefined : { y: mediaY }} aria-hidden="true">
        <img
          src={trip.image.url}
          alt=""
          loading={index < 2 ? 'eager' : 'lazy'}
          draggable={false}
        />
        {trip.heroVideo && !reduceMotion && (
          <video
            className={styles.video}
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={trip.heroVideo.poster}
          >
            <source media="(max-width: 720px)" src={trip.heroVideo.mobile} type="video/mp4" />
            <source src={trip.heroVideo.desktop} type="video/mp4" />
          </video>
        )}
      </motion.div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true" />

      <Link className={styles.panelLink} href={`/viajes/${trip.slug}`} aria-label={`Entrar en el viaje a ${trip.title}`}>
        <div className={styles.topline}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{trip.continent}</span>
          <span>{trip.year}</span>
        </div>

        <motion.div className={styles.copy} style={reduceMotion ? undefined : { y: copyY }}>
          <span className={styles.location}><MapPin /> {trip.territory}</span>
          <h2>{trip.title}</h2>
          <p>{trip.subtitle}</p>
        </motion.div>

        <div className={styles.footerline}>
          <div>
            <span>{trip.duration}</span>
            <i aria-hidden="true" />
            <span>{trip.status}</span>
          </div>
          <span className={styles.enter}>Entrar en el viaje <ArrowUpRight /></span>
        </div>
      </Link>
    </motion.article>
  )
}

export function TripsShowcase({ trips }: { trips: Trip[] }) {
  const [continent, setContinent] = useState<ContinentFilter>('Todos')
  const [query, setQuery] = useState('')
  const [jumpTarget, setJumpTarget] = useState('')

  const visibleTrips = useMemo(() => {
    const normalizedQuery = normalize(query.trim())
    return trips.filter((trip) => {
      const matchesContinent = continent === 'Todos' || trip.continent === continent
      const haystack = normalize(`${trip.title} ${trip.country} ${trip.territory} ${trip.subtitle}`)
      return matchesContinent && (!normalizedQuery || haystack.includes(normalizedQuery))
    })
  }, [continent, query, trips])

  useEffect(() => {
    if (!jumpTarget) return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`destino-${jumpTarget}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setJumpTarget('')
    })
    return () => window.cancelAnimationFrame(frame)
  }, [jumpTarget, visibleTrips])

  const jumpTo = (slug: string) => {
    if (!slug) return
    setContinent('Todos')
    setQuery('')
    setJumpTarget(slug)
  }

  return (
    <>
      <section className={styles.intro}>
        <div className={styles.introBackdrop} aria-hidden="true">
          <span>V</span><span>2</span><span>J</span>
        </div>
        <div className={styles.introInner}>
          <span className={styles.eyebrow}>El atlas de Viajan2Juntos</span>
          <h1>Viajes que se<br /><em>quedan contigo.</em></h1>
          <p>Recorre nuestro mapa de historias. Diez viajes, cuatro continentes y una guía construida desde lo que vivimos de verdad.</p>
          <a className={styles.discover} href="#explorar-destinos">Descubrir destinos <ArrowDown /></a>
        </div>
      </section>

      <section className={styles.explorer} id="explorar-destinos" aria-label="Buscar y filtrar destinos">
        <div className={styles.explorerInner}>
          <div className={styles.searchField}>
            <Search aria-hidden="true" />
            <label className={styles.srOnly} htmlFor="trip-search">Buscar un destino</label>
            <input
              id="trip-search"
              type="search"
              placeholder="Buscar país o ciudad"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Borrar búsqueda"><X /></button>}
          </div>

          <div className={styles.jumpField}>
            <label className={styles.srOnly} htmlFor="trip-jump">Ir a un destino</label>
            <select id="trip-jump" value="" onChange={(event) => jumpTo(event.target.value)}>
              <option value="">Ir a un destino</option>
              {trips.map((trip) => <option value={trip.slug} key={trip.slug}>{trip.title}</option>)}
            </select>
            <ChevronDown aria-hidden="true" />
          </div>

          <div className={styles.filters} aria-label="Filtrar por continente">
            {continents.map((item) => (
              <button
                className={continent === item ? styles.activeFilter : ''}
                type="button"
                key={item}
                onClick={() => setContinent(item)}
                aria-pressed={continent === item}
              >
                {item}
              </button>
            ))}
          </div>

          <p className={styles.count} aria-live="polite">
            {visibleTrips.length === 1 ? '1 destino' : `${visibleTrips.length} destinos`}
          </p>
        </div>
      </section>

      <section className={styles.list} aria-label="Destinos de Viajan2Juntos">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleTrips.map((trip) => (
            <DestinationPanel trip={trip} index={trips.indexOf(trip)} key={trip.slug} />
          ))}
        </AnimatePresence>
        {!visibleTrips.length && (
          <div className={styles.empty}>
            <span>Sin coordenadas para esa búsqueda</span>
            <h2>Ese destino todavía no está en nuestro mapa.</h2>
            <button type="button" onClick={() => { setQuery(''); setContinent('Todos') }}>Ver todos los viajes</button>
          </div>
        )}
      </section>
    </>
  )
}
