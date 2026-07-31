import type { Metadata } from 'next'
import { LegalDocument } from '@/components/legal-document'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Cookies técnicas y analíticas utilizadas por Viajan2Juntos.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalDocument
      eyebrow="Tú decides"
      title="Cookies y almacenamiento local"
      intro="La web utiliza funciones técnicas necesarias y, únicamente con la gestión de consentimiento correspondiente, analítica y publicidad para sostener y mejorar las guías."
    >
      <section>
        <h2>1. Cómo funciona el consentimiento</h2>
        <p>
          Al entrar puedes <strong>aceptar o rechazar</strong> la analítica con la
          misma facilidad. Google Analytics permanece bloqueado hasta que eliges
          «Aceptar analítica». Rechazar no limita ninguna página ni funcionalidad.
        </p>
        <p>
          La elección se guarda durante aproximadamente seis meses en el
          almacenamiento local del navegador. Puedes cambiarla en cualquier momento
          desde <strong>Configurar cookies</strong>, en el pie de la web.
        </p>
      </section>

      <section>
        <h2>2. Tecnologías necesarias</h2>
        <div className="legal-table-wrap">
          <table>
            <thead>
              <tr><th>Nombre</th><th>Finalidad</th><th>Duración</th><th>Tipo</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>v2j_family_session</td>
                <td>Recordar el acceso correcto a la Zona Familia.</td>
                <td>Hasta 1 año o cierre de sesión</td>
                <td>Propia, técnica, HttpOnly</td>
              </tr>
              <tr>
                <td>v2j_editor_session</td>
                <td>Mantener el acceso del administrador al seguimiento.</td>
                <td>Hasta 1 año o cierre de sesión</td>
                <td>Propia, técnica, HttpOnly</td>
              </tr>
              <tr>
                <td>v2j_analytics_consent</td>
                <td>Guardar en el dispositivo si aceptaste o rechazaste la analítica.</td>
                <td>Aproximadamente 6 meses</td>
                <td>Almacenamiento local, técnico</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>3. Google Analytics 4</h2>
        <p>
          Con consentimiento utilizamos Google Analytics 4, servicio prestado por
          Google, para obtener estadísticas como páginas visitadas, duración de las
          sesiones, dispositivo, país aproximado e interacciones con mapas,
          itinerarios, destinos y vídeos. La medición se realiza con el identificador
          <strong> G-YVESX5HD3M</strong>.
        </p>
        <p>
          Hemos desactivado las señales de Google y la personalización publicitaria.
          Tampoco cargamos Analytics dentro de la Zona Familia ni del editor.
        </p>
        <div className="legal-table-wrap">
          <table>
            <thead>
              <tr><th>Cookie</th><th>Finalidad</th><th>Duración habitual</th><th>Proveedor</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga</td>
                <td>Distinguir navegadores y calcular usuarios y sesiones.</td>
                <td>Hasta 2 años</td>
                <td>Google Analytics</td>
              </tr>
              <tr>
                <td>_ga_*</td>
                <td>Mantener el estado de la sesión de la propiedad.</td>
                <td>Hasta 2 años</td>
                <td>Google Analytics</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Más información en la{' '}
          <a href="https://support.google.com/analytics/answer/11397207" target="_blank" rel="noreferrer">
            documentación de cookies de Google Analytics
          </a>{' '}
          y en la{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            política de privacidad de Google
          </a>.
        </p>
      </section>

      <section>
        <h2>4. Google AdSense y publicidad</h2>
        <p>
          Algunas guías pueden incluir espacios publicitarios de Google AdSense,
          identificados de forma visible como <strong>Publicidad</strong>. Google
          puede utilizar cookies o almacenamiento local para seleccionar, limitar y
          medir anuncios, detectar fraude y generar informes.
        </p>
        <p>
          Para visitantes del Espacio Económico Europeo, Reino Unido y Suiza, la
          publicidad se acompaña de una plataforma de consentimiento certificada por
          Google. Desde ese mensaje se puede aceptar, rechazar o ajustar la
          personalización. La web sigue siendo accesible si se rechaza.
        </p>
        <p>
          Según la elección y la disponibilidad, Google puede servir anuncios
          personalizados, no personalizados o limitados. Consulta la{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">
            información de Google sobre publicidad y cookies
          </a>.
        </p>
      </section>

      <section>
        <h2>5. Otras funciones locales</h2>
        <p>
          La lista interactiva de equipaje guarda en el dispositivo la clave
          <strong> viajan2juntos-costa-rica-packing</strong> con los elementos marcados.
          No se envía al servidor y puede borrarse con «Reiniciar» o eliminando los
          datos del sitio desde el navegador.
        </p>
      </section>

      <section>
        <h2>6. Retirar el consentimiento</h2>
        <p>
          Abre <strong>Configurar cookies</strong> en el pie y pulsa «Rechazar».
          La web comunicará la retirada a Google Analytics y eliminará las cookies
          analíticas accesibles desde el navegador. También puedes borrar todos los
          datos desde la configuración de privacidad del navegador.
        </p>
      </section>
    </LegalDocument>
  )
}
