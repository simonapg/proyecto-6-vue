<template>
  <HomeHeroSection
    :destacado="destacado"
    :unidad="unidad"
    :temperatura-destacada="temperaturaDestacada"
  />

  <HomeToolbar
    v-model:busqueda="busqueda"
    v-model:unidad="unidad"
  />

  <section class="section">
    <header class="section__header">
      <div>
        <p class="section__kicker">Localidades</p>
        <h2 class="section__title">Clima actual en Chile</h2>
      </div>
    </header>

    <div class="listado">
      <HomeLocationCard
        v-for="lugar in lugaresFiltrados"
        :key="lugar.id"
        :lugar="lugar"
        :unidad="unidad"
        :temperatura="formatearTemp(lugar.tempActual)"
        :icono="obtenerIconoClima(lugar.estadoActual)"
        :puede-favorito="isAuthenticated"
        :is-favorite="esFavorito(lugar.id)"
        @ver-detalle="verDetalle"
        @toggle-favorito="toggleFavorito"
      />
    </div>
  </section>

  <p v-if="!cargando && lugaresFiltrados.length === 0" class="vacio">
    No se encontro ningun lugar con "{{ busqueda }}".
  </p>

  <p v-if="error" class="vacio">{{ error }}</p>

  <p v-if="cargando" class="vacio">Cargando lugares...</p>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { convertirTemperatura } from '../services/weatherService';
import HomeHeroSection from '../components/home/HomeHeroSection.vue';
import HomeLocationCard from '../components/home/HomeLocationCard.vue';
import HomeToolbar from '../components/home/HomeToolbar.vue';
import { obtenerIconoClima } from '../utils/weatherPresentation';

export default {
  name: 'HomeView',
  components: {
    HomeHeroSection,
    HomeLocationCard,
    HomeToolbar
  },
  data() {
    return {
      busqueda: '',
      unidad: 'C'
    };
  },
  computed: {
    ...mapState('clima', {
      lugares: (state) => state.lugares,
      cargando: (state) => state.cargandoLugares,
      error: (state) => state.errorLugares
    }),
    ...mapGetters('auth', ['isAuthenticated', 'preferencias', 'esFavorito']),
    temperaturaDestacada() {
      if (!this.destacado) return '--';
      return this.formatearTemp(this.destacado.tempActual);
    },
    destacado() {
      return this.lugaresFiltrados[0] || this.lugares[0] || null;
    },
    lugaresFiltrados() {
      const criterio = this.busqueda.trim().toLowerCase();
      if (!criterio) return this.lugares;

      return this.lugares.filter((lugar) => lugar.nombre.toLowerCase().includes(criterio));
    }
  },
  async created() {
    if (this.preferencias?.unidad) {
      this.unidad = this.preferencias.unidad;
    }

    await this.cargarLugares();
  },
  methods: {
    ...mapActions('clima', ['cargarLugares']),
    ...mapActions('auth', ['toggleFavorito']),
    verDetalle(id) {
      this.$router.push({ name: 'detalle-lugar', params: { id } });
    },
    obtenerIconoClima,
    formatearTemp(valor) {
      return convertirTemperatura(valor, this.unidad).toFixed(1);
    }
  },
  watch: {
    'preferencias.unidad'(valor) {
      if (valor) {
        this.unidad = valor;
      }
    }
  }
};
</script>
