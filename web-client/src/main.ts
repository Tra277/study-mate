import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// Import stores để khởi tạo
import { useAppStore } from './stores/app'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

// Khởi tạo theme sau khi mount
app.mount('#app')

// Initialize app theme
const appStore = useAppStore()
appStore.initializeTheme()
