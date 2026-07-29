import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { LegalDocument } from '@/components/legal-document'
import { images } from '@/src/data/images'

export const metadata: Metadata = {
  title: 'Créditos de imágenes',
  description: 'Autoría, licencia y fuente de las imágenes utilizadas en Viajan2Juntos.',
  alternates: { canonical: '/creditos' },
}

const creditedImages = Object.values(images).filter((image) => !image.id.startsWith('hotel-'))

export default function CreditsPage() {
  return (
    <LegalDocument
      eyebrow="Autoría y licencias"
      title="Créditos de imágenes"
      intro="Agradecemos y atribuimos el trabajo de quienes han publicado imágenes con licencias que permiten reutilizarlas."
    >
      <section>
        <h2>Imágenes de las guías</h2>
        <p>Las fotografías personales de Andrea y Alejandro pertenecen a sus autores. Las siguientes imágenes proceden de fuentes abiertas y se utilizan respetando la atribución y la licencia indicada en su página original.</p>
        <div className="image-credit-list">
          {creditedImages.map((image) => (
            <article key={image.id}>
              <img src={image.url} alt="" loading="lazy" />
              <div>
                <h3>{image.alt}</h3>
                <p><strong>Autor:</strong> {image.author}</p>
                <p><strong>Licencia:</strong> {image.license}</p>
                <a href={image.source} target="_blank" rel="license noreferrer">Consultar archivo, autoría y licencia <ExternalLink /></a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2>Imágenes de alojamientos</h2>
        <p>Las imágenes de alojamientos se limitan a la zona privada de seguimiento familiar, se usan como referencia de una reserva concreta y pertenecen a sus respectivos establecimientos o plataformas de origen. No forman parte de las guías editoriales públicas. Si un titular desea solicitar una corrección o retirada puede escribir a <a href="mailto:hola@viajan2juntos.com">hola@viajan2juntos.com</a>.</p>
      </section>
    </LegalDocument>
  )
}
