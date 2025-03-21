import './assets/css/main.css'

import { createApp } from 'vue'
import {createPinia} from "pinia";

import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)
app
    .use(createPinia())
    .use(router)
    .mount('#app')