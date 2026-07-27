'use client'

import {
  BedDouble,
  Check,
  Clock3,
  Copy,
  Gauge,
  Home,
  Hotel,
  Link2,
  LoaderCircle,
  LocateFixed,
  LogOut,
  MapPin,
  MessageCircle,
  Navigation,
  Plane,
  Radio,
  Save,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
} from 'lucide-react'
import { useState } from 'react'
import type { LiveTravelState, TravelStatus } from '@/data/live-types'
import { statusCopy } from '@/data/live-types'

const presets: Array<{ status: TravelStatus; icon: typeof Check; message: string }> = [
  { status: 'safe', icon: Check, message: 'Estamos bien. Hemos actualizado el seguimiento para que estéis tranquilos.' },
  { status: 'on-plan', icon: Gauge, message: 'Todo sigue según el plan previsto.' },
  { status: 'driving', icon: Navigation, message: 'Estamos en carretera y puede que tardemos un poco en contestar.' },
  { status: 'delayed', icon: Clock3, message: 'Estamos bien, pero vamos con algo de retraso.' },
  { status: 'changed', icon: TriangleAlert, message: 'Estamos bien. Ha cambiado el plan y esta es la información actualizada.' },
  { status: 'hotel', icon: Hotel, message: 'Ya hemos llegado al alojamiento y estamos instalados.' },
  { status: 'offline', icon: Radio, message: 'Estaremos unas horas sin cobertura. Todo está bien.' },
  { status: 'home', icon: Home, message: 'Ahora mismo no estamos de viaje.' },
]

export function LiveEditor({
  initialState,
  parentAccessUrl,
}: {
  initialState: LiveTravelState
  parentAccessUrl: string
}) {
  const [state, setState] = useState(initialState)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [locationHours, setLocationHours] = useState(3)
  const [locating, setLocating] = useState(false)
  const [copied, setCopied] = useState(false)

  function update<K extends keyof LiveTravelState>(key: K, value: LiveTravelState[K]) {
    setSaved(false)
    setState((current) => ({ ...current, [key]: value }))
  }

  function applyPreset(status: TravelStatus, message: string) {
    setState((current) => ({
      ...current,
      active: status !== 'home',
      status,
      message,
    }))
    setSaved(false)
  }

  async function saveState() {
    setSaving(true)
    setError('')
    try {
      const response = await fetch('/api/editor/state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
      if (!response.ok) throw new Error('No se ha podido guardar')
      setState(await response.json())
      setSaved(true)
    } catch {
      setError('No se ha podido guardar. Comprueba la conexión e inténtalo otra vez.')
    } finally {
      setSaving(false)
    }
  }

  function useLocation() {
    if (!navigator.geolocation) {
      setError('Este teléfono no permite obtener la ubicación.')
      return
    }
    setLocating(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const expires = new Date(Date.now() + locationHours * 60 * 60 * 1000).toISOString()
        setState((current) => ({
          ...current,
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
          locationExpiresAt: expires,
        }))
        setLocating(false)
        setSaved(false)
      },
      () => {
        setLocating(false)
        setError('No hemos podido acceder a la ubicación. Revisa el permiso del navegador.')
      },
      { enableHighAccuracy: true, timeout: 15_000, maximumAge: 60_000 },
    )
  }

  async function copyLink() {
    await navigator.clipboard.writeText(parentAccessUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  const whatsappText = encodeURIComponent(
    `Hemos actualizado el viaje. Puedes ver dónde estamos y el plan actual aquí: ${parentAccessUrl}`,
  )

  return (
    <main className="live-editor-page">
      <header className="live-editor-header">
        <div>
          <span><Smartphone /> Panel móvil</span>
          <h1>Actualizar el viaje</h1>
          <p>Los cambios aparecerán en la pantalla de la familia en pocos segundos.</p>
        </div>
        <form action="/api/editor/logout" method="post">
          <button type="submit" className="editor-logout"><LogOut /> Salir</button>
        </form>
      </header>

      <section className="editor-parent-link">
        <div>
          <Link2 />
          <div><span>Enlace directo para la familia</span><strong>{parentAccessUrl.replace('https://', '')}</strong></div>
        </div>
        <button type="button" onClick={copyLink}>{copied ? <Check /> : <Copy />}{copied ? 'Copiado' : 'Copiar'}</button>
      </section>

      <section className="editor-section">
        <div className="editor-section-title">
          <span>1</span>
          <div><h2>Estado rápido</h2><p>Elige lo que mejor describe el momento.</p></div>
        </div>
        <div className="editor-presets">
          {presets.map(({ status, icon: Icon, message }) => (
            <button
              className={state.status === status ? 'selected' : ''}
              type="button"
              key={status}
              onClick={() => applyPreset(status, message)}
            >
              <Icon />
              {statusCopy[status].label}
            </button>
          ))}
        </div>
        <label className="editor-active-toggle">
          <input type="checkbox" checked={state.active} onChange={(event) => update('active', event.target.checked)} />
          <span />
          <div><strong>{state.active ? 'Viaje activo' : 'Seguimiento desactivado'}</strong><small>Controla si la familia ve la pantalla en directo.</small></div>
        </label>
      </section>

      <section className="editor-section">
        <div className="editor-section-title">
          <span>2</span>
          <div><h2>Qué está pasando</h2><p>Lo esencial que necesitan saber.</p></div>
        </div>
        <div className="editor-form-grid">
          <label className="wide"><span>Nombre del viaje</span><input value={state.tripName} onChange={(e) => update('tripName', e.target.value)} placeholder="Japón 2027" /></label>
          <label><span>Nombre de la hora local</span><input value={state.timeZoneLabel} onChange={(e) => update('timeZoneLabel', e.target.value)} placeholder="Japón" /></label>
          <label><span>Zona horaria</span><select value={state.timeZone} onChange={(e) => update('timeZone', e.target.value)}>
            <option value="Europe/Madrid">España</option>
            <option value="America/Costa_Rica">Costa Rica</option>
            <option value="Asia/Manila">Filipinas</option>
            <option value="Asia/Colombo">Sri Lanka</option>
            <option value="Asia/Tokyo">Japón</option>
            <option value="America/New_York">Nueva York</option>
            <option value="America/Lima">Perú</option>
          </select></label>
          <label><span>Dónde estamos</span><input value={state.currentPlace} onChange={(e) => update('currentPlace', e.target.value)} placeholder="Kioto" /></label>
          <label><span>Qué hacemos ahora</span><input value={state.currentActivity} onChange={(e) => update('currentActivity', e.target.value)} placeholder="Visitando Fushimi Inari" /></label>
          <label><span>Qué haremos después</span><input value={state.nextActivity} onChange={(e) => update('nextActivity', e.target.value)} placeholder="Tren hacia Osaka" /></label>
          <label><span>Hora aproximada</span><input value={state.nextTime} onChange={(e) => update('nextTime', e.target.value)} placeholder="Sobre las 18:30" /></label>
          <label className="wide"><span>Mensaje para la familia</span><textarea value={state.message} onChange={(e) => update('message', e.target.value)} rows={4} placeholder="Estamos bien. Hemos cambiado el plan porque..." /></label>
        </div>
      </section>

      <section className="editor-section">
        <div className="editor-section-title">
          <span>3</span>
          <div><h2>Ubicación temporal</h2><p>Se borrará automáticamente al pasar el tiempo elegido.</p></div>
        </div>
        <div className="editor-location-box">
          <div className="editor-location-controls">
            <label><span>Compartir durante</span><select value={locationHours} onChange={(e) => setLocationHours(Number(e.target.value))}>
              <option value={1}>1 hora</option>
              <option value={3}>3 horas</option>
              <option value={6}>6 horas</option>
              <option value={12}>12 horas</option>
            </select></label>
            <button type="button" onClick={useLocation} disabled={locating}>
              {locating ? <LoaderCircle className="spin" /> : <LocateFixed />}
              {locating ? 'Buscando…' : 'Usar mi ubicación'}
            </button>
          </div>
          {state.latitude !== null ? (
            <div className="editor-location-ready"><MapPin /><div><strong>Ubicación preparada</strong><span>{state.latitude}, {state.longitude}</span></div><button type="button" onClick={() => setState((current) => ({ ...current, latitude: null, longitude: null, locationExpiresAt: null }))}>Quitar</button></div>
          ) : (
            <p className="editor-location-empty">No se compartirá el GPS hasta que pulses el botón.</p>
          )}
        </div>
      </section>

      <section className="editor-section">
        <div className="editor-section-title">
          <span>4</span>
          <div><h2>Hotel y vuelo</h2><p>Opcional. Déjalo vacío cuando no corresponda.</p></div>
        </div>
        <div className="editor-form-grid">
          <label><span><BedDouble /> Hotel</span><input value={state.hotelName} onChange={(e) => update('hotelName', e.target.value)} placeholder="Nombre del alojamiento" /></label>
          <label><span>Teléfono del hotel</span><input value={state.hotelPhone} onChange={(e) => update('hotelPhone', e.target.value)} placeholder="+34…" /></label>
          <label className="wide"><span>Enlace del hotel</span><input value={state.hotelUrl} onChange={(e) => update('hotelUrl', e.target.value)} placeholder="https://…" /></label>
          <label><span><Plane /> Número de vuelo</span><input value={state.flightNumber} onChange={(e) => update('flightNumber', e.target.value)} placeholder="E9 857" /></label>
          <label><span>Enlace para seguirlo</span><input value={state.flightUrl} onChange={(e) => update('flightUrl', e.target.value)} placeholder="https://flightradar24.com/…" /></label>
        </div>
      </section>

      {error && <div className="editor-error">{error}</div>}
      <div className="editor-sticky-actions">
        <button className="editor-whatsapp" type="button" onClick={() => window.open(`https://wa.me/?text=${whatsappText}`, '_blank')}>
          <MessageCircle /> Avisar por WhatsApp
        </button>
        <button className="editor-save" type="button" onClick={saveState} disabled={saving}>
          {saving ? <LoaderCircle className="spin" /> : saved ? <Check /> : <Save />}
          {saving ? 'Guardando…' : saved ? 'Guardado' : 'Publicar actualización'}
        </button>
      </div>
    </main>
  )
}
