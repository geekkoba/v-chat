/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import store from '@/store/auth'
import ChatBoardView from '@/pages/ChatBoardView.vue'
import LoginView from '@/pages/auth/LoginView.vue'
import RegisterView from '@/pages/auth/RegisterView.vue'

const routes = [
  { path: '/', component: ChatBoardView },
  { path: '/auth/login', component: LoginView },
  { path: '/auth/register', component: RegisterView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (!store.state.isLoggedIn) {
    await store.dispatch('checkSession');
  }

  if (to.path === '/dashboard' && !store.state.isLoggedIn) {
    next('/login');
  } else if (to.path === '/login' && store.state.isLoggedIn) {
    next('/dashboard');
  } else {
    next();
  }
})
// Workaround for https://github.com/vitejs/vite/issues/11804\
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
