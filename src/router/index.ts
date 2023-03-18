import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainComponent from '@/features/main/MainComponent.vue'
import authRoutes from '@/features/auth/routes'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: { name: 'Main' }
  },
  {
    path: '/main',
    name: 'Main',
    component: MainComponent,
    redirect: { name: 'Main.Auth' },
    children: [
      ...authRoutes
    ]
  }
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
