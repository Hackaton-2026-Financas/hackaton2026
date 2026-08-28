import { ref, computed } from 'vue'


export const contas = ref([
  {
    id: 1,
    titulo: 'Energia Elétrica',
    categoria: 'Utilidades',
    valor: 'R$ 150,00',
    vencimento: '24/06/2026',
    status: 'atrasada',
  },
  {
    id: 2,
    titulo: 'Internet',
    categoria: 'Utilidades',
    valor: 'R$ 99,90',
    vencimento: '19/06/2026',
    status: 'atrasada',
  },
  {
    id: 3,
    titulo: 'Aluguel',
    categoria: 'Moradia',
    valor: 'R$ 1.200,00',
    vencimento: '09/06/2026',
    status: 'paga',
  },
])

export const quantidadeNaoPagas = computed(() => {
  return contas.value.filter(conta => conta.status !== 'paga').length
})
