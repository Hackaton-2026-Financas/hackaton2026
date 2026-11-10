import { ref, computed } from 'vue'

const API_URL = 'http://localhost:3001/despesas'

export const transacoes = ref([])

export const carregarDespesas = async () => {
  try {
    const resposta = await fetch(API_URL)

    if (!resposta.ok) {
      throw new Error('Não foi possível carregar as despesas')
    }

    const despesas = await resposta.json()

    transacoes.value = despesas.map((item) => ({
      ...item,
      id: Number(item.id),
      valor: Number(item.valor || 0),
      tipo: item.tipo || 'saida',
      categoria: item.categoria || 'outros',
      titulo: item.titulo || item.descricao || 'Despesa',
      data: item.data || new Date().toLocaleDateString('pt-BR'),
    }))
  } catch (erro) {
    console.error('Erro ao carregar despesas:', erro)
    transacoes.value = []
  }
}

export const criarDespesa = async (despesa) => {
  const payload = {
    titulo: despesa.titulo || despesa.descricao || 'Despesa',
    categoria: despesa.categoria || 'outros',
    valor: Number(despesa.valor || 0),
    data: despesa.data || new Date().toLocaleDateString('pt-BR'),
    tipo: 'saida',
    descricao: despesa.descricao || despesa.titulo || 'Despesa',
  }

  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!resposta.ok) {
    throw new Error('Não foi possível salvar a despesa')
  }

  const novaDespesa = await resposta.json()
  transacoes.value = [
    {
      ...novaDespesa,
      valor: Number(novaDespesa.valor || 0),
      tipo: 'saida',
    },
    ...transacoes.value,
  ]

  return novaDespesa
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

export const removerTransacao = async (id) => {
  const item = transacoes.value.find((transacao) => transacao.id === id)

  if (item && item.tipo === 'saida') {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
  }

  transacoes.value = transacoes.value.filter((itemAtual) => itemAtual.id !== id)
}

export const maiorDespesa = computed(() => {
  const despesas = transacoes.value.filter((t) => t.tipo === 'saida')
  if (despesas.length === 0) return null
  return despesas.reduce((maior, atual) => (atual.valor > maior.valor ? atual : maior))
})

export const maiorReceita = computed(() => {
  const receitas = transacoes.value.filter((t) => t.tipo === 'entrada')
  if (receitas.length === 0) return null
  return receitas.reduce((maior, atual) => (atual.valor > maior.valor ? atual : maior))
})
