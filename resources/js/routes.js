
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

const routes = [


  {
    path: '/login',
    component: Login,
    name: 'login',
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
  },

  {
    path: '/home',
    component: Home,
    name: 'home',
  },

];

const router = createRouter({
  history: createWebHistory('/product-crud/'),
  routes,
});

export default router;
