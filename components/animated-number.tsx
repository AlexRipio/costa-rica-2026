'use client'

import { useEffect, useRef, useState } from 'react'

export function AnimatedNumber({
  value,
  delay = 0,
}: {
  value: string
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [display, setDisplay] = useState(value.replace(/\d/g, '0'))
  const [active, setActive] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const target = Number.parseInt(value, 10)
    const width = value.length
    const format = (number: number) => String(number).padStart(width, '0')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Number.isNaN(target)) {
      setDisplay(value)
      return
    }

    let animationFrame = 0
    let delayTimer = 0
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started) return
        started = true
        setActive(true)
        observer.disconnect()

        delayTimer = window.setTimeout(() => {
          const start = performance.now()
          const duration = 1450

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            setDisplay(format(Math.round(target * eased)))
            if (progress < 1) animationFrame = window.requestAnimationFrame(tick)
          }

          animationFrame = window.requestAnimationFrame(tick)
        }, delay)
      },
      { threshold: 0.55 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      window.clearTimeout(delayTimer)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [delay, value])

  return (
    <strong className={`animated-number ${active ? 'is-counting' : ''}`} ref={ref} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </strong>
  )
}
