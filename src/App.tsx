import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertTriangle,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock3,
  Download,
  ExternalLink,
  Hotel as HotelIcon,
  Link2,
  Luggage,
  Map as MapIcon,
  MapPin,
  Menu,
  Phone,
  Palmtree,
  Plane,
  Plus,
  RotateCcw,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  Trash2,
  Trophy,
  Upload,
  WalletCards,
  Waves,
  X,
} from 'lucide-react'
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import { imageFallback, images } from './data/images'
import {
  initialTripData,
  type Activity,
  type BudgetRow,
  type Destination,
  type FootballMatch,
  type FlightLeg,
  type Hotel,
  type PackingCategory,
  type Status,
  type TripData,
  type TripDay,
} from './data/tripData'

const STORAGE_KEY = 'costa-rica-2026-data-v1'
const palette = ['#0b6e4f', '#16a085', '#35b778', '#f0b44d', '#ef765e', '#2686a3', '#6d5bd0', '#a4b444', '#d99058', '#7d8b96']

const navItems = [
  { id: 'inicio', label: 'Inicio', icon: Palmtree },
  { id: 'familia', label: 'Familia', icon: ShieldCheck },
  { id: 'ruta', label: 'Ruta', icon: Route },
  { id: 'destinos', label: 'Destinos', icon: MapPin },
  { id: 'reservas', label: 'Reservas', icon: TicketCheck },
  { id: 'presupuesto', label: 'Presupuesto', icon: WalletCards },
  { id: 'hoteles', label: 'Hoteles', icon: HotelIcon },
  { id: 'maleta', label: 'Maleta', icon: Luggage },
  { id: 'futbol', label: 'Fútbol', icon: Trophy },
  { id: 'mapa', label: 'Mapa', icon: MapIcon },
  { id: 'links', label: 'Links', icon: Link2 },
]

function cloneInitialData() {
  return structuredClone(initialTripData)
}

function mergeTripData(saved: TripData): TripData {
  const base = cloneInitialData()
  return {
    ...base,
    ...saved,
    meta: { ...base.meta, ...saved.meta },
    flights: { ...base.flights, ...saved.flights, legs: saved.flights?.legs ?? base.flights.legs },
    car: { ...base.car, ...saved.car },
    days: saved.days ?? base.days,
    destinations: saved.destinations ?? base.destinations,
    activities: saved.activities ?? base.activities,
    hotels: (saved.hotels ?? base.hotels).map((hotel) => {
      const original = base.hotels.find((item) => item.id === hotel.id)
      return original ? { ...original, ...hotel } : hotel
    }),
    budget: saved.budget ?? base.budget,
    packing: saved.packing ?? base.packing,
    football: saved.football ?? base.football,
    links: saved.links ?? base.links,
  }
}

function loadData(): TripData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? mergeTripData(JSON.parse(saved) as TripData) : cloneInitialData()
  } catch {
    return cloneInitialData()
  }
}

function money(value: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
}

function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function mapsDirectionsUrl(origin: string, destination: string) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
}

function cleanMapQuery(value: string) {
  return value
    .replace(/[⚠]/g, '')
    .replace(/\(ruta\)|\(reserva\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function dayMapLinks(day: TripDay) {
  const destination = `${cleanMapQuery(day.destination)} Costa Rica`
  const overnight = cleanMapQuery(day.overnight)
  const links = [
    { label: 'Destino', url: mapsSearchUrl(destination), icon: MapPin },
  ]

  if (overnight && !/vuelo|por confirmar/i.test(overnight)) {
    links.push({ label: 'Alojamiento', url: mapsSearchUrl(`${overnight} Costa Rica`), icon: HotelIcon })
  }

  const transfer = day.transfers.find((entry) => entry.includes('→') || entry.includes('â†’'))
  const parts = transfer?.split(/→|â†’/).map((part) => cleanMapQuery(part.split('·')[0])).filter(Boolean)
  if (parts && parts.length >= 2) {
    links.push({ label: 'Ruta', url: mapsDirectionsUrl(`${parts[0]} Costa Rica`, `${parts.at(-1)} Costa Rica`), icon: Route })
  }

  return links
}

function zonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '00'
  return {
    iso: `${get('year')}-${get('month')}-${get('day')}`,
    time: `${get('hour')}:${get('minute')}`,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

function scheduleMinute(entry: string, index: number) {
  const time = entry.match(/(\d{1,2}):(\d{2})/)
  if (time) return Number(time[1]) * 60 + Number(time[2])
  const lower = entry.toLowerCase()
  if (lower.includes('muy temprano')) return 6 * 60 + 30
  if (lower.includes('salir') || lower.includes('salida temprana')) return 7 * 60
  if (lower.includes('mañana') || lower.includes('maã±ana')) return 9 * 60 + index * 35
  if (lower.includes('mediodía') || lower.includes('mediodã­a')) return 12 * 60
  if (lower.includes('tarde')) return 15 * 60 + index * 20
  if (lower.includes('llegada')) return 18 * 60
  if (lower.includes('noche')) return 20 * 60
  return 8 * 60 + index * 120
}

function destinationForDay(day: TripDay, destinations: Destination[]) {
  const text = `${day.destination} ${day.overnight}`.toLowerCase()
  return destinations.find((destination) => {
    if (destination.id === 'arenal') return text.includes('fortuna') || text.includes('arenal') || text.includes('natura')
    if (destination.id === 'santa-teresa') return text.includes('santa teresa') || text.includes('believe')
    if (destination.id === 'manuel-antonio') return text.includes('manuel antonio') || text.includes('tomaselli')
    if (destination.id === 'puerto-viejo') return text.includes('puerto viejo') || text.includes('chilamate')
    return text.includes(destination.name.split(' ')[0].toLowerCase()) || text.includes(destination.hotel.toLowerCase())
  }) ?? destinations[0]
}

function hotelForDay(day: TripDay, hotels: Hotel[]) {
  const text = `${day.overnight} ${day.destination}`.toLowerCase()
  if (text.includes('vuelo')) return undefined
  return hotels.find((hotel) => text.includes(hotel.name.toLowerCase()) || text.includes(hotel.destination.toLowerCase()))
}

function flightState(flight: FlightLeg, now: Date) {
  const depart = new Date(flight.departUtc)
  const arrive = new Date(flight.arriveUtc)
  if (now < depart) return { label: 'Pendiente', tone: 'gold' as const, detail: 'Todavía no ha salido.' }
  if (now > arrive) return { label: 'Aterrizado', tone: 'green' as const, detail: 'El vuelo ya debería haber llegado.' }
  const total = arrive.getTime() - depart.getTime()
  const elapsed = now.getTime() - depart.getTime()
  return { label: 'En vuelo', tone: 'blue' as const, detail: `${Math.round((elapsed / total) * 100)}% del trayecto previsto.` }
}

function activeFlight(flights: FlightLeg[], now: Date) {
  return flights.find((flight) => {
    const depart = new Date(flight.departUtc)
    const arrive = new Date(flight.arriveUtc)
    return now >= new Date(depart.getTime() - 6 * 60 * 60 * 1000) && now <= new Date(arrive.getTime() + 6 * 60 * 60 * 1000)
  }) ?? flights.find((flight) => now < new Date(flight.departUtc)) ?? flights.at(-1)!
}

function Photo({ imageKey, className = '', compact = false }: { imageKey: keyof typeof images; className?: string; compact?: boolean }) {
  const image = images[imageKey]
  return (
    <figure className={`photo ${className}`}>
      <img src={image.url} alt={image.alt} loading={compact ? 'lazy' : 'eager'} onError={(event) => { event.currentTarget.src = imageFallback }} />
      {!compact && <figcaption>{image.location}</figcaption>}
    </figure>
  )
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function Badge({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'coral' | 'gold' | 'blue' | 'neutral' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

function StatusControl({ value, onChange }: { value: Status; onChange: (status: Status) => void }) {
  return (
    <select className={`status-select status-${value}`} value={value} onChange={(event) => onChange(event.target.value as Status)} aria-label="Estado del día">
      <option value="pending">Pendiente</option>
      <option value="reserved">Reservado</option>
      <option value="done">Hecho</option>
    </select>
  )
}

function App() {
  const [data, setData] = useState<TripData>(loadData)
  const [activeDestination, setActiveDestination] = useState(data.destinations[0].id)
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [savedPulse, setSavedPulse] = useState(false)
  const [newPacking, setNewPacking] = useState<Record<string, string>>({})
  const [now, setNow] = useState(() => new Date())
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setSavedPulse(true)
    const timer = window.setTimeout(() => setSavedPulse(false), 850)
    return () => window.clearTimeout(timer)
  }, [data])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const totals = useMemo(() => ({
    adjusted: data.budget.reduce((sum, row) => sum + row.adjusted, 0),
    realistic: data.budget.reduce((sum, row) => sum + row.realistic, 0),
    high: data.budget.reduce((sum, row) => sum + row.high, 0),
  }), [data.budget])

  const packingStats = useMemo(() => {
    const items = data.packing.flatMap((category) => category.items)
    const checked = items.filter((item) => item.checked).length
    return { total: items.length, checked, percent: items.length ? Math.round((checked / items.length) * 100) : 0 }
  }, [data.packing])

  const urgentReservations = data.activities.filter((activity) => activity.priority === 'Comprar ya' && !activity.bought).length
  const activeDest = data.destinations.find((destination) => destination.id === activeDestination) ?? data.destinations[0]
  const todayIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date())
  const currentDay = data.days.find((day) => day.isoDate === todayIso) ?? data.days.find((day) => day.isoDate > todayIso) ?? data.days.at(-1)!
  const costaRicaNow = zonedParts(now, 'America/Costa_Rica')
  const spainNow = zonedParts(now, 'Europe/Madrid')
  const liveDay = data.days.find((day) => day.isoDate === costaRicaNow.iso)
    ?? data.days.find((day) => day.isoDate > costaRicaNow.iso)
    ?? data.days.at(-1)!
  const liveDestination = destinationForDay(liveDay, data.destinations)
  const liveHotel = hotelForDay(liveDay, data.hotels)
  const liveSchedule = liveDay.schedule.map((entry, index) => ({ entry, minute: scheduleMinute(entry, index) })).sort((a, b) => a.minute - b.minute)
  const activeScheduleIndex = liveDay.isoDate === costaRicaNow.iso
    ? Math.max(0, liveSchedule.reduce((last, item, index) => item.minute <= costaRicaNow.minutes ? index : last, -1))
    : 0
  const activeSchedule = liveSchedule[activeScheduleIndex] ?? liveSchedule[0]
  const nextSchedule = liveSchedule[activeScheduleIndex + 1]
  const livePhase = costaRicaNow.iso < data.days[0].isoDate ? 'El viaje aún no ha empezado' : costaRicaNow.iso > data.days.at(-1)!.isoDate ? 'Viaje terminado' : liveDay.isoDate === costaRicaNow.iso ? 'En directo' : 'Próxima etapa'
  const familyFlight = activeFlight(data.flights.legs, now)
  const familyFlightState = flightState(familyFlight, now)

  const updateDay = (id: string, patch: Partial<TripDay>) => setData((current) => ({ ...current, days: current.days.map((day) => day.id === id ? { ...day, ...patch } : day) }))
  const updateActivity = (id: string, patch: Partial<Activity>) => setData((current) => ({ ...current, activities: current.activities.map((activity) => activity.id === id ? { ...activity, ...patch } : activity) }))
  const updateHotel = (id: string, patch: Partial<Hotel>) => setData((current) => ({ ...current, hotels: current.hotels.map((hotel) => hotel.id === id ? { ...hotel, ...patch } : hotel) }))
  const updateBudget = (id: string, patch: Partial<BudgetRow>) => setData((current) => ({ ...current, budget: current.budget.map((row) => row.id === id ? { ...row, ...patch } : row) }))
  const updateMatch = (id: string, patch: Partial<FootballMatch>) => setData((current) => ({ ...current, football: current.football.map((match) => match.id === id ? { ...match, ...patch } : match) }))

  const toggleDayTask = (dayId: string, taskId: string) => setData((current) => ({
    ...current,
    days: current.days.map((day) => day.id !== dayId ? day : {
      ...day,
      tasks: day.tasks.map((item) => item.id === taskId ? { ...item, done: !item.done } : item),
    }),
  }))

  const togglePacking = (categoryId: string, itemId: string) => setData((current) => ({
    ...current,
    packing: current.packing.map((category) => category.id !== categoryId ? category : {
      ...category,
      items: category.items.map((item) => item.id === itemId ? { ...item, checked: !item.checked } : item),
    }),
  }))

  const editPacking = (categoryId: string, itemId: string, text: string) => setData((current) => ({
    ...current,
    packing: current.packing.map((category) => category.id !== categoryId ? category : {
      ...category,
      items: category.items.map((item) => item.id === itemId ? { ...item, text } : item),
    }),
  }))

  const addPacking = (categoryId: string) => {
    const value = newPacking[categoryId]?.trim()
    if (!value) return
    setData((current) => ({
      ...current,
      packing: current.packing.map((category) => category.id !== categoryId ? category : {
        ...category,
        items: [...category.items, { id: `${categoryId}-${Date.now()}`, text: value, checked: false }],
      }),
    }))
    setNewPacking((current) => ({ ...current, [categoryId]: '' }))
  }

  const removePacking = (categoryId: string, itemId: string) => setData((current) => ({
    ...current,
    packing: current.packing.map((category) => category.id !== categoryId ? category : {
      ...category,
      items: category.items.filter((item) => item.id !== itemId),
    }),
  }))

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'costa-rica-2026-datos.json'
    document.body.appendChild(link)
    link.click()
    window.setTimeout(() => {
      link.remove()
      URL.revokeObjectURL(url)
    }, 1000)
  }

  const importData = async (file?: File) => {
    if (!file) return
    try {
      const parsed = JSON.parse(await file.text()) as TripData
      if (!parsed?.days || !parsed?.budget || !parsed?.packing) throw new Error('Formato incompleto')
      setData(parsed)
    } catch {
      window.alert('No se pudo importar el archivo. Comprueba que sea un JSON exportado desde esta web.')
    }
  }

  const resetData = () => {
    if (window.confirm('¿Resetear todos los checks, notas, precios y cambios al contenido original?')) setData(cloneInitialData())
  }

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const matchingDays = data.days.filter((day) => `${day.destination} ${day.title} ${day.summary} ${day.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()))
  const matchingActivities = data.activities.filter((activity) => `${activity.name} ${activity.destination} ${activity.priority}`.toLowerCase().includes(search.toLowerCase()))
  const maxTotal = Math.max(totals.adjusted, totals.realistic, totals.high)
  let angle = 0
  const donutGradient = data.budget.map((row, index) => {
    const start = angle
    angle += totals.realistic ? (row.realistic / totals.realistic) * 360 : 0
    return `${palette[index % palette.length]} ${start}deg ${angle}deg`
  }).join(', ')
  const routePositions = data.destinations.map((destination) => destination.coordinates as LatLngExpression)

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => goTo('inicio')} aria-label="Ir al inicio">
          <span className="brand-mark"><Palmtree size={20} /></span>
          <span>Costa Rica <strong>2026</strong></span>
        </button>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.slice(0, 8).map(({ id, label }) => <button key={id} onClick={() => goTo(id)}>{label}</button>)}
        </nav>
        <div className="top-actions">
          <span className={`save-state ${savedPulse ? 'pulse' : ''}`}><Check size={14} /> Guardado local</span>
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-drawer">
          {navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => goTo(id)}><Icon size={18} /> {label}</button>)}
        </div>
      )}

      <main>
        <section id="inicio" className="hero section-anchor">
          <Photo imageKey="arenal" className="hero-photo" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <Badge tone="gold"><Sparkles size={14} /> 17 días · 6 bases · pura vida</Badge>
            <h1>Costa Rica <em>2026</em></h1>
            <p className="hero-subtitle">Volcanes, selva, surf y Caribe</p>
            <div className="hero-date"><CalendarDays size={18} /> 9–25 de julio · 2 viajeros</div>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => goTo('ruta')}><Route size={18} /> Ver ruta</button>
              <button className="button button-ghost-light" onClick={() => goTo('mapa')}><MapIcon size={18} /> Abrir mapa</button>
            </div>
          </div>
          <div className="hero-stamp">CR<br /><strong>’26</strong></div>
        </section>

        <div className="content-wrap dashboard-wrap">
          <div className="privacy-note"><ShieldCheck size={17} /><span>Versión pública sin datos personales ni localizadores de reserva. Las ediciones se guardan solo en este navegador.</span></div>
          <div className="alert-card"><AlertTriangle size={22} /><div><strong>Hay una fecha por resolver</strong><p>{data.meta.conflict}</p></div><button onClick={() => goTo('hoteles')}>Revisar hoteles</button></div>

          <div className="dashboard-grid">
            <article className="dash-card dash-feature">
              <span className="card-kicker">Lo próximo</span>
              <div className="dash-icon"><CalendarDays /></div>
              <h3>Día {currentDay.day} · {currentDay.destination}</h3>
              <p>{currentDay.title}</p>
              <button className="text-link" onClick={() => goTo('ruta')}>Abrir día <ChevronDown size={15} /></button>
            </article>
            <article className="dash-card">
              <span className="card-kicker">Reservas</span>
              <div className="metric-row"><strong>{urgentReservations}</strong><TicketCheck /></div>
              <h3>compras prioritarias</h3>
              <p>Entradas, tirolinas, Místico, night tour y ferries.</p>
              <button className="text-link" onClick={() => goTo('reservas')}>Ver pendientes</button>
            </article>
            <article className="dash-card budget-card">
              <span className="card-kicker">Total realista</span>
              <div className="metric-row"><strong>{money(totals.realistic)}</strong><WalletCards /></div>
              <h3>por persona</h3>
              <p>Incluye reservas, seguro, comidas y margen.</p>
              <button className="text-link" onClick={() => goTo('presupuesto')}>Editar presupuesto</button>
            </article>
            <article className="dash-card">
              <span className="card-kicker">Maleta</span>
              <div className="metric-row"><strong>{packingStats.percent}%</strong><Luggage /></div>
              <div className="mini-progress"><span style={{ width: `${packingStats.percent}%` }} /></div>
              <p>{packingStats.checked} de {packingStats.total} cosas listas.</p>
              <button className="text-link" onClick={() => goTo('maleta')}>Seguir preparando</button>
            </article>
          </div>

          <div className="transport-strip">
            <div><Plane /><span><small>IDA</small>{data.flights.outbound}</span></div>
            <div><Car /><span><small>4×4</small>{data.car.model}</span></div>
            <div><Plane className="flip" /><span><small>VUELTA</small>{data.flights.return}</span></div>
          </div>
        </div>

        <section id="familia" className="section family-section section-anchor">
          <div className="content-wrap">
            <SectionTitle eyebrow="Seguimiento para padres" title="Dónde estamos ahora" text="Una vista sencilla que se actualiza sola con la fecha y hora de Costa Rica. En julio hay 8 horas menos que en España." />
            <div className="family-grid">
              <article className="family-live-card">
                <div className="live-status-row">
                  <Badge tone={livePhase === 'En directo' ? 'green' : 'gold'}>{livePhase}</Badge>
                  <span>Actualiza cada minuto</span>
                </div>
                <h3>Día {liveDay.day}: {liveDay.destination}</h3>
                <p>{liveDay.title}</p>
                <div className="time-compare">
                  <div><small>Costa Rica</small><strong>{costaRicaNow.time}</strong><span>{costaRicaNow.iso}</span></div>
                  <div><small>España</small><strong>{spainNow.time}</strong><span>{spainNow.iso}</span></div>
                </div>
                <div className="now-plan">
                  <span>Ahora / plan previsto</span>
                  <strong>{activeSchedule?.entry ?? liveDay.summary}</strong>
                  {nextSchedule && <p>Siguiente: {nextSchedule.entry}</p>}
                </div>
              </article>

              <article className="family-map-card">
                <MapContainer key={liveDestination.id} center={liveDestination.coordinates} zoom={9} scrollWheelZoom={false}>
                  <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Polyline positions={routePositions} pathOptions={{ color: '#ef765e', weight: 3, dashArray: '8 9' }} />
                  {data.destinations.map((destination, index) => (
                    <CircleMarker key={destination.id} center={destination.coordinates} radius={destination.id === liveDestination.id ? 14 : 7} pathOptions={{ color: '#fff', weight: 3, fillColor: destination.id === liveDestination.id ? '#ef765e' : palette[index], fillOpacity: 1 }}>
                      <Popup><strong>{destination.name}</strong><br />{destination.dates}</Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
                <div className="family-map-caption"><MapPin size={17} /><span>Punto marcado: <strong>{liveDestination.name}</strong></span></div>
              </article>
            </div>

            <div className="family-info-grid">
              <article className="parents-card">
                <h3><HotelIcon size={20} /> Hotel de referencia</h3>
                {liveHotel ? (
                  <>
                    <strong>{liveHotel.name}</strong>
                    <p>{liveHotel.destination} · {liveHotel.checkIn.split(' ')[0]} → {liveHotel.checkOut.split(' ')[0]}</p>
                    <p>{liveHotel.address}</p>
                    <div className="parents-contact"><Phone size={17} /><span>{liveHotel.phone}</span></div>
                    <div className="link-row">
                      <a className="button button-small" href={liveHotel.link} target="_blank" rel="noreferrer">Ficha hotel / teléfono<ExternalLink size={14} /></a>
                      <a className="button button-small" href={mapsSearchUrl(`${liveHotel.name} ${liveHotel.address}`)} target="_blank" rel="noreferrer">Abrir mapa<ExternalLink size={14} /></a>
                    </div>
                  </>
                ) : (
                  <>
                    <strong>Hoy no hay hotel activo</strong>
                    <p>Es día de vuelo o traslado final. Mirad el bloque “Ahora” y el mapa para la referencia.</p>
                  </>
                )}
              </article>

              <article className="parents-card">
                <h3><Route size={20} /> Plan del día</h3>
                <ol className="parents-schedule">
                  {liveSchedule.map((item) => <li key={item.entry} className={item.entry === activeSchedule?.entry ? 'active' : ''}>{item.entry}</li>)}
                </ol>
              </article>

              <article className="parents-card flight-card">
                <h3><Plane size={20} /> Seguimiento del vuelo</h3>
                <div className="flight-main">
                  <Badge tone={familyFlightState.tone}>{familyFlightState.label}</Badge>
                  <strong>{familyFlight.operator} {familyFlight.flightNumber}</strong>
                  <p>{familyFlight.label} · {familyFlight.duration}</p>
                </div>
                <div className="flight-route">
                  <div><small>Salida</small><strong>{familyFlight.from}</strong><span>{familyFlight.departLocal}</span></div>
                  <Plane size={22} />
                  <div><small>Llegada</small><strong>{familyFlight.to}</strong><span>{familyFlight.arriveLocal}</span></div>
                </div>
                <p className="flight-note">{familyFlightState.detail}</p>
                <div className="link-row">
                  <a className="button button-small" href={familyFlight.trackerUrl} target="_blank" rel="noreferrer">Ver en FlightRadar24<ExternalLink size={14} /></a>
                  <a className="button button-small" href={`https://www.google.com/search?q=${encodeURIComponent(`${familyFlight.operator} ${familyFlight.flightNumber} flight status`)}`} target="_blank" rel="noreferrer">Estado del vuelo<ExternalLink size={14} /></a>
                </div>
              </article>

              <article className="parents-card calm-card">
                <h3><ShieldCheck size={20} /> Lectura rápida</h3>
                <p><strong>Si no contestamos:</strong> probablemente estaremos conduciendo, sin cobertura, en una actividad o con el móvil guardado.</p>
                <p><strong>Referencia horaria:</strong> cuando en Costa Rica son las {costaRicaNow.time}, en España son las {spainNow.time}.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="ruta" className="section section-anchor">
          <div className="content-wrap">
            <div className="heading-row">
              <SectionTitle eyebrow="Día a día" title="La ruta, sin perder el hilo" text="Abre cada jornada, marca lo que ya está hecho y deja notas sobre la marcha." />
              <label className="search-field"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar ruta o actividad" /></label>
            </div>
            <div className="route-list">
              {matchingDays.map((day, index) => (
                <details className="day-card" key={day.id} open={index === 0 && !search}>
                  <summary>
                    <div className="day-number">{String(day.day).padStart(2, '0')}</div>
                    <div className="day-summary-main"><span>{day.dateLabel}</span><h3>{day.title}</h3><p><MapPin size={14} /> {day.destination} · Noche: {day.overnight}</p></div>
                    <div className="day-summary-meta">
                      <StatusControl value={day.status} onChange={(status) => updateDay(day.id, { status })} />
                      <div className="tag-row">{day.tags.slice(0, 2).map((tag) => <Badge key={tag} tone="neutral">{tag}</Badge>)}</div>
                    </div>
                    <ChevronDown className="summary-chevron" />
                  </summary>
                  <div className="day-detail">
                    {day.alert && <div className="inline-alert"><AlertTriangle size={18} /><strong>{day.alert}</strong></div>}
                    <div className="day-detail-grid">
                      <div>
                        <h4><Clock3 size={17} /> Plan</h4>
                        <ol className="schedule-list">{day.schedule.map((entry) => <li key={entry}>{entry}</li>)}</ol>
                      </div>
                      <div>
                        <h4><Car size={17} /> Logística</h4>
                        {day.transfers.length ? <ul className="clean-list">{day.transfers.map((entry) => <li key={entry}>{entry}</li>)}</ul> : <p className="muted">Sin traslado largo.</p>}
                        <h4 className="spaced"><WalletCards size={17} /> Coste</h4>
                        <p>{day.costs}</p>
                      </div>
                      <div>
                        <h4><CheckCircle2 size={17} /> Checklist</h4>
                        <div className="task-list">{day.tasks.map((item) => (
                          <label key={item.id} className={item.done ? 'checked' : ''}>
                            <input type="checkbox" checked={item.done} onChange={() => toggleDayTask(day.id, item.id)} />
                            {item.done ? <CheckCircle2 /> : <Circle />}<span>{item.label}</span>{item.reservation && <Badge tone="coral">reserva</Badge>}
                          </label>
                        ))}</div>
                      </div>
                    </div>
                    {day.football && <div className="football-ribbon"><Trophy size={18} /><strong>{day.football}</strong></div>}
                    <div className="day-map-panel">
                      <div>
                        <h4><MapIcon size={17} /> Mapa</h4>
                        <p>Abre el destino, el alojamiento o la ruta del día en Google Maps.</p>
                      </div>
                      <div className="map-link-row">
                        {dayMapLinks(day).map(({ label, url, icon: Icon }) => (
                          <a className="button button-small" key={`${day.id}-${label}`} href={url} target="_blank" rel="noreferrer">
                            <Icon size={15} /> {label}<ExternalLink size={13} />
                          </a>
                        ))}
                      </div>
                    </div>
                    <label className="notes-field"><span>Notas editables</span><textarea value={day.notes} onChange={(event) => updateDay(day.id, { notes: event.target.value })} rows={3} /></label>
                    {day.links.length > 0 && <div className="link-row">{day.links.map((link) => <a className="button button-small" key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}<ExternalLink size={14} /></a>)}</div>}
                  </div>
                </details>
              ))}
              {!matchingDays.length && <div className="empty-state"><Search /><h3>No encontramos nada</h3><p>Prueba con “surf”, “volcán” o “fútbol”.</p></div>}
            </div>
          </div>
        </section>

        <section id="destinos" className="section section-tint section-anchor">
          <div className="content-wrap">
            <SectionTitle eyebrow="Seis mundos" title="Destinos" text="Una ruta que cambia de clima, ritmo y paisaje casi cada dos días." />
            <div className="destination-tabs" role="tablist">
              {data.destinations.map((destination) => <button role="tab" aria-selected={activeDest.id === destination.id} className={activeDest.id === destination.id ? 'active' : ''} key={destination.id} onClick={() => setActiveDestination(destination.id)}>{destination.name}</button>)}
            </div>
            <DestinationPanel destination={activeDest} />
          </div>
        </section>

        <section id="reservas" className="section section-anchor">
          <div className="content-wrap">
            <div className="heading-row">
              <SectionTitle eyebrow="Antes de volar" title="Actividades y reservas" text="Prioridades claras, enlaces directos y estados que no se pierden al cerrar la web." />
              <div className="reservation-count"><strong>{data.activities.filter((item) => item.bought).length}</strong> / {data.activities.length}<span>compradas</span></div>
            </div>
            <div className="table-wrap">
              <table className="activity-table">
                <thead><tr><th>Actividad</th><th>Cuándo</th><th>Precio</th><th>Prioridad</th><th>Comprado</th><th>Pagado</th><th>Notas</th><th /></tr></thead>
                <tbody>{matchingActivities.map((activity) => (
                  <tr key={activity.id} className={activity.bought ? 'row-done' : ''}>
                    <td><strong>{activity.name}</strong><small>{activity.destination}</small></td>
                    <td>{activity.recommendedDay}</td>
                    <td><div className="price-input"><input type="number" min="0" value={activity.price} onChange={(event) => updateActivity(activity.id, { price: Number(event.target.value) })} /><span>{activity.currency}</span></div></td>
                    <td><Badge tone={activity.priority === 'Comprar ya' ? 'coral' : activity.priority === 'Reservar pronto' ? 'gold' : 'neutral'}>{activity.priority}</Badge></td>
                    <td><button className={`check-button ${activity.bought ? 'active' : ''}`} onClick={() => updateActivity(activity.id, { bought: !activity.bought })} aria-label="Marcar comprado">{activity.bought ? <CheckCircle2 /> : <Circle />}</button></td>
                    <td><button className={`check-button ${activity.paid ? 'active' : ''}`} onClick={() => updateActivity(activity.id, { paid: !activity.paid })} aria-label="Marcar pagado">{activity.paid ? <CheckCircle2 /> : <Circle />}</button></td>
                    <td><input className="table-note" value={activity.notes} onChange={(event) => updateActivity(activity.id, { notes: event.target.value })} /></td>
                    <td><a className="action-link" href={activity.link} target="_blank" rel="noreferrer">{activity.action}<ExternalLink size={14} /></a></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="presupuesto" className="section budget-section section-anchor">
          <div className="content-wrap">
            <SectionTitle eyebrow="Por persona" title="Presupuesto vivo" text="Edita cualquier cifra: los escenarios, el total y los gráficos se recalculan al instante." />
            <div className="budget-hero-grid">
              <article className="total-card"><span>Estimación realista</span><strong>{money(totals.realistic)}</strong><p>Referencia del Word: 3.300 € sin compras opcionales.</p><div className="total-range"><span>Ajustado {money(totals.adjusted)}</span><span>Alto {money(totals.high)}</span></div></article>
              <article className="donut-card">
                <div className="donut" style={{ background: `conic-gradient(${donutGradient})` }}><div><strong>{money(totals.realistic)}</strong><span>total</span></div></div>
                <div className="donut-legend">{data.budget.slice(0, 6).map((row, index) => <span key={row.id}><i style={{ background: palette[index] }} />{row.category}</span>)}</div>
              </article>
              <article className="scenario-card"><h3>Comparativa</h3>{(['adjusted', 'realistic', 'high'] as const).map((scenario) => <div className="scenario-bar" key={scenario}><span>{scenario === 'adjusted' ? 'Ajustado' : scenario === 'realistic' ? 'Realista' : 'Alto'}</span><div><i style={{ width: `${(totals[scenario] / maxTotal) * 100}%` }} /></div><strong>{money(totals[scenario])}</strong></div>)}</article>
            </div>
            <div className="table-wrap budget-table-wrap">
              <table className="budget-table"><thead><tr><th>Categoría</th><th>Ajustado</th><th>Realista</th><th>Alto</th><th>Nota</th></tr></thead><tbody>{data.budget.map((row) => <tr key={row.id}><td><i style={{ background: palette[data.budget.indexOf(row)] }} /> <strong>{row.category}</strong></td>{(['adjusted', 'realistic', 'high'] as const).map((field) => <td key={field}><div className="currency-input"><input type="number" min="0" value={row[field]} onChange={(event) => updateBudget(row.id, { [field]: Number(event.target.value) })} /><span>€</span></div></td>)}<td><input value={row.note} onChange={(event) => updateBudget(row.id, { note: event.target.value })} /></td></tr>)}</tbody><tfoot><tr><td>Total</td><td>{money(totals.adjusted)}</td><td>{money(totals.realistic)}</td><td>{money(totals.high)}</td><td /></tr></tfoot></table>
            </div>
            <button className="button button-outline" onClick={() => setData((current) => ({ ...current, budget: cloneInitialData().budget }))}><RotateCcw size={16} /> Resetear presupuesto original</button>
          </div>
        </section>

        <section id="hoteles" className="section section-tint section-anchor">
          <div className="content-wrap">
            <SectionTitle eyebrow="16 noches reservadas" title="Hoteles" text="Las fechas y precios proceden de las capturas del Word. Puedes completar enlaces, notas y estados." />
            <div className="hotel-grid">{data.hotels.map((hotel) => (
              <article className="hotel-card" key={hotel.id}>
                <Photo imageKey={hotel.image} compact />
                <div className="hotel-content">
                  <div className="hotel-top"><div><Badge tone="green">{hotel.destination}</Badge><h3>{hotel.name}</h3></div><select value={hotel.status} onChange={(event) => updateHotel(hotel.id, { status: event.target.value as Hotel['status'] })}><option>Reservado</option><option>Pendiente</option><option>Pagado</option></select></div>
                  {hotel.notes.toLowerCase().includes('atención') && <div className="hotel-warning"><AlertTriangle size={15} /> {hotel.notes}</div>}
                  <div className="hotel-dates"><span><small>Entrada</small><input value={hotel.checkIn} onChange={(event) => updateHotel(hotel.id, { checkIn: event.target.value })} /></span><span><small>Salida</small><input value={hotel.checkOut} onChange={(event) => updateHotel(hotel.id, { checkOut: event.target.value })} /></span><span><small>Total / 2</small><div className="currency-input"><input type="number" value={hotel.totalPrice} onChange={(event) => updateHotel(hotel.id, { totalPrice: Number(event.target.value) })} /><span>€</span></div></span></div>
                  <label><span>Dirección</span><input value={hotel.address} onChange={(event) => updateHotel(hotel.id, { address: event.target.value })} /></label>
                  <label><span>Notas</span><input value={hotel.notes} onChange={(event) => updateHotel(hotel.id, { notes: event.target.value })} /></label>
                  <label><span>Enlace de reserva</span><input type="url" placeholder="Añadir URL" value={hotel.link} onChange={(event) => updateHotel(hotel.id, { link: event.target.value })} /></label>
                </div>
              </article>
            ))}</div>
          </div>
        </section>

        <section id="maleta" className="section section-anchor">
          <div className="content-wrap">
            <div className="packing-head">
              <SectionTitle eyebrow="Preparación" title="Maleta" text="Editable, ampliable y guardada en tu navegador." />
              <div className="packing-progress"><div className="progress-ring" style={{ '--progress': `${packingStats.percent * 3.6}deg` } as React.CSSProperties}><span>{packingStats.percent}%</span></div><div><strong>{packingStats.checked} listas</strong><span>de {packingStats.total} cosas</span></div></div>
            </div>
            <div className="packing-grid">{data.packing.map((category) => <PackingCard key={category.id} category={category} newValue={newPacking[category.id] ?? ''} onNewValue={(value) => setNewPacking((current) => ({ ...current, [category.id]: value }))} onAdd={() => addPacking(category.id)} onToggle={(itemId) => togglePacking(category.id, itemId)} onEdit={(itemId, text) => editPacking(category.id, itemId, text)} onRemove={(itemId) => removePacking(category.id, itemId)} />)}</div>
          </div>
        </section>

        <section id="futbol" className="section football-section section-anchor">
          <div className="content-wrap">
            <SectionTitle eyebrow="Mundial 2026" title="Fútbol sin romper la ruta" text="Horas en Costa Rica y España, con el contexto exacto de cada jornada." />
            <div className="match-grid">{data.football.map((match) => (
              <article className={`match-card ${match.watched ? 'watched' : ''}`} key={match.id}>
                <div className="match-top"><Badge tone={match.type === 'Confirmado' ? 'green' : 'gold'}>{match.type}</Badge><button className="check-button light" onClick={() => updateMatch(match.id, { watched: !match.watched })}>{match.watched ? <CheckCircle2 /> : <Circle />}<span>{match.watched ? 'Visto' : 'Marcar visto'}</span></button></div>
                <span className="match-date">{match.date}</span><h3>{match.match}</h3>
                <div className="match-times"><div><small>Costa Rica</small><strong>{match.costaRicaTime}</strong></div><span>·</span><div><small>España</small><strong>{match.spainTime}</strong></div></div>
                <p><MapPin size={15} /> {match.location}</p><p className="match-tip">{match.recommendation}</p>
                <label><span>Sitio para verlo</span><input placeholder="Añadir bar / alojamiento" value={match.venue} onChange={(event) => updateMatch(match.id, { venue: event.target.value })} /></label>
              </article>
            ))}</div>
            <div className="source-note">Horarios verificados el 8/07/2026 con el cuadro oficial de FIFA y la emisión de RTVE. Las semifinales dependen de los resultados.</div>
          </div>
        </section>

        <section id="mapa" className="section section-anchor">
          <div className="content-wrap">
            <SectionTitle eyebrow="Pacífico → Caribe" title="Mapa de ruta" text="Toca cada punto para ver fechas, noches y planes principales." />
            <div className="map-shell">
              <MapContainer center={[9.85, -84.1]} zoom={7} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline positions={routePositions} pathOptions={{ color: '#ef765e', weight: 4, dashArray: '8 9' }} />
                {data.destinations.map((destination, index) => <CircleMarker key={destination.id} center={destination.coordinates} radius={10} pathOptions={{ color: '#fff', weight: 3, fillColor: palette[index], fillOpacity: 1 }}><Popup><div className="map-popup"><Photo imageKey={destination.image} compact /><strong>{destination.name}</strong><span>{destination.dates} · {destination.nights} noches</span><p>{destination.activities.slice(0, 3).join(' · ')}</p><button onClick={() => { setActiveDestination(destination.id); goTo('destinos') }}>Ver destino</button></div></Popup></CircleMarker>)}
              </MapContainer>
              <div className="map-route-list">{data.destinations.map((destination, index) => <button key={destination.id} onClick={() => { setActiveDestination(destination.id); goTo('destinos') }}><i>{index + 1}</i><span><strong>{destination.name}</strong><small>{destination.dates}</small></span></button>)}</div>
            </div>
          </div>
        </section>

        <section id="links" className="section links-section section-anchor">
          <div className="content-wrap">
            <SectionTitle eyebrow="Todo a un toque" title="Links rápidos" text="Compra, consulta, navega o vuelve al partido sin buscar entre mensajes." />
            <div className="quick-links">{data.links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer"><span><small>{link.group}</small><strong>{link.label}</strong></span><ExternalLink size={18} /></a>)}</div>
            <div className="data-tools">
              <div><h3>Tus datos viajan contigo</h3><p>Exporta una copia, impórtala en otro dispositivo o vuelve al plan original.</p></div>
              <div className="tool-buttons"><button className="button button-primary" onClick={exportData}><Download size={17} /> Exportar JSON</button><button className="button button-outline" onClick={() => fileInputRef.current?.click()}><Upload size={17} /> Importar JSON</button><button className="button button-danger" onClick={resetData}><RotateCcw size={17} /> Resetear cambios</button><input ref={fileInputRef} hidden type="file" accept="application/json" onChange={(event) => importData(event.target.files?.[0])} /></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div><span className="brand-mark"><Palmtree size={18} /></span><strong>Costa Rica 2026</strong><p>Hecho para consultar el viaje con una mano y un batido en la otra.</p></div>
        <div className="attribution"><strong>Fotos libres / permitidas</strong>{Object.values(images).map((image) => <a key={image.id} href={image.source} target="_blank" rel="noreferrer">{image.alt} · {image.author} · {image.license}</a>)}</div>
        <div><strong>Fuente del plan</strong><p>{data.meta.source}<br />Actualizado: {data.meta.updated}</p></div>
      </footer>
    </div>
  )
}

function DestinationPanel({ destination }: { destination: Destination }) {
  return (
    <article className="destination-panel">
      <Photo imageKey={destination.image} />
      <div className="destination-content">
        <div className="destination-title"><div><span>{destination.dates} · {destination.nights} noches</span><h3>{destination.name}</h3></div><Badge tone={destination.intensity === 'Chill' ? 'blue' : destination.intensity === 'Intenso' ? 'coral' : 'gold'}>{destination.intensity}</Badge></div>
        <div className="destination-meta"><p><HotelIcon size={17} /><span><small>Alojamiento</small>{destination.hotel}</span></p><p><WalletCards size={17} /><span><small>Estimación</small>{destination.price}</span></p></div>
        <h4>Lo mejor</h4><div className="activity-pills">{destination.activities.map((activity) => <span key={activity}><Check size={13} />{activity}</span>)}</div>
        <div className="destination-bottom"><div><h4>Consejos</h4><ul>{destination.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div><div className="rain-card"><Waves /><span><strong>Plan B si llueve</strong>{destination.rainPlan}</span></div></div>
        <div className="tag-row">{destination.tags.map((tag) => <Badge tone="neutral" key={tag}>#{tag}</Badge>)}</div>
      </div>
    </article>
  )
}

function PackingCard({ category, newValue, onNewValue, onAdd, onToggle, onEdit, onRemove }: {
  category: PackingCategory
  newValue: string
  onNewValue: (value: string) => void
  onAdd: () => void
  onToggle: (itemId: string) => void
  onEdit: (itemId: string, text: string) => void
  onRemove: (itemId: string) => void
}) {
  const done = category.items.filter((item) => item.checked).length
  return (
    <article className="packing-card">
      <div className="packing-card-head"><div><h3>{category.name}</h3><span>{done}/{category.items.length}</span></div><div className="mini-progress"><span style={{ width: `${category.items.length ? (done / category.items.length) * 100 : 0}%` }} /></div></div>
      <div className="packing-items">{category.items.map((item) => <div className={item.checked ? 'checked' : ''} key={item.id}><button onClick={() => onToggle(item.id)} aria-label="Marcar elemento">{item.checked ? <CheckCircle2 /> : <Circle />}</button><input value={item.text} onChange={(event) => onEdit(item.id, event.target.value)} /><button className="remove" onClick={() => onRemove(item.id)} aria-label="Eliminar elemento"><Trash2 /></button></div>)}</div>
      <div className="add-item"><input value={newValue} onChange={(event) => onNewValue(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') onAdd() }} placeholder="Añadir algo…" /><button onClick={onAdd}><Plus size={17} /></button></div>
    </article>
  )
}

export default App
