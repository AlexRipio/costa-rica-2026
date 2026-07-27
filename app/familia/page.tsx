import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Eye, KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { familyCookieName, isValidFamilySession } from '@/data/family-auth'

export const metadata: Metadata = {
  title: 'Zona Familia',
  description: 'Acceso privado para seguir nuestros viajes.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function FamilyLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const cookieStore = await cookies()
  if (isValidFamilySession(cookieStore.get(familyCookieName)?.value)) {
    redirect('/familia/viajes')
  }
  const params = await searchParams

  return (
    <main className="family-login-page">
      <SiteHeader />
      <div className="family-login-photo" />
      <section className="family-login-shell">
        <div className="family-login-copy">
          <span className="eyebrow">Espacio privado</span>
          <h1>Para quienes nos esperan en casa.</h1>
          <p>
            Horarios, vuelos, alojamientos y el punto previsto de la ruta, explicado de forma sencilla y sin información
            pública innecesaria.
          </p>
          <ul>
            <li>
              <Eye /> Seguimiento claro del día
            </li>
            <li>
              <ShieldCheck /> Información protegida
            </li>
            <li>
              <LockKeyhole /> Acceso solo con contraseña
            </li>
          </ul>
        </div>
        <div className="family-login-card">
          <div className="login-icon">
            <KeyRound />
          </div>
          <span>Viajan2Juntos</span>
          <h2>Zona Familia</h2>
          <p>Introduce la contraseña familiar para continuar.</p>
          <form action="/api/familia/login" method="post">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Contraseña familiar"
              required
            />
            {params.error && <div className="login-error">La contraseña no es correcta. Inténtalo de nuevo.</div>}
            <button type="submit">
              Entrar de forma segura
              <LockKeyhole size={16} />
            </button>
          </form>
          <small>Recordaremos este dispositivo durante un año para que no tengas que volver a escribirla.</small>
        </div>
      </section>
    </main>
  )
}
