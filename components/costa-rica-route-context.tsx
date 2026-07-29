'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type CostaRicaRouteDays = 10 | 15 | 20

type CostaRicaRouteContextValue = {
  selectedDays: CostaRicaRouteDays
  setSelectedDays: (days: CostaRicaRouteDays) => void
}

const CostaRicaRouteContext = createContext<CostaRicaRouteContextValue | null>(null)

export function CostaRicaRouteProvider({ children }: { children: ReactNode }) {
  const [selectedDays, setSelectedDays] = useState<CostaRicaRouteDays>(15)

  return (
    <CostaRicaRouteContext.Provider value={{ selectedDays, setSelectedDays }}>
      {children}
    </CostaRicaRouteContext.Provider>
  )
}

export function useCostaRicaRoute() {
  const context = useContext(CostaRicaRouteContext)
  if (!context) throw new Error('useCostaRicaRoute must be used inside CostaRicaRouteProvider')
  return context
}
