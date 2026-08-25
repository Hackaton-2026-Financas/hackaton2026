import { ref, computed } from 'vue'

export const transacoes = ref([])

export const receitasTotais = computed(() => {
  return transacoes.value
    .filter((t) => t.tipo === 'entrada')
    .reduce((acumulador, t) => acumulador + t.valor, 0)
})

export const despesasTotais = computed(() => {
  return transacoes.value
    .filter((t) => t.tipo === 'saida')
    .reduce((acumulador, t) => acumulador + t.valor, 0)
})

export const saldoTotal = computed(() => {
  return receitasTotais.value - despesasTotais.value
})

export const formatarMoeda = (valor) => {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const despesasPorCategoria = computed(() => {
  const despesas = transacoes.value.filter((t) => t.tipo === 'saida')
  const totals = despesas.reduce((acc, t) => {
    const cat = t.categoria || 'outros'
    acc[cat] = (acc[cat] || 0) + Number(t.valor || 0)
    return acc
  }, {})
  const totalGeral = Object.values(totals).reduce((a, b) => a + b, 0)
  return Object.keys(totals).map((categoria) => ({
    categoria,
    valor: totals[categoria],
    porcentagem: totalGeral === 0 ? 0 : (totals[categoria] / totalGeral) * 100,
  }))
})

export const removerTransacao = (id) => {
  transacoes.value = transacoes.value.filter((item) => item.id !== id)
}
