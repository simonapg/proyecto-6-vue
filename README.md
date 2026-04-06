# Tiempo en Chile

Aplicacion SPA desarrollada con Vue 3, Vue Router, Vuex y SASS para consultar el clima de distintas localidades de Chile.

La app muestra un listado principal con datos actuales, permite filtrar lugares de forma reactiva y navegar a una vista de detalle con pronostico semanal, estadisticas y cambio inmediato de unidad de temperatura. La informacion meteorologica se obtiene desde la API de Open-Meteo.

## Funcionalidades

- Clima en tiempo real para localidades de Chile (Open-Meteo).
- Autenticacion basica con login y registro simulados.
- Estado global con Vuex para sesion, favoritos y preferencias de usuario.
- Rutas protegidas para secciones privadas.
- Personalizacion por usuario:
  - Favoritos.
  - Preferencias de unidad (C/F).

## Tecnologias

- Vue 3
- Vue Router
- Vuex 4
- Vite
- SASS
- Open-Meteo API

## Enlaces

- Repositorio publico: https://github.com/simonapg/proyecto-6-vue
- Deploy (Vercel): https://proyecto-6-vue.vercel.app/

## Rutas principales

- /: Home publica
- /lugar/:id: Detalle de lugar
- /login: Inicio de sesion
- /registro: Alta de usuario simulada
- /favoritos: Ruta protegida
- /preferencias: Ruta protegida

## Credenciales demo

- Usuario: simonp
- Correo: simon@clima.app
- Contrasena: 123456

Tambien puedes crear nuevos usuarios desde /registro.

## Ejecucion

### Requisitos

- Node.js 20.19.0 o superior
- npm (incluido con Node.js)

### Configuracion de variables

- Esta app usa Open-Meteo y no requiere API key.
- No es necesario crear archivo .env para la ejecucion local actual.

```sh
cd vue-project
npm install
npm run dev
```

## Build

```sh
cd vue-project
npm run build
```

Desarrollado por Simon Palacios.
