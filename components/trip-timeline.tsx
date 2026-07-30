'use client'

import { ChevronDown, MapPin } from 'lucide-react'
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
    story: 'Recogimos el Jimny y estrenamos las carreteras entre baches y lluvia. Elegimos Catarata del Toro, comimos en el recinto y continuamos hacia La Fortuna.',
    highlights: ['Recogida del 4×4', 'Catarata del Toro bajo la lluvia', 'Comida en efectivo y llegada a La Fortuna'],
  },
  3: {
    title: 'Místico y Mirador El Silencio',
    story: 'Entramos en la selva por los puentes de Místico y después cambiamos la infraestructura turística por los senderos económicos de El Silencio.',
    highlights: ['Puentes colgantes de Místico', 'Rana y senderos de El Silencio', 'Monos aulladores bajo la lluvia'],
  },
  4: {
    title: 'La Fortuna, termas y una tarde flexible',
    story: 'Vimos el volcán, comimos en una soda y terminamos entre las piscinas de Baldi. La lluvia nos enseñó a volver, secarnos y reorganizar sin llenar cada hora.',
    highlights: ['Vistas del volcán', 'Casado en Soda La Fortuna', 'Baldi Hot Springs y descanso'],
  },
  5: {
    title: 'Carretera del lago y tirolinas',
    story: 'Rodeamos el lago, paramos a comer con unas vistas increíbles y llegamos a Extremo Park después de que un tronco bloqueara la carretera.',
    highlights: ['Ruta panorámica junto al lago', 'Tirolinas en Extremo Park', 'Atardecer y arcoíris en Monteverde'],
  },
  6: {
    title: 'Bosque Profundo de Monteverde',
    story: 'Elegimos el sendero intermedio del bosque nuboso: unos tres kilómetros entre vegetación frondosa y un paisaje especialmente interesante para amantes de la botánica.',
    highlights: ['Bus desde el aparcamiento', 'Sendero Bosque Profundo', 'Una visita bonita, aunque menos sorprendente tras La Fortuna'],
  },
  7: {
    title: 'Cambio de plan hacia Santa Teresa',
    story: 'Un atasco enorme nos hizo renunciar al ferry de ida. Cruzamos la península de Nicoya por carretera durante unas cuatro horas y media y llegamos a tiempo para comer.',
    highlights: ['Cambio de ruta sobre la marcha', 'Carretera por la península de Nicoya', 'Primer atardecer en Santa Teresa'],
  },
  8: {
    title: 'Primer día de Pacífico',
    story: 'Bajamos el ritmo con una jornada de playa, surf y el ambiente relajado que define Santa Teresa.',
    highlights: ['Playa Carmen o Santa Teresa', 'Primera sesión de surf', 'Atardecer junto al mar'],
  },
  9: {
    title: 'Playa Hermosa',
    story: 'Fuimos a Playa Hermosa con las tablas del hotel. El oleaje y las corrientes confirmaron que estas playas funcionan mejor para surf y atardecer que para un baño tranquilo.',
    highlights: ['Tabla del hotel por 24 horas', 'Surf con nivel principiante', 'Vegetación y atardecer del Pacífico'],
  },
  10: {
    title: 'Isla Tortuga y mar bioluminiscente',
    story: 'Salimos desde Montezuma en lancha, pasamos el día entre playas y terminamos dentro de una bahía donde el agua se iluminaba alrededor del cuerpo.',
    highlights: ['Lancha y comida incluida', 'Isla Tortuga y playas del recorrido', 'La actividad más mágica del viaje'],
  },
  11: {
    title: 'Un último día en Santa Teresa',
    story: 'Guardamos una jornada sin prisas para repetir nuestra playa favorita y despedirnos del Pacífico con otro gran atardecer.',
    highlights: ['Playa o surf suave', 'Tiempo libre para improvisar', 'Última cena en Santa Teresa'],
  },
  12: {
    title: 'Rumbo a Manuel Antonio',
    story: 'Esta vez sí cruzamos en ferry con el coche. Desde Puntarenas seguimos entre tráfico, hicimos una parada práctica en Jacó y llegamos a Manuel Antonio.',
    highlights: ['Ferry de unas 1 h 15 min', 'Parada en Jacó', 'Llegada a Manuel Antonio'],
  },
  13: {
    title: 'Espadilla y piscinas sobre la bahía',
    story: 'Pasamos la mañana en Playa Espadilla y después usamos el day pass del Hotel Mariposa: cuatro piscinas, comida y unas vistas increíbles.',
    highlights: ['Mañana en Playa Espadilla', 'Day pass con crédito para consumo', 'Piscinas del Hotel Mariposa'],
  },
  14: {
    title: 'Parque Nacional Manuel Antonio',
    story: 'Entramos con guía y vimos serpientes, monos, perezosos y tucanes. Después nos quedamos en la playa y cerramos el día viendo el atardecer desde El Avión.',
    highlights: ['Fauna con guía y telescopio', 'Playa y duchas dentro del parque', 'Atardecer en Bar El Avión'],
  },
  15: {
    title: 'Cruce hasta el Caribe',
    story: 'Fue la jornada más cansada: el cruce se acercó a diez horas por el tráfico. La carretera tenía tramos modernos, pero llegamos con poco margen para conocer el Caribe.',
    highlights: ['Atascos camino de San José', 'Carretera modernizada hacia Limón', 'Llegada a Puerto Viejo'],
  },
  16: {
    title: 'Cahuita y Punta Uva',
    story: 'Entramos a Cahuita por el pueblo, vimos monos y reptiles pese al sendero cerrado por el temporal, y después comparamos Punta Uva con un gran atardecer en Cocles.',
    highlights: ['Cahuita por aportación', 'Punta Uva con viento y nubes', 'Olas y atardecer en Cocles'],
  },
  17: {
    title: 'Regreso a San José',
    story: 'Volamos el dron en Playa Negra antes de despedirnos del Caribe. La vuelta tuvo algunos de los tramos de carretera más cómodos y llegamos al aeropuerto con tres horas de margen.',
    highlights: ['Dron sobre Playa Negra', 'Parada en un centro comercial', 'Control de equipaje y vuelo de regreso'],
  },
}

export function TripTimeline({ days }: { days: TripDay[] }) {
  const [openDay, setOpenDay] = useState(days[0]?.id)

  useEffect(() => {
    const openLinkedDay = () => {
      const dayNumber = Number(window.location.hash.replace('#day-', ''))
      const linkedDay = days.find((day) => day.day === dayNumber)
      if (linkedDay) {
        setOpenDay(linkedDay.id)
        window.setTimeout(() => {
          const target = document.getElementById(`day-${dayNumber}`)
          if (!target) return
          window.scrollTo({
            behavior: 'auto',
            left: 0,
            top: target.getBoundingClientRect().top + window.scrollY - 96,
          })
        }, 40)
      }
    }
    openLinkedDay()
    window.addEventListener('hashchange', openLinkedDay)
    return () => window.removeEventListener('hashchange', openLinkedDay)
  }, [days])

  return (
    <div className="trip-timeline">
      {days.map((day) => {
        const open = openDay === day.id
        const publicDay = publicDayCopy[day.day]
        return (
          <article className={`timeline-day ${open ? 'open' : ''}`} id={`day-${day.day}`} key={day.id}>
            <button
              className="timeline-trigger"
              type="button"
              onClick={() => setOpenDay(open ? '' : day.id)}
              aria-expanded={open}
              data-analytics-event="open_itinerary_day"
              data-analytics-label={`costa_rica_dia_${day.day}`}
              data-analytics-value={day.day}
            >
              <span className="day-number"><small>Día</small>{day.day}</span>
              <span className="day-heading">
                <strong>{publicDay?.title ?? day.title}</strong>
                <small>
                  <MapPin size={13} /> {day.destination}
                </small>
              </span>
              <ChevronDown className="day-chevron" size={21} />
            </button>
            {open && (
              <div className="timeline-detail">
                  <div className="timeline-copy">
                    <span className="public-day-label">Qué haremos</span>
                    <p>{publicDay?.story ?? day.summary}</p>
                  </div>
                  <ul className="day-schedule public-day-highlights">
                    {(publicDay?.highlights ?? []).map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
