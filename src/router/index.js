import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import MetaView from '@/views/MetaView.vue'
import SimuladorView from '@/views/SimuladorView.vue'
import ContasView from '@/views/ContasView.vue'
import RelatorioView from '@/views/RelatorioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    }, 
    {
      path: '/dashBoard',
      name: 'dashBoard',
      component: DashboardView,
    },
    {
      path: '/metas',
      name: 'metas',
      component: MetaView,
    },
    {
      path: '/simulador',
      name: 'simulador',
      component: SimuladorView,
    },
    {
      path: '/contas',
      name: 'contas',
      component: ContasView,
    },
    {
      path: '/relatorio',
      name: 'relatorio',
      component: RelatorioView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
