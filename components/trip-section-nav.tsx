'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

type TripSectionNavItem = {
  href: string
  label: string
  main?: boolean
}

type TripSectionNavProps = {
  ariaLabel: string
  items: TripSectionNavItem[]
}

export function TripSectionNav({ ariaLabel, items }: TripSectionNavProps) {
  const sectionItems = useMemo(() => items.filter((item) => item.href.startsWith('#')), [items])
  const [activeHref, setActiveHref] = useState(sectionItems[0]?.href ?? '')
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sections = sectionItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) return

    let ticking = false

    const updateActiveSection = () => {
      ticking = false

      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      const readingLine = scrollTop + (navRef.current?.offsetHeight ?? 52) + 128
      const current =
        sections
          .map((section) => ({
            id: section.id,
            distance: section.offsetTop - readingLine,
          }))
          .sort((a, b) => Math.abs(a.distance) - Math.abs(b.distance))[0] ?? { id: sections[0].id }

      setActiveHref(`#${current.id}`)
    }

    const requestUpdate = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    document.addEventListener('scroll', requestUpdate, { capture: true, passive: true })
    const refreshInterval = window.setInterval(requestUpdate, 350)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      document.removeEventListener('scroll', requestUpdate, { capture: true })
      window.clearInterval(refreshInterval)
    }
  }, [sectionItems])

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLAnchorElement>('a[aria-current="true"]')
    activeLink?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeHref])

  return (
    <nav className="trip-section-nav trip-section-nav-active" aria-label={ariaLabel} ref={navRef}>
      {items.map((item) => {
        const isAnchor = item.href.startsWith('#')
        const isActive = activeHref === item.href
        const className = item.main ? 'is-main' : undefined

        if (isAnchor) {
          return (
            <a
              aria-current={isActive ? 'true' : undefined}
              className={className}
              data-active={isActive ? 'true' : undefined}
              href={item.href}
              key={item.href}
              onClick={() => setActiveHref(item.href)}
            >
              {item.label}
            </a>
          )
        }

        return (
          <Link className={className} href={item.href} key={item.href}>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
