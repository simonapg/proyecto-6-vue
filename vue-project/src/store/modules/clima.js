import { obtenerLugarPorId, obtenerLugares } from '../../services/weatherService';

function estadoBase() {
  return {
    lugares: [],
    lugarDetalle: null,
    cargandoLugares: false,
    errorLugares: '',
    cargandoDetalle: false,
    errorDetalle: ''
  };
}

export default {
  namespaced: true,
  state: estadoBase,
  getters: {
    lugares: (state) => state.lugares,
    lugarDetalle: (state) => state.lugarDetalle,
    cargandoLugares: (state) => state.cargandoLugares,
    errorLugares: (state) => state.errorLugares,
    cargandoDetalle: (state) => state.cargandoDetalle,
    errorDetalle: (state) => state.errorDetalle
  },
  mutations: {
    SET_CARGANDO_LUGARES(state, valor) {
      state.cargandoLugares = valor;
    },
    SET_ERROR_LUGARES(state, mensaje) {
      state.errorLugares = mensaje;
    },
    SET_LUGARES(state, lugares) {
      state.lugares = lugares;
    },
    SET_CARGANDO_DETALLE(state, valor) {
      state.cargandoDetalle = valor;
    },
    SET_ERROR_DETALLE(state, mensaje) {
      state.errorDetalle = mensaje;
    },
    SET_LUGAR_DETALLE(state, lugar) {
      state.lugarDetalle = lugar;
    },
    LIMPIAR_DETALLE(state) {
      state.lugarDetalle = null;
      state.errorDetalle = '';
      state.cargandoDetalle = false;
    }
  },
  actions: {
    async cargarLugares({ commit }) {
      commit('SET_CARGANDO_LUGARES', true);
      commit('SET_ERROR_LUGARES', '');

      try {
        const lugares = await obtenerLugares();
        commit('SET_LUGARES', lugares);
      } catch (error) {
        commit('SET_LUGARES', []);
        commit('SET_ERROR_LUGARES', 'No se pudieron cargar los datos climaticos desde la API.');
      } finally {
        commit('SET_CARGANDO_LUGARES', false);
      }
    },
    async cargarLugarDetalle({ commit }, id) {
      commit('SET_CARGANDO_DETALLE', true);
      commit('SET_ERROR_DETALLE', '');

      try {
        const lugar = await obtenerLugarPorId(id);
        if (!lugar) {
          commit('SET_LUGAR_DETALLE', null);
          commit('SET_ERROR_DETALLE', 'Lugar no encontrado');
          return;
        }

        commit('SET_LUGAR_DETALLE', lugar);
      } catch (error) {
        commit('SET_LUGAR_DETALLE', null);
        commit('SET_ERROR_DETALLE', 'No se pudo cargar el clima del lugar desde la API.');
      } finally {
        commit('SET_CARGANDO_DETALLE', false);
      }
    },
    limpiarDetalle({ commit }) {
      commit('LIMPIAR_DETALLE');
    }
  }
};