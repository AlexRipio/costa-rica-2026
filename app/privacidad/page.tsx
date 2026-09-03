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
      intro="Recogemos la información mínima necesaria para mantener la web segura, responder mensajes y, si lo autorizas, mejorar y sostener las guías con estadísticas y publicidad."
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
          <li><strong>Avisos y listas de guías:</strong> correo electrónico si decides recibir tu lista pendiente de maleta, novedades o mejoras de una guía concreta.</li>
          <li><strong>Seguridad:</strong> datos técnicos mínimos como IP, fecha, solicitud y eventos de error presentes en registros de infraestructura.</li>
          <li><strong>Accesos privados:</strong> cookies técnicas que confirman una sesión autorizada o el acceso al editor, sin guardar contraseñas.</li>
          <li><strong>Seguimiento privado:</strong> ubicación y estado introducidos por los administradores durante un viaje.</li>
          <li><strong>Analítica consentida:</strong> identificador seudónimo de navegador, páginas visitadas, duración, dispositivo, ubicación aproximada e interacciones con el contenido.</li>
          <li><strong>Publicidad:</strong> señales técnicas, consentimiento, dispositivo, ubicación aproximada e interacciones necesarias para seleccionar, limitar y medir anuncios y prevenir fraude.</li>
        </ul>
        <p>No existe registro público ni sistema de comentarios.</p>
      </section>

      <section>
        <h2>3. Finalidad y base jurídica</h2>
        <dl>
          <div><dt>Responder mensajes</dt><dd>Consentimiento y medidas solicitadas por quien contacta.</dd></div>
          <div><dt>Enviar avisos o listas de guías</dt><dd>Consentimiento de quien deja su correo para recibir la lista pendiente o novedades relacionadas con el contenido solicitado.</dd></div>
          <div><dt>Proteger la web</dt><dd>Interés legítimo en la seguridad del servicio y de las zonas privadas.</dd></div>
          <div><dt>Mantener una sesión privada</dt><dd>Prestación de la funcionalidad expresamente utilizada.</dd></div>
          <div><dt>Medir y mejorar las guías</dt><dd>Consentimiento, que puede rechazarse o retirarse sin perder acceso al contenido.</dd></div>
          <div><dt>Financiar el contenido con publicidad</dt><dd>Consentimiento cuando sea necesario y legítimo interés para anuncios limitados en los supuestos permitidos.</dd></div>
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
        <h2>5. Google AdSense</h2>
        <p>
          Algunas páginas pueden mostrar publicidad mediante Google AdSense. Google
          Ireland Limited puede procesar datos técnicos y de interacción para servir
          y medir anuncios, controlar su frecuencia y evitar actividad inválida. En
          las regiones donde corresponde, utilizamos una plataforma de consentimiento
          certificada por Google y el contenido sigue disponible si se rechaza la
          personalización.
        </p>
        <p>
          Consulta cómo utiliza Google la información de sitios asociados en{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">
            sus tecnologías y políticas
          </a>.
        </p>
      </section>

      <section>
        <h2>6. Enlaces de afiliación</h2>
        <p>
          Algunos enlaces identificados como afiliados, como los de Holafly, incorporan parámetros de atribución para reconocer si una compra procede de Viajan2Juntos. Al pulsarlos pasarás a la web del proveedor, cuya política de privacidad y cookies será aplicable desde ese momento. No recibimos los datos de pago ni el contenido de tu compra.
        </p>
      </section>

      <section>
        <h2>7. Conservación</h2>
        <p>
          Los mensajes se conservan durante el tiempo necesario para responder y
          atender responsabilidades. Los contadores de intentos caducan
          aproximadamente a los 15 minutos y las sesiones privadas duran hasta un
          año o hasta cerrarlas. La elección de analítica se recuerda unos seis
          meses. Los correos para avisos de guías se conservan hasta que solicites
          la baja o la supresión. Los datos de usuario y eventos de Analytics se configuran con el
          periodo disponible en la propiedad y las estadísticas agregadas pueden
          conservarse durante más tiempo.
        </p>
      </section>

      <section>
        <h2>8. Proveedores</h2>
        <p>
          La web utiliza{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Vercel</a>{' '}
          para alojamiento,{' '}
          <a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noreferrer">Upstash</a>{' '}
          para el estado privado y, con consentimiento,{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google</a>{' '}
          para estadísticas y, cuando esté activo, publicidad mediante AdSense.
          Estos proveedores pueden procesar datos técnicos por
          cuenta del proyecto.
        </p>
      </section>

      <section>
        <h2>9. Derechos</h2>
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
        <h2>10. Menores y cambios</h2>
        <p>
          La web no está diseñada para recoger datos de menores. Esta política se
          actualizará si se añaden formularios, comentarios u otra
          funcionalidad que modifique el tratamiento.
        </p>
      </section>
    </LegalDocument>
  )
}
