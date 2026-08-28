<script setup>
import { RouterView } from 'vue-router'
import { ref, provide } from 'vue'
import Header from './components/layout/Header.vue';
import MenuView from './components/layout/MenuView.vue';


const estaLogado = ref(false)

function definirLogado(valor) {
  estaLogado.value = valor
}

provide('estaLogado', estaLogado)
provide('definirLogado', definirLogado)

//tenho q me lembrar de repassar isso pro pessoal nao surtar
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <Header />
      <MenuView />
    </aside>

    <main class="content-area">
      <RouterView />
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
}
</style>