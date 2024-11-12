import './bootstrap'; 
import { createApp, markRaw } from 'vue';
import App from './App.vue'; 
import router from './routes'
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
const app = createApp(App);
const pinia = createPinia();
pinia.use(({store}) =>
{
    store.router = markRaw(router)
})
app.use(pinia);
app.use(router);    
app.use(Toast, {
    position: 'top-right',  
    timeout: 5000,
  });
app.mount('#app'); 
