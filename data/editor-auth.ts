import { createHmac, timingSafeEqual } from 'crypto'

export const editorCookieName = 'v2j_editor_session'

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export function editorSessionValue() {
  const secret = process.env.AUTH_SECRET
  if (!secret) return ''
  return createHmac('sha256', secret).update('viajan2juntos-mobile-editor').digest('hex')
}

export function isValidEditorSession(value?: string) {
  const expected = editorSessionValue()
  return Boolean(value && expected && safeEqual(value, expected))
}

export function isValidEditorPassword(value: string) {
  const expected = process.env.EDITOR_PASSWORD
  return Boolean(expected && safeEqual(value, expected))
}
