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
  understand: string[]
  highlight: { before: string; accent: string; after: string }
  stayAreas: { title: string; text: string }[]
  stayRecommendations: PlaceRecommendation[]
  eat: string
  eatRecommendations: PlaceRecommendation[]
  reserve: string[]
  faq: { question: string; answer: string }[]
}

export type PlaceRecommendation = {
  name: string
  label: 'Nuestra elección' | 'Lo probamos' | 'Calidad-precio' | 'Soda local'
  text: string
  mapUrl: string
}

const maps = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

export const costaRicaGuideExtras: Record<string, CostaRicaGuideExtra> = {
  'alajuela-bajos-del-toro': {
    region: 'Valle Central y montañas del norte',
    routePosition: 'Primera parada · Entre el aeropuerto y La Fortuna',
    mapQuery: 'Bajos del Toro Costa Rica',
    base: 'Alajuela para aterrizar; Bajos del Toro para las cascadas',
    arrival: 'Desde el aeropuerto: unos 40 min a Alajuela y cerca de 2 h hasta Bajos del Toro',
    feel: 'Carretera de montaña, pueblos pequeños, niebla y cascadas enormes',
    ourRoute:
      'Dormimos cerca del aeropuerto, volvimos al día siguiente a recoger el Jimny y elegimos Catarata del Toro antes de continuar hacia La Fortuna. Ahora recogeríamos el coche nada más aterrizar para no perder esa mañana.',
    nearby: ['Volcán Poás', 'Vara Blanca', 'Catarata del Toro', 'Blue Falls'],
    photoKeys: ['fortuna', 'arenal', 'monteverde'],
    understand: [
      'Alajuela y Bajos del Toro no son una única base. Alajuela resulta práctica para la primera o la última noche por su cercanía al aeropuerto; Bajos del Toro está metido en la montaña y sirve para dedicar un día completo a cascadas, bosque y carreteras panorámicas.',
      'El error más fácil es intentar unir Poás, varias cascadas y el traslado a La Fortuna en la misma jornada. Las distancias parecen cortas, pero la niebla, las curvas y las paradas alargan el día. Elegir una cascada principal y dejar margen suele dar una experiencia mucho mejor.',
      'La zona es más fresca y húmeda que la costa. Un impermeable ligero y calzado con agarre importan más que llenar el día de reservas.',
    ],
    highlight: { before: 'Aquí la ruta no se mide en kilómetros, sino en', accent: 'curvas, niebla y cascadas', after: 'que invitan a bajar el ritmo.' },
    stayAreas: [
      { title: 'Alajuela', text: 'La opción sencilla para aterrizar, recoger el coche y descansar. Busca alojamiento con traslado o aparcamiento y comprueba que no esté en pleno centro si sales temprano.' },
      { title: 'Bajos del Toro', text: 'Mejor si quieres despertar ya en la montaña. Hay menos restaurantes y servicios, así que confirma cena, desayuno y estado del acceso antes de llegar.' },
    ],
    stayRecommendations: [
      { name: 'El Rodeo Estancia Boutique Hotel', label: 'Nuestra elección', text: 'Nuestra primera noche cerca del aeropuerto, con aparcamiento y una ubicación práctica para recoger el coche al día siguiente.', mapUrl: maps('El Rodeo Estancia Boutique Hotel Alajuela Costa Rica') },
      { name: 'La Guaria Inn & Suites', label: 'Calidad-precio', text: 'Alternativa sencilla en Alajuela para una noche de llegada o salida, recurrente en guías de presupuesto por su cercanía al aeropuerto.', mapUrl: maps('La Guaria Inn & Suites Alajuela Costa Rica') },
      { name: 'Hotel La Paz', label: 'Calidad-precio', text: 'En Poasito, encaja si prefieres despertar ya en la montaña y acercarte a Poás o Bajos del Toro sin pagar un lodge de lujo.', mapUrl: maps('Hotel La Paz Poasito Costa Rica') },
    ],
    eat: 'En los pueblos pequeños funcionan mejor las sodas y restaurantes familiares que buscar una lista interminable. Pregunta por casado, olla de carne o trucha y revisa el horario: muchas cocinas cierran pronto.',
    eatRecommendations: [
      { name: 'Restaurante Catarata del Toro', label: 'Lo probamos', text: 'La opción dentro del recinto: cómoda para no desviar la ruta. En nuestra visita la comida se pagaba en efectivo.', mapUrl: maps('Restaurante Catarata del Toro Costa Rica') },
      { name: 'Soda El Sesteo', label: 'Soda local', text: 'Una parada clásica en Alajuela para desayunos y platos costarricenses sin el precio de los restaurantes del aeropuerto.', mapUrl: maps('Soda El Sesteo Alajuela Costa Rica') },
      { name: 'Chubascos', label: 'Calidad-precio', text: 'Restaurante de montaña en Fraijanes muy utilizado como parada hacia Poás; buena opción si el horario encaja con la ruta.', mapUrl: maps('Chubascos Restaurante Fraijanes Alajuela Costa Rica') },
    ],
    reserve: ['Entrada con franja horaria al Volcán Poás si forma parte del plan.', 'La cascada elegida: algunos accesos tienen cupo, horario y último ingreso.', 'Alojamiento con cena si duermes en una zona rural.'],
    faq: [
      { question: '¿Dormimos en Alajuela o seguimos directamente?', answer: 'Si el vuelo llega por la tarde, dormir cerca del aeropuerto evita conducir cansados. Con llegada temprana se puede avanzar, pero no conviene estrenar las carreteras de montaña de noche.' },
      { question: '¿Catarata del Toro y Blue Falls en el mismo día?', answer: 'Están cerca y pueden combinarse si madrugas y caminas bien, pero no añadas además Poás y un traslado largo. Con lluvia fuerte, prioriza un solo acceso.' },
      { question: '¿Hace falta 4×4?', answer: 'No siempre, aunque un coche alto da tranquilidad en accesos secundarios. Confirma con el alojamiento y la atracción el estado del último tramo, especialmente en época lluviosa.' },
      { question: '¿Poás merece la pena si está nublado?', answer: 'La visibilidad cambia muy rápido y nunca está garantizada. Reserva una franja temprana y entiende la visita como parte del paisaje volcánico, no solo como una foto del cráter.' },
    ],
  },
  'la-fortuna-arenal': {
    region: 'Llanuras del Norte',
    routePosition: 'Segunda parada · Al norte del país',
    mapQuery: 'La Fortuna Costa Rica',
    base: 'La Fortuna, el pueblo con más servicios junto al volcán',
    arrival: 'Desde Bajos del Toro: unas 2 h en nuestra ruta; desde Alajuela el tiempo cambia mucho según la vía',
    feel: 'Volcán, bosque tropical, puentes, cataratas y aguas termales',
    ourRoute:
      'Combinamos Místico, Mirador El Silencio y Baldi. Místico fue una gran primera selva; El Silencio, por 9 USD, terminó siendo una de las sorpresas; y Baldi nos gustó, aunque lo recortaríamos antes que las otras dos.',
    nearby: ['Volcán Arenal', 'Catarata La Fortuna', 'Místico', 'Lago Arenal'],
    photoKeys: ['arenal', 'fortuna', 'monteverde'],
    understand: [
      'La Fortuna es el centro de servicios; el volcán, las termas y muchos senderos están repartidos por las carreteras de alrededor. Dormir “en La Fortuna” puede significar estar en el pueblo o a veinte minutos en coche, así que conviene mirar el mapa antes de reservar.',
      'La zona funciona bien con una actividad principal por la mañana y otra más suave después: puentes colgantes y termas, catarata y paseo, o sendero y tarde libre. Intentar encadenar tours convierte uno de los lugares más fáciles de disfrutar en una agenda.',
      'El volcán puede quedar cubierto durante horas. No guardes toda la visita para una única foto: el bosque, las aves, el agua y los cambios de luz son parte del Arenal.',
    ],
    highlight: { before: 'La Fortuna se disfruta más cuando dejas', accent: 'huecos en el día', after: 'para que el volcán aparezca cuando quiera.' },
    stayAreas: [
      { title: 'Centro de La Fortuna', text: 'Cómodo para salir a cenar, comprar y moverte sin coche por la noche. Hay más ambiente y menos sensación de retiro.' },
      { title: 'Carretera del volcán', text: 'Hoteles rodeados de vegetación y cerca de termas y senderos. Comprueba distancia al pueblo y si necesitarás coche para todas las comidas.' },
    ],
    stayRecommendations: [
      { name: 'Natura Bungalows', label: 'Nuestra elección', text: 'Nuestro alojamiento favorito del viaje: bungaló independiente, tranquilidad y vistas directas al volcán cuando despejaba.', mapUrl: maps('Natura Bungalows La Fortuna Costa Rica') },
      { name: 'Hotel Monte Real', label: 'Calidad-precio', text: 'Opción familiar cerca del centro, recomendada en blogs por combinar habitaciones sencillas, jardín, piscina y ubicación caminable.', mapUrl: maps('Hotel Monte Real La Fortuna Costa Rica') },
      { name: 'Arenal Xilopalo', label: 'Calidad-precio', text: 'Alternativa económica a poca distancia del pueblo, útil si prefieres gastar más en actividades que en un resort.', mapUrl: maps('Arenal Xilopalo La Fortuna Costa Rica') },
      { name: 'Casa Luna Hotel & Spa', label: 'Calidad-precio', text: 'Una opción entre jardines al sur del pueblo recuperada de la lista que nos pasaron; compara el precio final con hoteles del centro antes de decidir.', mapUrl: maps('Casa Luna Hotel & Spa La Fortuna Costa Rica') },
    ],
    eat: 'Además de restaurantes turísticos, busca sodas para desayunos y casados. Para una noche especial hay opciones con vistas o cocina de autor, pero reserva solo si el presupuesto y el plan del día lo justifican.',
    eatRecommendations: [
      { name: 'Soda La Fortuna', label: 'Lo probamos', text: 'Nuestra recomendación personal para un casado completo sin pagar el precio de los locales más turísticos.', mapUrl: maps('Soda La Fortuna La Fortuna Costa Rica') },
      { name: 'Soda La Hormiga', label: 'Soda local', text: 'Muy repetida en guías de viaje para desayunar gallo pinto y comer platos típicos a precio contenido.', mapUrl: maps('Soda La Hormiga La Fortuna Costa Rica') },
      { name: 'Soda Víquez', label: 'Soda local', text: 'Otra alternativa céntrica para casados, zumos y cocina costarricense; conviene revisar el menú y horario del día.', mapUrl: maps('Soda Viquez La Fortuna Costa Rica') },
      { name: 'El Chante Verde', label: 'Calidad-precio', text: 'Restaurante ajardinado fuera del centro guardado para una comida tranquila; revisa carta y horario antes de desplazarte.', mapUrl: maps('El Chante Verde La Fortuna Costa Rica') },
    ],
    reserve: ['Puentes colgantes o tour naturalista en la primera franja del día.', 'Termas si eliges un complejo con aforo limitado.', 'Coche o shuttle para actividades alejadas del centro.'],
    faq: [
      { question: '¿Cuántas noches necesita La Fortuna?', answer: 'Tres noches permiten dos días completos y una visita sin correr. Con dos, elige dos experiencias principales; con cuatro puedes sumar Río Celeste o una jornada lenta.' },
      { question: '¿Termas de pago o gratuitas?', answer: 'Los complejos de pago ofrecen vestuarios, piscinas y más comodidad. Los accesos gratuitos son sencillos y concurridos: lleva pocas cosas y evita dejar objetos en el coche.' },
      { question: '¿Merece la pena guía en los puentes?', answer: 'Si el objetivo es ver fauna, sí: muchos animales pasan inadvertidos sin telescopio y experiencia. Para caminar y disfrutar del paisaje se pueden recorrer por libre.' },
      { question: '¿Se ve siempre el volcán?', answer: 'No. Las nubes pueden taparlo incluso en días buenos. Deja varios momentos abiertos y aprovecha cualquier claro en lugar de organizar todo alrededor de una hora concreta.' },
    ],
  },
  monteverde: {
    region: 'Cordillera de Tilarán',
    routePosition: 'Tercera parada · Entre Arenal y el Pacífico',
    mapQuery: 'Monteverde Costa Rica',
    base: 'Santa Elena o Cerro Plano',
    arrival: 'Desde La Fortuna: unas 2 h 30 min en nuestro viaje, rodeando el lago',
    feel: 'Bosque nuboso, viento fresco, aves y caminos de montaña',
    ourRoute:
      'Llegamos por la carretera del lago, hicimos las tirolinas de Extremo Park y al día siguiente elegimos el sendero Bosque Profundo. El atardecer con arcoíris terminó siendo el recuerdo más personal de la etapa.',
    nearby: ['Reserva Monteverde', 'Curi-Cancha', 'Santa Elena', 'Cerro Plano'],
    photoKeys: ['monteverde', 'arenal', 'santaTeresa'],
    understand: [
      'Monteverde es una región; Santa Elena es el núcleo con tiendas, restaurantes y transporte. Las reservas están en direcciones distintas, por eso elegir alojamiento solo por el nombre puede dejarte lejos de lo que quieres visitar.',
      'El bosque nuboso no es una selva tropical repetida. Aquí importan la humedad suspendida, el musgo, las aves y el silencio. Una caminata temprana y un paseo nocturno enseñan dos versiones completamente diferentes del mismo ecosistema.',
      'Las carreteras finales son lentas y el tiempo cambia rápido. Chaqueta ligera, capa impermeable y una reserva prioritaria funcionan mejor que un programa cerrado de mañana a noche.',
    ],
    highlight: { before: 'Monteverde no grita. Hay que entrar', accent: 'despacio y en silencio', after: 'para empezar a ver lo que esconde.' },
    stayAreas: [
      { title: 'Santa Elena', text: 'Práctica para viajar sin coche, cenar andando y usar shuttles. Tiene más movimiento y queda a cierta distancia de varias reservas.' },
      { title: 'Cerro Plano y Monteverde', text: 'Más cerca de bosque y alojamientos tranquilos. Revisa la pendiente, las distancias reales y el transporte nocturno.' },
    ],
    stayRecommendations: [
      { name: 'Monteverde Eco Love', label: 'Nuestra elección', text: 'El alojamiento de nuestra ruta, bien situado para movernos por Santa Elena y descansar después de las actividades.', mapUrl: maps('Monteverde Eco Love Monteverde Costa Rica') },
      { name: 'Cabinas Eddy B&B', label: 'Calidad-precio', text: 'Alojamiento sencillo cerca de Santa Elena, citado en guías por su desayuno y por permitir moverse a pie.', mapUrl: maps('Cabinas Eddy B&B Monteverde Costa Rica') },
      { name: "Freddy's Place B&B", label: 'Calidad-precio', text: 'Pequeño bed and breakfast familiar con desayuno, una alternativa práctica frente a los hoteles de montaña más caros.', mapUrl: maps("Freddy's Place B&B Monteverde Costa Rica") },
      { name: 'Camino Verde Bed & Breakfast', label: 'Calidad-precio', text: 'Otra alternativa céntrica en Santa Elena, guardada para comparar por desayuno, vistas y facilidad para organizar traslados.', mapUrl: maps('Camino Verde Bed & Breakfast Monteverde Costa Rica') },
    ],
    eat: 'Santa Elena concentra cafeterías, sodas y restaurantes. El café local y los productos lácteos forman parte de la historia de la zona; deja una comida sin plan para elegir según dónde termine la caminata.',
    eatRecommendations: [
      { name: 'Sabor Tico', label: 'Soda local', text: 'Una de las sodas más recomendadas de Monteverde por su carta amplia de cocina costarricense y precios razonables.', mapUrl: maps('Sabor Tico Monteverde Costa Rica') },
      { name: 'Soda La Amistad', label: 'Soda local', text: 'Alternativa sencilla para casados y comida local, alejada del concepto de restaurante turístico de moda.', mapUrl: maps('Soda La Amistad Monteverde Costa Rica') },
      { name: 'La Cuchara de la Abuela', label: 'Calidad-precio', text: 'Cocina típica dentro del entorno de CASEM; una parada interesante para unir comida local y artesanía.', mapUrl: maps('La Cuchara de la Abuela CASEM Monteverde Costa Rica') },
      { name: 'Santa Elena Coffee Shop', label: 'Calidad-precio', text: 'Café de Café Monteverde en el pueblo, útil para desayunar o probar producto local sin convertirlo en una excursión separada.', mapUrl: maps('Santa Elena Coffee Shop Cafe Monteverde Costa Rica') },
    ],
    reserve: ['La reserva natural que realmente quieras visitar; no todas ofrecen lo mismo.', 'Tour nocturno con grupo pequeño si la fauna es prioridad.', 'Canopy o puentes en una empresa con buenas prácticas y horario temprano.'],
    faq: [
      { question: '¿Monteverde y Santa Elena son lo mismo?', answer: 'Santa Elena es el pueblo principal y Monteverde da nombre a la región y a una de sus reservas. Comprueba siempre el punto exacto del alojamiento y de cada actividad.' },
      { question: '¿Se repite con La Fortuna?', answer: 'No demasiado. Arenal es más cálido, volcánico y acuático; Monteverde es fresco, nuboso y especialmente bueno para aves y caminatas de bosque.' },
      { question: '¿Necesitamos 4×4?', answer: 'La carretera principal ha mejorado, pero un coche alto sigue siendo cómodo en accesos secundarios. En época lluviosa pregunta por el último tramo, no solo por la ruta general.' },
      { question: '¿Qué reserva elegimos?', answer: 'Monteverde para el bosque nuboso clásico, Curi-Cancha para observación de aves y Santa Elena para una experiencia normalmente más tranquila. Elige una bien en lugar de correr por las tres.' },
    ],
  },
  'santa-teresa': {
    region: 'Península de Nicoya · Pacífico',
    routePosition: 'Cuarta parada · Costa oeste',
    mapQuery: 'Santa Teresa Puntarenas Costa Rica',
    base: 'Playa Carmen para servicios o Santa Teresa para estar junto al mar',
    arrival: 'Desde Monteverde: unas 4 h 30 min por carretera en nuestro cambio de plan; volvimos en ferry al salir',
    feel: 'Surf, carretera polvorienta, restaurantes pequeños y grandes atardeceres',
    ourRoute:
      'Un atasco nos hizo descartar el ferry de ida y atravesar la península por carretera. Después alternamos surf, Playa Hermosa y una excursión desde Montezuma que terminó con el mar bioluminiscente.',
    nearby: ['Playa Carmen', 'Playa Hermosa', 'Mal País', 'Montezuma'],
    photoKeys: ['santaTeresa', 'manuelAntonio', 'fortuna'],
    understand: [
      'Santa Teresa no tiene un centro compacto: es una franja larga paralela al mar, con tramos de carretera, playa y comercios. La ubicación del alojamiento cambia por completo la experiencia y determina si podrás hacer casi todo andando.',
      'El surf marca el ritmo, pero no hace falta surfear para disfrutarla. Amanecer, playa, una comida larga y atardecer ya forman un buen día. Para explorar Montezuma o Cabo Blanco, reserva otra jornada y asume carreteras lentas.',
      'Es una de las zonas más caras de la ruta. Tener cocina o desayuno incluido y elegir bien los desplazamientos ayuda más al presupuesto que buscar continuamente el local de moda.',
    ],
    highlight: { before: 'En Santa Teresa el mejor plan suele ser', accent: 'tener menos planes', after: 'y llegar andando al atardecer.' },
    stayAreas: [
      { title: 'Playa Carmen', text: 'Más servicios, cruces y opciones para comer; práctica para una primera visita o si quieres moverte hacia Mal País.' },
      { title: 'Santa Teresa o Playa Hermosa', text: 'Más ambiente en Santa Teresa y más calma hacia Playa Hermosa. Confirma la distancia a pie a la playa y el ruido de la carretera.' },
    ],
    stayRecommendations: [
      { name: 'Believe Surf & Yoga Lodge', label: 'Nuestra elección', text: 'Nuestra base durante cinco noches, con desayuno, actividades y alquiler de tablas en el propio alojamiento.', mapUrl: maps('Believe Surf & Yoga Lodge Santa Teresa Costa Rica') },
      { name: 'Otro Lado Lodge', label: 'Calidad-precio', text: 'Una alternativa que distintos blogs destacan por incluir desayuno, piscina y acceso cómodo a la playa.', mapUrl: maps('Otro Lado Lodge Santa Teresa Costa Rica') },
      { name: 'Buena Onda Bungalows', label: 'Calidad-precio', text: 'Bungalós pequeños y bien situados que aparecen con frecuencia en guías de Santa Teresa para presupuestos medios.', mapUrl: maps('Buena Onda Bungalows Santa Teresa Costa Rica') },
    ],
    eat: 'Hay mucha oferta internacional, pero los precios suben rápido. Alterna sodas y panaderías con una cena especial, y lleva efectivo para pequeños negocios o momentos en los que falle el datáfono.',
    eatRecommendations: [
      { name: 'Soda La Tiquicia', label: 'Soda local', text: 'Una de las recomendaciones más repetidas para comer cocina costarricense y escapar de los precios internacionales de Santa Teresa.', mapUrl: maps('Soda La Tiquicia Santa Teresa Costa Rica') },
      { name: 'Soda Soy Tico', label: 'Soda local', text: 'Casados y platos locales en un formato sencillo; buena candidata para equilibrar el presupuesto entre desayunos y cenas especiales.', mapUrl: maps('Soda Soy Tico Santa Teresa Costa Rica') },
      { name: 'The Bakery', label: 'Calidad-precio', text: 'Más conocida y menos barata que una soda, pero útil para desayunar o comprar algo rápido antes de la playa.', mapUrl: maps('The Bakery Santa Teresa Costa Rica') },
    ],
    reserve: ['Alojamiento bien situado: aquí importa más la ubicación que una larga lista de servicios.', 'Clase de surf en horario de marea adecuado para principiantes.', 'Ferry y margen de carretera si llegas o sales hacia el continente.'],
    faq: [
      { question: '¿Cuál es la mejor zona para dormir?', answer: 'Playa Carmen es práctica; Santa Teresa concentra ambiente; Playa Hermosa es más tranquila. Elige según lo que quieras hacer andando y no solo por el precio.' },
      { question: '¿Hace falta coche o quad?', answer: 'Si duermes bien situado puedes vivir la playa a pie. Para cambiar de zona o hacer excursiones necesitas transporte; conduce con prudencia y evita improvisar de noche.' },
      { question: '¿Merece la pena sin surfear?', answer: 'Sí, si buscas playa, atardeceres y días lentos. Si prefieres parques, visitas culturales y mucha actividad organizada, quizá basten dos noches.' },
      { question: '¿Montezuma se visita en el día?', answer: 'Se puede, pero el trayecto lleva más de lo que aparenta. Sal temprano y no combines cascadas, playa y Cabo Blanco como si todo estuviera al lado.' },
    ],
  },
  'manuel-antonio': {
    region: 'Pacífico Central · Provincia de Puntarenas',
    routePosition: 'Quinta parada · Al sur de Jacó y junto a Quepos',
    mapQuery: 'Parque Nacional Manuel Antonio Costa Rica',
    base: 'La carretera entre Quepos y el parque',
    arrival: 'Desde Santa Teresa: ferry de unas 1 h 15 min y cerca de 3 h desde Puntarenas por el tráfico',
    feel: 'Selva pegada al mar, playas pequeñas y fauna muy visible',
    ourRoute:
      'Dedicamos una mañana a Espadilla y una tarde al day pass del Hotel Mariposa. Al día siguiente entramos al parque con guía, nos quedamos en la playa y vimos el atardecer desde Bar El Avión.',
    nearby: ['Quepos', 'Playa Espadilla', 'Playa Biesanz', 'Nauyaca'],
    photoKeys: ['manuelAntonio', 'santaTeresa', 'cahuita'],
    understand: [
      'Manuel Antonio mezcla tres lugares: el parque nacional, la carretera de hoteles y restaurantes, y Quepos, donde están muchos servicios. Saber en cuál vas a dormir evita depender de taxis o caminar por una carretera sin aceras.',
      'El parque tiene cupo y normas propias. Compra únicamente por el canal oficial enlazado al final de esta guía y revisa el día de cierre antes de organizar la ruta. La entrada no incluye automáticamente guía.',
      'La fauna es visible, pero no es un zoológico. Mantén distancia, no alimentes animales y protege la comida: monos y mapaches han aprendido a buscarla.',
    ],
    highlight: { before: 'Aquí la selva llega hasta el mar, pero la visita mejora cuando', accent: 'reservas bien y madrugas', after: 'sin perseguir animales.' },
    stayAreas: [
      { title: 'Carretera a Manuel Antonio', text: 'Buenas vistas y acceso a playas y restaurantes. Comprueba la pendiente y la parada de bus más cercana.' },
      { title: 'Quepos', text: 'Más local, más llano y normalmente más económico. El bus público conecta con el parque y Playa Espadilla.' },
    ],
    stayRecommendations: [
      { name: 'Glamping Tomaselli', label: 'Nuestra elección', text: 'El alojamiento que usamos en esta etapa; una base tranquila fuera de la primera línea turística.', mapUrl: maps('Glamping Tomaselli Manuel Antonio Costa Rica') },
      { name: 'Tico Tico Villas', label: 'Calidad-precio', text: 'Apartamentos en la zona de Quepos para ganar espacio y cocina sin subir al precio de los resorts con vistas.', mapUrl: maps('Tico Tico Villas Quepos Costa Rica') },
      { name: 'Hotel Flor Tica', label: 'Calidad-precio', text: 'Opción sencilla en Quepos para quien prioriza presupuesto y conexión en bus con el parque.', mapUrl: maps('Hotel Flor Tica Quepos Costa Rica') },
      { name: 'Shana by the Beach', label: 'Calidad-precio', text: 'Alojamiento próximo a Playa Biesanz guardado para comparar; comprueba las pendientes, el transporte y el precio final.', mapUrl: maps('Shana by the Beach Manuel Antonio Costa Rica') },
    ],
    eat: 'La carretera del parque tiene restaurantes con vistas; Quepos ofrece sodas y precios más cotidianos. Evita dejar la comida como única razón para mover el coche en hora punta.',
    eatRecommendations: [
      { name: 'Restaurante Manuel Antonio', label: 'Lo probamos', text: 'Nos permitió combinar comida y aparcamiento cerca del parque; comprueba si mantienen la condición por consumo.', mapUrl: maps('Restaurante Manuel Antonio Costa Rica') },
      { name: 'Miguelitos Pizza', label: 'Lo probamos', text: 'Nuestra cena en una zona más local, con precios menos inflados que junto al parque aunque todavía turísticos.', mapUrl: maps('Miguelitos Pizza Quepos Costa Rica') },
      { name: 'Soda Sánchez', label: 'Soda local', text: 'Una recomendación recurrente de blogs en Quepos para desayunos, casados y comida típica a precio más cotidiano.', mapUrl: maps('Soda Sanchez Quepos Costa Rica') },
      { name: 'El Patio de Café Milagro', label: 'Calidad-precio', text: 'Una cafetería muy conocida de la carretera de Manuel Antonio para comparar si apetece una comida más especial.', mapUrl: maps('El Patio de Cafe Milagro Manuel Antonio Costa Rica') },
    ],
    reserve: ['Entrada oficial del parque con fecha definida.', 'Guía naturalista acreditado si observar fauna es una prioridad.', 'Alojamiento con acceso sencillo al bus o aparcamiento real.'],
    faq: [
      { question: '¿Dónde se compran las entradas?', answer: 'Solo en el sistema oficial de parques de Costa Rica. Desconfía de webs que imitan la venta o mezclan entrada y tour sin explicarlo.' },
      { question: '¿Merece la pena contratar guía?', answer: 'Sí para localizar perezosos, aves y pequeños animales con telescopio. Si tu prioridad son senderos y playa, la visita por libre también funciona.' },
      { question: '¿Dormir en Quepos o junto al parque?', answer: 'Quepos suele ser más práctico y económico; la carretera de Manuel Antonio acerca a playas y vistas. El bus conecta ambos, así que decide por presupuesto y movilidad.' },
      { question: '¿Cuánto tiempo reservamos para el parque?', answer: 'Una mañana larga permite senderos, observación y playa sin correr. Revisa horarios, objetos permitidos y cierre semanal justo antes del viaje.' },
    ],
  },
  'puerto-viejo': {
    region: 'Caribe Sur · Provincia de Limón',
    routePosition: 'Sexta parada · El otro lado del país',
    mapQuery: 'Puerto Viejo de Talamanca Costa Rica',
    base: 'Puerto Viejo para ambiente; Cocles o Punta Uva para tranquilidad',
    arrival: 'Desde Manuel Antonio: casi 10 h en nuestro viaje por tráfico; conviene añadir noches o una parada intermedia',
    feel: 'Cultura caribeña, bicicletas, selva costera y playas con personalidad propia',
    ourRoute:
      'Solo tuvimos un día completo: recorrimos Cahuita hasta donde permitió el temporal, vimos Punta Uva con viento, disfrutamos el atardecer en Cocles y volamos el dron en Playa Negra antes de regresar.',
    nearby: ['Cahuita', 'Cocles', 'Punta Uva', 'Manzanillo'],
    photoKeys: ['puertoViejo', 'cahuita', 'puntaUva'],
    understand: [
      'Puerto Viejo es el núcleo con más ambiente; Cocles, Chiquita, Punta Uva y Manzanillo se reparten por la carretera costera. No son barrios contiguos: el lugar exacto donde duermas decidirá si te mueves en bici, bus, taxi o coche.',
      'El Caribe tiene su propio clima. Puede llover con sol en otra parte del país y el estado del mar cambia por playa y por día. Conviene decidir los baños y el parque de Cahuita mirando las condiciones de esa mañana.',
      'La cultura afrocaribeña e indígena forma parte del destino. La comida, la música y el ritmo no son decoración: deja espacio para comer rice and beans con coco, conversar y no reducir la zona a una lista de playas.',
    ],
    highlight: { before: 'El Caribe no se programa igual: se escucha el mar, se mira el cielo y', accent: 'se decide sobre la marcha', after: 'con un plan sencillo.' },
    stayAreas: [
      { title: 'Puerto Viejo', text: 'Ideal para cenar andando y tener transporte y servicios. Hay más ruido y movimiento, sobre todo cerca del centro.' },
      { title: 'Cocles, Chiquita o Punta Uva', text: 'Más naturaleza y calma. Confirma distancia a restaurantes, iluminación y transporte si no tendrás coche.' },
    ],
    stayRecommendations: [
      { name: 'Chilamate Holiday House', label: 'Nuestra elección', text: 'Nuestra casa entre vegetación: bonita y muy conectada con la selva, aunque con luz y sonidos de animales durante la noche.', mapUrl: maps('Chilamate Holiday House Puerto Viejo Costa Rica') },
      { name: 'Pagalù Hostel', label: 'Calidad-precio', text: 'Hostel céntrico citado en guías de presupuesto; práctico si quieres restaurantes y transporte a distancia caminable.', mapUrl: maps('Pagalu Hostel Puerto Viejo Costa Rica') },
      { name: 'Roots Family', label: 'Calidad-precio', text: 'Otra base económica en el pueblo para viajeros que priorizan ubicación y ambiente sobre servicios de resort.', mapUrl: maps('Roots Family Puerto Viejo Costa Rica') },
      { name: 'Namu Garden Hotel & Spa', label: 'Calidad-precio', text: 'Hotel céntrico recuperado de la lista que nos pasaron para comparar con casas de Playa Negra y alojamientos de Cocles.', mapUrl: maps('Namu Garden Hotel & Spa Puerto Viejo Costa Rica') },
    ],
    eat: 'Busca rice and beans cocinado con coco, patí, pescado y cocina local. Algunos lugares populares requieren reserva, pero las sodas y pequeños restaurantes suelen dar la experiencia más directa.',
    eatRecommendations: [
      { name: "Soda Lidia's Place", label: 'Soda local', text: 'La recomendación más consistente de las guías consultadas para probar rice and beans caribeño y cocina local.', mapUrl: maps("Soda Lidia's Place Puerto Viejo Costa Rica") },
      { name: 'Bread & Chocolate', label: 'Calidad-precio', text: 'Una opción muy conocida para desayunos y brunch; suele llenarse, así que conviene llegar pronto y revisar el horario.', mapUrl: maps('Bread and Chocolate Puerto Viejo Costa Rica') },
      { name: 'Joe’s Snack Point', label: 'Calidad-precio', text: 'Pequeño local caribeño señalado en guías de bajo presupuesto por sus platos informales y ambiente sencillo.', mapUrl: maps("Joe's Snack Point Puerto Viejo Costa Rica") },
      { name: 'La Ventana de Ely', label: 'Soda local', text: 'Pequeño punto de comida local guardado como alternativa a los restaurantes más turísticos del centro.', mapUrl: maps('La Ventana de Ely Puerto Viejo Costa Rica') },
    ],
    reserve: ['Alojamiento según movilidad real, no solo por el nombre “Puerto Viejo”.', 'Visita responsable a comunidad o proyecto cultural, si la haces.', 'Traslado largo de entrada o salida con margen por obras y tráfico.'],
    faq: [
      { question: '¿Puerto Viejo o Cahuita como base?', answer: 'Puerto Viejo tiene más ambiente y restaurantes; Cahuita es más tranquila y está junto al parque. Para varios días también funciona dividir la estancia.' },
      { question: '¿Es fácil moverse en bicicleta?', answer: 'Entre Puerto Viejo y playas cercanas sí, si estás acostumbrado al calor y a compartir carretera. Usa luces, evita la noche y no dejes objetos en la cesta.' },
      { question: '¿Cuándo hace mejor tiempo?', answer: 'El Caribe sigue patrones distintos al Pacífico y no existe garantía seca. Consulta previsión local, pero organiza cada día con flexibilidad en vez de cancelar por un icono de lluvia.' },
      { question: '¿Se puede nadar en todas las playas?', answer: 'No siempre. Hay corrientes y oleaje, especialmente en determinados tramos de Cocles. Observa banderas, pregunta localmente y elige una playa protegida si el mar está fuerte.' },
    ],
  },
}
