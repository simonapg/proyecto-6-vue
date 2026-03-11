<template>
  <section class="stats">
    <h2 class="forecast__title">Estadisticas de la semana</h2>
    <div class="stats__quick">
      <div><p><strong>Minima semanal</strong></p><p>{{ minimaTexto }}{{ unidad }}</p></div>
      <div><p><strong>Maxima semanal</strong></p><p>{{ maximaTexto }}{{ unidad }}</p></div>
      <div><p><strong>Promedio semanal</strong></p><p>{{ promedioTexto }}{{ unidad }}</p></div>
    </div>

    <div class="stats__resume">{{ estadisticas.resumen }}</div>

    <h3>Cantidad de dias por tipo de clima</h3>
    <ul class="list-group">
      <li v-for="(cantidad, estado) in estadisticas.conteoPorEstado" :key="estado">
        <span>{{ estado }}</span><strong>{{ cantidad }} dia(s)</strong>
      </li>
    </ul>

    <h3>Alertas de clima</h3>
    <ul class="list-group">
      <li v-for="alerta in alertas" :key="alerta">{{ alerta }}</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'WeeklyStatsPanel',
  props: {
    estadisticas: {
      type: Object,
      required: true
    },
    alertas: {
      type: Array,
      required: true
    },
    minimaTexto: {
      type: String,
      required: true
    },
    maximaTexto: {
      type: String,
      required: true
    },
    promedioTexto: {
      type: String,
      required: true
    },
    unidad: {
      type: String,
      required: true
    }
  }
};
</script>
