import { images, type TripImage } from '@/src/data/images'

export const brand = {
  name: 'Viajan2Juntos',
  tagline: 'Dos viajeros, un mapa y muchas historias.',
  description: 'Un diario visual de viajes, rutas imperfectas y lugares a los que siempre querríamos volver.',
}

export type Trip = {
  slug: string
  country: string
  year: string
  title: string
  subtitle: string
  dates: string
  duration: string
  bases: string
  status: string
  image: TripImage
  accent: string
  mapId: string
  mapLabel: string
  available: boolean
}

export const trips: Trip[] = [
  {
    slug: 'costa-rica-2026',
    country: 'Costa Rica',
    year: '2026',
    title: 'Costa Rica',
    subtitle: 'Volcanes, selva, surf y Caribe',
    dates: '9–25 julio 2026',
    duration: '17 días',
    bases: '6 bases',
    status: 'Próxima aventura',
    image: images.arenal,
    accent: '#f4a63a',
    mapId: '188',
    mapLabel: 'Costa Rica · 2026',
    available: true,
  },
  {
    slug: 'sri-lanka-2025',
    country: 'Sri Lanka',
    year: '2025',
    title: 'Sri Lanka',
    subtitle: 'Templos, trenes, té y océano Índico',
    dates: '2025',
    duration: 'Un gran viaje',
    bases: 'Isla completa',
    status: 'Historia vivida',
    image: images.sigiriya,
    accent: '#e56f51',
    mapId: '144',
    mapLabel: 'Sri Lanka · 2025',
    available: false,
  },
  {
    slug: 'filipinas-2024',
    country: 'Filipinas',
    year: '2024',
    title: 'Filipinas',
    subtitle: 'Islas, lagunas y horizontes turquesa',
    dates: '2024',
    duration: 'Un gran viaje',
    bases: 'Varias islas',
    status: 'Historia vivida',
    image: images.palawanLagoon,
    accent: '#2c9b9a',
    mapId: '608',
    mapLabel: 'Filipinas · 2024',
    available: false,
  },
]

export const travelStats = [
  { value: '03', label: 'grandes viajes' },
  { value: '03', label: 'países señalados' },
  { value: '02', label: 'continentes' },
  { value: '02', label: 'viajeros' },
]
