import { ref, computed } from 'vue'
import { criarRegistro, atualizarRegistro, removerRegistro, registrarAcao } from '@/services/api'
import { usuarioAtual } from '@/store/auth'


export const contas = ref([])

function usuarioId() {
  if (!usuarioAtual.value) throw new Error('Entre na sua conta para gerenciar as contas.')
  return usuarioAtual.value.id
}

export async function adicionarConta(dados) {
  const userId = usuarioId()
  const conta = await criarRegistro('Contas', { ...dados, userId })
  contas.value.push(conta)
  await registrarAcao(userId, 'criacao', 'conta', conta.id, `Criou a conta "${conta.titulo}"`)
}

export async function concluirConta(id) {
  const userId = usuarioId()
  const conta = contas.value.find((item) => item.id === id)
  if (!conta) return

  await atualizarRegistro('Contas', id, { status: 'paga' })
  conta.status = 'paga'
  await registrarAcao(userId, 'conclusao', 'conta', id, `Marcou "${conta.titulo}" como paga`)
}

export async function removerConta(id) {
  const userId = usuarioId()
  const conta = contas.value.find((item) => item.id === id)
  if (!conta) return

  await removerRegistro('Contas', id)
  contas.value = contas.value.filter((item) => item.id !== id)
  await registrarAcao(userId, 'remocao', 'conta', id, `Removeu a conta "${conta.titulo}"`)
}

export const quantidadeNaoPagas = computed(() => {
  return contas.value.filter(conta => conta.status !== 'paga').length
})
