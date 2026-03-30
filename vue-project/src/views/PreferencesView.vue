<template>
  <UserPreferencesForm :preferencias="preferencias" @guardar="guardar" />
  <p v-if="mensaje" class="vacio">{{ mensaje }}</p>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserPreferencesForm from '../components/user/UserPreferencesForm.vue';

export default {
  name: 'PreferencesView',
  components: {
    UserPreferencesForm
  },
  data() {
    return {
      mensaje: ''
    };
  },
  computed: {
    ...mapGetters('auth', ['preferencias'])
  },
  methods: {
    ...mapActions('auth', ['guardarPreferencias']),
    async guardar(preferencias) {
      await this.guardarPreferencias(preferencias);
      this.mensaje = 'Preferencias actualizadas correctamente.';
    }
  }
};
</script>
