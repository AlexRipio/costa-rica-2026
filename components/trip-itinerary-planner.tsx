'use client'

import { ArrowRight, Check, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useCostaRicaRoute } from '@/components/costa-rica-route-context'

type RouteOption = {
  days: 10 | 15 | 20
  label: string
  description: string
  pace: string
  stops: Array<{ days: string; place: string; text: string; guide?: string }>
  includes: string[]
}

const routes: RouteOption[] = [
  {
    days: 10,
    label: 'Lo esencial',
    description: 'El triángulo más fácil para una primera visita: volcán, bosque nuboso y Pacífico sin pasar medio viaje en carretera.',
    pace: 'Cómodo',
    includes: ['Arenal', 'Monteverde', 'Manuel Antonio'],
    stops: [
      { days: 'Día 1', place: 'Llegada y Alajuela', text: 'Noche sencilla cerca del aeropuerto para empezar descansados.' },
      { days: 'Días 2–4', place: 'La Fortuna y Arenal', text: 'Volcán, puentes colgantes, catarata y una tarde de termas.', guide: 'la-fortuna-arenal' },
      { days: 'Días 5–6', place: 'Monteverde', text: 'Bosque nuboso, fauna y una actividad de aventura.', guide: 'monteverde' },
      { days: 'Días 7–9', place: 'Manuel Antonio', text: 'Parque nacional, playa y un día con margen para improvisar.', guide: 'manuel-antonio' },
      { days: 'Día 10', place: 'Regreso', text: 'Vuelta a San José con margen antes del vuelo.' },
    ],
  },
  {
    days: 15,
    label: 'Costa y montaña',
    description: 'Añade la península de Nicoya y varios días de playa. Sigue siendo una ruta coherente y evita cruzar hasta el Caribe con prisas.',
    pace: 'Equilibrado',
    includes: ['Bajos del Toro', 'Arenal', 'Monteverde', 'Santa Teresa', 'Manuel Antonio'],
    stops: [
      { days: 'Días 1–2', place: 'Alajuela y Bajos del Toro', text: 'Llegada, cascadas y carretera escénica hacia el norte.', guide: 'alajuela-bajos-del-toro' },
      { days: 'Días 3–5', place: 'La Fortuna y Arenal', text: 'Dos días completos para naturaleza, agua y descanso.', guide: 'la-fortuna-arenal' },
      { days: 'Días 6–7', place: 'Monteverde', text: 'Bosque nuboso y canopy sin duplicar actividades.', guide: 'monteverde' },
      { days: 'Días 8–11', place: 'Santa Teresa', text: 'Ferry, surf, playas y tiempo real para bajar el ritmo.', guide: 'santa-teresa' },
      { days: 'Días 12–14', place: 'Manuel Antonio', text: 'Fauna, parque nacional y playas del Pacífico central.', guide: 'manuel-antonio' },
      { days: 'Día 15', place: 'Regreso', text: 'Salida hacia San José y fin de la ruta.' },
    ],
  },
  {
    days: 20,
    label: 'De océano a océano',
    description: 'La versión completa: conserva el Pacífico y añade el Caribe Sur con tiempo suficiente para que el cruce tenga sentido.',
    pace: 'Completo',
    includes: ['Las seis etapas', 'Pacífico', 'Caribe'],
    stops: [
      { days: 'Días 1–2', place: 'Alajuela y Bajos del Toro', text: 'Llegada y primera gran jornada de cascadas.', guide: 'alajuela-bajos-del-toro' },
      { days: 'Días 3–5', place: 'La Fortuna y Arenal', text: 'Volcán, puentes, catarata y termas.', guide: 'la-fortuna-arenal' },
      { days: 'Días 6–7', place: 'Monteverde', text: 'Bosque nuboso, aves y aventura.', guide: 'monteverde' },
      { days: 'Días 8–12', place: 'Santa Teresa', text: 'Cinco días para surf, descanso y una posible excursión a Montezuma.', guide: 'santa-teresa' },
      { days: 'Días 13–15', place: 'Manuel Antonio', text: 'Parque nacional, playas y jornada flexible.', guide: 'manuel-antonio' },
      { days: 'Días 16–19', place: 'Puerto Viejo y Caribe Sur', text: 'Cahuita, Punta Uva y cultura caribeña.', guide: 'puerto-viejo' },
      { days: 'Día 20', place: 'Regreso', text: 'Cruce a San José y vuelo de vuelta.' },
    ],
  },
]

export function TripItineraryPlanner() {
  const { selectedDays, setSelectedDays } = useCostaRicaRoute()
  const selected = routes.find((route) => route.days === selectedDays) ?? routes[1]

  return (
    <div className="route-planner">
      <div className="route-planner-tabs" role="tablist" aria-label="Duración del itinerario">
        {routes.map((route) => (
          <button
            type="button"
            role="tab"
            aria-selected={selected.days === route.days}
            className={selected.days === route.days ? 'active' : ''}
            onClick={() => setSelectedDays(route.days)}
            data-analytics-event="select_itinerary"
            data-analytics-label={`costa_rica_${route.days}_dias`}
            data-analytics-value={route.days}
            key={route.days}
          >
            <strong>{route.days}</strong><span>días</span><small>{route.label}</small>
          </button>
        ))}
      </div>

      <div className="route-planner-summary">
        <div>
          <span className="eyebrow">Ruta de {selected.days} días · Ritmo {selected.pace.toLowerCase()}</span>
          <h3>{selected.label}</h3>
          <p>{selected.description}</p>
        </div>
        <ul>{selected.includes.map((item) => <li key={item}><Check size={14} /> {item}</li>)}</ul>
      </div>

      <div className="route-planner-stops">
        {selected.stops.map((stop, index) => (
          <article key={`${selected.days}-${stop.days}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <small>{stop.days}</small>
              <h4><MapPin size={15} /> {stop.place}</h4>
              <p>{stop.text}</p>
            </div>
            {stop.guide && (
              <Link
                href={`/viajes/costa-rica-2026/${stop.guide}`}
                aria-label={`Abrir guía de ${stop.place}`}
                data-analytics-event="open_destination_guide"
                data-analytics-label={stop.guide}
              >
                <ArrowRight />
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
