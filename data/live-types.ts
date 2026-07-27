export type TravelStatus =
  | 'home'
  | 'on-plan'
  | 'safe'
  | 'driving'
  | 'delayed'
  | 'changed'
  | 'hotel'
  | 'offline'

export type LiveTravelState = {
  version: 1
  active: boolean
  tripName: string
  tripSlug: string
  timeZone: string
  timeZoneLabel: string
  status: TravelStatus
  currentPlace: string
  currentActivity: string
  nextActivity: string
  nextTime: string
  message: string
  latitude: number | null
  longitude: number | null
  locationExpiresAt: string | null
  hotelName: string
  hotelPhone: string
  hotelUrl: string
  flightNumber: string
  flightUrl: string
  updatedAt: string
}

export const statusCopy: Record<TravelStatus, { label: string; reassurance: string }> = {
  home: {
    label: 'Ahora mismo estamos en casa',
    reassurance: 'No hay ningún viaje activo.',
  },
  'on-plan': {
    label: 'Todo según lo previsto',
    reassurance: 'Seguimos el plan que teníamos preparado.',
  },
  safe: {
    label: 'Estamos bien',
    reassurance: 'Todo está bien. Hemos actualizado el seguimiento para que estéis tranquilos.',
  },
  driving: {
    label: 'Estamos en carretera',
    reassurance: 'Puede que tardemos en contestar mientras nos desplazamos.',
  },
  delayed: {
    label: 'Vamos con retraso',
    reassurance: 'Estamos bien, pero llegaremos algo más tarde de lo previsto.',
  },
  changed: {
    label: 'Ha cambiado el plan',
    reassurance: 'Estamos bien. Hemos modificado la ruta o la actividad prevista.',
  },
  hotel: {
    label: 'Ya estamos en el alojamiento',
    reassurance: 'Hemos llegado y estamos instalados.',
  },
  offline: {
    label: 'Estaremos sin cobertura',
    reassurance: 'Es posible que durante unas horas no podamos contestar.',
  },
}
