import Link from 'next/link'
import { ArrowUpRight, Mail, Play } from 'lucide-react'
import { tiktokUrl } from '@/src/data/siteSeo'
import { Logo } from './logo'
import { CookieSettingsButton } from './analytics-consent'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Logo light />
          <p>Dos viajeros, un mapa y muchas historias.</p>
        </div>
        <div className="footer-links">
          <Link href="/viajes">Todos los viajes</Link>
          <Link href="/nosotros">Quiénes somos</Link>
          <a href="/seguro-de-viaje">Seguro de viaje · 5% descuento</a>
          <a href="https://holafly.sjv.io/c/7542907/3856277/24764" target="_blank" rel="sponsored noopener noreferrer">eSIM Holafly · código 2JUNTOS</a>
          <a href="mailto:hola@viajan2juntos.com">
            Contacto <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <a
        className="footer-tiktok"
        href={tiktokUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Seguir a Viajan2Juntos en TikTok"
      >
        <span className="footer-tiktok-icon"><Play size={18} fill="currentColor" /></span>
        <span className="footer-tiktok-copy">
          <small>También nos movemos en vídeo</small>
          <strong>TikTok <em>@viajan2juntos</em></strong>
        </span>
        <ArrowUpRight className="footer-tiktok-arrow" />
      </a>
      <div className="footer-bottom">
        <span>Viajan2Juntos © 2026</span>
        <nav className="footer-legal-links" aria-label="Información legal">
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/cookies">Cookies</Link>
          <CookieSettingsButton />
          <Link href="/creditos">Créditos</Link>
        </nav>
        <div className="footer-social-icons" aria-label="Contacto y redes">
          <a href={tiktokUrl} target="_blank" rel="noreferrer">TikTok</a>
          <a href="mailto:hola@viajan2juntos.com" aria-label="Enviar un correo a Viajan2Juntos"><Mail size={17} /></a>
        </div>
      </div>
    </footer>
  )
}
