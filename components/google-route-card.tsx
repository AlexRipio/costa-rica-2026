import { ExternalLink, Map, Navigation } from 'lucide-react'

const routes = [
  {
    days: 10,
    label: 'Arenal, Monteverde y Manuel Antonio',
    url: 'https://www.google.com/maps/dir/?api=1&origin=Juan+Santamaria+International+Airport&destination=Juan+Santamaria+International+Airport&travelmode=driving&waypoints=La+Fortuna+Costa+Rica%7CMonteverde+Costa+Rica%7CManuel+Antonio+Costa+Rica',
  },
  {
    days: 15,
    label: 'Añadiendo Bajos del Toro y Santa Teresa',
    url: 'https://www.google.com/maps/dir/?api=1&origin=Juan+Santamaria+International+Airport&destination=Juan+Santamaria+International+Airport&travelmode=driving&waypoints=Bajos+del+Toro+Costa+Rica%7CLa+Fortuna+Costa+Rica%7CMonteverde+Costa+Rica%7CSanta+Teresa+Puntarenas+Costa+Rica%7CManuel+Antonio+Costa+Rica',
  },
  {
    days: 20,
    label: 'La vuelta completa hasta el Caribe',
    url: 'https://www.google.com/maps/dir/?api=1&origin=Juan+Santamaria+International+Airport&destination=Juan+Santamaria+International+Airport&travelmode=driving&waypoints=Bajos+del+Toro+Costa+Rica%7CLa+Fortuna+Costa+Rica%7CMonteverde+Costa+Rica%7CSanta+Teresa+Puntarenas+Costa+Rica%7CManuel+Antonio+Costa+Rica%7CPuerto+Viejo+de+Talamanca+Costa+Rica',
  },
]

export function GoogleRouteCard() {
  return (
    <section className="google-route-card" aria-labelledby="google-route-title">
      <div className="google-route-map">
        <iframe
          title="Costa Rica en Google Maps"
          src="https://www.google.com/maps?q=Costa%20Rica&z=7&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="google-route-copy">
        <span className="eyebrow"><Map /> Para llevar en el móvil</span>
        <h3 id="google-route-title">Abre la ruta en Google Maps.</h3>
        <p>
          El mapa de arriba te ayuda a entender el recorrido. Estos enlaces abren cada versión directamente en
          Google Maps para <strong>consultarla, compartirla o guardarla</strong> en tu cuenta.
        </p>
        <div className="google-route-links">
          {routes.map((route) => (
            <a href={route.url} target="_blank" rel="noreferrer" key={route.days}>
              <span><strong>{route.days} días</strong><small>{route.label}</small></span>
              <ExternalLink />
            </a>
          ))}
        </div>
        <small className="google-route-note"><Navigation /> Google puede cambiar el trazado según carreteras, ferris y tráfico.</small>
      </div>
    </section>
  )
}

