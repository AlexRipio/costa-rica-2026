import { Redis } from '@upstash/redis'
import type { LiveTravelState } from '@/data/live-types'

export const defaultLiveState: LiveTravelState = {
  version: 1,
  active: false,
  tripName: 'Próxima aventura',
  tripSlug: '',
  timeZone: 'Europe/Madrid',
  timeZoneLabel: 'Donde estamos',
  status: 'home',
  currentPlace: 'En casa',
  currentActivity: 'Preparando la siguiente historia',
  nextActivity: 'Pronto aparecerá aquí nuestro próximo viaje.',
  nextTime: '',
  message: 'Ahora mismo no estamos de viaje. Activaremos este espacio cuando volvamos a salir.',
  latitude: null,
  longitude: null,
  locationExpiresAt: null,
  hotelName: '',
  hotelPhone: '',
  hotelUrl: '',
  flightNumber: '',
  flightUrl: '',
  updatedAt: '',
}

const stateKey = 'viajan2juntos:live-state:v1'
let localState = defaultLiveState

function redis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

function hasValidLocation(state: LiveTravelState) {
  if (state.latitude === null || state.longitude === null) return false
  if (!state.locationExpiresAt) return true
  return new Date(state.locationExpiresAt).getTime() > Date.now()
}

export function publicLiveState(state: LiveTravelState): LiveTravelState {
  if (hasValidLocation(state)) return state
  return { ...state, latitude: null, longitude: null, locationExpiresAt: null }
}

export async function getLiveState() {
  const client = redis()
  if (!client) return publicLiveState(localState)
  try {
    const stored = await client.get<LiveTravelState>(stateKey)
    return publicLiveState(stored ? { ...defaultLiveState, ...stored } : defaultLiveState)
  } catch {
    return publicLiveState(localState)
  }
}

export async function saveLiveState(state: LiveTravelState) {
  const next = { ...defaultLiveState, ...state, version: 1 as const, updatedAt: new Date().toISOString() }
  localState = next
  const client = redis()
  if (client) await client.set(stateKey, next)
  return publicLiveState(next)
}

export async function rateLimit(key: string, limit: number, seconds: number) {
  const client = redis()
  if (!client) return true
  try {
    const redisKey = `viajan2juntos:rate:${key}`
    const attempts = await client.incr(redisKey)
    if (attempts === 1) await client.expire(redisKey, seconds)
    return attempts <= limit
  } catch {
    return true
  }
}
