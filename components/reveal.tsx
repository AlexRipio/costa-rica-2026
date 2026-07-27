'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}>
      {children}
    </motion.div>
  )
}

export function HeroMotion({ children }: { children: ReactNode }) {
  return <div className="hero-motion">{children}</div>
}

export function HeroLine({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return <div className={`hero-enter ${className}`} style={{ animationDelay: `${delay}s` }}>{children}</div>
}
