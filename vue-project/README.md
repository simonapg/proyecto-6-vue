# ClimaMundo Chile - SPA Vue

Aplicacion de una sola pagina (SPA) desarrollada con Vue 3 + Vite para visualizar clima por localidades chilenas.

## Funcionalidades

- Home (`/`): lista de lugares con clima actual.
- Detalle (`/lugar/:id`): datos actuales, pronostico semanal y estadisticas.
- Navegacion interna sin recarga usando Vue Router.
- Interacciones con `v-model`:
  - busqueda de lugares por nombre,
  - selector de unidad de temperatura (C/F),
  - mostrar/ocultar estadisticas semanales.

## Estructura

- `src/App.vue`: layout raiz de la SPA.
- `src/router/index.js`: rutas `home` y `detalle-lugar`.
- `src/views/HomeView.vue`: vista principal con listado y busqueda.
- `src/views/PlaceDetailView.vue`: vista dinamica por lugar.
- `src/data/mockWeatherData.js`: datos climaticos mock.
- `src/services/weatherService.js`: acceso a datos y calculos de estadisticas/alertas.

## Como ejecutar

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```
