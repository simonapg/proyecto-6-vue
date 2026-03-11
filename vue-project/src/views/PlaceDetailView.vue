<template>
  <section v-if="cargando" class="vacio">
    <h1>Cargando lugar...</h1>
  </section>

  <section v-else-if="error" class="vacio">
    <h1>{{ error }}</h1>
    <router-link class="link" to="/">Volver al Home</router-link>
  </section>

  <section v-else-if="lugar" class="detalle">
    <DetailHeaderCard :lugar="lugar" />

    <section class="detail-grid">
      <CurrentWeatherCard
        :lugar="lugar"
        :unidad="unidad"
        :temperatura="temperaturaActualTexto"
        :icono="obtenerIconoClima(lugar.estadoActual)"
      />

      <DetailInfoCard
        :lugar="lugar"
        :unidad="unidad"
        :temperatura="temperaturaActualTexto"
        @update:unidad="unidad = $event"
      />
    </section>

    <ForecastWeekGrid :pronostico="pronosticoRender" :unidad="unidad" />

    <WeeklyStatsPanel
      :estadisticas="estadisticas"
      :alertas="alertas"
      :minima-texto="minimaSemanaTexto"
      :maxima-texto="maximaSemanaTexto"
      :promedio-texto="promedioSemanaTexto"
      :unidad="unidad"
    />
  </section>

  <section v-else class="vacio">
    <h1>Lugar no encontrado</h1>
    <router-link class="link" to="/">Volver al Home</router-link>
  </section>
</template>

<script>
import {
  calcularEstadisticasSemana,
  convertirTemperatura,
  generarAlertas,
  obtenerLugarPorId
} from '../services/weatherService';
import CurrentWeatherCard from '../components/detail/CurrentWeatherCard.vue';
import DetailHeaderCard from '../components/detail/DetailHeaderCard.vue';
import DetailInfoCard from '../components/detail/DetailInfoCard.vue';
import ForecastWeekGrid from '../components/detail/ForecastWeekGrid.vue';
import WeeklyStatsPanel from '../components/detail/WeeklyStatsPanel.vue';
import { obtenerIconoClima } from '../utils/weatherPresentation';

export default {
  name: 'PlaceDetailView',
  components: {
    CurrentWeatherCard,
    DetailHeaderCard,
    DetailInfoCard,
    ForecastWeekGrid,
    WeeklyStatsPanel
  },
  data() {
    return {
      lugar: null,
      unidad: 'C',
      cargando: true,
      error: ''
    };
  },
  computed: {
    temperaturaActualTexto() {
      if (!this.lugar) return '0.0';
      return this.formatearTemp(this.lugar.tempActual);
    },
    minimaSemanaTexto() {
      if (this.estadisticas.minSemana === null) return '0.0';
      return this.formatearTemp(this.estadisticas.minSemana);
    },
    maximaSemanaTexto() {
      if (this.estadisticas.maxSemana === null) return '0.0';
      return this.formatearTemp(this.estadisticas.maxSemana);
    },
    promedioSemanaTexto() {
      if (this.estadisticas.promedioSemana === null) return '0.0';
      return this.formatearTemp(this.estadisticas.promedioSemana);
    },
    pronosticoRender() {
      if (!this.lugar) return [];

      return this.lugar.pronosticoSemanal.map((dia) => ({
        ...dia,
        icono: obtenerIconoClima(dia.estado),
        minTexto: this.formatearTemp(dia.min),
        maxTexto: this.formatearTemp(dia.max)
      }));
    },
    estadisticas() {
      if (!this.lugar) {
        return {
          minSemana: 0,
          maxSemana: 0,
          promedioSemana: 0,
          conteoPorEstado: {},
          resumen: ''
        };
      }
      return calcularEstadisticasSemana(this.lugar.pronosticoSemanal);
    },
    alertas() {
      if (!this.lugar) return [];
      return generarAlertas(this.estadisticas, this.lugar.pronosticoSemanal);
    }
  },
  async created() {
    await this.cargarLugar();
  },
  watch: {
    async '$route.params.id'() {
      await this.cargarLugar();
    }
  },
  methods: {
    async cargarLugar() {
      this.cargando = true;
      this.error = '';

      try {
        this.lugar = await obtenerLugarPorId(this.$route.params.id);
        if (!this.lugar) {
          this.error = 'Lugar no encontrado';
        }
      } catch (error) {
        this.lugar = null;
        this.error = 'No se pudo cargar el clima del lugar desde la API.';
      } finally {
        this.cargando = false;
      }
    },
    obtenerIconoClima,
    formatearTemp(valor) {
      return convertirTemperatura(valor, this.unidad).toFixed(1);
    }
  }
};
</script>
