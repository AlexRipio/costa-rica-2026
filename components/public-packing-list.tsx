'use client'

import { Check, Mail, Minus, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import type { PackingCategory } from '@/src/data/tripData'

const storageKey = 'viajan2juntos-costa-rica-packing-v2'
type ItemState = 'packed' | 'skipped'

export function PublicPackingList({ categories }: { categories: PackingCategory[] }) {
  const requiredIds = useMemo(() => new Set(categories.flatMap((category) => category.items.filter((item) => item.required).map((item) => item.id))), [categories])
  const [itemsState, setItemsState] = useState<Record<string, ItemState>>({})
  const [email, setEmail] = useState('')
  const [subscribeState, setSubscribeState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [subscribeMessage, setSubscribeMessage] = useState('')

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return

    const parsed = JSON.parse(saved) as string[] | Record<string, ItemState>
    if (Array.isArray(parsed)) {
      setItemsState(Object.fromEntries(parsed.map((id) => [id, 'packed' as const])))
    } else {
      setItemsState(Object.fromEntries(Object.entries(parsed).filter(([id, state]) => state !== 'skipped' || !requiredIds.has(id))))
    }
  }, [requiredIds])

  const total = categories.reduce((sum, category) => sum + category.items.length, 0)
  const packedCount = Object.values(itemsState).filter((state) => state === 'packed').length
  const skippedCount = Object.values(itemsState).filter((state) => state === 'skipped').length
  const resolvedCount = packedCount + skippedCount
  const progress = total ? Math.round((resolvedCount / total) * 100) : 0
  const pendingItems = categories.flatMap((category) =>
    category.items
      .filter((item) => !itemsState[item.id])
      .map((item) => ({ id: item.id, text: item.text, category: category.name })),
  )

  const setItemState = (id: string, state: ItemState) => {
    if (state === 'skipped' && requiredIds.has(id)) return
    setItemsState((current) => {
      const next = { ...current }
      if (next[id] === state) delete next[id]
      else next[id] = state
      window.localStorage.setItem(storageKey, JSON.stringify(next))
      return next
    })
  }

  const status = useMemo(() => {
    if (!resolvedCount) return 'Empieza por documentación y calzado.'
    if (resolvedCount === total) return 'Lista resuelta.'
    return `${packedCount} preparado · ${skippedCount} no necesario · ${pendingItems.length} pendiente`
  }, [packedCount, pendingItems.length, resolvedCount, skippedCount, total])

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribeState('loading')
    setSubscribeMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'costa-rica-packing',
          pendingItems,
          skippedCount,
          packedCount,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.message || 'No hemos podido preparar tu lista.')
      setSubscribeState('success')
      setSubscribeMessage(data.message)
      setEmail('')
    } catch (error) {
      setSubscribeState('error')
      setSubscribeMessage(error instanceof Error ? error.message : 'No hemos podido preparar tu lista.')
    }
  }

  return (
    <div className="public-packing-list">
      <div className="packing-progress-card">
        <div><span>{status}</span><strong>{progress}%</strong></div>
        <div className="packing-progress-track"><i style={{ width: `${progress}%` }} /></div>
        <button type="button" onClick={() => { setItemsState({}); window.localStorage.removeItem(storageKey) }}>
          <RotateCcw /> Empezar de nuevo
        </button>
      </div>
      <form className="packing-email-card" onSubmit={subscribe}>
        <div>
          <Mail />
          <div>
            <strong>¿Quieres recibir solo lo que te falta?</strong>
            <p>Marca lo preparado y aparta lo que no necesitas. Te mandamos una lista limpia con lo pendiente para terminar la maleta sin volver a revisarlo todo.</p>
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
          {subscribeState === 'loading' ? 'Preparando...' : 'Mandarme pendientes'}
        </button>
        {subscribeMessage && <p className={`packing-email-message ${subscribeState}`}>{subscribeMessage}</p>}
        <small>Usaremos este correo solo para enviarte esta lista o avisos relacionados con la guía si lo pides. Puedes pedir que lo borremos cuando quieras.</small>
      </form>
      <div className="packing-category-grid">
        {categories.map((category) => (
          <section key={category.id}>
            <h2>{category.name}</h2>
            <div>
              {category.items.map((item) => (
                <article className={`packing-item ${itemsState[item.id] || ''}`} key={item.id}>
                  <span>
                    {item.text}
                    {item.required && <small className="required">Imprescindible</small>}
                    {itemsState[item.id] === 'skipped' && <small>Apartado de tu lista</small>}
                  </span>
                  <div>
                    <button type="button" aria-pressed={itemsState[item.id] === 'packed'} onClick={() => setItemState(item.id, 'packed')}>
                      <i><Check /></i> Lo tengo
                    </button>
                    {!item.required && (
                      <button type="button" aria-pressed={itemsState[item.id] === 'skipped'} onClick={() => setItemState(item.id, 'skipped')}>
                        <i><Minus /></i>
                        No lo necesito
                      </button>
                    )}
                    {item.required && <em>No se puede descartar</em>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
