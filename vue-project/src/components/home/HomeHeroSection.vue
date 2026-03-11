<template>
  <section class="hero">
    <div class="hero__content">
      <div>
        <p class="hero__kicker">Datos locales, diseno claro</p>
        <h1 class="hero__title">Clima de Chile en tiempo real</h1>
        <p class="hero__subtitle">
          Explora las principales localidades chilenas. Revisa el estado actual y navega al detalle para consultar el pronostico semanal.
        </p>
      </div>

      <aside class="hero__panel">
        <h2 class="hero__panel-title">Condicion destacada</h2>
        <p class="hero__panel-location">{{ destacado ? `${destacado.nombre}, CL` : 'Sin datos' }}</p>
        <p class="hero__panel-date">{{ destacado?.pronosticoSemanal?.[0]?.fechaIso || 'Fecha no disponible' }}</p>
        <div class="hero__panel-main">
          <p class="hero__panel-temp">{{ destacado ? `${temperaturaDestacada}${unidad}` : '--' }}</p>
          <p class="hero__panel-state">{{ destacado?.estadoActual || 'No disponible' }}</p>
        </div>
        <div class="hero__panel-meta">
          <span class="hero__panel-chip">{{ destacado ? `Humedad ${destacado.humedad}%` : 'Humedad --' }}</span>
          <span class="hero__panel-chip">{{ destacado ? `Viento ${destacado.viento} km/h` : 'Viento --' }}</span>
        </div>
      </aside>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeHeroSection',
  props: {
    destacado: {
      type: Object,
      default: null
    },
    unidad: {
      type: String,
      required: true
    },
    temperaturaDestacada: {
      type: String,
      default: '--'
    }
  }
};
</script>
