'use client'

import { useEffect, useRef, useState } from 'react'
import {
  adsenseClient,
  adsenseContentSlot,
  adsenseEnabled,
} from '@/src/lib/adsense'

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[]
  }
}

type AdStatus = 'loading' | 'filled' | 'unfilled'

function loadAdSense(onReady: () => void) {
  const scriptId = 'v2j-google-adsense'
  const existing = document.getElementById(scriptId) as HTMLScriptElement | null

  if (existing?.dataset.ready === 'true') {
    onReady()
    return
  }

  if (existing) {
    existing.addEventListener('load', onReady, { once: true })
    return
  }

  const script = document.createElement('script')
  script.id = scriptId
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`
  script.addEventListener('load', () => {
    script.dataset.ready = 'true'
    onReady()
  }, { once: true })
  document.head.appendChild(script)
}

export function AdSpace({ compact = false }: { compact?: boolean }) {
  const advertRef = useRef<HTMLModElement>(null)
  const requestedRef = useRef(false)
  const [status, setStatus] = useState<AdStatus>('loading')

  useEffect(() => {
    if (!adsenseEnabled || !advertRef.current) return

    const advert = advertRef.current
    const observer = new MutationObserver(() => {
      const nextStatus = advert.dataset.adStatus
      if (nextStatus === 'filled' || nextStatus === 'unfilled') {
        setStatus(nextStatus)
      }
    })
    observer.observe(advert, { attributes: true, attributeFilter: ['data-ad-status'] })

    loadAdSense(() => {
      if (requestedRef.current) return
      requestedRef.current = true
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {
        setStatus('unfilled')
      }
    })

    return () => observer.disconnect()
  }, [])

  if (!adsenseEnabled || status === 'unfilled') return null

  return (
    <aside
      className={`google-ad-space ${compact ? 'google-ad-space-compact' : ''} ${status === 'filled' ? 'is-filled' : 'is-loading'}`}
      aria-label="Publicidad"
    >
      <span className="google-ad-label">Publicidad</span>
      <ins
        ref={advertRef}
        className="adsbygoogle"
        data-ad-client={adsenseClient}
        data-ad-slot={adsenseContentSlot}
        data-ad-format={compact ? 'horizontal' : 'auto'}
        data-full-width-responsive="true"
      />
    </aside>
  )
}
