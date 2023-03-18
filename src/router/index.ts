import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainComponent from '@/features/main/MainComponent.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: { name: 'Main' }
  },
  {
    path: '/main',
    name: 'Main',
    component: MainComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
