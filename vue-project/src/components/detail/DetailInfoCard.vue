<template>
  <article class="detail-card">
    <h2 class="detail-card__title">Detalles</h2>
    <ul class="list-group">
      <li class="list-group-item"><strong>Temperatura</strong><span>{{ temperatura }}{{ unidad }}</span></li>
      <li class="list-group-item"><strong>Humedad</strong><span>{{ lugar.humedad }}%</span></li>
      <li class="list-group-item"><strong>Viento</strong><span>{{ lugar.viento }} km/h</span></li>
      <li class="list-group-item"><strong>Coordenadas</strong><span>{{ lugar.latitud }}, {{ lugar.longitud }}</span></li>
    </ul>
    <label>
      Unidad de temperatura
      <select :value="unidad" @change="$emit('update:unidad', $event.target.value)">
        <option value="C">Celsius (C)</option>
        <option value="F">Fahrenheit (F)</option>
      </select>
    </label>
  </article>
</template>

<script>
export default {
  name: 'DetailInfoCard',
  emits: ['update:unidad'],
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
    }
  }
};
</script>
