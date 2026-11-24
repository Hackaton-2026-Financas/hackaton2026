import { ref, computed } from 'vue'

const API_BASE_URL = 'http://localhost:3000'
const DESPESAS_URL = `${API_BASE_URL}/despesas`
const RECEITAS_URL = `${API_BASE_URL}/receitas`

export const transacoes = ref([])
export const carregandoReceitas = ref(true)
export const erroTransacoes = ref('')

let proximoId = Date.now()

export const gerarIdTransacao = () => ++proximoId

async function requisitar(url, options) {
  const resposta = await fetch(url, options)

  if (!resposta.ok) {
    throw new Error(`A API respondeu com o status ${resposta.status}.`)
  }

  return resposta.status === 204 ? null : resposta.json()
}

export const carregarTransacoes = async () => {
  carregandoReceitas.value = true
  erroTransacoes.value = ''

  try {
    const [despesas, receitas] = await Promise.all([
      requisitar(DESPESAS_URL),
      requisitar(RECEITAS_URL),
    ])

    if (!Array.isArray(despesas) || !Array.isArray(receitas)) {
      throw new TypeError('As respostas da API devem ser listas.')
    }

    transacoes.value = [
      ...receitas.map((item) => ({
        ...item,
        valor: Number(item.valor || 0),
        tipo: 'entrada',
        categoria: item.categoria || 'outros',
        titulo: item.titulo || item.descricao || 'Receita',
      })),
      ...despesas.map((item) => ({
        ...item,
        valor: Number(item.valor || 0),
        tipo: 'saida',
        categoria: item.categoria || 'outros',
        titulo: item.titulo || item.descricao || 'Despesa',
        data: item.data || new Date().toLocaleDateString('pt-BR'),
      })),
    ]
  } catch (erro) {
    erroTransacoes.value = `Não foi possível carregar as transações: ${erro.message}`
    console.error('Erro ao carregar transações:', erro)
  } finally {
    carregandoReceitas.value = false
  }
}

export const carregarDespesas = carregarTransacoes

export const criarDespesa = async (despesa) => {
  const payload = {
    titulo: despesa.titulo || despesa.descricao || 'Despesa',
    categoria: despesa.categoria || 'outros',
    valor: Number(despesa.valor || 0),
    data: despesa.data || new Date().toLocaleDateString('pt-BR'),
    tipo: 'saida',
    descricao: despesa.descricao || despesa.titulo || 'Despesa',
  }

  const novaDespesa = await requisitar(DESPESAS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

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

export const adicionarReceita = async (receita) => {
  erroTransacoes.value = ''

  try {
    const receitaCriada = await requisitar(RECEITAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receita),
    })

    transacoes.value.unshift({
      ...receitaCriada,
      valor: Number(receitaCriada.valor || 0),
      tipo: 'entrada',
    })

    return true
  } catch (erro) {
    erroTransacoes.value = `Não foi possível salvar a receita: ${erro.message}`
    console.error('Erro ao salvar receita:', erro)
    return false
  }
}

export const receitasTotais = computed(() => {
  return transacoes.value
    .filter((transacao) => transacao.tipo === 'entrada')
    .reduce((acumulador, receita) => acumulador + receita.valor, 0)
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
  const item = transacoes.value.find(
    (transacao) => String(transacao.id) === String(id),
  )

  if (item && item.tipo === 'saida') {
    await requisitar(`${DESPESAS_URL}/${id}`, {
      method: 'DELETE',
    })
  } else if (item && item.tipo === 'entrada') {
    await requisitar(`${RECEITAS_URL}/${id}`, {
      method: 'DELETE',
    })
  }

  transacoes.value = transacoes.value.filter(
    (itemAtual) => String(itemAtual.id) !== String(id),
  )
}

carregarTransacoes()

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
