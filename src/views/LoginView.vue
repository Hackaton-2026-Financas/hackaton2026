<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import Login from '@/components/Login.vue'

const definirLogado = inject('definirLogado')
const router = useRouter()

function aoLogar() {
  definirLogado(true)
  router.push('/dashBoard')
}
</script>

<template>
  <Login @login="aoLogar" />
</template>
