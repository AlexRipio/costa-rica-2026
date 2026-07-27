import { createHmac, timingSafeEqual } from 'crypto'

export const familyCookieName = 'v2j_family_session'

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export function familySessionValue() {
  const secret = process.env.AUTH_SECRET
  if (!secret) return ''
  return createHmac('sha256', secret).update('viajan2juntos-family-access').digest('hex')
}

export function isValidFamilySession(value?: string) {
  const expected = familySessionValue()
  return Boolean(value && expected && safeEqual(value, expected))
}

export function isValidFamilyPassword(value: string) {
  const expected = process.env.FAMILY_PASSWORD
  return Boolean(expected && safeEqual(value, expected))
}
