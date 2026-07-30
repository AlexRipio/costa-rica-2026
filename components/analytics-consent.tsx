'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { BarChart3, ShieldCheck, X } from 'lucide-react'
import { analyticsMeasurementId, trackAnalyticsEvent } from '@/src/lib/analytics'

type ConsentChoice = 'accepted' | 'rejected'

const consentStorageKey = 'v2j_analytics_consent'
const consentLifetime = 180 * 24 * 60 * 60 * 1000
const settingsEvent = 'v2j:open-cookie-settings'
const privatePrefixes = ['/familia', '/actualizar']

function isPrivatePath(pathname: string) {
  return privatePrefixes.some((prefix) => pathname.startsWith(prefix))
}

function initialiseConsentMode() {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag(..._args: unknown[]) {
      window.dataLayer?.push(arguments)
    }

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })
  window.gtag('set', 'ads_data_redaction', true)
}

function readStoredChoice(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(consentStorageKey)
    if (!stored) return null
    const parsed = JSON.parse(stored) as { choice?: ConsentChoice; savedAt?: number }
    if (
      !parsed.choice ||
      !parsed.savedAt ||
      Date.now() - parsed.savedAt > consentLifetime
    ) {
      window.localStorage.removeItem(consentStorageKey)
      return null
    }
    return parsed.choice
  } catch {
    return null
  }
}

function storeChoice(choice: ConsentChoice) {
  window.localStorage.setItem(
    consentStorageKey,
    JSON.stringify({ choice, savedAt: Date.now() }),
  )
}

function clearAnalyticsCookies() {
  const host = window.location.hostname
  document.cookie
    .split(';')
    .map((item) => item.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'))
    .forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${host}; SameSite=Lax`
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${host}; SameSite=Lax`
    })
}

function loadAnalytics(onReady: () => void) {
  initialiseConsentMode()
  window.gtag?.('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })

  const existing = document.getElementById('v2j-google-analytics') as
    | HTMLScriptElement
    | null

  if (existing?.dataset.ready === 'true') {
    onReady()
    return
  }

  const configure = () => {
    window.gtag?.('js', new Date())
    window.gtag?.('config', analyticsMeasurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_flags: 'SameSite=Lax;Secure',
    })
    const script = document.getElementById('v2j-google-analytics')
    if (script) script.dataset.ready = 'true'
    onReady()
  }

  if (existing) {
    existing.addEventListener('load', configure, { once: true })
    return
  }

  const script = document.createElement('script')
  script.id = 'v2j-google-analytics'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsMeasurementId}`
  script.addEventListener('load', configure, { once: true })
  document.head.appendChild(script)
}

export function CookieSettingsButton() {
  return (
    <button
      className="footer-cookie-settings"
      type="button"
      onClick={() => window.dispatchEvent(new Event(settingsEvent))}
    >
      Configurar cookies
    </button>
  )
}

export function AnalyticsConsent() {
  const pathname = usePathname()
  const privatePage = isPrivatePath(pathname)
  const [choice, setChoice] = useState<ConsentChoice | null | undefined>(undefined)
  const [panelOpen, setPanelOpen] = useState(false)
  const [analyticsReady, setAnalyticsReady] = useState(false)

  const activate = useCallback(() => {
    loadAnalytics(() => setAnalyticsReady(true))
  }, [])

  useEffect(() => {
    if (privatePage) {
      initialiseConsentMode()
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
      setAnalyticsReady(false)
      return
    }
    initialiseConsentMode()
    const storedChoice = readStoredChoice()
    setChoice(storedChoice)
    setPanelOpen(storedChoice === null)
    if (storedChoice === 'accepted') activate()
  }, [activate, privatePage])

  useEffect(() => {
    if (privatePage) return
    const openSettings = () => setPanelOpen(true)
    window.addEventListener(settingsEvent, openSettings)
    return () => window.removeEventListener(settingsEvent, openSettings)
  }, [privatePage])

  useEffect(() => {
    if (!analyticsReady || privatePage) return
    window.gtag?.('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${pathname}${window.location.search}`,
    })
  }, [analyticsReady, pathname, privatePage])

  useEffect(() => {
    if (privatePage) return
    const captureMeasuredClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const measured = target?.closest<HTMLElement>('[data-analytics-event]')
      if (!measured?.dataset.analyticsEvent) return

      trackAnalyticsEvent(measured.dataset.analyticsEvent, {
        item_name:
          measured.dataset.analyticsLabel ||
          measured.textContent?.trim().slice(0, 100) ||
          'sin_etiqueta',
        ...(measured.dataset.analyticsValue
          ? {
              value:
                Number(measured.dataset.analyticsValue) ||
                measured.dataset.analyticsValue,
            }
          : {}),
      })
    }
    document.addEventListener('click', captureMeasuredClick)
    return () => document.removeEventListener('click', captureMeasuredClick)
  }, [privatePage])

  if (privatePage || choice === undefined || !panelOpen) return null

  const acceptAnalytics = () => {
    storeChoice('accepted')
    setChoice('accepted')
    setPanelOpen(false)
    activate()
  }

  const rejectAnalytics = () => {
    initialiseConsentMode()
    window.gtag?.('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
    clearAnalyticsCookies()
    storeChoice('rejected')
    setChoice('rejected')
    setAnalyticsReady(false)
    setPanelOpen(false)
  }

  return (
    <aside
      className="cookie-consent"
      role="dialog"
      aria-label="Preferencias de privacidad"
      aria-describedby="cookie-consent-description"
    >
      <div className="cookie-consent-icon" aria-hidden="true">
        {choice ? <ShieldCheck /> : <BarChart3 />}
      </div>
      <div className="cookie-consent-copy">
        <span>Privacidad clara</span>
        <h2>{choice ? 'Tus preferencias' : '¿Nos ayudas a mejorar el blog?'}</h2>
        <p id="cookie-consent-description">
          Usamos Google Analytics únicamente para saber qué guías resultan útiles.
          No activamos publicidad personalizada y no medimos la Zona Familia.
        </p>
        <Link href="/cookies">Ver la política de cookies</Link>
      </div>
      <div className="cookie-consent-actions">
        <button type="button" className="cookie-choice secondary" onClick={rejectAnalytics}>
          Rechazar
        </button>
        <button type="button" className="cookie-choice primary" onClick={acceptAnalytics}>
          Aceptar analítica
        </button>
      </div>
      {choice && (
        <button
          className="cookie-consent-close"
          type="button"
          aria-label="Cerrar preferencias"
          onClick={() => setPanelOpen(false)}
        >
          <X />
        </button>
      )}
    </aside>
  )
}
