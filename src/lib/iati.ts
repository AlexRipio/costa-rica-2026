export const IATI_AFFILIATE_URL =
  'https://www.iatiseguros.com?r=85259934961431&utm_source=colaboradores&utm_medium=referral'

export const IATI_COLLABORATOR_ID = '85259934961431'

export type InsuranceEditorial = {
  eyebrow: string
  title: string
  body: string
  checks: string[]
}

const internationalDefault: InsuranceEditorial = {
  eyebrow: 'Viajar con respaldo',
  title: 'El seguro es una parte más de nuestra ruta.',
  body:
    'En un viaje internacional preferimos llevar la asistencia resuelta antes de salir. Nosotros lo hacemos con IATI porque queremos tener un contacto claro si aparece un problema médico, un traslado inesperado o una incidencia con el equipaje. La póliza adecuada depende del viaje: antes de contratar, comparamos límites, exclusiones y actividades incluidas.',
  checks: ['Asistencia médica suficiente para el destino', 'Repatriación y desplazamientos previstos', 'Equipaje, demoras y actividades incluidas'],
}

const nationalDefault: InsuranceEditorial = {
  eyebrow: 'También cerca de casa',
  title: 'En una escapada corta, decidimos según el plan.',
  body:
    'Viajar por España no exige la misma preparación que una ruta de larga distancia, así que no contratamos por inercia. Si hay reservas importantes, actividades o transportes que queremos proteger, comparamos las opciones de IATI y revisamos especialmente cancelación, incidencias y exclusiones.',
  checks: ['Reservas que conviene proteger', 'Actividades previstas durante la escapada', 'Condiciones y exclusiones antes de pagar'],
}

const destinationEditorial: Record<string, Partial<InsuranceEditorial>> = {
  'costa-rica-2026': {
    title: 'En Costa Rica, para nosotros no era un extra.',
    body:
      'Entre carreteras largas, zonas con poca cobertura, selva, surf y actividades de aventura, viajamos mucho más tranquilos llevando la asistencia resuelta. Nosotros elegimos IATI, pero no contrataríamos cualquier modalidad sin mirar: es importante comprobar que las actividades reales de la ruta están cubiertas y leer sus límites y exclusiones.',
    checks: ['Actividades como surf, tirolina o senderismo', 'Asistencia en zonas alejadas', 'Traslados, equipaje y posibles demoras'],
  },
  'sri-lanka-2025': {
    title: 'En una ruta larga por Sri Lanka, no viajaríamos sin seguro.',
    body:
      'Los cambios de alojamiento, los trayectos por carretera y tren y los días lejos de casa hacen que una incidencia pequeña pueda complicar bastante la ruta. Nosotros lo hacemos con IATI y, para un viaje así, revisaríamos con calma asistencia médica, traslados, equipaje y las actividades que vayamos a realizar.',
  },
  'filipinas-2024': {
    title: 'Entre islas, cada traslado añade una variable más.',
    body:
      'Barcos, vuelos internos, equipaje y días de playa convierten Filipinas en uno de esos viajes donde preferimos llevar un buen respaldo. Nosotros usamos IATI y comprobaríamos que la opción elegida encaja con toda la ruta, especialmente con las actividades acuáticas y los desplazamientos entre islas.',
  },
  'marrakech-desierto': {
    title: 'Del ruido de Marrakech al aislamiento del desierto.',
    body:
      'Al combinar ciudad, carretera y una zona más remota, preferimos saber a quién llamar si algo se tuerce. Para este tipo de viaje usamos IATI y revisamos asistencia, repatriación, equipaje y que las excursiones previstas no queden fuera de las condiciones.',
  },
  'italia-2025': {
    title: 'Tres ciudades y varios trayectos: merece mirar más que la sanidad.',
    body:
      'En una ruta europea también pueden aparecer demoras, equipaje extraviado o reservas que se cruzan. Nosotros comparamos IATI antes de salir y elegimos según el coste del viaje y lo que queramos proteger, leyendo siempre condiciones y exclusiones.',
  },
  'roma-2026': {
    title: 'Cinco días pueden parecer sencillos hasta que algo cambia.',
    body:
      'En una escapada europea valoramos el seguro según vuelos, reservas y actividades ya pagadas. Nosotros lo hacemos con IATI cuando queremos llevar ese respaldo extra, sin confundir la póliza con una cobertura total: primero revisamos qué incluye realmente.',
  },
}

export function getInsuranceEditorial(slug: string, scope: 'internacional' | 'nacional') {
  const base = scope === 'internacional' ? internationalDefault : nationalDefault
  return { ...base, ...destinationEditorial[slug] }
}
