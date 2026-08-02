'use client'

import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { IATI_AFFILIATE_URL } from '@/src/lib/iati'

const IATI_SCRIPT_URL = 'https://ptunnel.iatiseguros.com/prod/iati-afiliates.js?idColaborator=85259934961431'

type WidgetStatus = 'loading' | 'ready' | 'failed'

export function IatiButtonWidget() {
  return (
    <div className="iati-button-widget">
      <button className="iati-btn" type="button">Calcular seguro con un 5% de descuento</button>
      <a className="iati-url-del" href={IATI_AFFILIATE_URL} rel="sponsored noopener noreferrer">
        Seguro de viaje IATI
      </a>
    </div>
  )
}

function WidgetFallback() {
  return (
    <a
      className="iati-widget-fallback"
      href={IATI_AFFILIATE_URL}
      target="_blank"
      rel="sponsored noopener noreferrer"
      data-analytics-event="affiliate_click"
      data-analytics-label="iati_widget_fallback"
    >
      Abrir el cálculo directamente en IATI <ArrowUpRight />
    </a>
  )
}

function OfficialAttributionLink() {
  return (
    <div
      className="iati-official-attribution"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `<a class="iati-url-del" href="${IATI_AFFILIATE_URL}" rel="sponsored noopener noreferrer">IATI SEGUROS</a>`,
      }}
    />
  )
}

function IatiQuoteWidget({ vertical = false }: { vertical?: boolean }) {
  const formRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<WidgetStatus>('loading')

  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const markReady = () => {
      if (form.childElementCount > 0) setStatus('ready')
    }
    const observer = new MutationObserver(markReady)
    observer.observe(form, { childList: true, subtree: true })
    markReady()

    document.getElementById('iati-script')?.remove()
    const script = document.createElement('script')
    script.id = 'iati-script'
    script.dataset.iatiSite = '1'
    script.src = IATI_SCRIPT_URL
    script.async = true
    script.onerror = () => setStatus('failed')
    document.body.appendChild(script)

    const timeout = window.setTimeout(() => {
      if (form.childElementCount === 0) setStatus('failed')
    }, 9000)

    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
      script.remove()
    }
  }, [])

  return (
    <div className={`iati-widget-shell ${vertical ? 'iati-widget-vertical' : 'iati-widget-horizontal'} iati-widget-${status}`}>
      {status === 'loading' && <div className="iati-widget-loader" role="status">Preparando el cotizador…</div>}
      {status === 'failed' && (
        <div className="iati-widget-error" role="status">
          <strong>El cotizador no ha cargado.</strong>
          <span>Puedes calcularlo directamente en IATI con el mismo 5% de descuento.</span>
        </div>
      )}
      <div id="mini-form-policy" className={vertical ? 'vertical-form' : undefined} ref={formRef} />
      <OfficialAttributionLink />
      <WidgetFallback />
    </div>
  )
}

export function IatiHorizontalWidget() {
  return <IatiQuoteWidget />
}

export function IatiVerticalWidget() {
  return <IatiQuoteWidget vertical />
}
