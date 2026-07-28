'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const revealSelector = [
  '.hero-memory-strip',
  '.hero-year-mark',
  '.journey-card',
  '.trip-index-card',
  '.coming-trip-card',
  '.about-value-grid > div',
  '.about-blog-grid > div',
  '.about-trip-years > div',
  '.stat-item',
  '.next-trip-banner',
  '.map-shell',
].join(',')

const depthSelector = [
  '.journal-hero-image',
  '.journey-card > a',
  '.trip-index-image',
  '.couple-photo-real',
  '.about-hero',
  '.about-real-portrait',
  '.about-candid-photo',
].join(',')

export function MotionExperience() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/familia') || pathname.startsWith('/actualizar')) return

    const root = document.documentElement
    const body = document.body
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    body.classList.add('motion-enhanced')

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))
    revealTargets.forEach((element, index) => {
      if (element.classList.contains('v2-reveal')) return
      element.classList.add('scroll-reveal-target')
      element.style.setProperty('--reveal-order', String(index % 4))
    })

    const depthTargets = Array.from(document.querySelectorAll<HTMLElement>(depthSelector))
    depthTargets.forEach((element) => element.classList.add('parallax-media'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -7% 0px' },
    )

    revealTargets.forEach((element) => observer.observe(element))

    let frame = 0
    const update = () => {
      frame = 0
      const scrollTop = window.scrollY
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      root.style.setProperty('--page-progress', String(Math.min(Math.max(scrollTop / max, 0), 1)))
      body.classList.toggle('has-scrolled', scrollTop > 36)

      depthTargets.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.bottom < -160 || rect.top > window.innerHeight + 160) return
        const center = rect.top + rect.height / 2
        const normalized = (center - window.innerHeight / 2) / window.innerHeight
        const travel = Math.max(-34, Math.min(34, normalized * -30))
        element.style.setProperty('--parallax-y', `${travel}px`)
      })

      const hero = document.querySelector<HTMLElement>('.journal-hero')
      if (hero) {
        const heroProgress = Math.min(Math.max(scrollTop / Math.max(hero.offsetHeight, 1), 0), 1)
        hero.style.setProperty('--hero-scroll', String(heroProgress))
      }
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
      body.classList.remove('motion-enhanced', 'has-scrolled')
      root.style.removeProperty('--page-progress')
      revealTargets.forEach((element) => {
        element.classList.remove('scroll-reveal-target', 'is-visible')
        element.style.removeProperty('--reveal-order')
      })
      depthTargets.forEach((element) => {
        element.classList.remove('parallax-media')
        element.style.removeProperty('--parallax-y')
      })
    }
  }, [pathname])

  if (pathname.startsWith('/familia') || pathname.startsWith('/actualizar')) return null

  return (
    <>
      <div className="page-progress" aria-hidden="true" />
      <div className="motion-grain" aria-hidden="true" />
    </>
  )
}
