'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import type { Destination } from '@/src/data/tripData'

const positions = [
  [14, 30],
  [30, 16],
  [42, 34],
  [55, 67],
  [73, 54],
  [87, 28],
]

export function StoryMap({ destinations }: { destinations: Destination[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, margin: '-15%' })
  const reduceMotion = useReducedMotion()
  const points = destinations.map((destination, index) => ({
    destination,
    x: positions[index]?.[0] ?? 50,
    y: positions[index]?.[1] ?? 50,
  }))
  const route = points.map((point) => `${point.x},${point.y}`).join(' ')

  return (
    <div className="story-map" ref={ref}>
      <div className="map-grid" />
      <span className="map-coordinates map-coordinates-top">10.2736° N</span>
      <span className="map-coordinates map-coordinates-bottom">84.0739° W</span>
      <svg className="route-svg" viewBox="0 0 100 82" preserveAspectRatio="none" aria-hidden="true">
        <motion.polyline
          points={route}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.55"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : undefined}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
      </svg>
      {points.map(({ destination, x, y }, index) => (
        <motion.div
          className="map-stop"
          style={{ left: `${x}%`, top: `${y}%` }}
          key={destination.id}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
          animate={visible ? { opacity: 1, scale: 1 } : undefined}
          transition={{ delay: 0.25 + index * 0.22, type: 'spring', stiffness: 180 }}
        >
          <span>{index + 1}</span>
          <div>
            <strong>{destination.name.split(' / ')[0]}</strong>
            <small>{destination.dates}</small>
          </div>
        </motion.div>
      ))}
      <div className="map-watermark">COSTA RICA</div>
    </div>
  )
}
