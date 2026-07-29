import { images, type TripImage } from './images'

export type JournalStop = {
  label: string
  title: string
  text: string
}

export type JournalPlace = {
  title: string
  text: string
}

export type TravelJournal = {
  slug: string
  kicker: string
  introTitle: string
  intro: string[]
  companions: string
  tripType: string
  mapQuery: string
  statement: { before: string; accent: string; after: string }
  confirmed: string[]
  route: JournalStop[]
  places: JournalPlace[]
  reflections: JournalPlace[]
  practical: JournalPlace[]
  gallery: TripImage[]
  todoDetails: string[]
  todoPhotos: string[]
}

const pending = (item: string) => `TODO: completar con Alejandro — ${item}`

export const travelJournals: Record<string, TravelJournal> = {
  'filipinas-2024': {
    slug: 'filipinas-2024',
    kicker: 'Viaje entre islas · con amigos',
    introTitle: 'Cuatro amigos y un país que todavía estamos ordenando.',
    intro: [
      'Filipinas fue nuestro gran viaje de julio de 2024. No viajamos solos: éramos cuatro amigos, dos parejas, compartiendo trayectos, decisiones y días entre islas.',
      'Este diario parte de lo que sí conserva el archivo actual —Palawan y El Nido— y deja señalado todo lo que aún necesitamos reconstruir con nuestras conversaciones, reservas y fotografías. Preferimos una historia incompleta a rellenarla con recuerdos que no son nuestros.',
    ],
    companions: 'Cuatro amigos · dos parejas',
    tripType: 'Viaje internacional entre islas',
    mapQuery: 'El Nido Palawan Philippines',
    statement: { before: 'Filipinas no fue solo cambiar de isla, fue aprender a', accent: 'viajar los cuatro', after: 'sin perder la capacidad de improvisar.' },
    confirmed: ['Viaje realizado en julio de 2024.', 'Viajamos cuatro amigos, formando dos parejas.', 'Palawan y El Nido forman parte del archivo visual actual.'],
    route: [
      { label: 'Parada confirmada · día pendiente', title: 'Palawan y El Nido', text: 'Las lagunas y la bahía de El Nido aparecen en el archivo actual. Falta recuperar en qué momento de la ruta llegamos, cuántas noches estuvimos y qué excursiones hicimos.' },
    ],
    places: [
      { title: 'El Nido', text: 'Es el lugar mejor documentado ahora mismo por las imágenes guardadas. La experiencia concreta, los island hopping y nuestras recomendaciones se completarán al revisar el material del viaje.' },
      { title: 'Las demás islas', text: 'No las publicamos todavía porque el orden y los transportes internos no están confirmados en el proyecto.' },
    ],
    reflections: [
      { title: 'Viajar con otra pareja', text: 'Es una parte esencial de esta historia. Queremos contar cómo repartíamos decisiones, qué planes funcionaron mejor en grupo y qué aprendimos de compartir un viaje largo.' },
    ],
    practical: [],
    gallery: [images.palawanLagoon, images.palawanBay],
    todoDetails: [
      pending('ruta completa y orden de las islas'),
      pending('duración exacta, vuelos y transportes internos'),
      pending('alojamientos, excursiones y restaurantes'),
      pending('presupuesto, anécdotas y qué cambiaríamos'),
    ],
    todoPhotos: ['TODO: fotografías personales de los cuatro viajeros', 'TODO: galería completa de las islas visitadas'],
  },
  'sri-lanka-2025': {
    slug: 'sri-lanka-2025',
    kicker: 'Ruta por Sri Lanka · guía en construcción',
    introTitle: 'La isla está en el mapa; ahora toca recuperar nuestra ruta.',
    intro: [
      'Sri Lanka fue uno de nuestros grandes viajes de 2025. El archivo actual conserva tres ideas muy claras —templos, trenes y plantaciones de té— y dos referencias visuales: Sigiriya y las tierras altas.',
      'No vamos a convertir esas pistas en un itinerario inventado. Esta página deja preparado el diario con el mismo diseño que Costa Rica y separa con claridad los momentos confirmados de los datos que aún tenemos que recuperar.',
    ],
    companions: 'TODO: confirmar acompañantes',
    tripType: 'Ruta internacional por la isla',
    mapQuery: 'Sri Lanka',
    statement: { before: 'Sri Lanka se nos quedó como una mezcla de', accent: 'trenes, templos y té', after: 'que merece ser contada despacio.' },
    confirmed: ['Viaje realizado en agosto de 2025.', 'Sigiriya forma parte del archivo visual.', 'Los trenes, los templos y las plantaciones de té forman parte del recuerdo ya registrado en la web.'],
    route: [
      { label: 'Momento confirmado · fecha pendiente', title: 'Sigiriya', text: 'La roca de Sigiriya está asociada al viaje en el archivo actual. Falta recuperar el día, el alojamiento y cómo encajó en la ruta.' },
      { label: 'Zona confirmada · orden pendiente', title: 'Tierras altas y té', text: 'Las plantaciones de té también forman parte del archivo. No publicamos todavía un recorrido concreto hasta contrastarlo con nuestras reservas y fotografías.' },
    ],
    places: [
      { title: 'Sigiriya', text: 'Una de las referencias más claras del viaje y la futura puerta de entrada al relato de la zona cultural.' },
      { title: 'Tierras altas', text: 'El paisaje del té y el viaje en tren merecen un capítulo propio cuando recuperemos estaciones, trayectos y paradas reales.' },
    ],
    reflections: [],
    practical: [],
    gallery: [images.sigiriya, images.sriLankaTea],
    todoDetails: [
      pending('ruta completa, ciudades y orden de las paradas'),
      pending('trayectos en tren y otros transportes'),
      pending('alojamientos, restaurantes y actividades'),
      pending('duración, presupuesto y aprendizajes personales'),
    ],
    todoPhotos: ['TODO: fotografías personales de Sri Lanka', 'TODO: vídeos del tren y de las tierras altas'],
  },
  'italia-2025': {
    slug: 'italia-2025',
    kicker: 'Norte de Italia · tres ciudades',
    introTitle: 'Venecia, Bérgamo y Verona en un viaje distinto de Roma.',
    intro: [
      'Este viaje reunió Venecia, Bérgamo y Verona. Lo tratamos como una ruta propia por el norte de Italia, separada de la escapada posterior a Roma para que cada guía sea fácil de entender.',
      'Las tres ciudades están confirmadas. Todavía necesitamos recuperar el orden exacto, las noches y los trayectos antes de convertir la base en un itinerario personal completo.',
    ],
    companions: 'TODO: confirmar acompañantes',
    tripType: 'Viaje internacional',
    mapQuery: 'Venice Bergamo Verona Italy',
    statement: { before: 'Un mismo país puede guardar', accent: 'viajes completamente distintos', after: 'y esta ruta del norte merece su propio cuaderno.' },
    confirmed: ['El viaje reunió Venecia, Bérgamo y Verona.', 'Fue una experiencia distinta de la escapada a Roma.', 'Se realizó en noviembre de 2025.'],
    route: [
      { label: 'Parada confirmada · orden pendiente', title: 'Venecia', text: 'La ciudad forma parte del viaje. Falta recuperar cuántas noches pasamos y cómo conectó con las siguientes etapas.' },
      { label: 'Parada confirmada · orden pendiente', title: 'Bérgamo', text: 'Bérgamo fue otra de las ciudades de la ruta. La experiencia y el alojamiento se completarán con nuestros recuerdos.' },
      { label: 'Parada confirmada · orden pendiente', title: 'Verona', text: 'Verona completa las tres ciudades confirmadas de este viaje por el norte de Italia.' },
    ],
    places: [
      { title: 'Venecia', text: 'Guía de la ciudad pendiente de contrastar con nuestra ruta y fotografías.' },
      { title: 'Bérgamo', text: 'Guía práctica pendiente de completar con lo que vimos y cómo llegamos.' },
      { title: 'Verona', text: 'Guía pendiente de ordenar a partir de reservas, notas y material personal.' },
    ],
    reflections: [{ title: 'Una historia separada', text: 'No mezclaremos este viaje con Roma. Cuando recuperemos el recorrido, tendrá su propio orden, tono y galería.' }],
    practical: [],
    gallery: [],
    todoDetails: [pending('orden de Venecia, Bérgamo y Verona'), pending('duración y noches en cada ciudad'), pending('acompañantes, alojamientos, transporte y presupuesto'), pending('anécdotas, comidas y recomendaciones personales')],
    todoPhotos: ['TODO: fotografía de portada de Italia en noviembre de 2025', 'TODO: galería personal del viaje'],
  },
  'roma-2026': {
    slug: 'roma-2026',
    kicker: 'Italia · escapada urbana',
    introTitle: 'Cinco días en Roma, sin mezclarla con el viaje anterior a Italia.',
    intro: [
      'Roma fue una escapada propia del 20 al 24 de marzo de 2026. Sabemos la fecha y la duración; todavía necesitamos recuperar el barrio, el alojamiento y el itinerario real antes de contar qué vimos cada día.',
      'La estructura está lista para convertir las reservas y fotografías en una entrada personal, sin copiar una lista de monumentos que podría pertenecer a cualquiera.',
    ],
    companions: 'TODO: confirmar acompañantes',
    tripType: 'Escapada urbana internacional',
    mapQuery: 'Rome Italy',
    statement: { before: 'Roma no necesita otra lista de monumentos, necesita', accent: 'nuestro propio recorrido', after: 'contado como realmente ocurrió.' },
    confirmed: ['Viaje realizado del 20 al 24 de marzo de 2026.', 'Duración: cinco días.', 'Fue una experiencia distinta del viaje a Italia de noviembre de 2025.'],
    route: [],
    places: [],
    reflections: [],
    practical: [],
    gallery: [],
    todoDetails: [pending('itinerario día por día'), pending('barrio y alojamiento'), pending('lugares visitados, entradas y desplazamientos'), pending('restaurantes, presupuesto y momentos favoritos')],
    todoPhotos: ['TODO: foto de portada de Roma', 'TODO: galería personal del 20–24 de marzo de 2026'],
  },
  'marrakech-desierto': {
    slug: 'marrakech-desierto',
    kicker: 'Marruecos · ciudad y desierto',
    introTitle: 'Marrakech y el desierto fueron un mismo viaje.',
    intro: [
      'Está confirmado que viajamos a Marrakech y al desierto de Marruecos. Lo que aún no está documentado en el proyecto es la fecha, la ruta entre ambos lugares y las experiencias concretas.',
      'Dejamos el diario preparado para contar el contraste entre ciudad y desierto desde nuestro recuerdo, no desde una descripción turística genérica.',
    ],
    companions: 'TODO: confirmar acompañantes',
    tripType: 'Ciudad + ruta al desierto',
    mapQuery: 'Marrakech Morocco',
    statement: { before: 'Este viaje unió el ruido de Marrakech con', accent: 'el silencio del desierto', after: 'pero todavía tenemos que ordenar la historia.' },
    confirmed: ['Viaje realizado a Marrakech.', 'El viaje incluyó una experiencia en el desierto de Marruecos.'],
    route: [],
    places: [{ title: 'Marrakech', text: 'Parada confirmada; medina, alojamiento y experiencias pendientes de recuperar.' }, { title: 'Desierto', text: 'Parte confirmada del viaje; falta concretar zona, transporte, campamento y duración.' }],
    reflections: [],
    practical: [],
    gallery: [],
    todoDetails: [pending('fecha y duración'), pending('ruta exacta desde Marrakech al desierto'), pending('alojamientos, transporte y actividades'), pending('comidas, presupuesto, anécdotas y consejos')],
    todoPhotos: ['TODO: foto de portada de Marrakech', 'TODO: fotografías personales del desierto de Marruecos'],
  },
  malaga: {
    slug: 'malaga',
    kicker: 'España · guía de Málaga',
    introTitle: 'Málaga también forma parte de nuestro atlas.',
    intro: ['Málaga es un viaje realizado y confirmado. Todavía no tenemos en el proyecto la fecha, la duración ni el recorrido, así que esta primera versión funciona como un archivo honesto listo para recibir nuestros recuerdos.'],
    companions: 'TODO: confirmar acompañantes',
    tripType: 'Escapada nacional',
    mapQuery: 'Málaga Spain',
    statement: { before: 'No hace falta cruzar un océano para guardar', accent: 'un viaje que importa', after: 'y Málaga también está en nuestra historia.' },
    confirmed: ['Viaje realizado a Málaga.'],
    route: [],
    places: [],
    reflections: [],
    practical: [],
    gallery: [],
    todoDetails: [pending('fecha, duración e itinerario'), pending('alojamiento y desplazamientos'), pending('lugares, restaurantes y recuerdos personales')],
    todoPhotos: ['TODO: foto de portada de Málaga', 'TODO: galería personal de Málaga'],
  },
  sevilla: {
    slug: 'sevilla',
    kicker: 'España · guía de Sevilla',
    introTitle: 'Sevilla, pendiente de volver a nuestro carrete.',
    intro: ['El viaje a Sevilla está confirmado, pero el archivo actual no conserva aún fechas ni detalles suficientes para escribir una ruta personal con rigor. La página queda creada sin rellenarla con tópicos.'],
    companions: 'TODO: confirmar acompañantes',
    tripType: 'Escapada nacional',
    mapQuery: 'Seville Spain',
    statement: { before: 'Sevilla ya está en el mapa; ahora falta', accent: 'volver a nuestros recuerdos', after: 'para contarla de verdad.' },
    confirmed: ['Viaje realizado a Sevilla.'],
    route: [],
    places: [],
    reflections: [],
    practical: [],
    gallery: [],
    todoDetails: [pending('fecha, duración y ruta'), pending('alojamiento, transporte y visitas'), pending('comidas, anécdotas y recomendaciones')],
    todoPhotos: ['TODO: foto de portada de Sevilla', 'TODO: galería personal de Sevilla'],
  },
  'asturias-luarca': {
    slug: 'asturias-luarca',
    kicker: 'España · Asturias y Luarca',
    introTitle: 'Asturias, con Luarca como recuerdo confirmado.',
    intro: ['Asturias forma parte de nuestros viajes nacionales y Luarca es la referencia más clara que tenemos ahora mismo. Antes de añadir playas, pueblos o una ruta de carretera necesitamos revisar el material real del viaje.'],
    companions: 'TODO: confirmar acompañantes',
    tripType: 'Viaje nacional',
    mapQuery: 'Luarca Asturias Spain',
    statement: { before: 'Del viaje a Asturias hay un nombre que permanece:', accent: 'Luarca junto al mar', after: 'y desde ahí reconstruiremos la ruta.' },
    confirmed: ['Viaje realizado a Asturias.', 'Luarca fue una parte especialmente relevante del viaje.'],
    route: [{ label: 'Parada confirmada · fecha pendiente', title: 'Luarca', text: 'Es el único punto que podemos publicar con seguridad por ahora. El resto de la ruta se añadirá al revisar fotografías y reservas.' }],
    places: [{ title: 'Luarca', text: 'Punto confirmado y futura base del relato personal de este viaje por Asturias.' }],
    reflections: [],
    practical: [],
    gallery: [],
    todoDetails: [pending('fecha y duración'), pending('ruta completa por Asturias'), pending('alojamientos, coche y paradas'), pending('comidas, anécdotas y qué repetiríamos')],
    todoPhotos: ['TODO: foto de portada de Asturias', 'TODO: fotografías personales de Luarca'],
  },
  calpe: {
    slug: 'calpe',
    kicker: 'España · guía de Calpe',
    introTitle: 'Calpe fue una escapada real; el diario todavía está en blanco.',
    intro: ['Calpe es otro de nuestros viajes nacionales confirmados. No añadimos ahora una lista de playas o excursiones porque no tenemos registrado cuáles formaron parte de nuestra experiencia.'],
    companions: 'TODO: confirmar acompañantes',
    tripType: 'Escapada nacional',
    mapQuery: 'Calpe Alicante Spain',
    statement: { before: 'Calpe no necesita una guía genérica, necesita', accent: 'nuestros días concretos', after: 'y las fotos que los acompañaron.' },
    confirmed: ['Viaje realizado a Calpe.'],
    route: [],
    places: [],
    reflections: [],
    practical: [],
    gallery: [],
    todoDetails: [pending('fecha, duración e itinerario'), pending('alojamiento y transporte'), pending('playas o lugares realmente visitados'), pending('restaurantes, presupuesto y recuerdos')],
    todoPhotos: ['TODO: foto de portada de Calpe', 'TODO: galería personal de Calpe'],
  },
}
