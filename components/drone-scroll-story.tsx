'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'

export function DroneScrollStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const videoScale = useTransform(scrollYProgress, [0, 0.48, 1], [1.12, 1, 1.06])
  const videoY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const copyY = useTransform(scrollYProgress, [0.18, 0.5, 0.82], [54, 0, -42])
  const copyOpacity = useTransform(scrollYProgress, [0.16, 0.34, 0.72, 0.88], [0, 1, 1, 0])
  const lineScale = useTransform(scrollYProgress, [0.25, 0.64], [0.2, 1])

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { rootMargin: '30% 0px 30% 0px', threshold: 0.01 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="drone-scroll-story"
      aria-label="Playa Negra, Puerto Viejo, vista desde el aire"
    >
      <div className="drone-scroll-sticky">
        <motion.video
          ref={videoRef}
          className="drone-scroll-video"
          style={{ scale: videoScale, y: videoY }}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/playa-negra-drone-poster.jpg"
          aria-hidden="true"
        >
          <source
            src="/media/playa-negra-drone-mobile.mp4"
            type="video/mp4"
            media="(max-width: 760px)"
          />
          <source src="/media/playa-negra-drone.mp4" type="video/mp4" />
        </motion.video>
        <div className="drone-scroll-shade" aria-hidden="true" />
        <motion.div
          className="drone-scroll-copy"
          style={{ y: copyY, opacity: copyOpacity }}
        >
          <span>Puerto Viejo · Caribe Sur</span>
          <h2>
            Playa Negra
            <em>desde el aire.</em>
          </h2>
          <p>Una toma de nuestro viaje, entre selva, arena volcánica y mar Caribe.</p>
          <motion.i style={{ scaleX: lineScale }} aria-hidden="true" />
        </motion.div>
        <span className="drone-scroll-credit">Imágenes propias · Playa Negra</span>
      </div>
    </section>
  )
}
