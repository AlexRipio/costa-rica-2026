'use client'

import { ArrowRight, Check, Mail } from 'lucide-react'
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
      <div className="trip-update-intro">
        <span className="trip-update-icon" aria-hidden="true"><Mail /></span>
        <div className="trip-update-copy">
          <span>Hasta la próxima ruta</span>
          <h3>Recibe la siguiente guía</h3>
          <p>Te avisamos solo cuando publiquemos una ruta útil de verdad.</p>
        </div>
      </div>
      <div className="trip-update-fields">
        <label>
          <span className="sr-only">Tu correo</span>
          <Mail aria-hidden="true" />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="hola@viajan2juntos.com"
            autoComplete="email"
            required
          />
        </label>
        <button type="submit" disabled={state === 'loading'}>
          <span>{state === 'loading' ? 'Un momento…' : state === 'success' ? 'Apuntado' : 'Apuntarme'}</span>
          {state === 'success' ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
        </button>
      </div>
      {message && <p className={`trip-update-message ${state}`}>{message}</p>}
    </form>
  )
}
