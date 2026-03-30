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
          <router-link v-if="isAuthenticated" to="/favoritos">Favoritos</router-link>
          <router-link v-if="isAuthenticated" to="/preferencias">Preferencias</router-link>
          <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
          <router-link v-if="!isAuthenticated" to="/registro">Registro</router-link>
        </nav>

        <div v-if="isAuthenticated" class="weather-navbar__session">
          <span class="weather-navbar__user">Hola, {{ nombreUsuario }}</span>
          <button class="btn-outline-primary weather-navbar__logout" type="button" @click="handleLogout">
            Cerrar sesion
          </button>
        </div>
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

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'nombreUsuario'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
      await this.logout();
      this.$router.push('/login');
    }
  }
};
</script>
