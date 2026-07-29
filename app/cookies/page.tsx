import type { Metadata } from 'next'
import { LegalDocument } from '@/components/legal-document'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Cookies técnicas y almacenamiento local utilizados por Viajan2Juntos.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalDocument
      eyebrow="Sin seguimiento publicitario"
      title="Cookies y almacenamiento local"
      intro="La web funciona sin analítica, perfiles publicitarios ni cookies de marketing. Aquí explicamos exactamente qué se guarda en el navegador."
    >
      <section>
        <h2>1. Qué utilizamos</h2>
        <p>Viajan2Juntos utiliza únicamente tecnologías necesarias para funciones solicitadas por el usuario. No cargamos Google Analytics, Meta Pixel ni redes publicitarias y, por tanto, no instalamos cookies de medición o marketing.</p>
      </section>
      <section>
        <h2>2. Cookies técnicas</h2>
        <div className="legal-table-wrap">
          <table>
            <thead><tr><th>Nombre</th><th>Finalidad</th><th>Duración</th><th>Tipo</th></tr></thead>
            <tbody>
              <tr><td>v2j_family_session</td><td>Recordar que se ha accedido correctamente a la Zona Familia.</td><td>Hasta 1 año o cierre de sesión</td><td>Propia, técnica, HttpOnly</td></tr>
              <tr><td>v2j_editor_session</td><td>Mantener el acceso del administrador a la edición del seguimiento.</td><td>Hasta 1 año o cierre de sesión</td><td>Propia, técnica, HttpOnly</td></tr>
            </tbody>
          </table>
        </div>
        <p>Estas cookies son necesarias para prestar la función privada elegida, utilizan conexión segura y no sirven para seguir la navegación con fines comerciales.</p>
      </section>
      <section>
        <h2>3. Almacenamiento local</h2>
        <p>La lista interactiva de equipaje guarda en el propio dispositivo la clave <strong>viajan2juntos-costa-rica-packing</strong> con los elementos marcados. No se envía al servidor, no identifica a la persona y puede borrarse con el botón «Reiniciar» o eliminando los datos del sitio desde el navegador.</p>
      </section>
      <section>
        <h2>4. Por qué no aparece un banner</h2>
        <p>Al no utilizar tecnologías de analítica, personalización comercial o publicidad que requieran consentimiento, no mostramos un panel de aceptación que interrumpa la lectura. La información permanece accesible desde el pie de todas las páginas.</p>
        <p>Antes de activar una tecnología no esencial se actualizará esta política y se ofrecerán opciones equivalentes para <strong>aceptar, rechazar o configurar</strong> antes de su instalación.</p>
      </section>
      <section>
        <h2>5. Cómo borrar cookies</h2>
        <p>Puede eliminar las cookies y el almacenamiento local desde la configuración de privacidad del navegador. Al hacerlo se cerrará el acceso recordado a las zonas privadas y se reiniciará el progreso de la maleta, sin afectar al contenido público.</p>
      </section>
    </LegalDocument>
  )
}
