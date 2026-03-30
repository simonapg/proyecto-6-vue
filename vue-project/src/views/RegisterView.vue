<template>
  <AuthLayoutCard
    titulo="Crear cuenta"
    subtitulo="Registra un usuario para guardar preferencias y armar tu lista de lugares favoritos."
  >
    <AuthCredentialsForm
      modo="registro"
      :cargando="cargando"
      :error="errorAuth"
      @submit="handleRegister"
    />

    <template #footer>
      <p>
        Ya tienes cuenta?
        <router-link class="link" to="/login">Inicia sesion</router-link>
      </p>
    </template>
  </AuthLayoutCard>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AuthLayoutCard from '../components/auth/AuthLayoutCard.vue';
import AuthCredentialsForm from '../components/auth/AuthCredentialsForm.vue';

export default {
  name: 'RegisterView',
  components: {
    AuthLayoutCard,
    AuthCredentialsForm
  },
  computed: {
    ...mapState('auth', ['cargando', 'errorAuth'])
  },
  methods: {
    ...mapActions('auth', ['register', 'login']),
    async handleRegister(payload) {
      try {
        await this.register(payload);
        await this.login({
          identificador: payload.email,
          password: payload.password
        });
        this.$router.push('/');
      } catch (error) {
        // El mensaje se refleja desde el store en errorAuth.
      }
    }
  }
};
</script>
