export type CostaRicaGuide = {
  slug: string
  destinationId: string
  title: string
  subtitle: string
  intro: string
  stay: string
  pace: string
  bestFor: string
  essentials: Array<{ title: string; text: string }>
  advice: string[]
  simplePlan: Array<{ label: string; title: string; text: string }>
  gettingAround: string
  pack: string[]
  avoid: string[]
  sources: Array<{ name: string; url: string }>
}

export const costaRicaGuides: CostaRicaGuide[] = [
  {
    slug: 'alajuela-bajos-del-toro',
    destinationId: 'alajuela',
    title: 'Alajuela y Bajos del Toro',
    subtitle: 'Una llegada fácil y un primer contacto espectacular con la selva.',
    intro:
      'Alajuela funciona bien como noche de llegada. El verdadero protagonista de esta etapa es Bajos del Toro: una zona rural, fresca y muy lluviosa donde conviene elegir bien una o dos cascadas en lugar de intentar verlas todas.',
    stay: '1 noche + 1 día',
    pace: 'Activo, sin prisas',
    bestFor: 'Cascadas y carretera escénica',
    essentials: [
      {
        title: 'Catarata del Toro',
        text: 'La opción más espectacular: una gran caída de agua dentro de un antiguo cráter. Tiene buenos miradores, pero bajar y volver a subir exige piernas.',
      },
      {
        title: 'Blue Falls',
        text: 'Pozas y cascadas de color azul volcánico. Combina bien con Catarata del Toro si se empieza temprano y el terreno está en buenas condiciones.',
      },
      {
        title: 'Ruta 126 por el norte',
        text: 'Para continuar hacia La Fortuna, la entrada por Vara Blanca y la parte norte de la Ruta 708 suele ser más llevadera que la subida desde Sarchí.',
      },
    ],
    advice: [
      'Conduce únicamente con luz: hay niebla, curvas y tramos sin buena visibilidad.',
      'Escoge una cascada principal y una secundaria; encadenar cuatro propiedades convierte el día en una carrera.',
      'Lleva calzado con agarre y una muda seca en una bolsa separada.',
      'Comprueba el estado de los senderos el mismo día si ha llovido fuerte.',
    ],
    simplePlan: [
      {
        label: 'Primero',
        title: 'Salida tranquila desde Alajuela',
        text: 'Desayuno temprano, depósito lleno y ruta por Vara Blanca antes de que aparezca la niebla de la tarde.',
      },
      {
        label: 'Plan principal',
        title: 'Catarata del Toro o Blue Falls',
        text: 'Dedica la mañana a la atracción que más os importe y decide la segunda según energía y clima.',
      },
      {
        label: 'Después',
        title: 'Continuación hacia La Fortuna',
        text: 'Come en la zona y retoma la carretera con margen suficiente para llegar antes de anochecer.',
      },
    ],
    gettingAround:
      'La zona está dispersa y apenas hay taxis. Un coche es la opción práctica; un SUV alto aporta comodidad por los baches, aunque muchas vías principales están asfaltadas.',
    pack: ['Chubasquero ligero', 'Zapatillas con buen agarre', 'Muda seca', 'Agua y algo de efectivo'],
    avoid: [
      'Seguir automáticamente la ruta más corta si envía por el tramo más empinado desde Sarchí.',
      'Empezar una caminata larga a última hora.',
      'Dejar equipaje visible dentro del coche.',
    ],
    sources: [
      {
        name: 'Two Weeks in Costa Rica · Guía de Bajos del Toro',
        url: 'https://www.twoweeksincostarica.com/bajos-del-toro/',
      },
      {
        name: 'Mytanfeet · Catarata del Toro',
        url: 'https://mytanfeet.com/activities/catarata-del-toro/',
      },
    ],
  },
  {
    slug: 'la-fortuna-arenal',
    destinationId: 'arenal',
    title: 'La Fortuna y Arenal',
    subtitle: 'Volcán, selva y aguas termales sin intentar hacerlo todo.',
    intro:
      'La Fortuna concentra muchísimas actividades, pero están repartidas alrededor del pueblo y del lago. La experiencia mejora al reservar una actividad fuerte por mañana y dejar las termas o el pueblo para el final del día.',
    stay: '2–3 noches',
    pace: 'Equilibrado',
    bestFor: 'Volcán, fauna y aventura',
    essentials: [
      {
        title: 'Mirador El Silencio',
        text: 'Fue nuestra alternativa económica y terminó siendo una de las sorpresas. No es solo un mirador: tiene rutas, mapa, zonas de fauna y vistas al volcán cuando las nubes dan tregua.',
      },
      {
        title: 'Puentes colgantes',
        text: 'Místico permite recorrer distintos niveles del bosque. Con guía se ve mucha más fauna; sin guía, merece la pena ir muy temprano.',
      },
      {
        title: 'Termas con presupuesto',
        text: 'Baldi es enorme y completo, con 27 piscinas y toboganes. Nos gustó para relajarnos, pero si hay que elegir pondríamos antes Místico o El Silencio.',
      },
    ],
    advice: [
      'No calcules distancias mirando solo La Fortuna: muchas actividades están a 25–35 minutos del centro.',
      'Reserva las primeras horas de la mañana para el volcán y los puentes; suele haber mejor visibilidad y más fauna.',
      'Si no llevas coche, dormir cerca del centro simplifica restaurantes, taxis y excursiones.',
      'Combina una actividad de naturaleza con una de agua; tres tours intensos el mismo día terminan pareciéndose.',
    ],
    simplePlan: [
      {
        label: 'Primer día',
        title: 'Místico y El Silencio',
        text: 'Puentes colgantes por la mañana y senderos de El Silencio después. Son dos formas muy distintas de entrar en la selva.',
      },
      {
        label: 'Segundo día',
        title: 'Volcán, soda y termas',
        text: 'Aprovecha cualquier claro para ver el volcán, come un casado y decide si una tarde de termas encaja en tu presupuesto.',
      },
      {
        label: 'Si llueve',
        title: 'Mantén el plan flexible',
        text: 'Termas, tour de chocolate o una caminata corta; mueve el mirador del volcán a la ventana más despejada.',
      },
    ],
    gettingAround:
      'El centro se recorre andando, pero los principales atractivos están separados. Coche, taxi o tours con transporte ahorran mucho tiempo; evita conducir de noche alrededor del lago.',
    pack: ['Repelente', 'Chubasquero', 'Calzado cerrado', 'Sandalias de agua', 'Bañador'],
    avoid: [
      'Programar una excursión de playa desde La Fortuna: la costa queda demasiado lejos para un día cómodo.',
      'Confiar en que el volcán estará despejado todo el día.',
      'Comprar todos los tours antes de decidir qué tipo de experiencia se quiere.',
    ],
    sources: [
      {
        name: 'Two Weeks in Costa Rica · Qué esperar de La Fortuna',
        url: 'https://www.twoweeksincostarica.com/la-fortuna-what-to-expect/',
      },
      {
        name: 'Two Weeks in Costa Rica · Puentes de Místico',
        url: 'https://www.twoweeksincostarica.com/mistico-hanging-bridges/',
      },
    ],
  },
  {
    slug: 'monteverde',
    destinationId: 'monteverde',
    title: 'Monteverde',
    subtitle: 'Bosque nuboso, aire fresco y carreteras que obligan a bajar el ritmo.',
    intro:
      'Monteverde no es otro Arenal. Aquí el atractivo es el bosque nuboso, más fresco, ventoso y silencioso. Santa Elena es el núcleo práctico; las reservas y parques de aventura quedan repartidos por carreteras de montaña.',
    stay: '2 noches',
    pace: 'Naturaleza + aventura',
    bestFor: 'Bosque nuboso y aves',
    essentials: [
      {
        title: 'Una reserva bien elegida',
        text: 'Monteverde Biological Reserve es la experiencia clásica. Curi-Cancha mezcla bosque y zonas abiertas, lo que facilita observar aves con un buen guía.',
      },
      {
        title: 'Tirolinas',
        text: 'La zona es una referencia para canopy. Escoge un parque por su estilo —más aventura o más naturaleza— y no por acumular el mayor número de actividades.',
      },
      {
        title: 'Un mirador al atardecer',
        text: 'La combinación de sol y nubes crea una luz muy especial. Nosotros vimos aparecer un arcoíris sobre el paisaje y desde entonces la recordamos como la ciudad de arcoíris.',
      },
    ],
    advice: [
      'Lleva chaqueta fina, pantalón largo y capa impermeable incluso cuando el resto del país esté caluroso.',
      'Reserva una mañana para la reserva: el viento y la lluvia suelen aumentar más tarde.',
      'Las carreteras secundarias tienen baches y pendientes; un coche alto es más cómodo.',
      'Dos noches bastan para una primera visita; añade otra si el objetivo principal son aves o senderismo.',
    ],
    simplePlan: [
      {
        label: 'Llegada',
        title: 'Tirolinas y atardecer',
        text: 'Reserva el canopy con margen para la carretera y guarda el final de la tarde para uno de los miradores de la zona.',
      },
      {
        label: 'Mañana',
        title: 'Reserva de bosque nuboso',
        text: 'Camina temprano, con guía si la prioridad es fauna. No intentes cubrir todos los senderos.',
      },
      {
        label: 'Después',
        title: 'Comida y carretera sin prisa',
        text: 'La ruta alrededor del lago forma parte de la etapa. Deja margen para una soda con vistas o un cambio de tiempo.',
      },
    ],
    gettingAround:
      'Santa Elena se puede recorrer andando, aunque tiene cuestas. Para reservas alejadas, usa coche, taxi o el transporte incluido por algunos parques.',
    pack: ['Cortavientos', 'Impermeable', 'Pantalón largo', 'Calzado cerrado y resistente', 'Prismáticos'],
    avoid: [
      'Vestirse como para la playa.',
      'Reservar dos parques de puentes colgantes si ya se ha hecho Místico.',
      'Subestimar el tiempo de carretera por pocos kilómetros que marque el mapa.',
    ],
    sources: [
      {
        name: 'Mytanfeet · Guía de Monteverde',
        url: 'https://mytanfeet.com/costa-rica-travel-tips/monteverde-travel-tips/',
      },
      {
        name: 'Mytanfeet · Itinerarios de 1, 2 y 3 días',
        url: 'https://mytanfeet.com/costa-rica-travel-tips/monteverde-2-days/',
      },
    ],
  },
  {
    slug: 'santa-teresa',
    destinationId: 'santa-teresa',
    title: 'Santa Teresa',
    subtitle: 'Surf, polvo, buenos restaurantes y atardeceres que mandan sobre el reloj.',
    intro:
      'Santa Teresa es una franja larga de costa, no un pueblo compacto. La carretera principal conecta Mal País, Playa Carmen, Santa Teresa y Playa Hermosa. Elegir bien dónde dormir cambia mucho la experiencia.',
    stay: '3–4 noches',
    pace: 'Lento',
    bestFor: 'Surf y vida de playa',
    essentials: [
      {
        title: 'Playa Carmen',
        text: 'Práctica para una primera clase de surf y con más servicios cerca. Comprueba siempre la marea y sigue al instructor.',
      },
      {
        title: 'Playa Hermosa',
        text: 'Más abierta y tranquila para pasar una mañana larga. Es buena alternativa cuando se busca menos movimiento.',
      },
      {
        title: 'Isla Tortuga y bioluminiscencia',
        text: 'Nuestra excursión favorita salió desde Montezuma y terminó de noche dentro del mar bioluminiscente. Requiere un día completo, pero fue la actividad más mágica del viaje.',
      },
    ],
    advice: [
      'Duerme cerca de la zona que usarás más: caminar por la carretera con polvo, tráfico y poca acera no siempre es agradable.',
      'Un quad resulta útil para explorar, pero casco, velocidad baja y nada de conducir después de beber.',
      'Planifica el surf según la marea, no según una hora fija inventada desde casa.',
      'Reserva un par de tardes sin plan: el mejor momento del día suele ser el atardecer.',
    ],
    simplePlan: [
      {
        label: 'Primer día',
        title: 'Ubicarse y elegir playa',
        text: 'Reconoce el tramo de carretera, localiza supermercado y pasa la tarde en Carmen o Santa Teresa.',
      },
      {
        label: 'Día de mar',
        title: 'Surf temprano y tarde libre',
        text: 'Clase o sesión según condiciones, comida tranquila y atardecer sin otro traslado.',
      },
      {
        label: 'Día especial',
        title: 'Montezuma y bioluminiscencia',
        text: 'Reserva el día completo para la lancha, las playas y la experiencia nocturna. El regreso por carretera pide 4×4 y mucha calma.',
      },
    ],
    gettingAround:
      'A pie funciona si el alojamiento está bien situado. Para distancias mayores se usan taxis, coche, moto o quad; las calles secundarias siguen siendo irregulares.',
    pack: ['Protector solar resistente al agua', 'Gorra', 'Sandalias', 'Bolsa estanca', 'Repelente'],
    avoid: [
      'Dejar móvil o mochila solos en la arena.',
      'Alquilar moto o quad sin experiencia.',
      'Llenar todos los días con excursiones y perder el ritmo que hace especial el lugar.',
    ],
    sources: [
      {
        name: 'Two Weeks in Costa Rica · Guía de Santa Teresa',
        url: 'https://www.twoweeksincostarica.com/santa-teresa/',
      },
    ],
  },
  {
    slug: 'manuel-antonio',
    destinationId: 'manuel-antonio',
    title: 'Manuel Antonio',
    subtitle: 'Fauna y playas preciosas, con una visita al parque que conviene preparar bien.',
    intro:
      'El parque nacional es pequeño y muy popular. La diferencia entre una visita cómoda y una frustrante está en comprar la entrada oficial, llegar temprano y no caer en los falsos aparcamientos que aparecen antes de la entrada.',
    stay: '2–3 noches',
    pace: 'Temprano y tranquilo',
    bestFor: 'Fauna y playas',
    essentials: [
      {
        title: 'Parque Nacional',
        text: 'Compra únicamente en la web oficial de SINAC. Actualmente abre de miércoles a lunes y cierra los martes; conviene volver a verificarlo antes de ir.',
      },
      {
        title: 'Guía certificado',
        text: 'Para ver perezosos, monos y aves sin convertir el paseo en una búsqueda frustrante, un guía con telescopio aporta mucho.',
      },
      {
        title: 'Espadilla y Biesanz',
        text: 'Espadilla es la playa larga y accesible fuera del parque. Biesanz es más pequeña y resguardada, aunque el acceso y el aparcamiento son limitados.',
      },
    ],
    advice: [
      'Guarda la entrada con código en el teléfono antes de llegar.',
      'No compres tickets a vendedores de la carretera y sigue hasta el acceso oficial.',
      'Usa autobús o taxi si el alojamiento está en la colina: la carretera es estrecha y el aparcamiento escaso.',
      'No cuentes con llevar un picnic al parque; las normas sobre alimentos son estrictas.',
    ],
    simplePlan: [
      {
        label: 'Día de parque',
        title: 'Entrada temprana y senderos',
        text: 'Entra a primera hora, recorre los senderos con guía y termina en la playa sin correr.',
      },
      {
        label: 'Segundo día',
        title: 'Playa fuera del parque',
        text: 'Espadilla para comodidad o Biesanz para una cala más recogida. Deja margen para lluvia.',
      },
      {
        label: 'Más tiempo',
        title: 'Nauyaca como excursión aparte',
        text: 'Las cascadas requieren su propio día y desplazamiento; no las mezcles con la visita al parque.',
      },
    ],
    gettingAround:
      'La línea de autobús Quepos–Manuel Antonio es útil y evita el estrés del aparcamiento. La carretera tiene curvas y poca acera; caminar no siempre es la mejor opción.',
    pack: ['Entrada descargada', 'Documento de identidad', 'Agua reutilizable', 'Repelente', 'Bañador'],
    avoid: [
      'Llegar sin entrada oficial.',
      'Dar comida a los animales o dejar la mochila abierta cerca de monos y mapaches.',
      'Planear el parque en martes sin comprobar antes el calendario vigente.',
    ],
    sources: [
      {
        name: 'SINAC · Información oficial del parque',
        url: 'https://www.sinac.go.cr/ES/ac/acopac/pnma/Paginas/default.aspx',
      },
      {
        name: 'Two Weeks in Costa Rica · Guía práctica',
        url: 'https://www.twoweeksincostarica.com/manuel-antonio-national-park/',
      },
    ],
  },
  {
    slug: 'puerto-viejo',
    destinationId: 'puerto-viejo',
    title: 'Puerto Viejo y Caribe Sur',
    subtitle: 'Cultura caribeña, selva junto al mar y playas muy distintas entre sí.',
    intro:
      'Puerto Viejo es la base con restaurantes y ambiente. Hacia el sur aparecen Cocles, Punta Uva y Manzanillo; hacia el norte, Cahuita. El clima caribeño es cambiante, así que conviene decidir cada mañana entre selva y playa.',
    stay: '3 noches',
    pace: 'Flexible',
    bestFor: 'Caribe, fauna y playa',
    essentials: [
      {
        title: 'Parque Nacional Cahuita',
        text: 'Sendero costero, fauna y playas en un mismo recorrido. La entrada de Playa Blanca funciona con aportación voluntaria; Puerto Vargas tiene tarifa oficial.',
      },
      {
        title: 'Punta Uva',
        text: 'Dos playas bonitas y un entorno más tranquilo que el centro. Se llega en bici, coche, tuk-tuk o autobús hacia Manzanillo.',
      },
      {
        title: 'Cocles y Puerto Viejo',
        text: 'Cocles tiene más oleaje y ambiente surfero. El centro es mejor para comer, pasear y escuchar música que para buscar una playa silenciosa.',
      },
    ],
    advice: [
      'En Cahuita, un guía local ayuda mucho a encontrar perezosos, serpientes y aves ocultas.',
      'Pregunta por corrientes y banderas antes de bañarte; el Caribe puede cambiar rápido.',
      'No dejes nada sin vigilancia en la playa ni visible dentro del coche.',
      'La bicicleta sirve entre playas cercanas, pero usa luces, casco y evita regresar de noche.',
    ],
    simplePlan: [
      {
        label: 'Día de selva',
        title: 'Cahuita temprano',
        text: 'Entra por Playa Blanca, camina con guía y decide allí cuánto sendero y cuánto baño apetece.',
      },
      {
        label: 'Día de playa',
        title: 'Punta Uva y Cocles',
        text: 'Empieza por la playa con mejores condiciones y deja la otra como alternativa, no como obligación.',
      },
      {
        label: 'Tarde',
        title: 'Puerto Viejo sin coche',
        text: 'Aparca o llega en taxi, recorre el centro andando y cena cocina caribeña.',
      },
    ],
    gettingAround:
      'La carretera costera es bastante sencilla. Entre Puerto Viejo y Punta Uva funcionan bici, tuk-tuk, autobús y coche; para Cahuita, el coche o autobús resultan más cómodos.',
    pack: ['Repelente', 'Protector biodegradable', 'Bolsa impermeable', 'Calzado ligero cerrado', 'Efectivo pequeño'],
    avoid: [
      'Confundir Puerto Viejo de Talamanca con Puerto Viejo de Sarapiquí al buscar rutas.',
      'Dejar pertenencias solas mientras te bañas.',
      'Forzar un día de playa si el mar está revuelto: Cahuita, chocolate o fauna son mejores alternativas.',
    ],
    sources: [
      {
        name: 'SINAC · Parque Nacional Cahuita',
        url: 'https://www.sinac.go.cr/es/ac/aclac/pnc/paginas/default.aspx',
      },
      {
        name: 'Mytanfeet · Guía de Punta Uva',
        url: 'https://mytanfeet.com/costa-rica-beach-information/punta-uva-puerto-viejo/',
      },
      {
        name: 'Two Weeks in Costa Rica · Puerto Viejo',
        url: 'https://www.twoweeksincostarica.com/puerto-viejo-caribbean-cool-in-costa-rica/',
      },
    ],
  },
]

export const costaRicaGuideBySlug = Object.fromEntries(
  costaRicaGuides.map((guide) => [guide.slug, guide]),
) as Record<string, CostaRicaGuide>
