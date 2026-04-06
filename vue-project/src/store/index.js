import { createStore } from 'vuex';
import auth from './modules/auth';
import clima from './modules/clima';

const store = createStore({
  modules: {
    auth,
    clima
  }
});

export default store;
