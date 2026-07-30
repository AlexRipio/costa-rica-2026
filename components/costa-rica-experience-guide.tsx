import { BadgeDollarSign, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { costaRicaPaidPrices, costaRicaTripLessons } from '@/src/data/costaRicaExperience'

export function CostaRicaExperienceGuide() {
  return (
    <section className="costa-experience-guide" id="experiencia">
      <div className="section-shell">
        <Reveal className="costa-experience-heading">
          <span className="eyebrow">Después de hacer la ruta completa</span>
          <h2>Lo que ahora podemos contarte <em>sin imaginar nada.</em></h2>
          <p>
            Estas decisiones salen de nuestro viaje: el coche que usamos, el dinero que realmente necesitamos,
            cómo resolvimos la lluvia y en qué actividades sentimos que el precio merecía la pena.
          </p>
        </Reveal>
        <div className="costa-lessons-grid">
          {costaRicaTripLessons.map((lesson, index) => (
            <Reveal delay={index * 0.04} key={lesson.title}>
              <article>
                <span>0{index + 1} · {lesson.kicker}</span>
                <b>{lesson.accent}</b>
                <h3>{lesson.title}</h3>
                <p>{lesson.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="costa-prices-panel">
          <div className="costa-prices-intro">
            <BadgeDollarSign />
            <span className="eyebrow eyebrow-light">Nuestro cuaderno de gastos</span>
            <h3>Precios que pagamos durante el viaje.</h3>
            <p>Sirven como referencia de orden de magnitud. Comprueba siempre el precio actual antes de reservar.</p>
          </div>
          <div className="costa-price-list">
            {costaRicaPaidPrices.map((price) => (
              <div key={price.item}>
                <span><strong>{price.item}</strong><small>{price.note}</small></span>
                <b>{price.paid}</b>
              </div>
            ))}
          </div>
          <a href="#dudas-experiencia">Resolver las dudas que teníamos <ArrowRight /></a>
        </Reveal>
      </div>
    </section>
  )
}
