import { ref, computed } from 'vue'


export const contas = ref([])

export const quantidadeNaoPagas = computed(() => {
  return contas.value.filter(conta => conta.status !== 'paga').length
})
