import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlaceDetailView from '../views/PlaceDetailView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import FavoritesView from '../views/FavoritesView.vue';
import PreferencesView from '../views/PreferencesView.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/lugar/:id',
    name: 'detalle-lugar',
    component: PlaceDetailView,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegisterView,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: FavoritesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/preferencias',
    name: 'preferencias',
    component: PreferencesView,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    };
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return {
      name: 'home'
    };
  }

  return true;
});

export default router;
