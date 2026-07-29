import type { ReactNode } from 'react'
import Link from 'next/link'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

export function LegalDocument({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <main className="legal-page">
      <SiteHeader />
      <header className="legal-hero">
        <div className="legal-shell">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <small>Última actualización: 29 de julio de 2026</small>
        </div>
      </header>
      <div className="legal-shell legal-layout">
        <aside>
          <strong>Información legal</strong>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/cookies">Cookies y almacenamiento local</Link>
          <Link href="/creditos">Créditos de imágenes</Link>
          <a href="mailto:hola@viajan2juntos.com">hola@viajan2juntos.com</a>
        </aside>
        <article className="legal-content">{children}</article>
      </div>
      <SiteFooter />
    </main>
  )
}
