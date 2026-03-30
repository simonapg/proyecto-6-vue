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
import { mapActions, mapGetters } from 'vuex';
import { convertirTemperatura, obtenerLugares } from '../services/weatherService';
import { obtenerIconoClima } from '../utils/weatherPresentation';
import UserFavoritesSection from '../components/user/UserFavoritesSection.vue';

export default {
  name: 'FavoritesView',
  components: {
    UserFavoritesSection
  },
  data() {
    return {
      lugares: [],
      cargando: true,
      error: ''
    };
  },
  computed: {
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
    this.cargando = true;
    this.error = '';
    try {
      this.lugares = await obtenerLugares();
    } catch (error) {
      this.error = 'No se pudieron cargar los favoritos desde la API de clima.';
      this.lugares = [];
    } finally {
      this.cargando = false;
    }
  },
  methods: {
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
