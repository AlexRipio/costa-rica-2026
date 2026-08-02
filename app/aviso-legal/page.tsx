import type { Metadata } from 'next'
import { LegalDocument } from '@/components/legal-document'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Identificación, condiciones de uso y responsabilidad editorial de Viajan2Juntos.',
  alternates: { canonical: '/aviso-legal' },
}

export default function LegalNoticePage() {
  return (
    <LegalDocument
      eyebrow="Transparencia"
      title="Aviso legal"
      intro="Quién está detrás de Viajan2Juntos, cómo puede utilizarse el contenido y qué conviene tener presente al preparar un viaje con nuestras guías."
    >
      <section>
        <h2>1. Responsable del sitio</h2>
        <p><strong>Viajan2Juntos</strong> es un proyecto editorial personal creado por Andrea y Alejandro y accesible actualmente desde <a href="https://viajan2juntos.vercel.app">viajan2juntos.vercel.app</a>.</p>
        <dl>
          <div><dt>Actividad</dt><dd>Publicación de experiencias, rutas y recursos de viaje.</dd></div>
          <div><dt>Contacto</dt><dd><a href="mailto:hola@viajan2juntos.com">hola@viajan2juntos.com</a></dd></div>
          <div><dt>Ámbito</dt><dd>España y Unión Europea.</dd></div>
        </dl>
        <p>El sitio no ofrece actualmente contratación, reservas ni servicios de pago propios. Si el proyecto incorpora una actividad económica habitual, esta información se ampliará con los datos de identificación exigibles antes de activarla.</p>
      </section>
      <section>
        <h2>2. Finalidad editorial</h2>
        <p>Publicamos relatos personales, itinerarios orientativos, mapas y consejos para ayudar a otros viajeros a preparar su propia ruta. Intentamos diferenciar con claridad lo que vivimos, lo que recomendamos y los datos que proceden de fuentes externas.</p>
        <p>Un viaje cambia: precios, horarios, carreteras, requisitos de entrada, seguridad, clima y normas de parques pueden variar. Por eso enlazamos fuentes oficiales cuando existen y recomendamos comprobar la información sensible antes de reservar.</p>
      </section>
      <section>
        <h2>3. Uso del contenido</h2>
        <p>Los textos originales, el diseño, la marca y las fotografías propias están protegidos por la normativa de propiedad intelectual. Puede compartirse un enlace o una cita breve con atribución, pero no reproducirse una guía completa, redistribuir fotografías ni explotar el contenido sin autorización previa.</p>
        <p>Las fotografías identificadas como propias se publican con todos los derechos reservados. No se autoriza su descarga, republicación, modificación, uso comercial, inclusión en bancos de imágenes ni utilización para entrenar sistemas de inteligencia artificial sin consentimiento escrito de sus autores. Las medidas técnicas de la web dificultan la copia casual, pero no sustituyen esta protección legal.</p>
        <p>Algunas imágenes proceden de Wikimedia Commons u otras fuentes abiertas. Su autoría y licencia se mantienen en los datos del proyecto y siguen sujetas a las condiciones indicadas por cada titular.</p>
      </section>
      <section>
        <h2>4. Enlaces, reservas y recomendaciones</h2>
        <p>Los enlaces a hoteles, parques, mapas, vuelos o terceros se facilitan para ayudar al lector. Viajan2Juntos no controla sus contenidos, disponibilidad, precios ni políticas y no interviene en la relación que el usuario pueda establecer con esas entidades.</p>
        <p>Algunas páginas pueden mostrar publicidad automática de Google AdSense, siempre identificada como tal y separada del contenido editorial. Si una publicación incluye una colaboración, invitación, enlace afiliado o contenido patrocinado, también se identificará de forma visible y no modificará nuestra obligación de contar la experiencia con honestidad.</p>
        <p>Viajan2Juntos participa en el programa de afiliación de IATI Seguros. Los enlaces y widgets identificados permiten aplicar al lector un 5% de descuento automático y pueden generar una comisión para el proyecto sin aumentar el precio final. La contratación, el cobro, las coberturas y la asistencia corresponden exclusivamente a IATI; recomendamos leer las condiciones de la modalidad elegida antes de pagar.</p>
      </section>
      <section>
        <h2>5. Responsabilidad</h2>
        <p>El contenido es informativo y no sustituye asesoramiento profesional, sanitario, jurídico, migratorio o de seguridad. Cada viajero debe valorar su situación, contratar las coberturas apropiadas y seguir las indicaciones de autoridades y operadores oficiales.</p>
      </section>
      <section>
        <h2>6. Legislación aplicable</h2>
        <p>Este sitio se rige por la legislación española y europea aplicable. Para cualquier consulta o incidencia puede escribirse al correo de contacto antes indicado.</p>
      </section>
    </LegalDocument>
  )
}
