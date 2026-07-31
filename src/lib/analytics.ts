'use client'

export const analyticsMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-YVESX5HD3M'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __v2jConsentDefaultsSet?: boolean
    googlefc?: {
      callbackQueue?: Array<Record<string, () => void>>
      showRevocationMessage?: () => void
    }
  }
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', eventName, parameters)
}
