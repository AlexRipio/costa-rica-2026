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
      intro="Recogemos la mínima información necesaria para mantener la web segura y responder cuando alguien nos escribe."
    >
      <section>
        <h2>1. Responsable y contacto</h2>
        <p>El responsable editorial del tratamiento es <strong>Viajan2Juntos, proyecto personal de Andrea y Alejandro</strong>. Para cuestiones de privacidad o para ejercer derechos: <a href="mailto:hola@viajan2juntos.com">hola@viajan2juntos.com</a>.</p>
      </section>
      <section>
        <h2>2. Qué datos tratamos</h2>
        <ul>
          <li><strong>Mensajes enviados por correo:</strong> dirección, nombre si se facilita y contenido de la conversación.</li>
          <li><strong>Seguridad y funcionamiento:</strong> datos técnicos mínimos, como dirección IP, fecha, solicitud realizada y eventos de error, que pueden aparecer en registros de alojamiento.</li>
          <li><strong>Accesos privados:</strong> una cookie técnica confirma que el navegador ha superado la contraseña de Familia o del editor. No contiene la contraseña ni crea un perfil publicitario.</li>
          <li><strong>Seguimiento en directo:</strong> la ubicación y el estado del viaje son datos introducidos por los administradores y solo se muestran dentro de la zona privada mientras sean pertinentes.</li>
        </ul>
        <p>No existe formulario de registro, newsletter, sistema de comentarios ni analítica publicitaria en este momento.</p>
      </section>
      <section>
        <h2>3. Para qué y con qué base</h2>
        <dl>
          <div><dt>Responder mensajes</dt><dd>Consentimiento y medidas solicitadas por la persona que contacta.</dd></div>
          <div><dt>Proteger la web y limitar intentos de acceso</dt><dd>Interés legítimo en la seguridad del servicio y de la zona privada.</dd></div>
          <div><dt>Mantener una sesión solicitada</dt><dd>Prestación de la funcionalidad expresamente utilizada por el visitante.</dd></div>
        </dl>
      </section>
      <section>
        <h2>4. Conservación</h2>
        <p>Los correos se conservan durante el tiempo necesario para resolver la consulta y atender posibles responsabilidades. Los contadores de intentos de acceso caducan aproximadamente a los 15 minutos. Las cookies de acceso duran hasta un año o hasta que se cierra la sesión. Los registros técnicos se conservan durante los periodos mínimos establecidos por los proveedores de infraestructura.</p>
      </section>
      <section>
        <h2>5. Proveedores</h2>
        <p>La web utiliza infraestructura de <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Vercel</a> para alojamiento y de <a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noreferrer">Upstash</a> para el estado privado y la protección frente a intentos repetidos. Estos proveedores pueden procesar datos técnicos por cuenta del proyecto y aplicar transferencias internacionales con las garantías previstas en sus condiciones y en la normativa aplicable.</p>
      </section>
      <section>
        <h2>6. Derechos</h2>
        <p>Puede solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo al correo indicado. Para evitar entregar datos a otra persona podremos pedir información razonable que confirme la identidad. También puede presentar una reclamación ante la <a href="https://www.aepd.es/" target="_blank" rel="noreferrer">Agencia Española de Protección de Datos</a>.</p>
      </section>
      <section>
        <h2>7. Menores y cambios</h2>
        <p>La web no está diseñada para recoger datos de menores. Esta política se actualizará si se añaden formularios, analítica, publicidad, comentarios u otra funcionalidad que cambie el tratamiento.</p>
      </section>
    </LegalDocument>
  )
}
