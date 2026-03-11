<template>
  <form class="toolbar" @submit.prevent>
    <label>
      Buscar lugar
      <input v-model="busquedaModel" type="text" placeholder="Ejemplo: Santiago" />
    </label>

    <label>
      Unidad
      <select v-model="unidadModel">
        <option value="C">Celsius (C)</option>
        <option value="F">Fahrenheit (F)</option>
      </select>
    </label>
  </form>
</template>

<script>
export default {
  name: 'HomeToolbar',
  emits: ['update:busqueda', 'update:unidad'],
  props: {
    busqueda: {
      type: String,
      required: true
    },
    unidad: {
      type: String,
      required: true
    }
  },
  computed: {
    busquedaModel: {
      get() {
        return this.busqueda;
      },
      set(value) {
        this.$emit('update:busqueda', value);
      }
    },
    unidadModel: {
      get() {
        return this.unidad;
      },
      set(value) {
        this.$emit('update:unidad', value);
      }
    }
  }
};
</script>
