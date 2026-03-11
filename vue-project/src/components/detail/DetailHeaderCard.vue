<template>
  <header class="detail-header">
    <p class="detail-header__eyebrow">Clima actual</p>
    <h1 class="detail-header__title">{{ lugar.nombre }}</h1>
    <p class="detail-header__subtitle">{{ lugar.region }} · {{ lugar.pronosticoSemanal?.[0]?.fechaIso || '' }}</p>
    <router-link class="link" to="/">Volver al Home</router-link>
  </header>
</template>

<script>
export default {
  name: 'DetailHeaderCard',
  props: {
    lugar: {
      type: Object,
      required: true
    }
  }
};
</script>
