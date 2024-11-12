
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
    meta: { requiresAuth: true },
  },

];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

router.beforeEach((to, from, next) => {
  
  const requiresAuth = to.meta.requiresAuth;

  
  const token = localStorage.getItem('token');
  
  if (requiresAuth && !token) {
    return next({ name: 'login' }); 
  }

  next();
});


export default router;
