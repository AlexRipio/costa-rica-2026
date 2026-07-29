import { images, type TripImage } from '@/src/data/images'

export const brand = {
  name: 'Viajan2Juntos',
  tagline: 'Dos viajeros, un mapa y muchas historias.',
  description: 'Un diario visual de viajes, rutas imperfectas y lugares a los que siempre querríamos volver.',
}

export type Trip = {
  slug: string
  country: string
  territory: string
  scope: 'internacional' | 'nacional'
  year: string
  title: string
  subtitle: string
  dates: string
  duration: string
  bases: string
  status: string
  image: TripImage
  hasPersonalPhotos: boolean
  accent: string
  secondary: string
  mapId: string
  mapLabel: string
  mapCoordinates: [number, number]
  available: boolean
}

const typographicCover = (id: string, title: string, accent: string, secondary: string): TripImage => ({
  id,
  url:
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1000">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="${accent}"/>
            <stop offset="1" stop-color="${secondary}"/>
          </linearGradient>
          <pattern id="p" width="46" height="46" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2" fill="white" opacity=".13"/>
          </pattern>
        </defs>
        <rect width="1400" height="1000" fill="url(#g)"/>
        <rect width="1400" height="1000" fill="url(#p)"/>
        <circle cx="1130" cy="170" r="115" fill="none" stroke="white" stroke-width="2" opacity=".28"/>
        <path d="M-80 770 C220 560 420 890 720 650 S1110 700 1500 430" fill="none" stroke="white" stroke-width="3" opacity=".34"/>
        <text x="90" y="790" fill="white" font-family="Arial, sans-serif" font-size="142" font-weight="800" letter-spacing="-8">${title}</text>
        <text x="98" y="875" fill="white" opacity=".72" font-family="Arial, sans-serif" font-size="28" letter-spacing="7">VIAJAN2JUNTOS · ARCHIVO PERSONAL</text>
      </svg>`,
    ),
  alt: `Portada tipográfica del viaje a ${title}; fotografía personal pendiente`,
  author: 'Viajan2Juntos',
  license: 'Diseño propio',
  source: '',
})

export const trips: Trip[] = [
  {
    slug: 'costa-rica-2026',
    country: 'Costa Rica',
    territory: 'Costa Rica',
    scope: 'internacional',
    year: '2026',
    title: 'Costa Rica',
    subtitle: 'Volcanes, selva, surf y Caribe',
    dates: '9–25 julio 2026',
    duration: '17 días',
    bases: '6 bases',
    status: 'Viaje finalizado',
    image: images.arenal,
    hasPersonalPhotos: true,
    accent: '#f4a63a',
    secondary: '#123f35',
    mapId: '188',
    mapLabel: 'Costa Rica · 2026',
    mapCoordinates: [-84.2, 9.8],
    available: true,
  },
  {
    slug: 'roma-2026',
    country: 'Roma',
    territory: 'Italia',
    scope: 'internacional',
    year: '2026',
    title: 'Roma',
    subtitle: 'Cinco días para volver a mirar la ciudad',
    dates: '20–24 marzo 2026',
    duration: '5 días',
    bases: '1 ciudad',
    status: 'Historia vivida',
    image: typographicCover('roma-2026', 'ROMA', '#a84432', '#e9ae57'),
    hasPersonalPhotos: false,
    accent: '#d26448',
    secondary: '#6f3027',
    mapId: '380',
    mapLabel: 'Roma · 2026',
    mapCoordinates: [12.4964, 41.9028],
    available: false,
  },
  {
    slug: 'italia-2025',
    country: 'Italia',
    territory: 'Italia',
    scope: 'internacional',
    year: '2025',
    title: 'Italia',
    subtitle: 'Un viaje distinto a nuestra escapada posterior a Roma',
    dates: 'Noviembre 2025',
    duration: 'Por completar',
    bases: 'Ruta por recuperar',
    status: 'Historia vivida',
    image: typographicCover('italia-2025', 'ITALIA', '#395d50', '#c18b56'),
    hasPersonalPhotos: false,
    accent: '#4e7868',
    secondary: '#8d5f3e',
    mapId: '380',
    mapLabel: 'Italia · 2025',
    mapCoordinates: [11.2, 43.3],
    available: false,
  },
  {
    slug: 'sri-lanka-2025',
    country: 'Sri Lanka',
    territory: 'Sri Lanka',
    scope: 'internacional',
    year: '2025',
    title: 'Sri Lanka',
    subtitle: 'Templos, trenes, té y océano Índico',
    dates: 'Agosto 2025',
    duration: 'Por completar',
    bases: 'Ruta por la isla',
    status: 'Historia vivida',
    image: images.sigiriya,
    hasPersonalPhotos: false,
    accent: '#e56f51',
    secondary: '#334f31',
    mapId: '144',
    mapLabel: 'Sri Lanka · 2025',
    mapCoordinates: [80.77, 7.87],
    available: false,
  },
  {
    slug: 'filipinas-2024',
    country: 'Filipinas',
    territory: 'Filipinas',
    scope: 'internacional',
    year: '2024',
    title: 'Filipinas',
    subtitle: 'Cuatro amigos entre islas, lagunas y horizontes turquesa',
    dates: 'Julio 2024',
    duration: 'Por completar',
    bases: 'Varias islas',
    status: 'Historia vivida',
    image: images.palawanLagoon,
    hasPersonalPhotos: false,
    accent: '#2c9b9a',
    secondary: '#175b69',
    mapId: '608',
    mapLabel: 'Filipinas · 2024',
    mapCoordinates: [121.77, 12.88],
    available: false,
  },
  {
    slug: 'marrakech-desierto',
    country: 'Marrakech',
    territory: 'Marruecos',
    scope: 'internacional',
    year: 'Fecha pendiente',
    title: 'Marrakech y desierto',
    subtitle: 'De la medina al paisaje abierto del desierto',
    dates: 'Fecha por completar',
    duration: 'Por completar',
    bases: 'Marrakech + desierto',
    status: 'Historia vivida',
    image: typographicCover('marrakech-desierto', 'MARRAKECH', '#b84d2f', '#e5a23d'),
    hasPersonalPhotos: false,
    accent: '#cf6540',
    secondary: '#744028',
    mapId: '504',
    mapLabel: 'Marruecos · fecha pendiente',
    mapCoordinates: [-7.9811, 31.6295],
    available: false,
  },
  {
    slug: 'malaga',
    country: 'Málaga',
    territory: 'Andalucía · España',
    scope: 'nacional',
    year: 'Fecha pendiente',
    title: 'Málaga',
    subtitle: 'Una escapada nacional que también forma parte del mapa',
    dates: 'Fecha por completar',
    duration: 'Por completar',
    bases: 'Málaga',
    status: 'Historia vivida',
    image: typographicCover('malaga', 'MÁLAGA', '#167b84', '#e1a64b'),
    hasPersonalPhotos: false,
    accent: '#2c989d',
    secondary: '#a56d2f',
    mapId: '724',
    mapLabel: 'Málaga · España',
    mapCoordinates: [-4.4214, 36.7213],
    available: false,
  },
  {
    slug: 'sevilla',
    country: 'Sevilla',
    territory: 'Andalucía · España',
    scope: 'nacional',
    year: 'Fecha pendiente',
    title: 'Sevilla',
    subtitle: 'Calles, plazas y recuerdos por ordenar',
    dates: 'Fecha por completar',
    duration: 'Por completar',
    bases: 'Sevilla',
    status: 'Historia vivida',
    image: typographicCover('sevilla', 'SEVILLA', '#9f3e2f', '#e6a83e'),
    hasPersonalPhotos: false,
    accent: '#bd5038',
    secondary: '#834027',
    mapId: '724',
    mapLabel: 'Sevilla · España',
    mapCoordinates: [-5.9845, 37.3891],
    available: false,
  },
  {
    slug: 'asturias-luarca',
    country: 'Asturias',
    territory: 'Asturias · España',
    scope: 'nacional',
    year: 'Fecha pendiente',
    title: 'Asturias y Luarca',
    subtitle: 'El norte visto desde uno de sus pueblos marineros',
    dates: 'Fecha por completar',
    duration: 'Por completar',
    bases: 'Luarca',
    status: 'Historia vivida',
    image: typographicCover('asturias-luarca', 'ASTURIAS', '#174e52', '#5d8c78'),
    hasPersonalPhotos: false,
    accent: '#286e6a',
    secondary: '#173f3d',
    mapId: '724',
    mapLabel: 'Asturias · España',
    mapCoordinates: [-6.5357, 43.5436],
    available: false,
  },
  {
    slug: 'calpe',
    country: 'Calpe',
    territory: 'Comunidad Valenciana · España',
    scope: 'nacional',
    year: 'Fecha pendiente',
    title: 'Calpe',
    subtitle: 'Mediterráneo y una escapada todavía por reconstruir',
    dates: 'Fecha por completar',
    duration: 'Por completar',
    bases: 'Calpe',
    status: 'Historia vivida',
    image: typographicCover('calpe', 'CALPE', '#206e85', '#e2ad4c'),
    hasPersonalPhotos: false,
    accent: '#2a8297',
    secondary: '#b57d35',
    mapId: '724',
    mapLabel: 'Calpe · España',
    mapCoordinates: [0.0445, 38.6436],
    available: false,
  },
]

export const travelStats = [
  { value: '10', label: 'viajes vividos' },
  { value: '06', label: 'países señalados' },
  { value: '04', label: 'continentes' },
  { value: '02', label: 'viajeros' },
]
