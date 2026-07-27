'use client'

import { ChevronDown, Clock3, MapPin, Route } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import type { TripDay } from '@/src/data/tripData'

export function TripTimeline({ days }: { days: TripDay[] }) {
  const [openDay, setOpenDay] = useState(days[0]?.id)
  const reduceMotion = useReducedMotion()

  return (
    <div className="trip-timeline">
      {days.map((day) => {
        const open = openDay === day.id
        return (
          <article className={`timeline-day ${open ? 'open' : ''}`} key={day.id}>
            <button
              className="timeline-trigger"
              type="button"
              onClick={() => setOpenDay(open ? '' : day.id)}
              aria-expanded={open}
            >
              <span className="day-number">{String(day.day).padStart(2, '0')}</span>
              <span className="day-date">{day.dateLabel}</span>
              <span className="day-heading">
                <strong>{day.title}</strong>
                <small>
                  <MapPin size={13} /> {day.destination}
                </small>
              </span>
              <ChevronDown className="day-chevron" size={21} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  className="timeline-detail"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="timeline-copy">
                    <p>{day.summary}</p>
                    <div className="timeline-meta">
                      <span>
                        <Route size={15} /> {day.transfers[0] || 'Día sin traslados'}
                      </span>
                      <span>
                        <Clock3 size={15} /> {day.schedule.length} momentos previstos
                      </span>
                    </div>
                  </div>
                  <ol className="day-schedule">
                    {day.schedule.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}
