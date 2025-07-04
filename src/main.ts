import App from './App.vue';
import router from './router';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'bootstrap/dist/css/bootstrap.min.css'       // Bootstrap Css
import 'bootstrap-icons/font/bootstrap-icons.css'   // Bootstrap Icon
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap Js


const app = createApp(App)

app.use(createPinia());
app.use(router);
app.mount('#app');
