'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

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
  const activeLabel = sectionItems.find((item) => item.href === activeHref)?.label ?? sectionItems[0]?.label

  useEffect(() => {
    const sections = sectionItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`)
        }
      },
      {
        rootMargin: '-24% 0px -58% 0px',
        threshold: [0.08, 0.18, 0.32, 0.48],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionItems])

  return (
    <nav className="trip-section-nav trip-section-nav-active" aria-label={ariaLabel}>
      <div className="trip-section-current" aria-live="polite">
        <span>Leyendo ahora</span>
        <strong>{activeLabel}</strong>
      </div>
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
