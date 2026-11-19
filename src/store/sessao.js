import { computed, ref } from 'vue'
import {
  carregarDadosFinanceiros,
  limparDadosFinanceiros,
  salvarDadosFinanceiros
} from '@/store/dadosFinanceiros'

function lerUsuarioSalvo() {
  try {
    return JSON.parse(localStorage.getItem('usuarioAtual') || 'null')
  } catch {
    localStorage.removeItem('usuarioAtual')
    return null
  }
}

export const usuarioAtual = ref(lerUsuarioSalvo())
export const estaLogado = computed(() => Boolean(usuarioAtual.value))

let usuarioCarregadoId = ''
let carregamento

export async function iniciarSessao(usuario) {
  const usuarioSeguro = {
    id: String(usuario.id),
    nome: usuario.nome,
    email: usuario.email,
    administrador: Boolean(usuario.administrador)
  }

  await carregarDadosFinanceiros(usuarioSeguro.id)
  usuarioAtual.value = usuarioSeguro
  usuarioCarregadoId = usuarioSeguro.id
  localStorage.setItem('usuarioAtual', JSON.stringify(usuarioSeguro))
}

export async function inicializarSessao() {
  if (!usuarioAtual.value) return null

  const id = String(usuarioAtual.value.id)
  if (usuarioCarregadoId === id) return usuarioAtual.value

  if (!carregamento) {
    carregamento = carregarDadosFinanceiros(id)
      .then(() => {
        usuarioCarregadoId = id
        return usuarioAtual.value
      })
      .finally(() => {
        carregamento = null
      })
  }

  return carregamento
}

export async function encerrarSessao() {
  try {
    await salvarDadosFinanceiros()
  } finally {
    localStorage.removeItem('usuarioAtual')
    usuarioAtual.value = null
    usuarioCarregadoId = ''
    limparDadosFinanceiros()
  }
}
