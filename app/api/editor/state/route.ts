import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { editorCookieName, isValidEditorSession } from '@/data/editor-auth'
import { defaultLiveState, getLiveState, saveLiveState } from '@/data/live-state'
import type { LiveTravelState, TravelStatus } from '@/data/live-types'

const statuses: TravelStatus[] = ['home', 'on-plan', 'safe', 'driving', 'delayed', 'changed', 'hotel', 'offline']

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function nullableNumber(value: unknown, min: number, max: number) {
  if (value === null || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) && number >= min && number <= max ? number : null
}

async function authorized() {
  const store = await cookies()
  return isValidEditorSession(store.get(editorCookieName)?.value)
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  return NextResponse.json(await getLiveState(), { headers: { 'Cache-Control': 'no-store' } })
}

export async function PUT(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const body = (await request.json()) as Partial<LiveTravelState>
  const status = statuses.includes(body.status as TravelStatus) ? (body.status as TravelStatus) : defaultLiveState.status
  const state: LiveTravelState = {
    version: 1,
    active: Boolean(body.active),
    tripName: text(body.tripName, 80) || defaultLiveState.tripName,
    tripSlug: text(body.tripSlug, 80),
    timeZone: text(body.timeZone, 80) || defaultLiveState.timeZone,
    timeZoneLabel: text(body.timeZoneLabel, 60) || defaultLiveState.timeZoneLabel,
    status,
    currentPlace: text(body.currentPlace, 100),
    currentActivity: text(body.currentActivity, 180),
    nextActivity: text(body.nextActivity, 180),
    nextTime: text(body.nextTime, 60),
    message: text(body.message, 500),
    latitude: nullableNumber(body.latitude, -90, 90),
    longitude: nullableNumber(body.longitude, -180, 180),
    locationExpiresAt: text(body.locationExpiresAt, 40) || null,
    hotelName: text(body.hotelName, 120),
    hotelPhone: text(body.hotelPhone, 40),
    hotelUrl: text(body.hotelUrl, 300),
    flightNumber: text(body.flightNumber, 40),
    flightUrl: text(body.flightUrl, 300),
    updatedAt: '',
  }
  return NextResponse.json(await saveLiveState(state), { headers: { 'Cache-Control': 'no-store' } })
}
