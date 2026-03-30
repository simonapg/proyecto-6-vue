<template>
  <section class="section section--compact">
    <header class="section__header">
      <div>
        <p class="section__kicker">Personalizacion</p>
        <h2 class="section__title">Mis lugares favoritos</h2>
      </div>
    </header>

    <p v-if="!lugares.length" class="vacio">Aun no tienes lugares favoritos.</p>

    <div v-else class="favorites-grid">
      <article v-for="lugar in lugares" :key="lugar.id" class="detail-card favorites-card">
        <div class="favorites-card__top">
          <h3 class="favorites-card__name">{{ lugar.nombre }}</h3>
          <span class="favorites-card__state">{{ lugar.icono }} {{ lugar.estadoActual }}</span>
        </div>

        <p class="favorites-card__meta">{{ lugar.region }}</p>
        <p class="temp">{{ lugar.temperaturaTexto }}{{ unidad }}</p>

        <div class="favorites-card__actions">
          <button class="btn-outline-primary" type="button" @click="$emit('ver-detalle', lugar.id)">
            Ver detalle
          </button>
          <button class="btn-primary" type="button" @click="$emit('quitar-favorito', lugar.id)">
            Quitar
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserFavoritesSection',
  emits: ['ver-detalle', 'quitar-favorito'],
  props: {
    lugares: {
      type: Array,
      default: () => []
    },
    unidad: {
      type: String,
      required: true
    }
  }
};
</script>
