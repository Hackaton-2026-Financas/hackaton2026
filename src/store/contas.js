import { ref, computed } from 'vue'

const API_URL = 'http://localhost:3000/contas'

export const contas = ref([])

export const quantidadeNaoPagas = computed(() => {
  return contas.value.filter((conta) => conta.status !== 'paga').length
})

export async function carregarContas() {
  try {
    const resposta = await fetch(API_URL)

    if (!resposta.ok) {
      throw new Error('Erro ao carregar contas')
    }

    const dados = await resposta.json()
    contas.value = Array.isArray(dados) ? dados : []
    return contas.value
  } catch (erro) {
    console.error('Erro ao buscar contas:', erro)
    return []
  }
}

export async function criarConta(conta) {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(conta),
  })

  if (!resposta.ok) {
    throw new Error('Erro ao salvar conta')
  }

  return resposta.json()
}

export async function atualizarConta(id, dados) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  })

  if (!resposta.ok) {
    throw new Error('Erro ao atualizar conta')
  }

  return resposta.json()
}

export async function removerContaDoServidor(id) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!resposta.ok) {
    throw new Error('Erro ao remover conta')
  }

  return true
}
