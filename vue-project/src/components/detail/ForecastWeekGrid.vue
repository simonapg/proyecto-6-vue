<template>
  <section class="forecast">
    <h2 class="forecast__title">Pronostico de la semana</h2>
    <div class="forecast__grid">
      <article v-for="dia in pronostico" :key="dia.fechaIso" class="forecast__card forecast-card">
        <h3 class="forecast-card__day">{{ dia.dia }}</h3>
        <p class="forecast-card__date-text">{{ dia.fechaIso }}</p>
        <p class="forecast-card__icon">{{ dia.icono }}</p>
        <p class="forecast-card__temp">Min: {{ dia.minTexto }}{{ unidad }}</p>
        <p class="forecast-card__temp">Max: {{ dia.maxTexto }}{{ unidad }}</p>
        <p class="forecast-card__state">{{ dia.estado }}</p>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ForecastWeekGrid',
  props: {
    pronostico: {
      type: Array,
      required: true
    },
    unidad: {
      type: String,
      required: true
    }
  }
};
</script>
