export type CostaRicaPlaceCategory = 'Dormir' | 'Comer' | 'Ver y hacer'

type BaseCostaRicaSavedPlace = {
  name: string
  zone: string
  coordinates: readonly [number, number]
  status: 'Nuestra elección' | 'Lo probamos' | 'Guardado para valorar' | 'Idea para otra ruta'
  note: string
  mapUrl: string
}

type CostaRicaHotelPlace = BaseCostaRicaSavedPlace & {
  category: 'Dormir'
  // Regla del proyecto: toda tarjeta de alojamiento debe usar una imagen oficial del hotel.
  image: string
}

type CostaRicaNonHotelPlace = BaseCostaRicaSavedPlace & {
  category: Exclude<CostaRicaPlaceCategory, 'Dormir'>
  image?: string
}

export type CostaRicaSavedPlace = CostaRicaHotelPlace | CostaRicaNonHotelPlace

const maps = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

/**
 * Colección editorial propia de Viajan2Juntos.
 * Los lugares que nos pasen se incorporan aquí después de revisarlos, sin
 * depender del título, autor o disponibilidad de una lista externa.
 */
export const costaRicaSavedPlaces: CostaRicaSavedPlace[] = [
  // Primero, nuestra experiencia real.
  { name: 'El Rodeo Estancia Boutique Hotel', zone: 'Alajuela', coordinates: [9.9672, -84.2627], category: 'Dormir', status: 'Nuestra elección', note: 'Nuestra primera noche cerca del aeropuerto, con aparcamiento y salida práctica hacia la ruta.', mapUrl: maps('El Rodeo Estancia Boutique Hotel Alajuela Costa Rica'), image: '/hotels/hotel-el-rodeo.jpg' },
  { name: 'Natura Bungalows', zone: 'La Fortuna', coordinates: [10.4691, -84.6353], category: 'Dormir', status: 'Nuestra elección', note: 'Nuestro alojamiento favorito del viaje: bungaló independiente, tranquilidad y vistas al Arenal cuando despejaba.', mapUrl: maps('Natura Bungalows La Fortuna Costa Rica'), image: '/hotels/hotel-natura-bungalows.jpg' },
  { name: 'Monteverde Eco Love', zone: 'Monteverde', coordinates: [10.3168, -84.8245], category: 'Dormir', status: 'Nuestra elección', note: 'La base de nuestra etapa en Monteverde, bien situada para movernos por Santa Elena.', mapUrl: maps('Monteverde Eco Love Costa Rica'), image: '/hotels/hotel-monteverde-ecolove.jpg' },
  { name: 'Believe Surf & Yoga Lodge', zone: 'Santa Teresa', coordinates: [9.6448, -85.1679], category: 'Dormir', status: 'Nuestra elección', note: 'Nuestra base durante cinco noches, con desayuno, ambiente viajero y alquiler de tablas.', mapUrl: maps('Believe Surf & Yoga Lodge Santa Teresa Costa Rica'), image: '/hotels/hotel-believe-surf-yoga.jpg' },
  { name: 'Glamping Tomaselli', zone: 'Manuel Antonio', coordinates: [9.4315, -84.1515], category: 'Dormir', status: 'Nuestra elección', note: 'El alojamiento de nuestra etapa entre Quepos y Manuel Antonio.', mapUrl: maps('Glamping Tomaselli Manuel Antonio Costa Rica'), image: '/hotels/hotel-glamping-tomaselli.jpg' },
  { name: 'Chilamate Holiday House', zone: 'Puerto Viejo', coordinates: [9.6647, -82.7662], category: 'Dormir', status: 'Nuestra elección', note: 'Nuestra casa en Playa Negra para cerrar la ruta por el Caribe.', mapUrl: maps('Chilamate Holiday House Puerto Viejo Costa Rica'), image: '/hotels/hotel-chilamate.jpg' },
  { name: 'Soda La Fortuna', zone: 'La Fortuna', coordinates: [10.4702, -84.6454], category: 'Comer', status: 'Lo probamos', note: 'Nuestra recomendación personal para pedir un casado completo sin pagar el precio de los locales más turísticos.', mapUrl: maps('Soda La Fortuna La Fortuna Costa Rica') },
  { name: 'Restaurante Catarata del Toro', zone: 'Bajos del Toro', coordinates: [10.2177, -84.3028], category: 'Comer', status: 'Lo probamos', note: 'La opción más cómoda dentro del recinto de la catarata; cuando fuimos, la comida se pagaba en efectivo.', mapUrl: maps('Restaurante Catarata del Toro Costa Rica') },

  // Sitios concretos recuperados y filtrados de recomendaciones externas.
  { name: 'Casa Luna Hotel & Spa', zone: 'La Fortuna', coordinates: [10.4545, -84.6515], category: 'Dormir', status: 'Guardado para valorar', note: 'Hotel rodeado de vegetación al sur del pueblo; revisar precio y ubicación para las fechas reales.', mapUrl: maps('Casa Luna Hotel & Spa La Fortuna Costa Rica'), image: 'https://casalunahotel.com/wp-content/uploads/2017/04/slide2.jpg' },
  { name: 'Camino Verde Bed & Breakfast', zone: 'Monteverde', coordinates: [10.3131, -84.8241], category: 'Dormir', status: 'Guardado para valorar', note: 'Alternativa céntrica en Santa Elena que puede encajar si se busca desayuno y transporte organizado.', mapUrl: maps('Camino Verde Bed & Breakfast Monteverde Costa Rica'), image: 'https://hotelcaminoverde.com/wp-content/uploads/2017/09/camino-verde-monteverde-front.jpg' },
  { name: 'Shana by the Beach', zone: 'Manuel Antonio', coordinates: [9.4019, -84.1612], category: 'Dormir', status: 'Guardado para valorar', note: 'Opción próxima a Playa Biesanz; conviene comparar pendientes, transporte y precio final.', mapUrl: maps('Shana by the Beach Manuel Antonio Costa Rica'), image: 'https://shanabythebeach.com/img/home/DJI_20241101132543_0083_D-1-C.webp' },
  { name: 'Namu Garden Hotel & Spa', zone: 'Puerto Viejo', coordinates: [9.6567, -82.7542], category: 'Dormir', status: 'Guardado para valorar', note: 'Hotel céntrico en Puerto Viejo guardado para comparar con casas y alojamientos de Playa Negra o Cocles.', mapUrl: maps('Namu Garden Hotel & Spa Puerto Viejo Costa Rica'), image: 'https://namuhotelpuertoviejo.com/wp-content/uploads/2023/04/banner-home-namu.webp' },
  { name: 'Barceló San José', zone: 'San José', coordinates: [9.9467, -84.1139], category: 'Dormir', status: 'Guardado para valorar', note: 'Hotel urbano para una noche de llegada o salida; solo compensa si el traslado y el precio encajan.', mapUrl: maps('Barcelo San Jose Costa Rica'), image: 'https://static.barcelo.com/content/dam/bhg/master/es/hoteles/costa-rica/san-jose-de-costa-rica/barcelo-san-jose/main-photos/hotel/BSJOS_POOL_28.jpg' },

  { name: 'El Chante Verde', zone: 'La Fortuna', coordinates: [10.4492, -84.6678], category: 'Comer', status: 'Guardado para valorar', note: 'Restaurante ajardinado fuera del núcleo más turístico; revisar carta y horario antes de desplazarse.', mapUrl: maps('El Chante Verde La Fortuna Costa Rica') },
  { name: 'Vita Café', zone: 'La Fortuna', coordinates: [10.4391, -84.6722], category: 'Comer', status: 'Guardado para valorar', note: 'Cafetería junto al acceso de la catarata, práctica para unir desayuno o comida con esa visita.', mapUrl: maps('Vita Cafe La Fortuna Costa Rica') },
  { name: 'Tayakiry Café', zone: 'La Fortuna', coordinates: [10.4723, -84.6441], category: 'Comer', status: 'Guardado para valorar', note: 'Cafetería local guardada para desayunos o una parada ligera en el pueblo.', mapUrl: maps('Tayakiry Cafe La Fortuna Costa Rica') },
  { name: 'Santa Elena Coffee Shop · Café Monteverde', zone: 'Monteverde', coordinates: [10.3154, -84.8247], category: 'Comer', status: 'Guardado para valorar', note: 'Una parada centrada en café local dentro de Santa Elena.', mapUrl: maps('Santa Elena Coffee Shop Cafe Monteverde Costa Rica') },
  { name: 'El Patio de Café Milagro', zone: 'Manuel Antonio', coordinates: [9.4094, -84.1564], category: 'Comer', status: 'Guardado para valorar', note: 'Café y restaurante muy conocido en la carretera de Manuel Antonio; comparar precios antes de reservar.', mapUrl: maps('El Patio de Cafe Milagro Manuel Antonio Costa Rica') },
  { name: "Emilio's Café", zone: 'Manuel Antonio', coordinates: [9.4076, -84.1571], category: 'Comer', status: 'Guardado para valorar', note: 'Cafetería con vistas guardada para una comida especial, no como opción económica diaria.', mapUrl: maps("Emilio's Cafe Manuel Antonio Costa Rica") },
  { name: 'Bread & Chocolate', zone: 'Puerto Viejo', coordinates: [9.6562, -82.7538], category: 'Comer', status: 'Guardado para valorar', note: 'Uno de los desayunos más conocidos de Puerto Viejo; suele ser popular, así que conviene ir sin prisa.', mapUrl: maps('Bread and Chocolate Puerto Viejo Costa Rica') },
  { name: 'La Ventana de Ely', zone: 'Puerto Viejo', coordinates: [9.6554, -82.7531], category: 'Comer', status: 'Guardado para valorar', note: 'Pequeño punto de comida caribeña para revisar como alternativa a los restaurantes más turísticos.', mapUrl: maps('La Ventana de Ely Puerto Viejo Costa Rica') },
  { name: "Stashu's Con Fusion", zone: 'Puerto Viejo', coordinates: [9.6539, -82.7534], category: 'Comer', status: 'Guardado para valorar', note: 'Restaurante de cocina fusión guardado para una cena diferente en el centro.', mapUrl: maps("Stashu's Con Fusion Puerto Viejo Costa Rica") },
  { name: 'SOCA Restaurant', zone: 'Puerto Viejo', coordinates: [9.6558, -82.7521], category: 'Comer', status: 'Guardado para valorar', note: 'Opción frente al mar para comparar con la oferta caribeña del centro.', mapUrl: maps('SOCA Restaurant Puerto Viejo Costa Rica') },
  { name: 'Grow Puerto Viejo', zone: 'Puerto Viejo', coordinates: [9.6544, -82.7523], category: 'Comer', status: 'Guardado para valorar', note: 'Restaurante de playa con propuesta vegetal; útil si el grupo busca opciones distintas al rice and beans.', mapUrl: maps('Grow Puerto Viejo Costa Rica') },
  { name: 'Choco', zone: 'Puerto Viejo', coordinates: [9.6551, -82.7545], category: 'Comer', status: 'Guardado para valorar', note: 'Parada especializada en cacao y chocolate local para una visita corta por el centro.', mapUrl: maps('Choco Puerto Viejo Costa Rica') },
  { name: 'Puerto Pirata Tiki Bar', zone: 'Puerto Viejo', coordinates: [9.6565, -82.7522], category: 'Comer', status: 'Guardado para valorar', note: 'Bar informal guardado para tomar algo; comprobar ambiente y horario el mismo día.', mapUrl: maps('Puerto Pirata Tiki Bar Puerto Viejo Costa Rica') },

  // Lugares que no formaron parte de nuestra ruta, conservados como ideas.
  { name: 'Río Celeste', zone: 'Bijagua · Volcán Tenorio', coordinates: [10.7087, -85.0133], category: 'Ver y hacer', status: 'Idea para otra ruta', note: 'Una ampliación natural desde Arenal si se duerme cerca y se evita convertirlo en una excursión apresurada.', mapUrl: maps('Rio Celeste Volcan Tenorio Costa Rica') },
  { name: 'Parque Nacional Corcovado', zone: 'Península de Osa', coordinates: [8.5402, -83.5703], category: 'Ver y hacer', status: 'Idea para otra ruta', note: 'Necesita varios días y planificación propia; no lo añadiríamos como ida y vuelta rápida desde Manuel Antonio.', mapUrl: maps('Parque Nacional Corcovado Costa Rica') },
  { name: 'Tortuguero', zone: 'Caribe Norte', coordinates: [10.5414, -83.5028], category: 'Ver y hacer', status: 'Idea para otra ruta', note: 'Canales, selva y fauna para una futura ruta que reorganice los traslados por el Caribe.', mapUrl: maps('Tortuguero Costa Rica') },
  { name: 'Parque Nacional Marino Ballena', zone: 'Uvita', coordinates: [9.1568, -83.7447], category: 'Ver y hacer', status: 'Idea para otra ruta', note: 'La ampliación más lógica hacia el Pacífico Sur después de Manuel Antonio.', mapUrl: maps('Parque Nacional Marino Ballena Uvita Costa Rica') },
  { name: 'Parque Nacional Los Quetzales', zone: 'Dota', coordinates: [9.5801, -83.8157], category: 'Ver y hacer', status: 'Idea para otra ruta', note: 'Bosque de altura y observación de aves para una ruta distinta por el interior.', mapUrl: maps('Parque Nacional Los Quetzales Costa Rica') },
  { name: 'Volcán Poás', zone: 'Alajuela', coordinates: [10.1981, -84.2310], category: 'Ver y hacer', status: 'Idea para otra ruta', note: 'Puede encajar al comienzo del viaje si la franja de entrada y la visibilidad acompañan.', mapUrl: maps('Volcan Poas Costa Rica') },
  { name: 'Tabacón Thermal Resort & Spa', zone: 'La Fortuna', coordinates: [10.4883, -84.7320], category: 'Ver y hacer', status: 'Guardado para valorar', note: 'Termas de gama alta para comparar con Baldi y con el acceso gratuito al río.', mapUrl: maps('Tabacon Thermal Resort and Spa Costa Rica') },
  { name: 'Playa Hermosa', zone: 'Península de Nicoya', coordinates: [9.6790, -85.1840], category: 'Ver y hacer', status: 'Guardado para valorar', note: 'Playa más tranquila al norte de Santa Teresa que sí visitamos durante la etapa de surf.', mapUrl: maps('Playa Hermosa Santa Teresa Costa Rica') },
]

export const costaRicaPlaceCategories: CostaRicaPlaceCategory[] = ['Dormir', 'Comer', 'Ver y hacer']
