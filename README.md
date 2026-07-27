# Viajan2Juntos

Blog personal de viajes de Andrea y Alejandro. La portada reúne todas las aventuras y cada viaje tiene su propia página editorial.

## Estructura

- `/`: portada de Viajan2Juntos.
- `/viajes`: archivo de viajes.
- `/viajes/costa-rica-2026`: itinerario público y visual de Costa Rica.
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
