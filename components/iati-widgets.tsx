import { ArrowUpRight } from 'lucide-react'
import { IATI_AFFILIATE_URL } from '@/src/lib/iati'

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

export function IatiHorizontalWidget() {
  return (
    <div className="iati-widget-shell iati-widget-horizontal">
      <div className="iati-widget-loader" role="status">Preparando el cotizador seguro…</div>
      <div id="mini-form-policy" />
      <OfficialAttributionLink />
      <WidgetFallback />
    </div>
  )
}

export function IatiVerticalWidget() {
  return (
    <div className="iati-widget-shell iati-widget-vertical">
      <div className="iati-widget-loader" role="status">Preparando el cotizador seguro…</div>
      <div id="mini-form-policy" className="vertical-form" />
      <OfficialAttributionLink />
      <WidgetFallback />
    </div>
  )
}
