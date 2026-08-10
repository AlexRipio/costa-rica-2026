import { createHash, createHmac, timingSafeEqual } from 'crypto'

export const familyCookieName = 'v2j_private_session'

// Only the SHA-256 fingerprint is kept in the repository. The private URL itself
// is never exposed in source, navigation, metadata, robots.txt or the sitemap.
const privateAccessTokenHash = 'a579442db3ee680c5f7e6874353d2d0183119d865e032d13aa3af7b71622da92'

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

export function isValidFamilyAccessToken(value: string) {
  const configuredToken = process.env.FAMILY_ACCESS_TOKEN
  if (configuredToken && safeEqual(value, configuredToken)) return true

  const valueHash = createHash('sha256').update(value).digest('hex')
  return safeEqual(valueHash, privateAccessTokenHash)
}
