import { ArrowLeft, Camera, MapPin } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { trips } from '@/data/site'
import { images } from '@/src/data/images'

export function generateStaticParams() {
  return trips.filter((trip) => !trip.available).map((trip) => ({ slug: trip.slug }))
}

export default async function ArchiveTripPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const trip = trips.find((item) => item.slug === slug && !item.available)
  if (!trip) notFound()
  const secondImage = slug === 'filipinas-2024' ? images.palawanBay : images.sriLankaTea

  return (
    <main className="cream-page">
      <SiteHeader overlay />
      <section className="archive-trip-hero">
        <img src={trip.image.url} alt={trip.image.alt} />
        <div className="archive-trip-shade" />
        <div className="archive-trip-title"><span>{trip.status}</span><h1>{trip.country}</h1><p>{trip.year}</p></div>
      </section>
      <section className="archive-trip-body">
        <div className="section-shell archive-trip-grid">
          <div>
            <span className="eyebrow">Una historia que ya vivimos</span>
            <h2>Estamos abriendo de nuevo este cuaderno.</h2>
            <p>Este viaje ya forma parte de Viajan2Juntos. Pronto iremos completando aquí la ruta, nuestras fotografías, los lugares que más nos gustaron y todo lo que aprendimos por el camino.</p>
            <div className="archive-pills"><span><MapPin /> {trip.country}</span><span><Camera /> Diario en preparación</span></div>
            <Link className="text-arrow" href="/viajes"><ArrowLeft /> Volver a todos los viajes</Link>
          </div>
          <figure><img src={secondImage.url} alt={secondImage.alt} /><figcaption>{trip.subtitle}</figcaption></figure>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
