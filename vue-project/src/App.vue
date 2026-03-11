<template>
  <div class="layout">
    <header class="weather-navbar">
      <div class="weather-navbar__inner">
        <router-link to="/" class="weather-navbar__brand">
          <span class="weather-navbar__logo">CL</span>
          <span>Tiempo en chile</span>
        </router-link>
        <nav class="weather-navbar__links">
          <router-link to="/">Inicio</router-link>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <router-view />
    </main>

    <footer class="weather-footer">
      <div class="weather-footer__inner">
        <p class="weather-footer__text">Proyecto educativo SPA en Vue con rutas dinamicas, filtros reactivos, SASS modular y datos climaticos en tiempo real con Open-Meteo. Desarrollado por Simon Palacios.</p>
      </div>

    </footer>
  </div>
</template>
