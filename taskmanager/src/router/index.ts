import { createRouter, createWebHistory } from '@ionic/vue-router'
import { useUserStore } from '@/store/state'
import { pinia } from '@/store/pinia' // ✅ pinia déplacé ici sans boucle

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Tabs from '@/views/Tabs.vue'
import MesTaches from '@/views/MesTaches.vue'
import AutresTaches from '@/views/AutresTaches.vue'
import Archives from '@/views/Archives.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/tabs',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/mes-taches',
      },
      {
        path: 'mes-taches',
        component: MesTaches,
      },
      {
        path: 'autres',
        component: AutresTaches,
      },
      {
        path: 'archives',
        component: Archives,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ✅ Restaurer user avant navigation
const store = useUserStore(pinia)
store.restoreUserFromStorage()

// ✅ Guard de navigation
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !store.isAuthenticated()) {
    return next('/login')
  }

  next()
})

export default router
