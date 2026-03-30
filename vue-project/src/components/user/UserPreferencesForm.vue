<template>
  <section class="section section--compact">
    <header class="section__header">
      <div>
        <p class="section__kicker">Personalizacion</p>
        <h2 class="section__title">Preferencias de clima</h2>
      </div>
    </header>

    <article class="detail-card user-preferences">
      <form class="toolbar" @submit.prevent="guardar">
        <label>
          Unidad por defecto
          <select v-model="form.unidad">
            <option value="C">Celsius (C)</option>
            <option value="F">Fahrenheit (F)</option>
          </select>
        </label>

        <label>
          Tema visual
          <select v-model="form.tema">
            <option value="claro">Claro</option>
            <option value="oscuro">Oscuro (proximamente)</option>
          </select>
        </label>

        <button class="btn-primary" type="submit">Guardar preferencias</button>
      </form>
    </article>
  </section>
</template>

<script>
export default {
  name: 'UserPreferencesForm',
  emits: ['guardar'],
  props: {
    preferencias: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        unidad: this.preferencias?.unidad || 'C',
        tema: this.preferencias?.tema || 'claro'
      }
    };
  },
  watch: {
    preferencias: {
      deep: true,
      handler(valor) {
        this.form = {
          unidad: valor?.unidad || 'C',
          tema: valor?.tema || 'claro'
        };
      }
    }
  },
  methods: {
    guardar() {
      this.$emit('guardar', { ...this.form });
    }
  }
};
</script>
