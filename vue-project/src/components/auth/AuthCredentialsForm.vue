<template>
  <form class="auth-form" @submit.prevent="enviarFormulario">
    <label v-if="esRegistro">
      Nombre completo
      <input v-model.trim="form.nombre" type="text" autocomplete="name" required />
    </label>

    <label v-if="esRegistro">
      Usuario
      <input v-model.trim="form.usuario" type="text" autocomplete="username" required />
    </label>

    <label>
      {{ esRegistro ? 'Correo' : 'Correo o usuario' }}
      <input
        v-model.trim="form.identificador"
        :type="esRegistro ? 'email' : 'text'"
        :autocomplete="esRegistro ? 'email' : 'username'"
        required
      />
    </label>

    <label>
      Contrasena
      <input v-model="form.password" type="password" autocomplete="current-password" required minlength="6" />
    </label>

    <label v-if="esRegistro">
      Confirmar contrasena
      <input v-model="form.confirmPassword" type="password" autocomplete="new-password" required minlength="6" />
    </label>

    <p v-if="errorVisible" class="auth-form__error">{{ errorVisible }}</p>

    <button class="btn-primary auth-form__submit" type="submit" :disabled="cargando">
      {{ cargando ? 'Procesando...' : textoBoton }}
    </button>
  </form>
</template>

<script>
export default {
  name: 'AuthCredentialsForm',
  emits: ['submit'],
  props: {
    modo: {
      type: String,
      default: 'login',
      validator(value) {
        return ['login', 'registro'].includes(value);
      }
    },
    cargando: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      errorLocal: '',
      form: {
        nombre: '',
        usuario: '',
        identificador: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  computed: {
    esRegistro() {
      return this.modo === 'registro';
    },
    textoBoton() {
      return this.esRegistro ? 'Crear cuenta' : 'Ingresar';
    },
    errorVisible() {
      return this.errorLocal || this.error;
    }
  },
  methods: {
    enviarFormulario() {
      this.errorLocal = '';

      if (this.esRegistro && this.form.password !== this.form.confirmPassword) {
        this.errorLocal = 'Las contrasenas no coinciden';
        return;
      }

      if (this.esRegistro) {
        this.$emit('submit', {
          nombre: this.form.nombre,
          usuario: this.form.usuario,
          email: this.form.identificador,
          password: this.form.password
        });
        return;
      }

      this.$emit('submit', {
        identificador: this.form.identificador,
        password: this.form.password
      });
    }
  }
};
</script>
