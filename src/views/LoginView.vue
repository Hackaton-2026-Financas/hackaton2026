<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import TelaDeEntrada from '@/components/Login.vue'
import { iniciarSessao } from '@/store/sessao'

const router = useRouter()

async function aoLogar(usuario) {
  try {
    await iniciarSessao(usuario)
    await router.push('/dashBoard')
  } catch (erro) {
    window.alert(`Não foi possível carregar seus dados financeiros: ${erro.message}`)
  }
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
  <TelaDeEntrada @entrar="aoLogar" />
</template>

<style>
/* sem "scoped" de propósito, pra conseguir mirar no #app */
#app.full-page {
  max-width: none;
  padding: 0;
  display: block;
}
</style>
