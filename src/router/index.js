
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MetaView from '@/views/MetaView.vue' 
import DashboardView from '@/views/DashboardView.vue'
import ContasView from '@/views/ContasView.vue'
import RelatorioView from '@/views/RelatorioView.vue'
import GlossarioView from '@/views/GlossarioView.vue'
import TrilhaView from '@/views/TrilhaView.vue'
import UsuariosView from '@/views/UsuariosView.vue'
import { inicializarSessao, usuarioAtual } from '@/store/sessao'

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
      meta: { requerLogin: true },
    },
    {
      path: '/metas',
      name: 'metas',
      component: MetaView,
      meta: { requerLogin: true },
    },
    {
      path: '/contas',
      name: 'contas',
      component: ContasView,
      meta: { requerLogin: true },
    },
    {
      path: '/relatorio',
      name: 'relatorio',
      component: RelatorioView,
      meta: { requerLogin: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosView,
      meta: { requerAdmin: true },
    },
    {
      path: '/meta',
      name: 'meta',
      component: MetaView,
      meta: { requerLogin: true },
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

router.beforeEach(async (to) => {
  if (usuarioAtual.value) {
    try {
      await inicializarSessao()
    } catch {
      if (to.meta.requerLogin || to.meta.requerAdmin) {
        return { name: 'home' }
      }
    }
  }

  if ((to.meta.requerLogin || to.meta.requerAdmin) && !usuarioAtual.value) {
    return { name: 'login' }
  }

  if (to.meta.requerAdmin && !usuarioAtual.value?.administrador) {
    return { name: 'dashBoard' }
  }

  if (to.name === 'login' && usuarioAtual.value) {
    return { name: 'dashBoard' }
  }

  return true
})

export default router