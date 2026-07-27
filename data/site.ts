import { images } from '@/src/data/images'

export const brand = {
  name: 'Viajan2Juntos',
  tagline: 'Dos viajeros, un mapa y muchas historias.',
  description:
    'Un diario visual de viajes, rutas imperfectas y lugares a los que siempre querríamos volver.',
}

export const trips = [
  {
    slug: 'costa-rica-2026',
    country: 'Costa Rica',
    year: '2026',
    title: 'Costa Rica',
    subtitle: 'Volcanes, selva, surf y Caribe',
    dates: '9–25 julio 2026',
    duration: '17 días',
    bases: '6 bases',
    status: 'Último viaje',
    image: images.arenal,
    accent: '#f4a63a',
  },
]

export const travelStats = [
  { value: '01', label: 'gran viaje' },
  { value: '17', label: 'días en ruta' },
  { value: '06', label: 'lugares base' },
  { value: '02', label: 'viajeros' },
]
