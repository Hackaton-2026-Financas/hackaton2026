import { ref, computed } from 'vue'
import { criarRegistro, removerRegistro, registrarAcao } from '@/services/api'
import { usuarioAtual } from '@/store/auth'

export const transacoes = ref([])

function usuarioId() {
  if (!usuarioAtual.value) throw new Error('Entre na sua conta para gerenciar transações.')
  return usuarioAtual.value.id
}

export async function adicionarTransacao(dados) {
  const userId = usuarioId()
  const transacao = await criarRegistro('Transacoes', { ...dados, userId })
  transacoes.value.unshift(transacao)
  await registrarAcao(
    userId,
    'criacao',
    'transacao',
    transacao.id,
    `Criou a transação "${transacao.titulo}"`,
  )
  return transacao
}

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

export async function removerTransacao(id) {
  const userId = usuarioId()
  const transacao = transacoes.value.find((item) => item.id === id)
  if (!transacao) return

  await removerRegistro('Transacoes', id)
  transacoes.value = transacoes.value.filter((item) => item.id !== id)
  await registrarAcao(
    userId,
    'remocao',
    'transacao',
    id,
    `Removeu a transação "${transacao.titulo}"`,
  )
}

export const maiorDespesa = computed(() => {
  const despesas = transacoes.value.filter((t) => t.tipo === 'saida')
  if (despesas.length === 0) return null
  return despesas.reduce((maior, atual) =>
    atual.valor > maior.valor ? atual : maior
  )
})

export const maiorReceita = computed(() => {
  const receitas = transacoes.value.filter((t) => t.tipo === 'entrada')
  if (receitas.length === 0) return null
  return receitas.reduce((maior, atual) =>
    atual.valor > maior.valor ? atual : maior
  )
})
