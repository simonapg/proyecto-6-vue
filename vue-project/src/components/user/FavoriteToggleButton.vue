<template>
  <button
    type="button"
    class="favorite-toggle"
    :class="{ 'favorite-toggle--active': isFavorite }"
    :disabled="disabled"
    @click="$emit('toggle')"
  >
    <span class="favorite-toggle__icon" aria-hidden="true">{{ isFavorite ? '★' : '☆' }}</span>
    <span>{{ isFavorite ? textoQuitar : textoAgregar }}</span>
  </button>
</template>

<script>
export default {
  name: 'FavoriteToggleButton',
  emits: ['toggle'],
  props: {
    isFavorite: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    textoAgregar: {
      type: String,
      default: 'Agregar a favoritos'
    },
    textoQuitar: {
      type: String,
      default: 'Quitar de favoritos'
    }
  }
};
</script>
