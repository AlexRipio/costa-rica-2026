export type CostaRicaGuideExtra = {
  region: string
  routePosition: string
  mapQuery: string
  base: string
  arrival: string
  feel: string
  ourRoute: string
  nearby: string[]
  photoKeys: string[]
}

export const costaRicaGuideExtras: Record<string, CostaRicaGuideExtra> = {
  'alajuela-bajos-del-toro': {
    region: 'Valle Central y montañas del norte',
    routePosition: 'Primera parada · Entre el aeropuerto y La Fortuna',
    mapQuery: 'Bajos del Toro Costa Rica',
    base: 'Alajuela para aterrizar; Bajos del Toro para las cascadas',
    arrival: 'Desde el aeropuerto: unos 40 min a Alajuela y cerca de 2 h hasta Bajos del Toro',
    feel: 'Carretera de montaña, pueblos pequeños, niebla y cascadas enormes',
    ourRoute:
      'En nuestra ruta esta etapa sirve para aterrizar sin prisas y entrar en Costa Rica por una zona verde y poco urbana. No hace falta coleccionar cascadas: con una buena elección el día ya merece la pena.',
    nearby: ['Volcán Poás', 'Vara Blanca', 'Catarata del Toro', 'Blue Falls'],
    photoKeys: ['fortuna', 'arenal', 'monteverde'],
  },
  'la-fortuna-arenal': {
    region: 'Llanuras del Norte',
    routePosition: 'Segunda parada · Al norte del país',
    mapQuery: 'La Fortuna Costa Rica',
    base: 'La Fortuna, el pueblo con más servicios junto al volcán',
    arrival: 'Desde Alajuela: 3–4 h según la carretera y la lluvia',
    feel: 'Volcán, bosque tropical, puentes, cataratas y aguas termales',
    ourRoute:
      'Aquí reservamos varios días porque todo está repartido alrededor del volcán. La clave no es hacer cinco tours diarios, sino combinar una mañana potente con una tarde más lenta.',
    nearby: ['Volcán Arenal', 'Catarata La Fortuna', 'Místico', 'Lago Arenal'],
    photoKeys: ['arenal', 'fortuna', 'monteverde'],
  },
  monteverde: {
    region: 'Cordillera de Tilarán',
    routePosition: 'Tercera parada · Entre Arenal y el Pacífico',
    mapQuery: 'Monteverde Costa Rica',
    base: 'Santa Elena o Cerro Plano',
    arrival: 'Desde La Fortuna: 3–4 h rodeando el lago; los últimos kilómetros son lentos',
    feel: 'Bosque nuboso, viento fresco, aves y caminos de montaña',
    ourRoute:
      'Monteverde cambia por completo el viaje: baja la temperatura y la selva se vuelve silenciosa. En nuestra ruta encaja para caminar, ver animales de noche y elegir una actividad de aventura.',
    nearby: ['Reserva Monteverde', 'Curi-Cancha', 'Santa Elena', 'Cerro Plano'],
    photoKeys: ['monteverde', 'arenal', 'santaTeresa'],
  },
  'santa-teresa': {
    region: 'Península de Nicoya · Pacífico',
    routePosition: 'Cuarta parada · Costa oeste',
    mapQuery: 'Santa Teresa Puntarenas Costa Rica',
    base: 'Playa Carmen para servicios o Santa Teresa para estar junto al mar',
    arrival: 'Desde Monteverde: jornada larga con ferry Puntarenas–Paquera',
    feel: 'Surf, carretera polvorienta, restaurantes pequeños y grandes atardeceres',
    ourRoute:
      'Después de varias etapas activas, Santa Teresa es donde dejamos espacio en blanco. La zona se disfruta mejor eligiendo bien dónde dormir y organizando el día alrededor del mar, no del reloj.',
    nearby: ['Playa Carmen', 'Playa Hermosa', 'Mal País', 'Montezuma'],
    photoKeys: ['santaTeresa', 'manuelAntonio', 'fortuna'],
  },
  'manuel-antonio': {
    region: 'Pacífico Central · Provincia de Puntarenas',
    routePosition: 'Quinta parada · Al sur de Jacó y junto a Quepos',
    mapQuery: 'Parque Nacional Manuel Antonio Costa Rica',
    base: 'La carretera entre Quepos y el parque',
    arrival: 'Desde Santa Teresa: 5–7 h según el ferry y el tráfico',
    feel: 'Selva pegada al mar, playas pequeñas y fauna muy visible',
    ourRoute:
      'Venimos por el parque, pero dejamos otra jornada para disfrutar la costa sin repetir el mismo plan. Es una zona popular y eso obliga a reservar bien y madrugar un poco.',
    nearby: ['Quepos', 'Playa Espadilla', 'Playa Biesanz', 'Nauyaca'],
    photoKeys: ['manuelAntonio', 'santaTeresa', 'cahuita'],
  },
  'puerto-viejo': {
    region: 'Caribe Sur · Provincia de Limón',
    routePosition: 'Sexta parada · El otro lado del país',
    mapQuery: 'Puerto Viejo de Talamanca Costa Rica',
    base: 'Puerto Viejo para ambiente; Cocles o Punta Uva para tranquilidad',
    arrival: 'Desde Manuel Antonio: cruce largo de 7–9 h; conviene valorar una noche intermedia',
    feel: 'Cultura caribeña, bicicletas, selva costera y playas con personalidad propia',
    ourRoute:
      'El Caribe no es una extensión del Pacífico. Cambian el clima, la comida y el ritmo. Lo incluimos para cerrar el viaje en un paisaje distinto, con margen para decidir según el estado del mar.',
    nearby: ['Cahuita', 'Cocles', 'Punta Uva', 'Manzanillo'],
    photoKeys: ['puertoViejo', 'cahuita', 'puntaUva'],
  },
}

