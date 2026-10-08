
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MetaView from '@/views/MetaView.vue' 
import DashboardView from '@/views/DashboardView.vue'
import ContasView from '@/views/ContasView.vue'
import RelatorioView from '@/views/RelatorioView.vue'
import GlossarioView from '@/views/GlossarioView.vue'
import TrilhaView from '@/views/TrilhaView.vue'
import { estaLogado } from '@/store/auth'

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
      meta: { requiresAuth: true },
    },
    {
      path: '/metas',
      name: 'metas',
      component: MetaView,
      meta: { requiresAuth: true },
    },
    {
      path: '/contas',
      name: 'contas',
      component: ContasView,
      meta: { requiresAuth: true },
    },
    {
      path: '/relatorio',
      name: 'relatorio',
      component: RelatorioView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/meta',
      name: 'meta',
      component: MetaView,
      meta: { requiresAuth: true },
    },
    {
      path: '/trilha',
      name: 'trilha',
      component: TrilhaView,
    },
    {
      path: '/glossario',
      name: 'glossario',
      component: GlossarioView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    }
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !estaLogado.value) return { name: 'login' }
  if (to.name === 'login' && estaLogado.value) return { name: 'dashBoard' }
})

export default router