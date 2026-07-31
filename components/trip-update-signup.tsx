'use client'

import { Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'

export function TripUpdateSignup() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'costa-rica-updates' }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.message || 'No hemos podido guardar el correo.')
      setState('success')
      setMessage(data.message)
      setEmail('')
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'No hemos podido guardar el correo.')
    }
  }

  return (
    <form className="trip-update-signup" onSubmit={submit}>
      <div>
        <Mail />
        <div>
          <span>Guía viva</span>
          <h3>Te avisamos cuando añadamos itinerarios nuevos.</h3>
          <p>Solo mandaremos correos útiles: nuevas rutas, mapas mejorados o cambios importantes de la guía.</p>
        </div>
      </div>
      <label>
        <span>Correo</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
          autoComplete="email"
          required
        />
      </label>
      <button type="submit" disabled={state === 'loading'}>{state === 'loading' ? 'Guardando...' : 'Quiero enterarme'}</button>
      {message && <p className={`trip-update-message ${state}`}>{message}</p>}
    </form>
  )
}
