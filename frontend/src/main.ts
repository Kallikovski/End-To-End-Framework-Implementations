import { createApp } from 'vue'
import './style.css'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons/iconfont/material-icons.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
