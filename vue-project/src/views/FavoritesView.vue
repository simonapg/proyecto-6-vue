<template>
  <UserFavoritesSection
    :lugares="favoritosRender"
    :unidad="unidad"
    @ver-detalle="verDetalle"
    @quitar-favorito="quitarFavorito"
  />

  <p v-if="error" class="vacio">{{ error }}</p>
  <p v-if="cargando" class="vacio">Cargando favoritos...</p>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { convertirTemperatura } from '../services/weatherService';
import { obtenerIconoClima } from '../utils/weatherPresentation';
import UserFavoritesSection from '../components/user/UserFavoritesSection.vue';

export default {
  name: 'FavoritesView',
  components: {
    UserFavoritesSection
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('clima', {
      lugares: (state) => state.lugares,
      cargando: (state) => state.cargandoLugares,
      error: (state) => state.errorLugares
    }),
    ...mapGetters('auth', ['favoritos', 'preferencias']),
    unidad() {
      return this.preferencias?.unidad || 'C';
    },
    favoritosRender() {
      const ids = new Set((this.favoritos || []).map((id) => Number(id)));
      return this.lugares
        .filter((lugar) => ids.has(lugar.id))
        .map((lugar) => ({
          ...lugar,
          icono: obtenerIconoClima(lugar.estadoActual),
          temperaturaTexto: convertirTemperatura(lugar.tempActual, this.unidad).toFixed(1)
        }));
    }
  },
  async created() {
    if (!this.lugares.length) {
      await this.cargarLugares();
    }
  },
  methods: {
    ...mapActions('clima', ['cargarLugares']),
    ...mapActions('auth', ['toggleFavorito']),
    verDetalle(id) {
      this.$router.push({ name: 'detalle-lugar', params: { id } });
    },
    async quitarFavorito(id) {
      await this.toggleFavorito(id);
    }
  }
};
</script>
