import {
  actualizarPreferencias,
  alternarFavorito,
  cerrarSesion,
  iniciarSesion,
  obtenerSesionActiva,
  registrarUsuario
} from '../../services/authService';

function estadoBase() {
  return {
    usuarioActual: null,
    isAuthenticated: false,
    cargando: false,
    errorAuth: ''
  };
}

export default {
  namespaced: true,
  state: estadoBase,
  getters: {
    usuarioActual: (state) => state.usuarioActual,
    isAuthenticated: (state) => state.isAuthenticated,
    nombreUsuario: (state) => state.usuarioActual?.nombre || '',
    preferencias: (state) => state.usuarioActual?.preferencias || { unidad: 'C', tema: 'claro' },
    favoritos: (state) => state.usuarioActual?.favoritos || [],
    esFavorito: (state) => (lugarId) => (state.usuarioActual?.favoritos || []).includes(Number(lugarId))
  },
  mutations: {
    SET_CARGANDO(state, valor) {
      state.cargando = valor;
    },
    SET_ERROR_AUTH(state, mensaje) {
      state.errorAuth = mensaje;
    },
    SET_USUARIO_AUTENTICADO(state, usuario) {
      state.usuarioActual = usuario;
      state.isAuthenticated = Boolean(usuario);
      state.errorAuth = '';
    },
    LIMPIAR_SESION(state) {
      const base = estadoBase();
      state.usuarioActual = base.usuarioActual;
      state.isAuthenticated = base.isAuthenticated;
      state.cargando = base.cargando;
      state.errorAuth = base.errorAuth;
    }
  },
  actions: {
    inicializarSesion({ commit }) {
      const usuario = obtenerSesionActiva();
      if (usuario) {
        commit('SET_USUARIO_AUTENTICADO', usuario);
      }
    },
    async login({ commit }, credenciales) {
      commit('SET_CARGANDO', true);
      commit('SET_ERROR_AUTH', '');
      try {
        const usuario = await iniciarSesion(credenciales);
        commit('SET_USUARIO_AUTENTICADO', usuario);
        return usuario;
      } catch (error) {
        commit('SET_ERROR_AUTH', error?.message || 'No se pudo iniciar sesion');
        throw error;
      } finally {
        commit('SET_CARGANDO', false);
      }
    },
    async register({ commit }, payload) {
      commit('SET_CARGANDO', true);
      commit('SET_ERROR_AUTH', '');
      try {
        const usuario = await registrarUsuario(payload);
        return usuario;
      } catch (error) {
        commit('SET_ERROR_AUTH', error?.message || 'No se pudo registrar el usuario');
        throw error;
      } finally {
        commit('SET_CARGANDO', false);
      }
    },
    async logout({ commit }) {
      commit('SET_CARGANDO', true);
      try {
        await cerrarSesion();
        commit('LIMPIAR_SESION');
      } finally {
        commit('SET_CARGANDO', false);
      }
    },
    async toggleFavorito({ commit, state }, lugarId) {
      if (!state.usuarioActual) return;
      const usuarioActualizado = await alternarFavorito(state.usuarioActual.id, lugarId);
      commit('SET_USUARIO_AUTENTICADO', usuarioActualizado);
    },
    async guardarPreferencias({ commit, state }, preferencias) {
      if (!state.usuarioActual) return;
      const usuarioActualizado = await actualizarPreferencias(state.usuarioActual.id, preferencias);
      commit('SET_USUARIO_AUTENTICADO', usuarioActualizado);
    }
  }
};
