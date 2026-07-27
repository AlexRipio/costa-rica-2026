import type { Destination, FlightLeg, Hotel, TripDay } from '@/src/data/tripData'

export type FamilyMoment = {
  day: TripDay
  destination?: Destination
  hotel?: Hotel
  flight?: FlightLeg
  phase: 'before' | 'during' | 'after'
  costaRicaDate: string
}

function dateInCostaRica(now: Date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Costa_Rica',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export function getFamilyMoment(
  now: Date,
  days: TripDay[],
  destinations: Destination[],
  hotels: Hotel[],
  flights: FlightLeg[],
): FamilyMoment {
  const costaRicaDate = dateInCostaRica(now)
  const first = days[0]
  const last = days[days.length - 1]
  const phase =
    costaRicaDate < first.isoDate ? 'before' : costaRicaDate > last.isoDate ? 'after' : 'during'
  const day =
    days.find((entry) => entry.isoDate === costaRicaDate) ??
    (phase === 'before' ? first : last)
  const normalizedDestination = day.destination.toLowerCase()
  const destination = destinations.find((entry) => {
    const name = entry.name.toLowerCase()
    return normalizedDestination.includes(name.split(' / ')[0]) || name.includes(normalizedDestination.split(' → ')[0])
  })
  const hotel = hotels.find(
    (entry) => costaRicaDate >= entry.checkIn.slice(0, 10) && costaRicaDate <= entry.checkOut.slice(0, 10),
  )
  const nowTime = now.getTime()
  const flight =
    flights.find((entry) => {
      const start = new Date(entry.departUtc).getTime() - 4 * 60 * 60 * 1000
      const end = new Date(entry.arriveUtc).getTime() + 4 * 60 * 60 * 1000
      return nowTime >= start && nowTime <= end
    }) ?? (phase === 'before' ? flights[0] : phase === 'after' ? flights[flights.length - 1] : undefined)

  return { day, destination, hotel, flight, phase, costaRicaDate }
}
