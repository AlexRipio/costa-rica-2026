import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { KeyRound, LockKeyhole, Smartphone } from 'lucide-react'
import { LiveEditor } from '@/components/live-editor'
import { editorCookieName, isValidEditorSession } from '@/data/editor-auth'
import { getLiveState } from '@/data/live-state'

export const metadata: Metadata = {
  title: 'Actualizar viaje',
  description: 'Panel privado de actualización del viaje.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function UpdateTripPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const store = await cookies()
  const session = isValidEditorSession(store.get(editorCookieName)?.value)
  if (session) {
    const token = process.env.FAMILY_ACCESS_TOKEN ?? ''
    const parentAccessUrl = token
      ? `https://viajan2juntos.vercel.app/familia/acceso/${token}`
      : 'https://viajan2juntos.vercel.app/familia'
    return <LiveEditor initialState={await getLiveState()} parentAccessUrl={parentAccessUrl} />
  }

  const params = await searchParams
  return (
    <main className="editor-login-page">
      <section className="editor-login-card">
        <div className="editor-login-icon"><Smartphone /></div>
        <span>Solo Andrea y Alejandro</span>
        <h1>Actualizar el viaje</h1>
        <p>Entra desde el móvil para cambiar lo que ve la familia sin necesidad de abrir el ordenador.</p>
        <form action="/api/editor/login" method="post">
          <label htmlFor="editor-password">Clave de edición</label>
          <div><KeyRound /><input id="editor-password" name="password" type="password" autoComplete="current-password" required placeholder="Tu clave privada" /></div>
          {params.error && <p className="editor-login-error">La clave no es correcta o ha habido demasiados intentos.</p>}
          <button type="submit">Entrar al panel <LockKeyhole /></button>
        </form>
        <small><LockKeyhole /> Este acceso permite modificar la información del viaje. No lo compartas con la familia.</small>
      </section>
    </main>
  )
}
