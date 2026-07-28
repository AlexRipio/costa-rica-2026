'use client'

import { motion, useMotionValue, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { useEffect, useRef } from 'react'

function StoryLine({
  children,
  progress,
  range,
  lead = false,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number, number]
  lead?: boolean
}) {
  const opacity = useTransform(progress, range, lead ? [1, 1, 0.12] : [0.08, 1, 0.12])
  const y = useTransform(progress, range, lead ? [0, 0, -65] : [80, 0, -65])
  const scale = useTransform(progress, range, lead ? [1, 1, 0.96] : [0.92, 1, 0.96])
  const blur = useTransform(progress, range, lead ? ['blur(0px)', 'blur(0px)', 'blur(8px)'] : ['blur(12px)', 'blur(0px)', 'blur(8px)'])

  return <motion.span style={{ opacity, y, scale, filter: blur }}>{children}</motion.span>
}

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null)
  const scrollYProgress = useMotionValue(0)
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 210])
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1.12, 0.85])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const element = ref.current
      if (!element) return
      const start = element.offsetTop
      const distance = Math.max(element.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max((window.scrollY - start) / distance, 0), 1)
      scrollYProgress.set(progress)
    }
    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [scrollYProgress])

  return (
    <section className="scroll-story" ref={ref} aria-label="Nuestra forma de viajar">
      <div className="scroll-story-sticky">
        <motion.div className="scroll-story-ring" style={{ rotate: ringRotate, scale: ringScale }} />
        <div className="scroll-story-kicker">Nuestra forma de guardar el mundo</div>
        <h2>
          <StoryLine progress={scrollYProgress} range={[0, 0.16, 0.38]} lead>Viajamos.</StoryLine>
          <StoryLine progress={scrollYProgress} range={[0.26, 0.48, 0.68]}>Nos perdemos.</StoryLine>
          <StoryLine progress={scrollYProgress} range={[0.56, 0.78, 1]}>Lo recordamos juntos.</StoryLine>
        </h2>
        <div className="scroll-story-index"><span>01</span><i /><span>03</span></div>
      </div>
    </section>
  )
}
