const clientPattern = /^ca-pub-\d{16}$/
const slotPattern = /^\d+$/

export const adsenseClient =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT?.trim() ?? ''

export const adsenseContentSlot =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_CONTENT?.trim() ?? ''

export const adsenseEnabled =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED === 'true' &&
  clientPattern.test(adsenseClient) &&
  slotPattern.test(adsenseContentSlot)

export function getAdSensePublisherId() {
  return clientPattern.test(adsenseClient) ? adsenseClient.replace(/^ca-/, '') : ''
}
