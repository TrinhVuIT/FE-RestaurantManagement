/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import LoginPage from './pages/Admin/login.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import loginPageRouter from './router/login/loginPage'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(Toast)

// Mount vue app
app.mount('#app')

const loginPage = createApp(LoginPage)
loginPage.use(vuetify)
loginPage.use(loginPageRouter)
loginPage.use(Toast)

loginPage.mount('#loginPage')
