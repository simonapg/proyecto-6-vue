<template>
  <article class="card location-card">
    <div class="location-card__icon">{{ icono }}</div>
    <div class="card__head">
      <h2 class="location-card__name">{{ lugar.nombre }}</h2>
      <span class="location-card__country">{{ lugar.region }}</span>
    </div>

    <div class="location-card__date-block">
      <p class="location-card__date-label">Hoy</p>
      <p class="location-card__date">{{ lugar.pronosticoSemanal?.[0]?.fechaIso || '' }}</p>
    </div>

    <p class="temp location-card__temp">{{ temperatura }}{{ unidad }}</p>
    <p class="estado location-card__state">{{ lugar.estadoActual }}</p>
    <p>Humedad: {{ lugar.humedad }}%</p>
    <p>Viento: {{ lugar.viento }} km/h</p>

    <button class="btn-outline-primary" @click="$emit('ver-detalle', lugar.id)">Ver detalle</button>
  </article>
</template>

<script>
export default {
  name: 'HomeLocationCard',
  emits: ['ver-detalle'],
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
