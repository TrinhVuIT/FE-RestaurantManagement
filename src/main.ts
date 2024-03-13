/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import Toast from "vue-toastification";
import mitt from 'mitt'
import CKEditor from '@ckeditor/ckeditor5-vue';
import "vue-toastification/dist/index.css";
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

loadFonts()

const emitter = mitt()
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Create vue app
const app = createApp(App)

app.config.globalProperties.emitter = emitter
// Use plugins
app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(Toast)
app.use(CKEditor)
app.use(layoutsPlugin)
app.use(PerfectScrollbar)

// Mount vue app
app.mount('#app')
