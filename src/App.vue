<script setup>
import { RouterView } from 'vue-router'
import { ref, provide, onMounted } from 'vue'
import Header from './components/layout/Header.vue';
import MenuView from './components/layout/MenuView.vue';
import FooterView from './components/layout/FooterView.vue';
import { estaLogado, usuarioAtual, restaurarSessao } from '@/store/auth'


const erroSessao = ref('')

function definirLogado(usuario) {
  usuarioAtual.value = usuario
}

provide('estaLogado', estaLogado)
provide('definirLogado', definirLogado)

onMounted(async () => {
  try {
    await restaurarSessao()
  } catch (error) {
    erroSessao.value = error.message
  }
})
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <Header />
      <MenuView />
    </aside>

    <main class="content-area">
      <p v-if="erroSessao" class="erro-sessao" role="alert">
        Não foi possível carregar seus dados: {{ erroSessao }}
      </p>
      <RouterView />
      <FooterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 240px; 
  flex-shrink: 0;
}

.content-area {
  flex-grow: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

<style>
.erro-sessao {
  margin: 72px 24px 0;
  padding: 12px 16px;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  background: #fef2f2;
  color: #991b1b;
}
</style>