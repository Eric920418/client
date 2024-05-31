import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap';
import axios from 'axios'
import VueCookies from 'vue-cookies'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';


const app = createApp(App)


if (window.VueAdvancedChat) {
    app.component('VueAdvancedChat', window.VueAdvancedChat);
}
app.config.globalProperties.$axios = axios.create({
    baseURL: "http://140.138.147.12:3000"
})


app.use(VueCookies, { expire: '1d'})
app.use(VueSweetalert2)
app.use(router)

app.mount('#app')