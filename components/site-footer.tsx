import Link from 'next/link'
import { ArrowUpRight, Instagram, Mail } from 'lucide-react'
import { Logo } from './logo'

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
          <Link href="/familia">Zona Familia</Link>
          <a href="mailto:hola@viajan2juntos.com">
            Contacto <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Viajan2Juntos © 2026</span>
        <div>
          <Instagram size={17} />
          <Mail size={17} />
        </div>
      </div>
    </footer>
  )
}
