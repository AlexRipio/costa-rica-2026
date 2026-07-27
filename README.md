# Costa Rica 2026

Mini-app responsive construida a partir del documento `viaje costa rica VF.docx`.

Incluye:

- Ruta interactiva de 17 días.
- Destinos, hoteles y actividades.
- Presupuesto editable con tres escenarios y gráficos.
- Checklists de reservas y maleta.
- Calendario del Mundial con horas de Costa Rica y España.
- Mapa Leaflet con OpenStreetMap.
- Fotos de Wikimedia Commons con atribución.
- Persistencia automática en `localStorage`.
- Importación, exportación y reseteo de los datos en JSON.

## Ejecutar en local

Requiere Node.js 20 o superior.

```bash
pnpm install
pnpm dev
```

La terminal mostrará la dirección local, normalmente `http://localhost:5173`.

## Compilar para producción

```bash
pnpm build
pnpm preview
```

La versión estática queda en `dist/` y puede publicarse en cualquier hosting estático.

## Datos

El contenido normalizado está en `src/data/tripData.ts` y las imágenes con su atribución en `src/data/images.ts`.

La web evita publicar los datos personales y localizadores privados visibles en las capturas del Word. La inconsistencia entre las fechas reservadas de Manuel Antonio/Puerto Viejo y la ruta escrita aparece como alerta para resolverla antes del viaje.
