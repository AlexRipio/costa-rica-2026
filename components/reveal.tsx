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
    <motion.div
      className={`v2-reveal ${className}`}
      initial={{ opacity: 0, y: 54, scale: 0.985, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.16, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
    >
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

export function KineticWords({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  const words = children.split(' ')

  return (
    <motion.span
      className={`kinetic-words ${className}`}
      aria-label={children}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.055 } },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="kinetic-word"
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 38, rotateX: -55, filter: 'blur(9px)' },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
