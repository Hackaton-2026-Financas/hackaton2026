<script setup>
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
import MenuView from './components/layout/MenuView.vue'
import FooterView from './components/layout/FooterView.vue'
import { erroPersistencia } from '@/store/dadosFinanceiros'

</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <Header />
      <MenuView />
    </aside>

    <main class="content-area">
      <p v-if="erroPersistencia" class="erro-persistencia" role="alert">
        Não foi possível carregar/salvar seus dados: {{ erroPersistencia }}
      </p>
      <RouterView />
      <FooterView />
    </main>
  </div>
</template>

<style scoped>
.erro-persistencia {
  margin: 72px 16px 0;
  color: #b42318;
}

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