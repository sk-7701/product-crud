
import { createRouter, createWebHistory } from 'vue-router';

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home.vue';


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
    path: '/',
    component: Home,
    name: 'home',
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) {
        next();
      } else {
        next({ name: 'login' });
      }
    }
  },

];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;
