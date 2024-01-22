import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { firebase } from '@/api/firebase'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(firebase)
app.use(autoAnimatePlugin)

app.mount('#app')
