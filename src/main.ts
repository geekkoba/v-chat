/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import store from './store/auth'
// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

store.dispatch('checkSession').then(()=> {
    app.mount('#app')
})

