'use client'

import { ChevronDown, MapPin } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { TripDay } from '@/src/data/tripData'

const publicDayCopy: Record<number, { title: string; story: string; highlights: string[] }> = {
  1: {
    title: 'Llegada a Costa Rica',
    story: 'Volamos hasta San José y hacemos una primera noche tranquila cerca del aeropuerto para empezar la ruta descansados.',
    highlights: ['Llegada a San José', 'Traslado corto hasta Alajuela', 'Cena sencilla y descanso'],
  },
  2: {
    title: 'Bajos del Toro y carretera a Arenal',
    story: 'Recogemos el 4x4 y estrenamos el viaje entre cataratas antes de continuar por carretera hacia La Fortuna.',
    highlights: ['Recogida del coche', 'Catarata del Toro o Blue Falls', 'Llegada a La Fortuna'],
  },
  3: {
    title: 'Catarata, volcán y aguas termales',
    story: 'Un día completo alrededor de Arenal: agua, senderos volcánicos y un final relajado entre aguas calientes.',
    highlights: ['Catarata La Fortuna', 'Parque Nacional Volcán Arenal', 'Termas de El Choyín'],
  },
  4: {
    title: 'Puentes colgantes y tarde tranquila',
    story: 'Nos adentramos en la selva por los puentes de Místico y dejamos la tarde libre para pasear y disfrutar de La Fortuna.',
    highlights: ['Puentes Colgantes Místico', 'Búsqueda de fauna', 'Paseo y descanso en La Fortuna'],
  },
  5: {
    title: 'De Arenal a Monteverde',
    story: 'Cambiamos el paisaje volcánico por el bosque nuboso en una carretera de montaña que ya forma parte de la aventura.',
    highlights: ['Ruta panorámica a Monteverde', 'Mirador al atardecer', 'Paseo nocturno por el bosque'],
  },
  6: {
    title: 'Bosque nuboso y tirolinas',
    story: 'Descubrimos Monteverde desde las alturas y caminamos entre la vegetación húmeda de uno de los bosques más especiales del país.',
    highlights: ['Tirolinas en Extremo Park', 'Bosque Nuboso de Monteverde', 'Tarde tranquila en Santa Elena'],
  },
  7: {
    title: 'Ferry hacia la península de Nicoya',
    story: 'Dejamos la montaña, cruzamos el golfo en ferry y terminamos el día frente al Pacífico en Santa Teresa.',
    highlights: ['Carretera hasta Puntarenas', 'Ferry a Paquera', 'Primer atardecer en Santa Teresa'],
  },
  8: {
    title: 'Primer día de Pacífico',
    story: 'Bajamos el ritmo con una jornada de playa, surf y el ambiente relajado que define Santa Teresa.',
    highlights: ['Playa Carmen o Santa Teresa', 'Primera sesión de surf', 'Atardecer junto al mar'],
  },
  9: {
    title: 'Playa Hermosa',
    story: 'Exploramos una de las playas más bonitas de la zona y dejamos que el mar decida si toca surf, baño o simplemente descansar.',
    highlights: ['Mañana en Playa Hermosa', 'Comida junto a la costa', 'Paseo al atardecer'],
  },
  10: {
    title: 'Cascadas de Montezuma',
    story: 'Nos acercamos a Montezuma para combinar sus cascadas con el pueblo, manteniendo siempre la opción de un día de playa.',
    highlights: ['Excursión a Montezuma', 'Caminata hasta las cascadas', 'Regreso tranquilo a Santa Teresa'],
  },
  11: {
    title: 'Un último día en Santa Teresa',
    story: 'Guardamos una jornada sin prisas para repetir nuestra playa favorita y despedirnos del Pacífico con otro gran atardecer.',
    highlights: ['Playa o surf suave', 'Tiempo libre para improvisar', 'Última cena en Santa Teresa'],
  },
  12: {
    title: 'Rumbo a Manuel Antonio',
    story: 'Volvemos a cruzar el golfo y seguimos la costa central hasta Manuel Antonio, una nueva base entre selva y océano.',
    highlights: ['Ferry de Paquera a Puntarenas', 'Carretera por la costa', 'Llegada a Manuel Antonio'],
  },
  13: {
    title: 'Playas de Manuel Antonio o Nauyaca',
    story: 'Elegimos entre un día relajado en Espadilla y Biesanz o una excursión más activa a las cascadas de Nauyaca.',
    highlights: ['Playa Espadilla o Biesanz', 'Cascadas de Nauyaca como alternativa', 'Atardecer en la costa'],
  },
  14: {
    title: 'Parque Nacional Manuel Antonio',
    story: 'Recorremos los senderos del parque entre monos, perezosos y vegetación tropical antes de terminar en sus playas.',
    highlights: ['Senderos del parque nacional', 'Observación de fauna', 'Baño en las playas del parque'],
  },
  15: {
    title: 'Cruce hasta el Caribe',
    story: 'Atravesamos el país de costa a costa y llegamos a Puerto Viejo, donde cambia el paisaje, la comida y el ritmo.',
    highlights: ['Carretera hacia Limón', 'Llegada a Puerto Viejo', 'Primera cena caribeña'],
  },
  16: {
    title: 'Cahuita y Punta Uva',
    story: 'Dedicamos el día completo al Caribe: senderos con fauna en Cahuita y agua turquesa en Punta Uva.',
    highlights: ['Parque Nacional Cahuita', 'Playa de Punta Uva', 'Paseo por Puerto Viejo'],
  },
  17: {
    title: 'Regreso a San José',
    story: 'Nos despedimos del Caribe y atravesamos Costa Rica por última vez antes de devolver el coche y volar de regreso a Madrid.',
    highlights: ['Última carretera hasta San José', 'Devolución del 4x4', 'Vuelo de regreso a Madrid'],
  },
}

export function TripTimeline({ days }: { days: TripDay[] }) {
  const [openDay, setOpenDay] = useState(days[0]?.id)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const openLinkedDay = () => {
      const id = window.location.hash.replace('#day-', '')
      if (days.some((day) => day.id === id)) {
        setOpenDay(id)
        window.setTimeout(() => {
          document.getElementById(`day-${id}`)?.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
            block: 'start',
          })
        }, 420)
      }
    }
    openLinkedDay()
    window.addEventListener('hashchange', openLinkedDay)
    return () => window.removeEventListener('hashchange', openLinkedDay)
  }, [days, reduceMotion])

  return (
    <div className="trip-timeline">
      {days.map((day) => {
        const open = openDay === day.id
        const publicDay = publicDayCopy[day.day]
        return (
          <article className={`timeline-day ${open ? 'open' : ''}`} id={`day-${day.id}`} key={day.id}>
            <button
              className="timeline-trigger"
              type="button"
              onClick={() => setOpenDay(open ? '' : day.id)}
              aria-expanded={open}
            >
              <span className="day-number"><small>Día</small>{day.day}</span>
              <span className="day-date">{day.dateLabel}</span>
              <span className="day-heading">
                <strong>{publicDay?.title ?? day.title}</strong>
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
                    <span className="public-day-label">Qué haremos</span>
                    <p>{publicDay?.story ?? day.summary}</p>
                  </div>
                  <ul className="day-schedule public-day-highlights">
                    {(publicDay?.highlights ?? []).map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}
