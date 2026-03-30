<template>
  <section class="auth-page">
    <article class="auth-card">
      <header class="auth-card__header">
        <p class="auth-card__kicker">Cuenta de usuario</p>
        <h1 class="auth-card__title">{{ titulo }}</h1>
        <p class="auth-card__subtitle">{{ subtitulo }}</p>
      </header>

      <slot />

      <footer class="auth-card__footer">
        <slot name="footer" />
      </footer>
    </article>
  </section>
</template>

<script>
export default {
  name: 'AuthLayoutCard',
  props: {
    titulo: {
      type: String,
      required: true
    },
    subtitulo: {
      type: String,
      required: true
    }
  }
};
</script>
