<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Login from '@/components/Login.vue'

const definirLogado = inject('definirLogado')
const router = useRouter()

function aoLogar() {
  definirLogado(true)
  router.push('/dashBoard')
}

// adiciona a classe só enquanto essa tela existir
onMounted(() => {
  document.getElementById('app').classList.add('full-page')
})

onUnmounted(() => {
  document.getElementById('app').classList.remove('full-page')
})
</script>

<template>
  <Login @login="aoLogar" />
</template>

<style>
/* sem "scoped" de propósito, pra conseguir mirar no #app */
#app.full-page {
  max-width: none;
  padding: 0;
  display: block;
}
</style>