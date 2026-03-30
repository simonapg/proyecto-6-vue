<template>
  <AuthLayoutCard
    titulo="Iniciar sesion"
    subtitulo="Accede para guardar favoritos y personalizar la experiencia de clima."
  >
    <AuthCredentialsForm
      modo="login"
      :cargando="cargando"
      :error="errorAuth"
      @submit="handleLogin"
    />

    <template #footer>
      <p>
        No tienes cuenta?
        <router-link class="link" to="/registro">Registrate aqui</router-link>
      </p>
    </template>
  </AuthLayoutCard>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AuthLayoutCard from '../components/auth/AuthLayoutCard.vue';
import AuthCredentialsForm from '../components/auth/AuthCredentialsForm.vue';

export default {
  name: 'LoginView',
  components: {
    AuthLayoutCard,
    AuthCredentialsForm
  },
  computed: {
    ...mapState('auth', ['cargando', 'errorAuth'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    async handleLogin(credenciales) {
      try {
        await this.login(credenciales);
        const destino = this.$route.query.redirect || '/';
        this.$router.push(destino);
      } catch (error) {
        // El mensaje lo maneja el store en errorAuth.
      }
    }
  }
};
</script>
