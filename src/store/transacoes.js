import { ref, computed, watch } from 'vue'

const CHAVE_TRANSACOES = 'hackaton2026:transacoes'
const API_URL = 'http://localhost:3000/receitas'

function carregarDespesas() {
  const despesasSalvas = localStorage.getItem(CHAVE_TRANSACOES)

  if (despesasSalvas === null) return []

  const dadosSalvos = JSON.parse(despesasSalvas) 

  if (!Array.isArray(dadosSalvos)) {
    throw new TypeError('Os dados salvos de transações devem ser uma lista.')
  }

  return dadosSalvos.filter((transacao) => transacao.tipo === 'saida')
}

export const transacoes = ref(carregarDespesas())
export const receitas = computed(() =>
  transacoes.value.filter((transacao) => transacao.tipo === 'entrada'),
)
export const carregandoReceitas = ref(true)
export const erroTransacoes = ref('')

let proximoId = Math.max(
  Date.now(),
  ...transacoes.value.map((transacao) => Number(transacao.id) || 0),
) + 1

export const gerarIdTransacao = () => proximoId++

async function requisitarReceitas(url = API_URL, options = {}) {
  let resposta

  try {
    resposta = await fetch(url, options)
  } catch (erro) {
    throw new Error(
      'Não foi possível conectar à API. Verifique se o JSON Server está rodando com "npm run api".',
      { cause: erro },
    )
  }

  if (!resposta.ok) {
    throw new Error(`A API respondeu com o status ${resposta.status}.`)
  }

  return resposta.status === 204 ? null : resposta.json()
}

async function carregarReceitas() {
  try {
    const dados = await requisitarReceitas()

    if (!Array.isArray(dados)) {
      throw new TypeError('A resposta da API de receitas deve ser uma lista.')
    }

    transacoes.value = [
      ...dados.map((receita) => ({ ...receita, tipo: 'entrada' })),
      ...transacoes.value.filter((transacao) => transacao.tipo === 'saida'),
    ]
    erroTransacoes.value = ''
  } catch (erro) {
    erroTransacoes.value = erro.message
    console.error('Erro ao carregar receitas:', erro)
  } finally {
    carregandoReceitas.value = false
  }
}

const receitasCarregadas = carregarReceitas()

export async function adicionarReceita(receita) {
  erroTransacoes.value = ''

  try {
    await receitasCarregadas
    const receitaCriada = await requisitarReceitas(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(receita),
    })

    transacoes.value.unshift({ ...receitaCriada, tipo: 'entrada' })
    return true
  } catch (erro) {
    erroTransacoes.value = `Não foi possível salvar a receita: ${erro.message}`
    console.error('Erro ao salvar receita:', erro)
    return false
  }
}

export async function atualizarReceita(id, dadosAtualizados) {
  erroTransacoes.value = ''

  try {
    const receitaAtualizada = await requisitarReceitas(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAtualizados),
    })

    const index = transacoes.value.findIndex((transacao) => transacao.id === id)

    if (index !== -1) {
      transacoes.value[index] = { ...receitaAtualizada, tipo: 'entrada' }
    }

    return true
  } catch (erro) {
    erroTransacoes.value = `Não foi possível atualizar a receita: ${erro.message}`
    console.error('Erro ao atualizar receita:', erro)
    return false
  }
}

export async function buscarReceitaPorId(id) {
  try {
    return await requisitarReceitas(`${API_URL}/${id}`)
  } catch (erro) {
    erroTransacoes.value = `Não foi possível buscar a receita: ${erro.message}`
    console.error('Erro ao buscar receita por ID:', erro)
    return null
  }
}

watch(
  transacoes,
  (novasTransacoes) => {
    const despesas = novasTransacoes.filter((transacao) => transacao.tipo === 'saida')
    localStorage.setItem(CHAVE_TRANSACOES, JSON.stringify(despesas))
  },
  { deep: true },
)

export const receitasTotais = computed(() => {
  return receitas.value.reduce((acumulador, receita) => acumulador + receita.valor, 0)
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
  const transacao = transacoes.value.find((item) => item.id === id)

  if (!transacao) return

  if (transacao.tipo === 'entrada') {
    erroTransacoes.value = ''

    try {
      await requisitarReceitas(`${API_URL}/${id}`, { method: 'DELETE' })
    } catch (erro) {
      erroTransacoes.value = `Não foi possível remover a receita: ${erro.message}`
      console.error('Erro ao remover receita:', erro)
      return
    }
  }

  transacoes.value = transacoes.value.filter((item) => item.id !== id)
}

export const maiorDespesa = computed(() => {
  const despesas = transacoes.value.filter((t) => t.tipo === 'saida')
  if (despesas.length === 0) return null
  return despesas.reduce((maior, atual) =>
    atual.valor > maior.valor ? atual : maior
  )
})

export const maiorReceita = computed(() => {
  if (receitas.value.length === 0) return null
  return receitas.value.reduce((maior, atual) =>
    atual.valor > maior.valor ? atual : maior
  )
})
