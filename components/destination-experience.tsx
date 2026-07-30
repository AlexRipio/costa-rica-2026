import { BadgeDollarSign, BedDouble, Check, Utensils } from 'lucide-react'
import { LivingStatement } from '@/components/living-statement'
import { ProtectedImage } from '@/components/protected-image'
import { Reveal } from '@/components/reveal'
import type { DestinationExperience } from '@/src/data/costaRicaExperience'
import type { TripImage } from '@/src/data/images'

const verdictClass: Record<string, string> = {
  'De lo mejor': 'best',
  'Nos gustó': 'liked',
  'Con matices': 'mixed',
  Prescindible: 'optional',
}

export function DestinationExperienceOpening({
  experience,
  momentImages = [],
}: {
  experience: DestinationExperience
  momentImages?: Array<TripImage | null>
}) {
  return (
    <>
      <section className="destination-experience-section" id="nuestra-experiencia">
        <div className="section-shell">
          <Reveal className="destination-experience-heading">
            <span className="eyebrow">Nuestra experiencia, sin adornos</span>
            <h2>Lo que vivimos de verdad en esta parada.</h2>
            <p>{experience.lead}</p>
          </Reveal>
          <div className="experience-moment-grid">
            {experience.moments.map((moment, index) => (
              <Reveal delay={index * 0.05} key={moment.title}>
                <article className={`experience-moment-card ${momentImages[index] ? 'experience-moment-card-photo personal-photo-frame' : ''}`}>
                  {momentImages[index] && (
                    <ProtectedImage
                      src={momentImages[index]!.url}
                      alt={momentImages[index]!.alt}
                      loading="lazy"
                    />
                  )}
                  <div className="experience-moment-top">
                    <span>0{index + 1}</span>
                    <small className={`experience-verdict ${verdictClass[moment.verdict]}`}>
                      {moment.verdict}
                    </small>
                  </div>
                  <p>{moment.label}</p>
                  <h3>{moment.title}</h3>
                  <div>{moment.text}</div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="experience-reality-panel">
            <div>
              <span className="eyebrow eyebrow-light">Lo que no se ve en una lista</span>
              <h3>Detalles que cambiaron nuestra ruta.</h3>
            </div>
            <ul>
              {experience.reality.map((item) => (
                <li key={item}><Check /> <span>{item}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <section className="living-statement-section experience-statement-section" aria-label="Un recuerdo de nuestra experiencia">
        <Reveal className="section-shell">
          <LivingStatement {...experience.statement} />
        </Reveal>
      </section>
    </>
  )
}

export function DestinationExperiencePractical({
  experience,
}: {
  experience: DestinationExperience
}) {
  return (
    <section className="destination-experience-practical">
      <div className="section-shell">
        <Reveal className="guide-section-heading">
          <span className="eyebrow">Lo pagamos y lo vivimos</span>
          <h2>Dormir, comer y decidir con datos reales.</h2>
          <p>Son precios y sensaciones de nuestro viaje, no tarifas garantizadas para hoy.</p>
        </Reveal>
        <div className="experience-practical-grid">
          {experience.lodging && (
            <Reveal className="experience-lodging-card">
              <BedDouble />
              <span className="eyebrow">{experience.lodging.verdict}</span>
              <h3>{experience.lodging.name}</h3>
              <p>{experience.lodging.text}</p>
            </Reveal>
          )}
          <Reveal className="experience-food-card">
            <Utensils />
            <span className="eyebrow">Dónde comimos o cómo ahorramos</span>
            {experience.food.map((item) => (
              <div key={item.name}><h3>{item.name}</h3><p>{item.text}</p></div>
            ))}
          </Reveal>
          <Reveal className="experience-price-card">
            <BadgeDollarSign />
            <span className="eyebrow">Precios que pagamos</span>
            <div>
              {experience.prices.map((price) => (
                <p key={price.item}>
                  <span><strong>{price.item}</strong><small>{price.note}</small></span>
                  <b>{price.paid}</b>
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
