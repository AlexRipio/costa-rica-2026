export type TripImage = {
  id: string
  url: string
  alt: string
  author: string
  license: string
  source: string
}

const commonsFile = (name: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=1800`

export const images: Record<string, TripImage> = {
  palawanLagoon: {
    id: 'palawan-lagoon',
    url: commonsFile('El Nido Bay, Island lagoon, Palawan, Philippines.jpg'),
    alt: 'Laguna entre islas de piedra caliza en El Nido, Filipinas',
    author: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:El_Nido_Bay,_Island_lagoon,_Palawan,_Philippines.jpg',
  },
  palawanBay: {
    id: 'palawan-bay',
    url: commonsFile('El Nido in Palawan.jpg'),
    alt: 'Bahía de El Nido y sus islas en Palawan, Filipinas',
    author: 'choypictures',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:El_Nido_in_Palawan.jpg',
  },
  sigiriya: {
    id: 'sigiriya',
    url: commonsFile('Sigiriya Sri Lanka (30073766295).jpg'),
    alt: 'La roca de Sigiriya elevándose sobre la selva de Sri Lanka',
    author: 'dronepicr',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Sigiriya_Sri_Lanka_(30073766295).jpg',
  },
  sriLankaTea: {
    id: 'sri-lanka-tea',
    url: commonsFile('Tea plantation Sri.jpg'),
    alt: 'Campos de té verdes en las tierras altas de Sri Lanka',
    author: 'A.Savin',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Tea_plantation_Sri.jpg',
  },
  arenal: {
    id: 'arenal',
    url: commonsFile('Arenal Volcano, Costa Rica.jpg'),
    alt: 'Volcán Arenal entre vegetación tropical en Costa Rica',
    author: 'Central Intelligence Agency / The World Factbook',
    license: 'Dominio público',
    source: 'https://commons.wikimedia.org/wiki/File:Arenal_Volcano,_Costa_Rica.jpg',
  },
  fortuna: {
    id: 'fortuna',
    url: commonsFile('La Fortuna Waterfall.JPG'),
    alt: 'Catarata de La Fortuna rodeada de selva',
    author: 'Eric T Gunther',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:La_Fortuna_Waterfall.JPG',
  },
  monteverde: {
    id: 'monteverde',
    url: commonsFile('Cloud Forest at Monteverde.JPG'),
    alt: 'Bosque nuboso de Monteverde cubierto de musgo',
    author: 'Haakon S. Krohn',
    license: 'CC BY-SA',
    source: 'https://commons.wikimedia.org/wiki/File:Cloud_Forest_at_Monteverde.JPG',
  },
  santaTeresa: {
    id: 'santa-teresa',
    url: commonsFile('Plage de Santa Teresa.jpg'),
    alt: 'Playa de Santa Teresa en la costa del Pacífico',
    author: 'Wikimedia Commons contributor',
    license: 'Licencia indicada en la fuente',
    source: 'https://commons.wikimedia.org/wiki/File:Plage_de_Santa_Teresa.jpg',
  },
  manuelAntonio: {
    id: 'manuel-antonio',
    url: commonsFile('Parque Nacional Manuel Antonio 02.jpg'),
    alt: 'Playa tropical del Parque Nacional Manuel Antonio',
    author: 'Bgag',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Parque_Nacional_Manuel_Antonio_02.jpg',
  },
  puertoViejo: {
    id: 'puerto-viejo',
    url: commonsFile('Puerto Viejo, Costa Rica (14014518509).jpg'),
    alt: 'Costa caribeña en Puerto Viejo, Costa Rica',
    author: 'Wikimedia Commons contributor',
    license: 'Licencia indicada en la fuente',
    source: 'https://commons.wikimedia.org/wiki/File:Puerto_Viejo,_Costa_Rica_(14014518509).jpg',
  },
  cahuita: {
    id: 'cahuita',
    url: commonsFile('Cahuita national park, Costa Rica.jpg'),
    alt: 'Palmeras y playa en el Parque Nacional Cahuita',
    author: 'Haakon S. Krohn',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Cahuita_national_park,_Costa_Rica.jpg',
  },
  puntaUva: {
    id: 'punta-uva',
    url: commonsFile('Playa de Punta Uva, Costa Rica.jpg'),
    alt: 'Playa de Punta Uva junto a Puerto Viejo',
    author: 'Jaimedelamata',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Playa_de_Punta_Uva,_Costa_Rica.jpg',
  },
  hotelElRodeo: {
    id: 'hotel-el-rodeo',
    url: '/hotels/hotel-el-rodeo.jpg',
    alt: 'Habitación de El Rodeo Estancia Boutique Hotel & Steakhouse',
    author: 'Imagen oficial de la reserva',
    license: 'Uso descriptivo en guía privada del viaje',
    source: 'https://www.booking.com/',
  },
  hotelNatura: {
    id: 'hotel-natura-bungalows',
    url: '/hotels/hotel-natura-bungalows.jpg',
    alt: 'Bungalow de Natura Bungalows en La Fortuna',
    author: 'Imagen oficial de la reserva',
    license: 'Uso descriptivo en guía privada del viaje',
    source: 'https://www.booking.com/',
  },
  hotelEcolove: {
    id: 'hotel-monteverde-ecolove',
    url: '/hotels/hotel-monteverde-ecolove.jpg',
    alt: 'Terraza de Monteverde Ecolove',
    author: 'Imagen oficial de la reserva',
    license: 'Uso descriptivo en guía privada del viaje',
    source: 'https://www.booking.com/',
  },
  hotelBelieve: {
    id: 'hotel-believe-surf-yoga',
    url: '/hotels/hotel-believe-surf-yoga.jpg',
    alt: 'Piscina de Believe Surf & Yoga Lodge Santa Teresa',
    author: 'Imagen oficial de la reserva',
    license: 'Uso descriptivo en guía privada del viaje',
    source: 'https://www.booking.com/',
  },
  hotelTomaselli: {
    id: 'hotel-glamping-tomaselli',
    url: '/hotels/hotel-glamping-tomaselli.jpg',
    alt: 'Glamping Tomaselli en Manuel Antonio',
    author: 'Imagen oficial de la reserva',
    license: 'Uso descriptivo en guía privada del viaje',
    source: 'https://www.booking.com/',
  },
  hotelChilamate: {
    id: 'hotel-chilamate',
    url: '/hotels/hotel-chilamate.jpg',
    alt: 'Chilamate Holiday House en Puerto Viejo',
    author: 'Imagen oficial de la reserva',
    license: 'Uso descriptivo en guía privada del viaje',
    source: 'https://www.booking.com/',
  },
}

export const imageFallback =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0f766e"/><stop offset=".55" stop-color="#19a974"/><stop offset="1" stop-color="#ffc857"/></linearGradient></defs><rect width="1200" height="700" fill="url(#g)"/><circle cx="950" cy="125" r="70" fill="#fff" opacity=".6"/><path d="M0 560 C180 410 330 610 510 465S810 560 1200 390V700H0Z" fill="#064e3b" opacity=".65"/><text x="70" y="120" fill="white" font-family="Arial" font-size="56" font-weight="700">Pura vida</text></svg>`)
