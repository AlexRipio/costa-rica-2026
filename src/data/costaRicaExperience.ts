export type ExperienceMoment = {
  label: string
  title: string
  text: string
  verdict: 'De lo mejor' | 'Nos gustó' | 'Con matices' | 'Prescindible'
}

export type ExperiencePrice = {
  item: string
  paid: string
  note: string
}

export type DestinationExperience = {
  lead: string
  moments: ExperienceMoment[]
  reality: string[]
  lodging?: { name: string; verdict: string; text: string }
  food: Array<{ name: string; text: string }>
  prices: ExperiencePrice[]
  personalFaq: Array<{ question: string; answer: string }>
  statement: { before: string; accent: string; after: string }
}

export const destinationExperiences: Record<string, DestinationExperience> = {
  'alajuela-bajos-del-toro': {
    lead:
      'Fue nuestra primera toma de contacto con el país. Dormimos cerca del aeropuerto y al día siguiente recogimos el coche, una decisión que ahora cambiaríamos: para una ruta como la nuestra, merece la pena salir ya con el vehículo desde el primer día.',
    moments: [
      {
        label: 'La caminata que hicimos',
        title: 'Catarata del Toro',
        text: 'Elegimos esta ruta de entre una hora y hora y media. Tiene muchos escalones, la subida se nota y la lluvia puede dejarte completamente empapado, pero las vistas justifican el esfuerzo.',
        verdict: 'De lo mejor',
      },
      {
        label: 'La alternativa',
        title: 'Blue Falls',
        text: 'La opción más larga permite recorrer seis pozas de tonos azules. Calcula unas dos horas y media y más esfuerzo físico; la combinada solo tiene sentido si llegas temprano y con ganas de caminar.',
        verdict: 'Con matices',
      },
      {
        label: 'Lo que aprendimos',
        title: 'El trayecto también cuenta',
        text: 'Desde San José la carretera se hizo larga por los baches. La zona parece aislada al principio y conviene conducir despacio, repostar antes y no estrenar esta ruta de noche.',
        verdict: 'Nos gustó',
      },
    ],
    reality: [
      'En nuestro viaje llovió y acabamos calados. No cancelamos: un chubasquero, calzado con agarre y una muda completa en el coche fueron más útiles que esperar una mañana perfecta.',
      'Nos paró la policía durante el trayecto. Comprobaron el pasaporte, vieron que éramos turistas y seguimos sin ninguna incidencia.',
      'En el recinto no teníamos cobertura móvil, aunque la entrada daba acceso a una red wifi potente.',
    ],
    food: [
      {
        name: 'Restaurante de las cataratas',
        text: 'Comimos allí por un precio bastante razonable: unos 8 USD la hamburguesa y 6 USD el perrito. La comida se pagaba únicamente en efectivo, aunque la entrada sí admitía tarjeta.',
      },
    ],
    prices: [
      { item: 'Catarata del Toro', paid: '15 USD', note: 'Ruta de 1–1,5 h' },
      { item: 'Blue Falls', paid: '18 USD', note: 'Unas 2,5 h y seis pozas' },
      { item: 'Entrada combinada', paid: '25 USD', note: 'Más larga y exigente' },
    ],
    personalFaq: [
      {
        question: '¿Qué haríamos distinto al llegar?',
        answer: 'Recogeríamos el coche nada más aterrizar. Volver al aeropuerto al día siguiente nos quitó tiempo y la salida nos pareció manejable.',
      },
      {
        question: '¿La lluvia arruina la catarata?',
        answer: 'En nuestro caso, no. La zona es húmeda y forma parte del paisaje; lo importante es llevar una muda seca y caminar con cuidado en los escalones.',
      },
    ],
    statement: {
      before: 'Bajos del Toro nos enseñó muy pronto que en Costa Rica',
      accent: 'la lluvia no cancela el día',
      after: 'solo cambia la forma de vivirlo.',
    },
  },
  'la-fortuna-arenal': {
    lead:
      'La Fortuna fue nuestra primera gran base y una de las etapas más completas. Vimos el volcán al llegar, combinamos la selva turística de Místico con un sendero mucho más económico y entendimos que no todas las termas justifican el mismo gasto.',
    moments: [
      {
        label: 'Primera selva',
        title: 'Puentes de Místico',
        text: 'El recorrido está muy preparado, con camino señalizado, firme cómodo y puentes espectaculares. Nos pareció caro, pero lo recomendamos como una primera entrada sencilla a la selva.',
        verdict: 'Nos gustó',
      },
      {
        label: 'La sorpresa',
        title: 'Mirador El Silencio',
        text: 'No es solo un mirador: tiene mapa, distintas rutas y zonas de fauna. Caminamos con lluvia, vimos una rana y escuchamos monos aulladores alrededor. Por 9 USD fue una experiencia intensísima.',
        verdict: 'De lo mejor',
      },
      {
        label: 'El gasto debatible',
        title: 'Baldi Hot Springs',
        text: 'Es enorme, tiene 27 piscinas, toboganes y bebidas dentro del agua. Lo pasamos bien, aunque con un presupuesto ajustado pondríamos antes Místico o El Silencio.',
        verdict: 'Prescindible',
      },
    ],
    reality: [
      'El trayecto desde Bajos del Toro duró unas dos horas y fue más sencillo que la carretera anterior. Aun así, un accidente puede bloquear fácilmente estas vías de un solo carril por sentido.',
      'La Fortuna está completamente orientada al turismo: hay actividades, tiendas, restaurantes y ambiente por la noche, pero también precios más altos.',
      'Místico exigía comprar la entrada online en nuestra visita. Reservar uno o dos días antes nos parece más sensato que llegar esperando comprar allí.',
      'En una tarde lluviosa volvimos al alojamiento, secamos la ropa y entendimos el ritmo real del viaje: madrugar, aprovechar la luz y no intentar rellenar cada hora gastando dinero.',
    ],
    lodging: {
      name: 'Natura Bungalows',
      verdict: 'Nuestro alojamiento favorito del viaje',
      text: 'Dormimos en una casa o bungaló independiente con vistas directas al volcán. Era algo más caro dentro de nuestro presupuesto, pero la relación entre tranquilidad, espacio y paisaje nos pareció excelente.',
    },
    food: [
      {
        name: 'Soda La Fortuna',
        text: 'Nuestra opción recomendada para comer comida típica sin pagar el precio de los restaurantes turísticos. El casado rondaba 8–10 USD y era un plato muy completo.',
      },
      {
        name: 'Cena en el alojamiento',
        text: 'Una noche compramos en el supermercado y cocinamos espaguetis. Los productos básicos nos parecieron caros, pero alternar alguna cena casera ayudó a equilibrar el presupuesto.',
      },
    ],
    prices: [
      { item: 'Místico', paid: '≈35 USD', note: 'Entrada online en nuestra visita' },
      { item: 'Mirador El Silencio', paid: '9 USD', note: 'Rutas, fauna y volcán' },
      { item: 'Baldi Hot Springs', paid: '≈50 USD', note: '27 piscinas y toboganes' },
      { item: 'Casado en soda', paid: '8–10 USD', note: 'Plato completo' },
    ],
    personalFaq: [
      {
        question: '¿Místico o Mirador El Silencio?',
        answer: 'Son distintos. Místico es cómodo y espectacular por los puentes; El Silencio fue más barato, menos pulido y mucho más intenso para nosotros. Si solo pudiéramos pagar uno, elegiríamos según si buscas infraestructura o sendero.',
      },
      {
        question: '¿Pagaríamos de nuevo Baldi?',
        answer: 'Solo si quisiéramos dedicar una tarde completa a relajarnos. Está bien montado, pero no fue una de las experiencias que más recordamos por cada dólar gastado.',
      },
      {
        question: '¿Qué pasa si llueve?',
        answer: 'Seguimos caminando mientras fue seguro, volvimos a cambiarnos y reorganizamos la tarde. En esta zona esperar varios días sin lluvia puede significar no hacer nada.',
      },
    ],
    statement: {
      before: 'La actividad más barata de La Fortuna fue también una de las que',
      accent: 'más se nos quedó dentro',
      after: 'cuando los monos empezaron a rugir bajo la lluvia.',
    },
  },
  monteverde: {
    lead:
      'Monteverde nos recibió con una carretera preciosa alrededor del lago y un tiempo sorprendentemente bueno. Aquí mezclamos adrenalina, bosque nuboso y uno de esos atardeceres que terminan dando un nombre propio al lugar.',
    moments: [
      {
        label: 'Adrenalina',
        title: 'Extremo Park',
        text: 'Un tronco bloqueó la carretera y llegamos tarde, así que hicimos las primeras tirolinas a toda velocidad para alcanzar al grupo. Nos gustó muchísimo, aunque es una actividad cara y no imprescindible para todo el mundo.',
        verdict: 'Nos gustó',
      },
      {
        label: 'El paisaje',
        title: 'La ciudad de arcoíris',
        text: 'Paramos en un mirador al atardecer y apareció un arcoíris detrás del paisaje. Con el sol abriéndose paso entre tantas nubes parecía que atravesábamos arcoíris: así se quedó Monteverde en nuestra memoria.',
        verdict: 'De lo mejor',
      },
      {
        label: 'La caminata',
        title: 'Bosque Profundo',
        text: 'Elegimos el sendero intermedio del bosque nuboso, unos 3 km y una hora y media. Es frondoso y muy interesante para quien disfruta la botánica, pero después de La Fortuna no nos sorprendió tanto.',
        verdict: 'Con matices',
      },
    ],
    reality: [
      'El trayecto desde La Fortuna nos llevó unas dos horas y media. Paramos en una soda aislada con comida a la brasa y unas vistas preciosas del lago; todavía tenemos pendiente recuperar su nombre.',
      'En Extremo Park el último acceso era a las 14:00 y había que reservar en la web. La altura, el viento y la lluvia hacen recomendable llevar una capa de manga larga.',
      'Compramos el paquete de fotos y vídeo del salto por 15 USD. No era necesario, pero nos hizo gracia conservar ese recuerdo.',
      'Para el bosque nuboso compramos online. El aparcamiento quedaba aproximadamente a un kilómetro y un autobús nos acercó a la entrada.',
    ],
    food: [
      {
        name: 'Soda frente al lago',
        text: 'Comida a la brasa en una parada de carretera con vistas espectaculares. El nombre sigue pendiente, pero el consejo permanece: deja margen para parar durante esta ruta.',
      },
      {
        name: 'Cena sencilla',
        text: 'Compramos en el supermercado después de las tirolinas. En una etapa con actividades caras, cocinar una noche nos pareció una decisión muy sensata.',
      },
    ],
    prices: [
      { item: 'Extremo Park', paid: '≈55 USD', note: 'Tirolinas y actividades' },
      { item: 'Fotos', paid: '10 USD', note: '15 USD con vídeo del salto' },
      { item: 'Bosque nuboso', paid: '≈30 USD', note: 'Mismo precio para todos los senderos' },
    ],
    personalFaq: [
      {
        question: '¿Se repite con La Fortuna?',
        answer: 'En nuestro caso, un poco. El bosque tiene una identidad clara y mucha riqueza vegetal, pero después de varios parques en La Fortuna la visita nos pareció menos sorprendente.',
      },
      {
        question: '¿Merecen la pena las tirolinas?',
        answer: 'Nos encantaron y Monteverde es un entorno increíble para hacerlas. Aun así, si hay que recortar presupuesto, se puede disfrutar mucho de la zona sin pagar esta actividad.',
      },
      {
        question: '¿Qué ropa llevaríamos?',
        answer: 'Una parte superior larga o cortavientos incluso con buen día. A esa altura, una lluvia corta cambia muy rápido la sensación térmica.',
      },
    ],
    statement: {
      before: 'Para nosotros Monteverde siempre será',
      accent: 'la ciudad de arcoíris',
      after: 'un lugar donde las nubes también forman parte del paisaje.',
    },
  },
  'santa-teresa': {
    lead:
      'El plan inicial era llegar en ferry desde Puntarenas, pero un atasco enorme nos hizo cambiar la ruta y atravesar por carretera la península de Nicoya. Ese cambio sobre la marcha acabó funcionando: llegamos a tiempo para comer y empezar a vivir Santa Teresa.',
    moments: [
      {
        label: 'El ritmo',
        title: 'Surf y slow life',
        text: 'Encontramos restaurantes, yoga, cultura surf y mucho ambiente joven. Las playas no siempre son para un baño tranquilo, pero la vegetación, las olas y los atardeceres son espectaculares.',
        verdict: 'Nos gustó',
      },
      {
        label: 'El mar',
        title: 'Santa Teresa y Playa Hermosa',
        text: 'Alquilamos tablas en el hotel y surfeamos en las dos playas. Con nivel principiante cuesta entrar en olas grandes y las corrientes merecen respeto; una clase ayuda, pero llegar con algo de base mejora la experiencia.',
        verdict: 'Nos gustó',
      },
      {
        label: 'La noche más especial',
        title: 'Isla Tortuga y bioluminiscencia',
        text: 'El tour desde Montezuma terminó en una bahía de noche. Al meternos en el mar, el agua brillaba alrededor del cuerpo. Fue, sin discusión, la actividad más mágica del viaje.',
        verdict: 'De lo mejor',
      },
    ],
    reality: [
      'La ruta alternativa por carretera duró unas cuatro horas y media, con poco tráfico y vías bastante buenas. En el regreso sí utilizamos el ferry.',
      'Playa Santa Teresa y Playa Hermosa tenían bastante oleaje y banderas rojas durante nuestra estancia. Nos parecieron mejores para surf, caminar y ver el atardecer que para un baño relajado.',
      'El trayecto hasta Montezuma tiene tramos de tierra. El 4×4 nos dio tranquilidad, especialmente al volver de noche con poca iluminación.',
      'Durante el tour pudimos volar el dron, pero las normas cambian: antes de llevarlo hay que comprobar restricciones y permisos actuales.',
    ],
    lodging: {
      name: 'Nuestro hotel de surf y yoga',
      verdict: 'Sencillo y perfecto para esta etapa',
      text: 'Teníamos desayuno, actividades y alquiler de tablas dentro del alojamiento. Pagamos unos 15 USD por una tabla durante 24 horas, menos que en varias tiendas independientes.',
    },
    food: [
      {
        name: 'Oferta internacional',
        text: 'Santa Teresa tiene muchos restaurantes y espacios chill, pero el presupuesto sube rápido. Alternar desayunos incluidos, sodas y alguna cena especial nos funcionó bien.',
      },
      {
        name: 'Tour de Isla Tortuga',
        text: 'Incluía comida tipo bocadillo, tentempié con frijoles, pico de gallo y nachos, además de fruta durante el día.',
      },
    ],
    prices: [
      { item: 'Tabla de surf', paid: '15 USD', note: '24 horas en el hotel' },
      { item: 'Clase de surf', paid: '55–60 USD', note: 'Unos 90 minutos' },
      { item: 'Isla Tortuga + bioluminiscencia', paid: '≈100 EUR', note: 'Lancha, comida y experiencia nocturna' },
      { item: 'Ferry de regreso', paid: '≈15 EUR total', note: 'Coche + dos adultos' },
    ],
    personalFaq: [
      {
        question: '¿Es una playa para bañarse sin más?',
        answer: 'No fue nuestra experiencia. Había oleaje y banderas rojas, así que la disfrutamos más para surf, pasear y ver atardeceres. Hay que respetar siempre las condiciones del día.',
      },
      {
        question: '¿Hace falta 4×4 para Montezuma?',
        answer: 'Nos vino muy bien por los tramos de tierra y, sobre todo, por el regreso nocturno. Los baches se leen mucho peor cuando no hay iluminación.',
      },
      {
        question: '¿Repetiríamos la bioluminiscencia?',
        answer: 'Sí. Fue la actividad más mágica de todo el viaje y una de las pocas en las que el precio quedó completamente eclipsado por el recuerdo.',
      },
    ],
    statement: {
      before: 'Vimos muchas cosas increíbles, pero hubo una noche en la que',
      accent: 'el mar se encendió',
      after: 'y todo el viaje pareció detenerse.',
    },
  },
  'manuel-antonio': {
    lead:
      'Manuel Antonio fue la zona más turística de la ruta, pero también una de las mejores para observar fauna. La diferencia la marcaron un guía que sabía dónde mirar, una entrada bien preparada y no caer en los aparcamientos que intentan detenerte antes de llegar.',
    moments: [
      {
        label: 'Una tarde redonda',
        title: 'Espadilla y Hotel Mariposa',
        text: 'Pasamos la mañana en Playa Espadilla y después usamos el day pass del Hotel Mariposa. Tenía cuatro piscinas y unas vistas increíbles de la bahía.',
        verdict: 'Nos gustó',
      },
      {
        label: 'La visita principal',
        title: 'Parque Nacional con guía',
        text: 'Vimos serpientes, monos, perezosos y tucanes. El guía fotografiaba a través de su equipo óptico y nos enviaba después las imágenes incluidas en la visita.',
        verdict: 'De lo mejor',
      },
      {
        label: 'Al atardecer',
        title: 'Bar El Avión',
        text: 'Entramos en el antiguo avión de carga convertido en bar, tomamos algo y vimos caer el sol. Es una parada curiosa que encaja mejor por la tarde que como comida principal.',
        verdict: 'Nos gustó',
      },
    ],
    reality: [
      'Si ya tienes guía, no te detengas con quienes ofrecen aparcamiento o tours antes del acceso. Nosotros avanzamos hasta el final de la carretera, después de Playa Espadilla.',
      'Aparcamos en el Restaurante Manuel Antonio. Según nuestra factura, al consumir al menos 6.000 colones el aparcamiento quedaba incluido.',
      'Después del recorrido se puede permanecer en la playa del parque hasta el cierre y hay duchas de agua dulce a la salida.',
      'Nos pareció una zona más cara y desarrollada que otras etapas. Para cenar buscamos una parte más local y encontramos precios menos inflados.',
    ],
    lodging: {
      name: 'Hotel Mariposa · day pass',
      verdict: 'Una forma inteligente de usar la tarde',
      text: 'Pagamos 50 USD y 40 USD se convertían en crédito para comida y cena. En la práctica sentimos que las piscinas costaban unos 10 USD y el resto lo consumimos con vistas a la bahía.',
    },
    food: [
      {
        name: 'Restaurante Manuel Antonio',
        text: 'Nos permitió unir aparcamiento y comida: con un consumo mínimo de 6.000 CRC, el parking quedaba incluido según nuestra experiencia.',
      },
      {
        name: 'Miguelitos Pizza',
        text: 'Cenamos en una zona más local. Los precios seguían siendo altos para Costa Rica, pero ya no tenían el sobreprecio de la parte más turística. Conviene ir con tiempo y mantener las precauciones normales.',
      },
    ],
    prices: [
      { item: 'Hotel Mariposa', paid: '50 USD', note: '40 USD de crédito para consumo' },
      { item: 'Parking con consumo', paid: '6.000 CRC', note: 'Importe mínimo de factura en nuestra visita' },
    ],
    personalFaq: [
      {
        question: '¿Contrataríamos guía otra vez?',
        answer: 'Sí. Vimos animales que habríamos pasado por alto y además nos llevamos fotografías tomadas a través del telescopio. Para nosotros cambió la visita.',
      },
      {
        question: '¿Dónde aparcaríamos?',
        answer: 'Volveríamos a avanzar hasta la zona del Restaurante Manuel Antonio y comprobaríamos allí la condición actual de parking con consumo. Evitaríamos parar antes con intermediarios.',
      },
      {
        question: '¿Qué nos sorprendió de la zona?',
        answer: 'La cantidad de insectos y los precios turísticos. Repelente, habitaciones bien cerradas y buscar alguna cena local marcaron diferencia.',
      },
    ],
    statement: {
      before: 'En Manuel Antonio no vimos más fauna por caminar más rápido, sino porque alguien',
      accent: 'nos enseñó dónde mirar',
      after: 'y cuándo detenernos.',
    },
  },
  'puerto-viejo': {
    lead:
      'Llegar desde Manuel Antonio fue el trayecto más duro del viaje: lo que podía haber sido una jornada de unas siete horas terminó acercándose a diez por el tráfico. Solo tuvimos un día completo, así que elegimos Cahuita, varias playas y una última mañana de dron en Playa Negra.',
    moments: [
      {
        label: 'Por la mañana',
        title: 'Parque Nacional Cahuita',
        text: 'Entramos por el pueblo, donde funcionaba una aportación voluntaria con mínimo. El temporal había cerrado el paso hacia Cabo Cahuita, pero en un tramo de unos 1,5 km vimos monos, un caimán y cocodrilos.',
        verdict: 'De lo mejor',
      },
      {
        label: 'Con el cielo cambiado',
        title: 'Punta Uva',
        text: 'La playa era bonita, aunque el viento y las nubes la hicieron parecer mucho más salvaje y no conectamos tanto con ella en ese momento. Es un buen ejemplo de cómo el Caribe cambia de un día a otro.',
        verdict: 'Con matices',
      },
      {
        label: 'Nuestro mejor baño',
        title: 'Playa Cocles',
        text: 'Aquí estuvimos muy a gusto, jugamos con las olas y vimos el atardecer. Tiene zonas donde tomar algo o comer y nos resultó más disfrutable que Punta Uva ese día.',
        verdict: 'Nos gustó',
      },
      {
        label: 'Desde el aire',
        title: 'Playa Negra',
        text: 'Volamos el dron la última mañana. La arena oscura, las palmeras y la línea de costa crearon una de las imágenes más distintas de todo el viaje.',
        verdict: 'De lo mejor',
      },
    ],
    reality: [
      'La carretera desde San José hacia el Caribe tenía algunos de los tramos más modernos que vimos, incluso con dos carriles, pero los atascos convirtieron el cruce en la jornada más cansada.',
      'En Cahuita, la entrada de Puerto Vargas tenía una tarifa obligatoria de 6 USD. Nosotros preferimos la entrada del pueblo por aportación.',
      'Al salir del parque encontramos souvenirs más económicos en la primera tienda exterior que en Puerto Viejo.',
      'Puerto Viejo también vive del turismo, aunque conserva una sensación más rudimentaria y menos desarrollada que Manuel Antonio.',
    ],
    lodging: {
      name: 'Chilamate Holiday House',
      verdict: 'Bonito, abierto y muy metido en la naturaleza',
      text: 'Nos gustó el alojamiento, pero entraba mucha luz y durante la noche se escuchaban continuamente los animales. Esa conexión con la selva tenía encanto, aunque dormimos peor.',
    },
    food: [
      {
        name: 'Puerto Viejo',
        text: 'Es la base más sencilla para encontrar restaurantes y salir a cenar. La experiencia es más informal que en Manuel Antonio y encaja bien para cerrar el viaje sin demasiados planes.',
      },
    ],
    prices: [
      { item: 'Entrada por Cahuita', paid: 'Aportación', note: 'Con mínimo durante nuestra visita' },
      { item: 'Entrada Puerto Vargas', paid: '6 USD', note: 'Tarifa obligatoria entonces' },
    ],
    personalFaq: [
      {
        question: '¿Merece la pena cruzar desde Manuel Antonio?',
        answer: 'El Caribe es realmente distinto, pero con solo un día completo el esfuerzo fue grande. Lo repetiríamos con más noches o con una parada intermedia para que el trayecto no se coma la experiencia.',
      },
      {
        question: '¿Punta Uva fue nuestra playa favorita?',
        answer: 'No ese día. El viento y las nubes cambiaron mucho la sensación. Disfrutamos más Cocles, lo que demuestra que conviene elegir playa según las condiciones de esa mañana.',
      },
      {
        question: '¿Por dónde entraríamos a Cahuita?',
        answer: 'Volveríamos a entrar por el pueblo y comprobaríamos el estado del sendero ese mismo día. El temporal limitó nuestra ruta, pero aun así vimos mucha fauna.',
      },
    ],
    statement: {
      before: 'El Caribe nos recordó que una playa no es una fotografía fija:',
      accent: 'cambia con el cielo',
      after: 'con el viento y con el día en que llegas.',
    },
  },
}

export const costaRicaTripLessons = [
  {
    kicker: 'Moverse',
    title: 'El coche fue casi imprescindible',
    text: 'Nuestro Suzuki Jimny 4×4 nos dio libertad y tranquilidad en baches, accesos de tierra, entradas de alojamientos y el regreso nocturno desde Montezuma.',
    accent: '4×4',
  },
  {
    kicker: 'Navegar',
    title: 'Waze nos funcionó mejor',
    text: 'Reflejaba con más rapidez accidentes y atascos. En carreteras de un carril, una incidencia puede cambiar por completo el día.',
    accent: 'Waze',
  },
  {
    kicker: 'Pagar',
    title: 'Tarjeta casi siempre; efectivo preparado',
    text: 'Llevamos dólares y pagamos con tarjeta cuando pudimos. Un alojamiento exigía 160 USD en efectivo: con 400 USD fuimos tranquilos; sin ese pago, 200 habrían bastado.',
    accent: '400 USD',
  },
  {
    kicker: 'Conectarse',
    title: 'Una eSIM fue suficiente',
    text: 'Holafly nos dio 4G durante casi toda la ruta. Perdimos cobertura en parques y algunos tramos, pero no echamos de menos una SIM física.',
    accent: '4G',
  },
  {
    kicker: 'Adaptarse',
    title: 'La lluvia no nos canceló el viaje',
    text: 'Nos mojamos en cataratas y senderos. Volver, cambiarse, secar la ropa y reorganizar la tarde funcionó mejor que intentar adivinar el clima.',
    accent: 'lluvia',
  },
  {
    kicker: 'Comer',
    title: 'Las sodas equilibraron el presupuesto',
    text: 'Un casado rondaba 8–10 USD y era un plato completo. También cocinamos alguna cena: los supermercados no son baratos, pero alternar ayudó.',
    accent: '8–10 USD',
  },
]

export const costaRicaPaidPrices: ExperiencePrice[] = [
  { item: 'Catarata del Toro', paid: '15 USD', note: 'Ruta de 1–1,5 h' },
  { item: 'Blue Falls', paid: '18 USD', note: 'Unas 2,5 h' },
  { item: 'Místico', paid: '≈35 USD', note: 'Puentes colgantes' },
  { item: 'Mirador El Silencio', paid: '9 USD', note: 'Senderos y volcán' },
  { item: 'Baldi', paid: '≈50 USD', note: 'Termas' },
  { item: 'Extremo Park', paid: '≈55 USD', note: 'Tirolinas' },
  { item: 'Bosque nuboso', paid: '≈30 USD', note: 'Entrada' },
  { item: 'Tabla de surf', paid: '15 USD', note: '24 horas' },
  { item: 'Clase de surf', paid: '55–60 USD', note: '1,5 horas' },
  { item: 'Isla Tortuga + bioluminiscencia', paid: '≈100 EUR', note: 'Tour completo' },
  { item: 'Ferry con coche', paid: '≈15 EUR', note: 'Coche + dos adultos' },
  { item: 'Hotel Mariposa', paid: '50 USD', note: '40 USD de crédito' },
  { item: 'Puerto Vargas', paid: '6 USD', note: 'Entrada a Cahuita' },
  { item: 'Combustible', paid: '≈1,56 EUR/l', note: 'Precio observado' },
]

export const costaRicaExperienceFaq = [
  {
    question: '¿De verdad compensa alquilar coche?',
    answer: 'Para nuestra ruta, rotundamente sí. Nos permitió adaptar planes, llegar a alojamientos apartados y movernos entre parques y playas sin depender de traslados.',
  },
  {
    question: '¿Es necesario un 4×4?',
    answer: 'No en cada carretera, pero lo recomendamos para una ruta como la nuestra. Baches, accesos de piedra, caminos de tierra y trayectos nocturnos hicieron que el Jimny nos diera mucha tranquilidad.',
  },
  {
    question: '¿Es difícil conducir?',
    answer: 'Si conduces habitualmente en España, no nos pareció especialmente difícil. El reto real fueron los baches, los atascos, la lluvia y las carreteras de un carril por sentido.',
  },
  {
    question: '¿Condujimos de noche?',
    answer: 'Sí y no tuvimos incidentes, pero evitamos los trayectos largos. La visibilidad baja mucho y los baches se distinguen peor.',
  },
  {
    question: '¿Qué aplicación usamos para conducir?',
    answer: 'Waze. En nuestra experiencia reflejó mejor los accidentes y atascos en tiempo real que Google Maps.',
  },
  {
    question: '¿Dólares, colones o tarjeta?',
    answer: 'Usamos tarjeta en casi todo y llevamos principalmente dólares. El efectivo fue necesario en sodas, pequeños comercios, souvenirs y un alojamiento.',
  },
  {
    question: '¿Cuánto efectivo llevaríamos?',
    answer: 'Con 400 USD fuimos tranquilos. Tuvimos un pago de hotel de 160 USD solo en efectivo; sin él, creemos que 200 USD habrían sido suficientes.',
  },
  {
    question: '¿Tuvimos cobertura?',
    answer: 'Normalmente sí, con 4G. Se perdía en parques nacionales y algunos tramos. Una eSIM de Holafly nos funcionó durante todo el recorrido.',
  },
  {
    question: '¿Qué hicimos cuando llovía?',
    answer: 'No cancelamos automáticamente. Llevábamos chubasquero y muda, y alguna tarde volvimos a secarnos antes de aprovechar las horas de luz que quedaban.',
  },
  {
    question: '¿Cómo ahorramos en comida?',
    answer: 'Comimos en sodas, pedimos casados y cocinamos algunas cenas. El agua filtrada de las sodas solía ser gratuita en nuestra experiencia.',
  },
  {
    question: '¿Tomamos Malarone o vacunas nuevas?',
    answer: 'En nuestro caso no tomamos Malarone y ya teníamos vacunas de un viaje anterior. Esto es únicamente nuestra experiencia: la recomendación sanitaria debe consultarse de forma individual antes de viajar.',
  },
  {
    question: '¿Cómo fue el regreso al aeropuerto?',
    answer: 'La carretera desde el Caribe tuvo tramos bastante modernos. Fuimos primero a un centro comercial y llegamos al aeropuerto con tres horas de antelación; el control de equipaje nos pareció minucioso.',
  },
]
