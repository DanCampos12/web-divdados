import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import authRoutes from '@/features/auth/routes'
import mainRoutes from '@/features/main/routes'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: { name: 'Main.Home' }
  },
  ...authRoutes,
  ...mainRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, _, next) => {
  window.document.title = to.meta?.title
    ? `${to.meta?.title}`
    : 'DivDados'
  next()
})

export default router
