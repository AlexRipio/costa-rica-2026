'use client'

import { Check, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { PackingCategory } from '@/src/data/tripData'

const storageKey = 'viajan2juntos-costa-rica-packing'

export function PublicPackingList({ categories }: { categories: PackingCategory[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

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

  return (
    <div className="public-packing-list">
      <div className="packing-progress-card">
        <div><span>{status}</span><strong>{progress}%</strong></div>
        <div className="packing-progress-track"><i style={{ width: `${progress}%` }} /></div>
        <button type="button" onClick={() => { setChecked(new Set()); window.localStorage.removeItem(storageKey) }}>
          <RotateCcw /> Empezar de nuevo
        </button>
      </div>
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

