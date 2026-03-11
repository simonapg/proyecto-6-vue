import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlaceDetailView from '../views/PlaceDetailView.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
