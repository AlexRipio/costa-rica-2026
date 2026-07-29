import { images, type TripImage } from '@/src/data/images'

export const brand = {
  name: 'Viajan2Juntos',
  tagline: 'Dos viajeros, un mapa y muchas historias.',
  description: 'Guías de viaje, rutas por libre, mapas y consejos útiles contados después de vivir cada destino.',
}

export type Trip = {
  slug: string
  country: string
  countryGroup: string
  continent: 'América' | 'Europa' | 'Asia' | 'África'
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
        <circle cx="1110" cy="185" r="118" fill="none" stroke="white" stroke-width="3" opacity=".34"/>
        <circle cx="258" cy="238" r="18" fill="white" opacity=".78"/>
        <circle cx="735" cy="566" r="18" fill="white" opacity=".78"/>
        <circle cx="1170" cy="744" r="18" fill="white" opacity=".78"/>
        <path d="M258 238 C390 350 560 440 735 566 S1010 675 1170 744" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity=".52"/>
        <path d="M-120 890 C190 615 430 910 735 650 S1120 700 1520 400" fill="none" stroke="white" stroke-width="3" opacity=".3"/>
        <path d="M100 122 H510" stroke="white" stroke-width="3" opacity=".28"/>
        <path d="M890 882 H1290" stroke="white" stroke-width="3" opacity=".28"/>
      </svg>`,
    ),
  alt: `Portada gráfica del viaje a ${title}`,
  author: 'Viajan2Juntos',
  license: 'Diseño propio',
  source: '',
})

export const trips: Trip[] = [
  {
    slug: 'costa-rica-2026',
    country: 'Costa Rica',
    countryGroup: 'Costa Rica',
    continent: 'América',
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
    countryGroup: 'Italia',
    continent: 'Europa',
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
    countryGroup: 'Italia',
    continent: 'Europa',
    territory: 'Italia',
    scope: 'internacional',
    year: '2025',
    title: 'Venecia, Bérgamo y Verona',
    subtitle: 'Tres ciudades del norte de Italia en un mismo viaje',
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
    countryGroup: 'Sri Lanka',
    continent: 'Asia',
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
    countryGroup: 'Filipinas',
    continent: 'Asia',
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
    countryGroup: 'Marruecos',
    continent: 'África',
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
    countryGroup: 'España',
    continent: 'Europa',
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
    countryGroup: 'España',
    continent: 'Europa',
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
    countryGroup: 'España',
    continent: 'Europa',
    territory: 'Asturias · España',
    scope: 'nacional',
    year: 'Fecha pendiente',
    title: 'Asturias',
    subtitle: 'Mar, montaña y pueblos del norte',
    dates: 'Fecha por completar',
    duration: 'Por completar',
    bases: 'Asturias',
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
    countryGroup: 'España',
    continent: 'Europa',
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
