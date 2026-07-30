import { images } from './images'

export type Status = 'pending' | 'reserved' | 'done'
export type Priority = 'Comprar ya' | 'Reservar pronto' | 'Flexible'
export type Intensity = 'Chill' | 'Medio' | 'Intenso'

export type DayTask = { id: string; label: string; done: boolean; reservation?: boolean }
export type TripDay = {
  id: string
  day: number
  isoDate: string
  dateLabel: string
  destination: string
  overnight: string
  title: string
  summary: string
  schedule: string[]
  transfers: string[]
  costs: string
  notes: string
  links: { label: string; url: string }[]
  football?: string
  alert?: string
  status: Status
  tasks: DayTask[]
  tags: string[]
}

export type Destination = {
  id: string
  name: string
  dates: string
  nights: number
  hotel: string
  image: keyof typeof images
  price: string
  activities: string[]
  tips: string[]
  rainPlan: string
  intensity: Intensity
  tags: string[]
  coordinates: [number, number]
}

export type Activity = {
  id: string
  name: string
  destination: string
  recommendedDay: string
  price: number
  currency: 'EUR' | 'USD'
  priority: Priority
  link: string
  action: 'Comprar' | 'Reservar' | 'Ver info'
  bought: boolean
  paid: boolean
  notes: string
}

export type Hotel = {
  id: string
  destination: string
  name: string
  checkIn: string
  checkOut: string
  nights: number
  totalPrice: number
  address: string
  status: 'Reservado' | 'Pendiente' | 'Pagado'
  notes: string
  link: string
  phone: string
  image: keyof typeof images
}

export type BudgetRow = {
  id: string
  category: string
  adjusted: number
  realistic: number
  high: number
  note: string
}

export type PackingItem = { id: string; text: string; checked: boolean }
export type PackingCategory = { id: string; name: string; items: PackingItem[] }

export type FootballMatch = {
  id: string
  match: string
  date: string
  costaRicaTime: string
  spainTime: string
  location: string
  recommendation: string
  watched: boolean
  venue: string
  type: 'Confirmado' | 'Posible'
}

export type QuickLink = { id: string; label: string; group: string; url: string }

export type FlightLeg = {
  id: string
  label: string
  flightNumber: string
  operator: string
  from: string
  to: string
  departLocal: string
  arriveLocal: string
  departUtc: string
  arriveUtc: string
  duration: string
  trackerUrl: string
}

export type TripData = {
  meta: {
    title: string
    subtitle: string
    dates: string
    travelers: number
    source: string
    updated: string
    conflict: string
  }
  flights: {
    outbound: string
    return: string
    budgetPerPerson: number
    legs: FlightLeg[]
  }
  car: {
    model: string
    pickup: string
    return: string
    budgetPerPerson: number
    notes: string
  }
  days: TripDay[]
  destinations: Destination[]
  activities: Activity[]
  hotels: Hotel[]
  budget: BudgetRow[]
  packing: PackingCategory[]
  football: FootballMatch[]
  links: QuickLink[]
}

const task = (id: string, label: string, reservation = false): DayTask => ({
  id,
  label,
  done: false,
  reservation,
})

export const initialTripData: TripData = {
  meta: {
    title: 'Costa Rica 2026',
    subtitle: 'Volcanes, selva, surf y Caribe',
    dates: '9–25 julio 2026',
    travelers: 2,
    source: 'Datos extraídos de “viaje costa rica VF.docx”',
    updated: '8 julio 2026',
    conflict:
      'Revisar alojamiento: Glamping Tomaselli termina el 22/07 y Chilamate empieza el 22/07, pero la ruta escrita sitúa el traslado Manuel Antonio → Puerto Viejo el 23/07.',
  },
  flights: {
    outbound: '9 jul · Madrid 18:30 → San José 21:20 · 10 h 50 min',
    return: '25 jul · San José 21:10 → Madrid 15:25 (+1) · 10 h 15 min',
    budgetPerPerson: 1000,
    legs: [
      {
        id: 'outbound',
        label: 'Ida',
        flightNumber: 'E9 857',
        operator: 'Iberojet',
        from: 'Madrid (MAD)',
        to: 'San José (SJO)',
        departLocal: 'Jue 9 jul · 18:30 España',
        arriveLocal: 'Jue 9 jul · 21:20 Costa Rica',
        departUtc: '2026-07-09T16:30:00.000Z',
        arriveUtc: '2026-07-10T03:20:00.000Z',
        duration: '10 h 50 min · directo',
        trackerUrl: 'https://www.flightradar24.com/data/flights/e9857',
      },
      {
        id: 'return',
        label: 'Vuelta',
        flightNumber: 'E9 858',
        operator: 'Iberojet',
        from: 'San José (SJO)',
        to: 'Madrid (MAD)',
        departLocal: 'Sáb 25 jul · 21:10 Costa Rica',
        arriveLocal: 'Dom 26 jul · 15:25 España',
        departUtc: '2026-07-26T03:10:00.000Z',
        arriveUtc: '2026-07-26T13:25:00.000Z',
        duration: '10 h 15 min · directo',
        trackerUrl: 'https://www.flightradar24.com/data/flights/e9858',
      },
    ],
  },
  car: {
    model: 'Suzuki Jimny Elite 5 puertas · automático · 4WD',
    pickup: '10 jul · 07:30 · aeropuerto de San José',
    return: '25 jul · 18:00 · aeropuerto de San José',
    budgetPerPerson: 422,
    notes: 'Reserva confirmada. Los datos personales y el localizador se han omitido de la versión pública.',
  },
  days: [
    {
      id: '2026-07-09', day: 1, isoDate: '2026-07-09', dateLabel: 'Jue 9 jul', destination: 'Alajuela', overnight: 'El Rodeo Estancia Boutique Hotel',
      title: 'Vuelo, llegada y aterrizaje suave', summary: 'Viaje Madrid–San José, trámites y noche cerca del aeropuerto. Nada más: llegar, conectar y dormir.',
      schedule: ['18:30 · Salida de Madrid (MAD)', 'Durante el vuelo · Francia–Marruecos con WiFi si funciona', '21:20 · Llegada a San José (SJO)', 'Traslado al hotel, cena fácil y descanso'],
      transfers: ['Madrid → San José · 10 h 50 min', 'Aeropuerto → Alajuela'], costs: 'Vuelo incluido en presupuesto · Hotel 68 € / 2 personas', notes: 'Activar Holafly al aterrizar y dejar preparada la documentación del coche.',
      links: [{ label: 'RTVE Play', url: 'https://www.rtve.es/play/' }], football: 'Francia–Marruecos · 14:00 Costa Rica / 22:00 España', status: 'reserved',
      tasks: [task('d1-holafly', 'Activar Holafly'), task('d1-wifi', 'Contratar / probar WiFi del avión', true), task('d1-hotel', 'Confirmar llegada tardía al hotel', true)], tags: ['vuelo', 'fútbol', 'hotel'],
    },
    {
      id: '2026-07-10', day: 2, isoDate: '2026-07-10', dateLabel: 'Vie 10 jul', destination: 'Bajos del Toro → La Fortuna', overnight: 'Natura Bungalows',
      title: 'Cataratas, España–Bélgica y carretera', summary: 'Recoger el 4x4, hacer una ruta corta por Bajos del Toro y ver el partido antes de continuar a La Fortuna.',
      schedule: ['07:00–07:30 · Recogida del 4x4', '09:15 · Llegada a Bajos del Toro', '10:00–12:15 · Catarata del Toro, Blue Falls o ruta corta', '13:00–15:00 · España–Bélgica mientras comemos', '15:30–18:30 · Continuar hacia La Fortuna', 'Noche · Check-in, cena y descanso'],
      transfers: ['Alajuela → Bajos del Toro · 1 h 45–2 h', 'Bajos del Toro → La Fortuna · 2 h 30–3 h'], costs: 'Cataratas 15–25 USD · “cañón Jurassic Park” apuntado: 12 €', notes: 'Localizar antes un sitio con TV/WiFi; plan B: verlo con Holafly desde el móvil.',
      links: [{ label: 'Catarata del Toro', url: 'https://www.catarata-del-toro.com/prices/' }], football: 'España–Bélgica · 13:00 Costa Rica / 21:00 España', alert: 'Bloquear 12:30–15:30 para comer y ver el partido.', status: 'pending',
      tasks: [task('d2-car', 'Recoger 4x4', true), task('d2-falls', 'Elegir Catarata del Toro / Blue Falls', true), task('d2-football', 'Encontrar TV o buena conexión')], tags: ['catarata', 'traslado largo', 'fútbol'],
    },
    {
      id: '2026-07-11', day: 3, isoDate: '2026-07-11', dateLabel: 'Sáb 11 jul', destination: 'La Fortuna / Arenal', overnight: 'Natura Bungalows',
      title: 'Catarata, volcán y termas', summary: 'Día potente de naturaleza y final relajado en aguas termales.',
      schedule: ['Mañana · Catarata La Fortuna', 'Mediodía · Comer en La Fortuna', 'Tarde · Parque Nacional Volcán Arenal + lago y miradores', 'Final del día · Baldi Hot Springs o termas gratuitas El Choyín'],
      transfers: ['Desplazamientos locales en 4x4'], costs: 'Catarata 18–20 USD · Parque 15 USD · Baldi 62 USD', notes: 'Plan ajustado: sustituir Baldi por El Choyín. La opinión del documento considera las termas de pago prescindibles.',
      links: [{ label: 'Baldi', url: 'https://www.baldihotsprings.cr/day-pass/' }], status: 'pending', tasks: [task('d3-waterfall', 'Entrada Catarata La Fortuna'), task('d3-volcano', 'Parque Volcán Arenal'), task('d3-baldi', 'Decidir Baldi o El Choyín', true)], tags: ['volcán', 'catarata', 'termas', 'intenso'],
    },
    {
      id: '2026-07-12', day: 4, isoDate: '2026-07-12', dateLabel: 'Dom 12 jul', destination: 'La Fortuna / Arenal', overnight: 'Natura Bungalows',
      title: 'Puentes colgantes y tarde flexible', summary: 'Místico por la mañana; tarde libre para bajar revoluciones.',
      schedule: ['Mañana · Puentes Colgantes Místico', 'Mediodía · Comer', 'Tarde · Paseo, mirador, café o descanso', 'Noche · Cena tranquila'], transfers: ['La Fortuna ↔ Místico Park'], costs: '35–45 USD sin guía · 55–65 USD con guía', notes: 'Con guía se ven más animales; sin guía se ahorra.',
      links: [{ label: 'Místico Park', url: 'https://misticopark.com/tours/self-guided-hanging-bridges/' }], status: 'pending', tasks: [task('d4-mistico', 'Reservar Místico por la mañana', true), task('d4-guide', 'Elegir con o sin guía')], tags: ['selva', 'animales', 'puentes'],
    },
    {
      id: '2026-07-13', day: 5, isoDate: '2026-07-13', dateLabel: 'Lun 13 jul', destination: 'La Fortuna → Monteverde', overnight: 'Monteverde Ecolove',
      title: 'Carretera de montaña y night tour', summary: 'Traslado de 3–4 horas, atardecer y paseo nocturno si queda energía.',
      schedule: ['Mañana · Desayuno, check-out y salida', 'Mediodía · Llegada, check-in y comida', 'Tarde · Cerro Plano o mirador', 'Noche · Kinkajou Night Walk'], transfers: ['La Fortuna → Monteverde · 3–4 h según lluvia'], costs: 'Night tour 30–35 USD · mirador gratis', notes: 'Hacer el night tour hoy libera el día 14 para las tirolinas y el posible partido.',
      links: [{ label: 'Kinkajou Night Walk', url: 'https://www.getyourguide.com/santa-elena-costa-rica-l180411/kinkajou-night-walk-in-monteverde-t473315/' }], status: 'pending', tasks: [task('d5-hotel', 'Check-in Monteverde', true), task('d5-night', 'Reservar Kinkajou', true)], tags: ['traslado', 'bosque nuboso', 'animales'],
    },
    {
      id: '2026-07-14', day: 6, isoDate: '2026-07-14', dateLabel: 'Mar 14 jul', destination: 'Monteverde', overnight: 'Monteverde Ecolove',
      title: 'Tirolinas + posible semifinal', summary: 'Extremo Park a primera hora y bloque de fútbol. Bosque nuboso solo si no juega España o sobra energía.',
      schedule: ['08:00 · Tirolinas Extremo Park', '12:00 · Comer y localizar pantalla', '12:30–16:00 · Posible semifinal de España', 'Tarde · paseo suave, descanso o bosque nuboso'], transfers: ['Desplazamientos locales'], costs: 'Extremo 63 USD + impuestos · Bosque Nuboso 25–30 USD', notes: 'No combinar tirolinas, bosque, partido y night tour el mismo día.',
      links: [{ label: 'Extremo Park', url: 'https://monteverdetours.com/extremo-canopy-monteverde-costa-rica.html' }, { label: 'Bosque Nuboso', url: 'https://cloudforestmonteverde.com/visit-the-preserve/' }], football: 'Posible semifinal de España · 13:00 Costa Rica / 21:00 España', alert: 'Bloquear 12:30–16:00 si España se clasifica.', status: 'pending', tasks: [task('d6-zip', 'Reservar Extremo Park 08:00', true), task('d6-semi', 'Confirmar semifinal tras el partido del día 10')], tags: ['tirolinas', 'fútbol', 'selva'],
    },
    {
      id: '2026-07-15', day: 7, isoDate: '2026-07-15', dateLabel: 'Mié 15 jul', destination: 'Monteverde → Santa Teresa', overnight: 'Believe Surf & Yoga Lodge',
      title: 'Ferry hacia el Pacífico', summary: 'Día de traslado largo por Puntarenas y Paquera. Playa y atardecer solo si da tiempo.',
      schedule: ['Mañana · Salida temprana de Monteverde', 'Ferry Puntarenas → Paquera', 'Tarde · Conducción a Santa Teresa', 'Llegada · Check-in, playa y cena'], transfers: ['Monteverde → Puntarenas → Paquera → Santa Teresa · 6–8 h total'], costs: 'Ferry + gasolina + peajes incluidos en presupuesto de carretera', notes: 'No cerrar ninguna actividad. El bosque nuboso temprano solo si es imprescindible.',
      links: [{ label: 'Naviera Tambor', url: 'https://navieratambor.com/' }], football: 'Otra semifinal · 13:00 Costa Rica / 21:00 España', alert: 'Partido durante el traslado: no organizar el día alrededor salvo interés especial.', status: 'pending', tasks: [task('d7-ferry', 'Comprar ferry Puntarenas–Paquera', true), task('d7-time', 'Comprobar hora de embarque')], tags: ['ferry', 'traslado largo', 'playa'],
    },
    {
      id: '2026-07-16', day: 8, isoDate: '2026-07-16', dateLabel: 'Jue 16 jul', destination: 'Santa Teresa', overnight: 'Believe Surf & Yoga Lodge',
      title: 'Primer día real de playa', summary: 'Desayuno lento, surf y atardecer. Agenda deliberadamente ligera.', schedule: ['Mañana · Playa y desayuno', 'Mediodía · Surf en Playa Carmen o Santa Teresa', 'Tarde · Descanso y atardecer', 'Noche · Cena y algo suave'], transfers: ['A pie / coche local'], costs: 'Tabla 15–20 USD al día', notes: 'Día para aterrizar en Santa Teresa después del traslado.', links: [{ label: 'Walter Surf Shop', url: 'https://waltersurfshop.com/en/pages/surf-rentals' }], status: 'pending', tasks: [task('d8-board', 'Alquilar tabla según condiciones')], tags: ['surf', 'playa', 'chill'],
    },
    {
      id: '2026-07-17', day: 9, isoDate: '2026-07-17', dateLabel: 'Vie 17 jul', destination: 'Santa Teresa / Playa Hermosa', overnight: 'Believe Surf & Yoga Lodge',
      title: 'Playa Hermosa y noche abierta', summary: 'Surf o baño por la mañana; buen día para salir si apetece.', schedule: ['Mañana · Playa Hermosa', 'Mediodía · Comer por la zona', 'Tarde · playa, descanso y atardecer', 'Noche · opción de fiesta'], transfers: ['Santa Teresa ↔ Playa Hermosa'], costs: 'Playas gratis · ocio variable', notes: 'Mejor noche para salir que el 18/19: después hay fútbol y el 20 traslado.', links: [], status: 'pending', tasks: [task('d9-surf', 'Revisar mareas / condiciones'), task('d9-party', 'Decidir plan de noche')], tags: ['surf', 'playa', 'fiesta'],
    },
    {
      id: '2026-07-18', day: 10, isoDate: '2026-07-18', dateLabel: 'Sáb 18 jul', destination: 'Santa Teresa / Montezuma', overnight: 'Believe Surf & Yoga Lodge',
      title: 'Montezuma o día de recuperación', summary: 'Cascadas y comida en Montezuma, con alternativa de playa si la noche anterior se alarga.', schedule: ['Opción A · Montezuma y cascadas', 'Opción B · playa, surf y descanso', '15:00 · posible tercer puesto si juega España'], transfers: ['Santa Teresa ↔ Montezuma'], costs: 'Cascadas aprox. 5–12 USD', notes: 'Mantener flexible y no reservar temprano.', links: [{ label: 'Info Montezuma', url: 'https://www.twoweeksincostarica.com/montezuma-waterfalls/' }], football: 'Tercer puesto · 15:00 Costa Rica / 23:00 España', status: 'pending', tasks: [task('d10-plan', 'Elegir Montezuma o día chill')], tags: ['cascada', 'fútbol', 'flexible'],
    },
    {
      id: '2026-07-19', day: 11, isoDate: '2026-07-19', dateLabel: 'Dom 19 jul', destination: 'Santa Teresa', overnight: 'Believe Surf & Yoga Lodge',
      title: 'Final del Mundial junto al mar', summary: 'Mañana libre, final a mediodía y último atardecer en Santa Teresa.', schedule: ['Mañana · playa o surf suave', '12:30–16:00 · final del Mundial', 'Tarde · atardecer en la playa', 'Noche · última cena en Santa Teresa'], transfers: [], costs: 'Plan flexible · consumición en bar', notes: 'Opciones: Nativo Sports Bar, Kooks Smokehouse o alojamiento con buena conexión.', links: [{ label: 'RTVE Play', url: 'https://www.rtve.es/play/' }], football: 'Final · 13:00 Costa Rica / 21:00 España', alert: 'Posible final de España: reservar pantalla o mesa con antelación.', status: 'pending', tasks: [task('d11-venue', 'Elegir dónde ver la final', true)], tags: ['fútbol', 'playa', 'chill'],
    },
    {
      id: '2026-07-20', day: 12, isoDate: '2026-07-20', dateLabel: 'Lun 20 jul', destination: 'Santa Teresa → Manuel Antonio', overnight: 'Glamping Tomaselli',
      title: 'Regreso en ferry y costa central', summary: 'Traslado largo a Manuel Antonio; llegada, cena y descanso.', schedule: ['Mañana · Salir sin retrasarse', 'Ferry Paquera → Puntarenas', 'Tarde · Conducción a Manuel Antonio', 'Llegada · check-in, playa si queda luz y cena'], transfers: ['Santa Teresa → Paquera → Puntarenas → Manuel Antonio'], costs: 'Ferry + carretera incluidos en presupuesto', notes: 'Evitar surf o fiesta fuerte la noche anterior.', links: [{ label: 'Naviera Tambor', url: 'https://navieratambor.com/' }], status: 'pending', tasks: [task('d12-ferry', 'Comprar ferry Paquera–Puntarenas', true), task('d12-hotel', 'Confirmar check-in', true)], tags: ['ferry', 'traslado largo'],
    },
    {
      id: '2026-07-21', day: 13, isoDate: '2026-07-21', dateLabel: 'Mar 21 jul', destination: 'Manuel Antonio', overnight: 'Glamping Tomaselli',
      title: 'Playas o Nauyaca', summary: 'El parque nacional cierra los martes: mantener día de playa o decidir una excursión a Nauyaca.', schedule: ['Opción chill · Espadilla o Biesanz', 'Opción activa · Cascadas Nauyaca', 'Tarde · descanso y atardecer'], transfers: ['Manuel Antonio ↔ Nauyaca si se elige'], costs: 'Playas gratis · Nauyaca 10–12 USD + transporte', notes: 'Decidir según cansancio y clima.', links: [{ label: 'Nauyaca', url: 'https://www.nauyacawaterfall.com/' }], alert: 'El Parque Nacional Manuel Antonio está cerrado los martes.', status: 'pending', tasks: [task('d13-plan', 'Elegir playas o Nauyaca'), task('d13-nauyaca', 'Reservar Nauyaca solo si está decidido', true)], tags: ['playa', 'cascada', 'flexible'],
    },
    {
      id: '2026-07-22', day: 14, isoDate: '2026-07-22', dateLabel: 'Mié 22 jul', destination: 'Manuel Antonio', overnight: '⚠ Reserva Chilamate Holiday House desde hoy',
      title: 'Parque Nacional Manuel Antonio', summary: 'Entrada temprana, senderos, fauna y playas. El alojamiento reservado genera un conflicto con la ruta escrita.', schedule: ['Muy temprano · Entrada al parque', 'Mañana · senderos y observación de fauna', 'Mediodía · playas dentro del parque', 'Tarde · comida, descanso y resolver traslado/alojamiento'], transfers: ['Desplazamiento local al parque · traslado a Puerto Viejo por confirmar'], costs: 'Entrada aprox. 18 USD · guía opcional', notes: 'Llevar bañador, toalla ligera, agua y comida permitida.', links: [{ label: 'Entradas SINAC', url: 'https://serviciosenlinea.sinac.go.cr/' }], alert: 'Conflicto: el check-out de Glamping y el check-in de Chilamate figuran el 22/07, pero el itinerario traslada a Puerto Viejo el 23/07.', status: 'pending', tasks: [task('d14-ticket', 'Comprar entrada SINAC a primera hora', true), task('d14-guide', 'Decidir guía'), task('d14-conflict', 'Resolver noche del 22 y traslado')], tags: ['animales', 'parque', 'importante'],
    },
    {
      id: '2026-07-23', day: 15, isoDate: '2026-07-23', dateLabel: 'Jue 23 jul', destination: 'Manuel Antonio → Puerto Viejo', overnight: 'Chilamate Holiday House',
      title: 'Cruce al Caribe', summary: 'Carretera larga hacia Limón y Puerto Viejo, sin más objetivos que llegar bien.', schedule: ['Mañana · Salida temprana', 'Ruta por San José / Limón con paradas mínimas', 'Tarde-noche · llegada, check-in y cena caribeña'], transfers: ['Manuel Antonio → Puerto Viejo · jornada larga'], costs: 'Gasolina y carretera incluidos', notes: 'Este día procede de la ruta escrita; confirmar contra la reserva que empieza el 22.', links: [], alert: 'La reserva de Puerto Viejo comienza un día antes que este traslado.', status: 'pending', tasks: [task('d15-route', 'Confirmar fecha real de traslado'), task('d15-fuel', 'Repostar antes de salir')], tags: ['traslado largo', 'Caribe'],
    },
    {
      id: '2026-07-24', day: 16, isoDate: '2026-07-24', dateLabel: 'Vie 24 jul', destination: 'Puerto Viejo / Cahuita / Punta Uva', overnight: 'Chilamate Holiday House',
      title: 'Cahuita y Punta Uva', summary: 'El único día completo del Caribe: selva y fauna por la mañana, playa por la tarde.', schedule: ['Mañana · Parque Nacional Cahuita', 'Mediodía · comer en Cahuita o Puerto Viejo', 'Tarde · Punta Uva; kayak o snorkel si el mar acompaña', 'Noche · cena y último paseo'], transfers: ['Puerto Viejo ↔ Cahuita ↔ Punta Uva'], costs: 'Cahuita: donación / aprox. 5 USD · playas gratis', notes: 'Alternativa chill: Punta Uva + Cocles + pueblo. Alternativa fauna: Jaguar Rescue Center + playa.', links: [{ label: 'Cahuita SINAC', url: 'https://www.sinac.go.cr/es/ac/aclac/pnc/paginas/default.aspx' }, { label: 'Jaguar Rescue Center', url: 'https://www.jaguarrescue.foundation/' }], status: 'pending', tasks: [task('d16-cahuita', 'Preparar efectivo para Cahuita'), task('d16-plan', 'Elegir plan principal / alternativo')], tags: ['Caribe', 'animales', 'playa'],
    },
    {
      id: '2026-07-25', day: 17, isoDate: '2026-07-25', dateLabel: 'Sáb 25 jul', destination: 'Puerto Viejo → San José', overnight: 'Vuelo nocturno',
      title: 'Regreso con margen', summary: 'Salida muy temprana/mediodía hacia el aeropuerto, devolución del coche y vuelo a Madrid.', schedule: ['Salir con 5–6 h de carretera + margen', '18:00 · Devolución del 4x4', '21:10 · Vuelo San José → Madrid', '26 jul · 15:25 llegada a Madrid'], transfers: ['Puerto Viejo → Aeropuerto SJO · 5–6 h + incidencias', 'San José → Madrid · 10 h 15 min'], costs: 'Vuelo incluido', notes: 'Añadir margen por lluvia, obras, camiones y tráfico. La salida tardía permite mantener la última noche en Puerto Viejo.', links: [], alert: 'Objetivo: estar en el aeropuerto antes de las 18:00.', status: 'pending', tasks: [task('d17-leave', 'Fijar hora de salida'), task('d17-car', 'Devolver coche 18:00', true), task('d17-flight', 'Check-in online', true)], tags: ['vuelo', 'traslado largo'],
    },
  ],
  destinations: [
    { id: 'alajuela', name: 'Alajuela + Bajos del Toro', dates: '9–10 julio', nights: 1, hotel: 'El Rodeo Estancia Boutique Hotel', image: 'fortuna', price: '20–25 € actividades', activities: ['Llegada', 'Catarata del Toro / Blue Falls', 'Parada para el fútbol'], tips: ['Recoger el 4x4 temprano', 'Llevar ropa seca a mano'], rainPlan: 'Ruta corta y café con buena conexión para el partido.', intensity: 'Medio', tags: ['catarata', 'traslado', 'fútbol'], coordinates: [10.164, -84.267] },
    { id: 'arenal', name: 'La Fortuna / Arenal', dates: '10–13 julio', nights: 3, hotel: 'Natura Bungalows', image: 'arenal', price: '120–150 € por persona', activities: ['Catarata La Fortuna', 'Volcán y Lago Arenal', 'Puentes Místico', 'Baldi / El Choyín'], tips: ['Místico con guía para ver fauna', 'Naturaleza primero, termas al final'], rainPlan: 'Termas, paseo corto por La Fortuna y reservar Místico para la ventana más seca.', intensity: 'Intenso', tags: ['volcán', 'selva', 'animales'], coordinates: [10.467, -84.642] },
    { id: 'monteverde', name: 'Monteverde', dates: '13–15 julio', nights: 2, hotel: 'Monteverde Ecolove', image: 'monteverde', price: '105–120 € por persona', activities: ['Extremo Park', 'Bosque Nuboso', 'Kinkajou Night Walk', 'Cerro Plano'], tips: ['Reservar tirolinas a las 08:00', 'Chaqueta ligera: refresca'], rainPlan: 'El bosque nuboso funciona con lluvia suave; posponer tirolinas si hay tormenta.', intensity: 'Intenso', tags: ['tirolinas', 'bosque nuboso', 'animales'], coordinates: [10.315, -84.825] },
    { id: 'santa-teresa', name: 'Santa Teresa', dates: '15–20 julio', nights: 5, hotel: 'Believe Surf & Yoga Lodge', image: 'personalSantaTeresaBeach', price: '35–50 € + ocio', activities: ['Surf', 'Playa Hermosa', 'Montezuma', 'Atardeceres', 'Final del Mundial'], tips: ['Dejar espacio para improvisar', 'Comprobar mareas antes del surf'], rainPlan: 'Yoga, cafés, paseo entre chubascos y partido en el alojamiento.', intensity: 'Chill', tags: ['surf', 'playa', 'fiesta', 'fútbol'], coordinates: [9.648, -85.166] },
    { id: 'manuel-antonio', name: 'Manuel Antonio', dates: '20–23 julio (ruta)', nights: 2, hotel: 'Glamping Tomaselli', image: 'personalMonkeyManuelAntonio', price: '20–80 € por persona', activities: ['Parque Nacional', 'Espadilla / Biesanz', 'Nauyaca opcional'], tips: ['El parque cierra los martes', 'Entrar temprano el miércoles 22'], rainPlan: 'Playas entre claros; Nauyaca solo con condiciones seguras.', intensity: 'Medio', tags: ['animales', 'playa', 'parque'], coordinates: [9.392, -84.141] },
    { id: 'puerto-viejo', name: 'Puerto Viejo', dates: '22–25 julio (reserva)', nights: 3, hotel: 'Chilamate Holiday House', image: 'cahuita', price: '5–75 € por persona', activities: ['Cahuita', 'Punta Uva', 'Cocles', 'Jaguar Rescue Center opcional'], tips: ['Priorizar Cahuita + Punta Uva', 'Llevar efectivo pequeño y repelente'], rainPlan: 'Jaguar Rescue Center, comida caribeña y playas en las ventanas secas.', intensity: 'Medio', tags: ['Caribe', 'selva', 'animales', 'playa'], coordinates: [9.657, -82.754] },
  ],
  activities: [
    { id: 'manuel-antonio', name: 'Parque Nacional Manuel Antonio', destination: 'Manuel Antonio', recommendedDay: 'Mié 22 · temprano', price: 18, currency: 'USD', priority: 'Comprar ya', link: 'https://serviciosenlinea.sinac.go.cr/', action: 'Comprar', bought: false, paid: false, notes: 'Cierra los martes. Entrada oficial SINAC.' },
    { id: 'extremo', name: 'Tirolinas Extremo Park', destination: 'Monteverde', recommendedDay: 'Mar 14 · 08:00', price: 63, currency: 'USD', priority: 'Comprar ya', link: 'https://monteverdetours.com/extremo-canopy-monteverde-costa-rica.html', action: 'Reservar', bought: false, paid: false, notes: 'Primer turno para llegar al posible partido.' },
    { id: 'kinkajou', name: 'Kinkajou Night Walk', destination: 'Monteverde', recommendedDay: 'Lun 13 · noche', price: 32, currency: 'USD', priority: 'Comprar ya', link: 'https://www.getyourguide.com/santa-elena-costa-rica-l180411/kinkajou-night-walk-in-monteverde-t473315/', action: 'Reservar', bought: false, paid: false, notes: 'Dos noches disponibles; priorizar el día 13.' },
    { id: 'mistico', name: 'Puentes Colgantes Místico', destination: 'La Fortuna', recommendedDay: 'Dom 12 · mañana', price: 40, currency: 'USD', priority: 'Comprar ya', link: 'https://misticopark.com/tours/self-guided-hanging-bridges/', action: 'Reservar', bought: false, paid: false, notes: 'Precio sin guía; con guía estimado 55–65 USD.' },
    { id: 'ferry-out', name: 'Ferry Puntarenas → Paquera', destination: 'Traslado Santa Teresa', recommendedDay: 'Mié 15', price: 0, currency: 'EUR', priority: 'Comprar ya', link: 'https://navieratambor.com/', action: 'Comprar', bought: false, paid: false, notes: 'Añadir importe real al comprar.' },
    { id: 'ferry-back', name: 'Ferry Paquera → Puntarenas', destination: 'Traslado Manuel Antonio', recommendedDay: 'Lun 20', price: 0, currency: 'EUR', priority: 'Comprar ya', link: 'https://navieratambor.com/', action: 'Comprar', bought: false, paid: false, notes: 'Coordinar con la salida del alojamiento.' },
    { id: 'cloud-forest', name: 'Bosque Nuboso Monteverde', destination: 'Monteverde', recommendedDay: 'Mar 14 o mié 15', price: 28, currency: 'USD', priority: 'Reservar pronto', link: 'https://cloudforestmonteverde.com/visit-the-preserve/', action: 'Reservar', bought: false, paid: false, notes: 'Solo cerrar si se convierte en imprescindible.' },
    { id: 'bajos', name: 'Catarata del Toro / Blue Falls', destination: 'Bajos del Toro', recommendedDay: 'Vie 10 · mañana', price: 25, currency: 'USD', priority: 'Reservar pronto', link: 'https://www.catarata-del-toro.com/prices/', action: 'Ver info', bought: false, paid: false, notes: 'Combo 25 USD; adaptar al partido de las 13:00.' },
    { id: 'baldi', name: 'Baldi Hot Springs', destination: 'La Fortuna', recommendedDay: 'Sáb 11 · tarde', price: 62, currency: 'USD', priority: 'Reservar pronto', link: 'https://www.baldihotsprings.cr/day-pass/', action: 'Ver info', bought: false, paid: false, notes: 'Alternativa gratis: El Choyín.' },
    { id: 'nauyaca', name: 'Nauyaca Waterfalls', destination: 'Manuel Antonio', recommendedDay: 'Mar 21', price: 12, currency: 'USD', priority: 'Flexible', link: 'https://www.nauyacawaterfall.com/', action: 'Ver info', bought: false, paid: false, notes: 'Solo si se elige frente al día chill de playas.' },
    { id: 'surf-st', name: 'Surf Santa Teresa (tabla)', destination: 'Santa Teresa', recommendedDay: '16–19 julio', price: 20, currency: 'USD', priority: 'Flexible', link: 'https://waltersurfshop.com/en/pages/surf-rentals', action: 'Ver info', bought: false, paid: false, notes: 'Decidir allí según mar y ganas.' },
    { id: 'montezuma', name: 'Cascadas Montezuma', destination: 'Santa Teresa', recommendedDay: 'Sáb 18', price: 5, currency: 'USD', priority: 'Flexible', link: 'https://www.twoweeksincostarica.com/montezuma-waterfalls/', action: 'Ver info', bought: false, paid: false, notes: 'Plan flexible después de la posible noche del 17.' },
    { id: 'cahuita', name: 'Parque Nacional Cahuita', destination: 'Puerto Viejo', recommendedDay: 'Vie 24 · mañana', price: 5, currency: 'USD', priority: 'Flexible', link: 'https://www.sinac.go.cr/es/ac/aclac/pnc/paginas/default.aspx', action: 'Ver info', bought: false, paid: false, notes: 'Donación / tarifa según sector.' },
    { id: 'jaguar', name: 'Jaguar Rescue Center', destination: 'Puerto Viejo', recommendedDay: 'Vie 24 · alternativa', price: 28, currency: 'USD', priority: 'Flexible', link: 'https://www.jaguarrescue.foundation/', action: 'Ver info', bought: false, paid: false, notes: 'No combinar con Cahuita + Punta Uva + surf.' },
  ],
  hotels: [
    { id: 'el-rodeo', destination: 'Alajuela', name: 'El Rodeo Estancia Boutique Hotel & Steakhouse', checkIn: '2026-07-09 15:00', checkOut: '2026-07-10 11:00', nights: 1, totalPrice: 68, address: 'Lado suroeste de Panasonic, San José, Costa Rica', status: 'Reservado', notes: '2 adultos · 1 habitación', link: 'https://www.google.com/maps/search/?api=1&query=El%20Rodeo%20Estancia%20Boutique%20Hotel%20%26%20Steakhouse%20Costa%20Rica', phone: 'Ver teléfono actualizado en la ficha de Google Maps', image: 'hotelElRodeo' },
    { id: 'natura', destination: 'La Fortuna', name: 'Natura Bungalows', checkIn: '2026-07-10 15:00', checkOut: '2026-07-13 11:00', nights: 3, totalPrice: 274, address: 'Jauri, La Fortuna, San Carlos, Costa Rica', status: 'Reservado', notes: '2 adultos · 1 bungalow · concretar hora con anfitrión', link: 'https://www.google.com/maps/search/?api=1&query=Natura%20Bungalows%20La%20Fortuna%20Costa%20Rica', phone: 'Ver teléfono actualizado en la ficha de Google Maps', image: 'hotelNatura' },
    { id: 'ecolove', destination: 'Monteverde', name: 'Monteverde Ecolove', checkIn: '2026-07-13 12:00', checkOut: '2026-07-15 10:00', nights: 2, totalPrice: 100, address: 'Junto al Centro de Acopio, Santa Elena, Monteverde', status: 'Reservado', notes: '2 adultos · 1 unidad', link: 'https://www.google.com/maps/search/?api=1&query=Monteverde%20Ecolove%20Costa%20Rica', phone: 'Ver teléfono actualizado en la ficha de Google Maps', image: 'hotelEcolove' },
    { id: 'believe', destination: 'Santa Teresa', name: 'Believe Surf & Yoga Lodge Santa Teresa', checkIn: '2026-07-15 14:00', checkOut: '2026-07-20 10:00', nights: 5, totalPrice: 269, address: '150 m norte de La Lora Amarilla, Playa Santa Teresa', status: 'Reservado', notes: '2 adultos · 1 habitación', link: 'https://www.google.com/maps/search/?api=1&query=Believe%20Surf%20%26%20Yoga%20Lodge%20Santa%20Teresa%20Costa%20Rica', phone: 'Ver teléfono actualizado en la ficha de Google Maps', image: 'hotelBelieve' },
    { id: 'tomaselli', destination: 'Manuel Antonio', name: 'Glamping Tomaselli', checkIn: '2026-07-20 14:00', checkOut: '2026-07-22 11:30', nights: 2, totalPrice: 129, address: 'Colina Monito Road, Manuel Antonio, Costa Rica', status: 'Reservado', notes: 'Atención: salida un día antes que la ruta escrita.', link: 'https://www.google.com/maps/search/?api=1&query=Glamping%20Tomaselli%20Manuel%20Antonio%20Costa%20Rica', phone: 'Ver teléfono actualizado en la ficha de Google Maps', image: 'hotelTomaselli' },
    { id: 'chilamate', destination: 'Puerto Viejo', name: 'Chilamate Holiday House', checkIn: '2026-07-22 15:00', checkOut: '2026-07-25 11:00', nights: 3, totalPrice: 217, address: 'Playa Negra, Puerto Viejo, Costa Rica', status: 'Reservado', notes: 'Atención: entrada un día antes que la ruta escrita.', link: 'https://www.google.com/maps/search/?api=1&query=Chilamate%20Holiday%20House%20Puerto%20Viejo%20Costa%20Rica', phone: 'Ver teléfono actualizado en la ficha de Google Maps', image: 'hotelChilamate' },
  ],
  budget: [
    { id: 'flights', category: 'Vuelos', adjusted: 1000, realistic: 1000, high: 1000, note: 'Por persona' },
    { id: 'car', category: 'Coche 4x4', adjusted: 422, realistic: 422, high: 422, note: 'Por persona, cifra del Word' },
    { id: 'fuel', category: 'Gasolina', adjusted: 120, realistic: 150, high: 170, note: 'Ruta estimada 1.900–2.200 km' },
    { id: 'road', category: 'Ferries, peajes y parkings', adjusted: 35, realistic: 45, high: 60, note: 'Dos ferries + pequeños gastos' },
    { id: 'hotels', category: 'Hoteles', adjusted: 500, realistic: 529, high: 550, note: 'Reservas capturadas: 1.057 € / 2 = 528,50 €' },
    { id: 'activities', category: 'Actividades', adjusted: 430, realistic: 500, high: 625, note: 'Guías y surf elevan el escenario alto' },
    { id: 'food', category: 'Comidas', adjusted: 350, realistic: 400, high: 450, note: '17 días; sodas + restaurantes' },
    { id: 'prep', category: 'Holafly + WiFi + IATI', adjusted: 131, realistic: 151, high: 156, note: '32 € + 19 € + seguro 80–105 €' },
    { id: 'extras', category: 'Extras, fiesta e imprevistos', adjusted: 60, realistic: 120, high: 180, note: 'Lavandería, bebidas, compras pequeñas' },
    { id: 'optional', category: 'Compras opcionales', adjusted: 0, realistic: 0, high: 150, note: 'Salomon + pantalón; fuera del presupuesto principal' },
  ],
  packing: [
    { id: 'docs', name: 'Documentación', items: ['Pasaporte', 'Carnet de conducir', 'Permiso internacional si aplica', 'Seguro IATI', 'Reservas descargadas', 'Tarjeta bancaria', 'Efectivo'].map((text, i) => ({ id: `docs-${i}`, text, checked: false })) },
    { id: 'tech', name: 'Tecnología', items: ['Móvil', 'Cargador móvil', 'iPad', 'Cargador iPad', 'Power bank', 'Adaptador de enchufe', 'Auriculares', 'Cámara / GoPro'].map((text, i) => ({ id: `tech-${i}`, text, checked: false })) },
    { id: 'clothes', name: 'Ropa', items: ['Camisetas transpirables', 'Bañadores', 'Ropa interior', 'Calcetines', 'Pantalón largo ligero', 'Pantalón corto', 'Sudadera fina', 'Chubasquero', 'Ropa para salir', 'Pijama'].map((text, i) => ({ id: `clothes-${i}`, text, checked: false })) },
    { id: 'shoes', name: 'Calzado', items: ['Salomon / zapatillas de trekking', 'Chanclas', 'Escarpines si aplica'].map((text, i) => ({ id: `shoes-${i}`, text, checked: false })) },
    { id: 'beach', name: 'Playa y surf', items: ['Toalla microfibra', 'Gafas de sol', 'Gorra', 'Bolsa impermeable', 'Crema solar', 'After sun'].map((text, i) => ({ id: `beach-${i}`, text, checked: false })) },
    { id: 'health', name: 'Salud', items: ['Repelente fuerte', 'Medicamentos básicos', 'Ibuprofeno / paracetamol', 'Biodramina si aplica', 'Tiritas', 'Fortasec / suero oral', 'Gel hidroalcohólico'].map((text, i) => ({ id: `health-${i}`, text, checked: false })) },
    { id: 'other', name: 'Otros', items: ['Candado', 'Mochila pequeña', 'Bolsas zip', 'Bolsa para ropa mojada', 'Libreta', 'Snacks'].map((text, i) => ({ id: `other-${i}`, text, checked: false })) },
  ],
  football: [
    { id: 'fra-mar', match: 'Francia – Marruecos', date: 'Jue 9 julio', costaRicaTime: '14:00', spainTime: '22:00', location: 'En el vuelo Madrid → San José', recommendation: 'La 1 / RTVE Play con WiFi del avión; asumir que puede fallar.', watched: false, venue: 'WiFi del avión', type: 'Confirmado' },
    { id: 'esp-bel', match: 'España – Bélgica', date: 'Vie 10 julio', costaRicaTime: '13:00', spainTime: '21:00', location: 'Bajos del Toro', recommendation: 'Buscar restaurante con TV/WiFi; plan B Holafly.', watched: false, venue: '', type: 'Confirmado' },
    { id: 'semi-spain', match: 'Posible semifinal de España', date: 'Mar 14 julio', costaRicaTime: '13:00', spainTime: '21:00', location: 'Monteverde', recommendation: 'Extremo Park a las 08:00 y bloquear 12:30–16:00.', watched: false, venue: '', type: 'Posible' },
    { id: 'semi-other', match: 'Otra semifinal', date: 'Mié 15 julio', costaRicaTime: '13:00', spainTime: '21:00', location: 'Traslado a Santa Teresa', recommendation: 'Solo seguir si interesa; puede coincidir con el ferry.', watched: false, venue: '', type: 'Posible' },
    { id: 'third', match: 'Tercer puesto', date: 'Sáb 18 julio', costaRicaTime: '15:00', spainTime: '23:00', location: 'Santa Teresa / Montezuma', recommendation: 'Ver solo si juega España o apetece.', watched: false, venue: '', type: 'Posible' },
    { id: 'final', match: 'Final del Mundial', date: 'Dom 19 julio', costaRicaTime: '13:00', spainTime: '21:00', location: 'Santa Teresa', recommendation: 'Nativo Sports Bar, Kooks o alojamiento con buena conexión.', watched: false, venue: '', type: 'Confirmado' },
  ],
  links: [
    { id: 'sinac', label: 'SINAC entradas', group: 'Reservas', url: 'https://serviciosenlinea.sinac.go.cr/' },
    { id: 'manuel', label: 'Manuel Antonio', group: 'Parques', url: 'https://www.sinac.go.cr/ES/ac/acopac/pnma/Paginas/default.aspx' },
    { id: 'extremo', label: 'Extremo Park', group: 'Actividades', url: 'https://monteverdetours.com/extremo-canopy-monteverde-costa-rica.html' },
    { id: 'mistico', label: 'Místico', group: 'Actividades', url: 'https://misticopark.com/tours/self-guided-hanging-bridges/' },
    { id: 'kinkajou', label: 'Kinkajou', group: 'Actividades', url: 'https://www.getyourguide.com/santa-elena-costa-rica-l180411/kinkajou-night-walk-in-monteverde-t473315/' },
    { id: 'baldi', label: 'Baldi', group: 'Actividades', url: 'https://www.baldihotsprings.cr/day-pass/' },
    { id: 'ferry', label: 'Naviera Tambor', group: 'Transporte', url: 'https://navieratambor.com/' },
    { id: 'falls', label: 'Catarata del Toro / Blue Falls', group: 'Actividades', url: 'https://www.catarata-del-toro.com/prices/' },
    { id: 'nauyaca', label: 'Nauyaca', group: 'Actividades', url: 'https://www.nauyacawaterfall.com/' },
    { id: 'holafly', label: 'Holafly', group: 'Preparación', url: 'https://esim.holafly.com/es/' },
    { id: 'iati', label: 'IATI', group: 'Preparación', url: 'https://www.iatiseguros.com/' },
    { id: 'rtve', label: 'RTVE Play', group: 'Fútbol', url: 'https://www.rtve.es/play/' },
    { id: 'tdmax', label: 'TDMAX', group: 'Fútbol', url: 'https://tdmax.com/' },
    { id: 'maps-alajuela', label: 'Mapa Alajuela', group: 'Mapas', url: 'https://www.google.com/maps/search/?api=1&query=Alajuela+Costa+Rica' },
    { id: 'maps-fortuna', label: 'Mapa La Fortuna', group: 'Mapas', url: 'https://www.google.com/maps/search/?api=1&query=La+Fortuna+Costa+Rica' },
    { id: 'maps-monteverde', label: 'Mapa Monteverde', group: 'Mapas', url: 'https://www.google.com/maps/search/?api=1&query=Monteverde+Costa+Rica' },
    { id: 'maps-santa', label: 'Mapa Santa Teresa', group: 'Mapas', url: 'https://www.google.com/maps/search/?api=1&query=Santa+Teresa+Costa+Rica' },
    { id: 'maps-manuel', label: 'Mapa Manuel Antonio', group: 'Mapas', url: 'https://www.google.com/maps/search/?api=1&query=Manuel+Antonio+Costa+Rica' },
    { id: 'maps-puerto', label: 'Mapa Puerto Viejo', group: 'Mapas', url: 'https://www.google.com/maps/search/?api=1&query=Puerto+Viejo+Costa+Rica' },
  ],
}
