'use client'

import { Check, Mail, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import type { PackingCategory } from '@/src/data/tripData'

const storageKey = 'viajan2juntos-costa-rica-packing'

export function PublicPackingList({ categories }: { categories: PackingCategory[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [email, setEmail] = useState('')
  const [subscribeState, setSubscribeState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [subscribeMessage, setSubscribeMessage] = useState('')

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey)
    if (saved) setChecked(new Set(JSON.parse(saved) as string[]))
  }, [])

  const total = categories.reduce((sum, category) => sum + category.items.length, 0)
  const progress = total ? Math.round((checked.size / total) * 100) : 0

  const toggle = (id: string) => {
    setChecked((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      window.localStorage.setItem(storageKey, JSON.stringify([...next]))
      return next
    })
  }

  const status = useMemo(() => {
    if (!checked.size) return 'Empieza por documentación y calzado.'
    if (checked.size === total) return '¡Maleta terminada!'
    return `${checked.size} de ${total} cosas preparadas`
  }, [checked.size, total])

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribeState('loading')
    setSubscribeMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'costa-rica-packing' }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.message || 'No hemos podido guardar el correo.')
      setSubscribeState('success')
      setSubscribeMessage(data.message)
      setEmail('')
    } catch (error) {
      setSubscribeState('error')
      setSubscribeMessage(error instanceof Error ? error.message : 'No hemos podido guardar el correo.')
    }
  }

  return (
    <div className="public-packing-list">
      <div className="packing-progress-card">
        <div><span>{status}</span><strong>{progress}%</strong></div>
        <div className="packing-progress-track"><i style={{ width: `${progress}%` }} /></div>
        <button type="button" onClick={() => { setChecked(new Set()); window.localStorage.removeItem(storageKey) }}>
          <RotateCcw /> Empezar de nuevo
        </button>
      </div>
      <form className="packing-email-card" onSubmit={subscribe}>
        <div>
          <Mail />
          <div>
            <strong>¿Quieres que te avisemos cuando mejoremos esta guía?</strong>
            <p>Déjanos tu correo y te mandamos las novedades útiles: más consejos, cambios de ruta y recursos nuevos para preparar Costa Rica.</p>
          </div>
        </div>
        <label>
          <span>Tu correo</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
            required
          />
        </label>
        <button type="submit" disabled={subscribeState === 'loading'}>
          {subscribeState === 'loading' ? 'Guardando...' : 'Avisadme'}
        </button>
        {subscribeMessage && <p className={`packing-email-message ${subscribeState}`}>{subscribeMessage}</p>}
        <small>Sin spam. Solo correos relacionados con la guía. Puedes pedir que borremos tus datos cuando quieras.</small>
      </form>
      <div className="packing-category-grid">
        {categories.map((category) => (
          <section key={category.id}>
            <h2>{category.name}</h2>
            <div>
              {category.items.map((item) => (
                <button className={checked.has(item.id) ? 'checked' : ''} type="button" onClick={() => toggle(item.id)} key={item.id}>
                  <i><Check /></i><span>{item.text}</span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
