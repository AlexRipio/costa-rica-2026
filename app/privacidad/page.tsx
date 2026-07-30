import type { Metadata } from 'next'
import { LegalDocument } from '@/components/legal-document'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Información sobre el tratamiento de datos personales en Viajan2Juntos.',
  alternates: { canonical: '/privacidad' },
}

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Tus datos"
      title="Política de privacidad"
      intro="Recogemos la información mínima necesaria para mantener la web segura, responder mensajes y, si lo autorizas, mejorar las guías con estadísticas agregadas."
    >
      <section>
        <h2>1. Responsable y contacto</h2>
        <p>
          El responsable editorial del tratamiento es <strong>Viajan2Juntos,
          proyecto personal de Andrea y Alejandro</strong>. Para cuestiones de
          privacidad o para ejercer derechos:{' '}
          <a href="mailto:hola@viajan2juntos.com">hola@viajan2juntos.com</a>.
        </p>
      </section>

      <section>
        <h2>2. Qué datos tratamos</h2>
        <ul>
          <li><strong>Mensajes:</strong> correo, nombre si se facilita y contenido de la conversación.</li>
          <li><strong>Seguridad:</strong> datos técnicos mínimos como IP, fecha, solicitud y eventos de error presentes en registros de infraestructura.</li>
          <li><strong>Accesos privados:</strong> cookies técnicas que confirman el acceso a Familia o al editor, sin guardar la contraseña.</li>
          <li><strong>Seguimiento privado:</strong> ubicación y estado introducidos por los administradores durante un viaje.</li>
          <li><strong>Analítica consentida:</strong> identificador seudónimo de navegador, páginas visitadas, duración, dispositivo, ubicación aproximada e interacciones con el contenido.</li>
        </ul>
        <p>No existe registro público, newsletter ni sistema de comentarios.</p>
      </section>

      <section>
        <h2>3. Finalidad y base jurídica</h2>
        <dl>
          <div><dt>Responder mensajes</dt><dd>Consentimiento y medidas solicitadas por quien contacta.</dd></div>
          <div><dt>Proteger la web</dt><dd>Interés legítimo en la seguridad del servicio y de las zonas privadas.</dd></div>
          <div><dt>Mantener una sesión privada</dt><dd>Prestación de la funcionalidad expresamente utilizada.</dd></div>
          <div><dt>Medir y mejorar las guías</dt><dd>Consentimiento, que puede rechazarse o retirarse sin perder acceso al contenido.</dd></div>
        </dl>
      </section>

      <section>
        <h2>4. Google Analytics</h2>
        <p>
          Si aceptas la analítica, Google Ireland Limited procesa información de uso
          para elaborar estadísticas de Google Analytics 4. Se han desactivado las
          señales de Google, la personalización publicitaria y la medición de las
          áreas privadas. No enviamos nombres, correos ni contraseñas a Analytics.
        </p>
        <p>
          Google puede realizar transferencias internacionales aplicando las
          garantías descritas en sus condiciones y políticas. Consulta{' '}
          <a href="https://business.safety.google/adsprocessorterms/" target="_blank" rel="noreferrer">
            las condiciones de tratamiento de datos de Google
          </a>.
        </p>
      </section>

      <section>
        <h2>5. Conservación</h2>
        <p>
          Los mensajes se conservan durante el tiempo necesario para responder y
          atender responsabilidades. Los contadores de intentos caducan
          aproximadamente a los 15 minutos y las sesiones privadas duran hasta un
          año o hasta cerrarlas. La elección de analítica se recuerda unos seis
          meses. Los datos de usuario y eventos de Analytics se configuran con el
          periodo disponible en la propiedad y las estadísticas agregadas pueden
          conservarse durante más tiempo.
        </p>
      </section>

      <section>
        <h2>6. Proveedores</h2>
        <p>
          La web utiliza{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Vercel</a>{' '}
          para alojamiento,{' '}
          <a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noreferrer">Upstash</a>{' '}
          para el estado privado y, con consentimiento,{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Analytics</a>{' '}
          para estadísticas. Estos proveedores pueden procesar datos técnicos por
          cuenta del proyecto.
        </p>
      </section>

      <section>
        <h2>7. Derechos</h2>
        <p>
          Puedes solicitar acceso, rectificación, supresión, oposición, limitación
          o portabilidad escribiendo al correo indicado, además de retirar el
          consentimiento desde «Configurar cookies». También puedes reclamar ante la{' '}
          <a href="https://www.aepd.es/" target="_blank" rel="noreferrer">
            Agencia Española de Protección de Datos
          </a>.
        </p>
      </section>

      <section>
        <h2>8. Menores y cambios</h2>
        <p>
          La web no está diseñada para recoger datos de menores. Esta política se
          actualizará si se añaden formularios, publicidad, comentarios u otra
          funcionalidad que modifique el tratamiento.
        </p>
      </section>
    </LegalDocument>
  )
}
