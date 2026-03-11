<template>
  <article class="actual detail-card">
    <div class="detail-card__top">
      <h2 class="detail-card__title">Clima actual</h2>
      <span class="detail-card__chip">Actualizado</span>
    </div>
    <p class="detail-card__icon">{{ icono }}</p>
    <p class="temp detail-card__temp">{{ temperatura }}{{ unidad }}</p>
    <p class="detail-card__state">{{ lugar.estadoActual }}</p>
  </article>
</template>

<script>
export default {
  name: 'CurrentWeatherCard',
  props: {
    lugar: {
      type: Object,
      required: true
    },
    unidad: {
      type: String,
      required: true
    },
    temperatura: {
      type: String,
      required: true
    },
    icono: {
      type: String,
      required: true
    }
  }
};
</script>
