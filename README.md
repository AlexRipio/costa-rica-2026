# Viajan2Juntos

Blog personal de viajes de Andrea y Alejandro. La portada reúne todas las aventuras y cada viaje tiene su propia página editorial.

## Estructura

- `/`: portada de Viajan2Juntos.
- `/viajes`: archivo de viajes.
- `/viajes/costa-rica-2026`: itinerario público y visual de Costa Rica.
- `/seguro-de-viaje`: landing editorial y cotizador horizontal oficial de IATI.
- `/familia`: acceso privado.
- `/familia/costa-rica-2026`: seguimiento horario, mapa, hoteles y vuelos.

## Desarrollo

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm start
```

La zona privada necesita dos variables de entorno:

- `FAMILY_PASSWORD`: contraseña compartida de la familia.
- `AUTH_SECRET`: secreto largo utilizado para firmar la sesión.

El proyecto se despliega automáticamente en Vercel al actualizar la rama principal de GitHub.

## Afiliación IATI

- El script oficial se carga una única vez desde `app/layout.tsx` con el colaborador `85259934961431`.
- `IatiButtonWidget`, `IatiHorizontalWidget` e `IatiVerticalWidget` están disponibles en `components/iati-widgets.tsx`.
- Los formatos horizontal y vertical comparten `id="mini-form-policy"`; nunca deben renderizarse juntos ni repetirse en una página.
- La landing utiliza el horizontal. El vertical queda preparado para una columna estrecha existente y no debe crear una sidebar nueva.
- Todos los enlaces propios y fallbacks conservan la URL oficial completa y se marcan como patrocinados.

## Publicidad

La integración de Google AdSense utiliza anuncios manuales y adaptables dentro del
contenido. El proyecto incluye los identificadores de Viajan2Juntos y permite
sobrescribirlos mediante estas variables:

- `NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED`: `false` para apagar todos los anuncios.
- `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT`: identificador con formato `ca-pub-0000000000000000`.
- `NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_CONTENT`: identificador numérico de la unidad de anuncio adaptable.

Al configurar el cliente se genera automáticamente `/ads.txt`. Antes de activar la
publicidad en producción debe publicarse desde AdSense un mensaje europeo mediante
una CMP certificada por Google. Para volver a una web sin anuncios basta con cambiar
`NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED` a `false` y desplegar de nuevo.
