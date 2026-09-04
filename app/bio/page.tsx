import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Backpack, Compass, Map, Play, ShieldCheck, Wifi } from 'lucide-react'
import { BioShareButton } from '@/components/bio-share-button'
import { holaflyAffiliateUrl } from '@/components/holafly-affiliate-card'
import { trips } from '@/data/site'
import { IATI_AFFILIATE_URL } from '@/src/lib/iati'
import { tiktokUrl } from '@/src/data/siteSeo'

export const metadata: Metadata = {
  title: 'Enlaces de Viajan2Juntos',
  description: 'Accesos rápidos a las guías, rutas y descuentos de Viajan2Juntos.',
  robots: { index: false, follow: false },
}

const guideLinks = [
  { href: '/viajes/costa-rica-2026', icon: Compass, title: 'Guía de Costa Rica', note: 'Nuestra ruta completa, sin prisa' },
  { href: '/viajes/costa-rica-2026#itinerarios', icon: Map, title: 'Itinerario de Costa Rica', note: 'El viaje día a día' },
  { href: '/viajes/costa-rica-2026/lugares-recomendados', icon: Map, title: 'Lugares que guardaríamos', note: 'Hoteles, mesas y paradas' },
  { href: '/viajes/costa-rica-2026/maleta', icon: Backpack, title: 'Prepara la maleta', note: 'La lista útil para Costa Rica' },
  { href: '/viajes', icon: Compass, title: 'Todos nuestros viajes', note: 'El atlas de Viajan2Juntos' },
]

export default function BioPage() {
  return (
    <main className="bio-page">
      <div className="bio-orb bio-orb-one" aria-hidden="true" />
      <div className="bio-orb bio-orb-two" aria-hidden="true" />
      <section className="bio-shell">
        <header className="bio-header">
          <div className="bio-topline">
            <Link className="bio-home-mark" href="/" aria-label="Ir al inicio de Viajan2Juntos">V2</Link>
            <BioShareButton />
          </div>
          <Image className="bio-avatar" src="/icon.png" alt="Logo de Viajan2Juntos" width={112} height={112} priority />
          <h1>Viajan2Juntos <em>✦</em></h1>
          <p>Guías, rutas y descuentos para tu próximo viaje.</p>
          <a className="bio-social" href={tiktokUrl} target="_blank" rel="noreferrer"><Play fill="currentColor" aria-hidden="true" /> TikTok @viajan2juntos</a>
        </header>

        <section className="bio-group bio-trips" aria-labelledby="bio-trips">
          <div className="bio-group-heading">
            <span>Guías de viaje</span>
            <h2 id="bio-trips">Elige tu próximo destino</h2>
          </div>
          <div className="bio-trip-list">
            {trips.map((trip, index) => (
              <Link className={`bio-trip-card ${index === 0 ? 'bio-trip-card-current' : ''}`} href={`/viajes/${trip.slug}`} key={trip.slug}>
                <span className="bio-trip-image"><img src={trip.image.url.replace('width=2600', 'width=180')} alt="" loading={index < 2 ? 'eager' : 'lazy'} /></span>
                <span className="bio-trip-copy"><strong>{trip.title}</strong><small>{trip.subtitle}</small></span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="bio-group bio-costa-rica" aria-labelledby="bio-guides">
          <div className="bio-group-heading">
            <span>Si vienes por Costa Rica</span>
            <h2 id="bio-guides">Planifica la ruta</h2>
          </div>
          <div className="bio-link-list">
            {guideLinks.map(({ href, icon: Icon, title, note }) => (
              <Link className="bio-link-card" href={href} key={href}>
                <span className="bio-link-icon"><Icon aria-hidden="true" /></span>
                <span><strong>{title}</strong><small>{note}</small></span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="bio-group bio-perks" aria-labelledby="bio-perks">
          <div className="bio-group-heading">
            <span>Descuentos que usamos</span>
            <h2 id="bio-perks">Antes de despegar.</h2>
          </div>
          <a className="bio-link-card bio-link-card-featured" href={holaflyAffiliateUrl} target="_blank" rel="sponsored noopener noreferrer">
            <span className="bio-link-icon"><Wifi aria-hidden="true" /></span>
            <span><strong>eSIM de Holafly · 5% menos</strong><small>Código <b>2JUNTOS</b> aplicado al entrar</small></span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="bio-link-card" href={IATI_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer">
            <span className="bio-link-icon"><ShieldCheck aria-hidden="true" /></span>
            <span><strong>Seguro de viaje IATI · 5% menos</strong><small>Descuento automático desde nuestro enlace</small></span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </section>

        <a className="bio-tiktok" href={tiktokUrl} target="_blank" rel="noreferrer">
          <span><Play fill="currentColor" aria-hidden="true" /></span>
          <strong>Ver nuestros vídeos en TikTok</strong>
          <ArrowUpRight aria-hidden="true" />
        </a>

        <footer className="bio-footer">
          <p>Algunos enlaces son de afiliación: pueden ayudarnos a sostener el proyecto sin coste extra para ti.</p>
          <Link href="/aviso-legal">Condiciones y transparencia</Link>
        </footer>
      </section>
    </main>
  )
}
