import { computed, ref } from 'vue'
import {
  buscarUsuarioPorEmail,
  criarRegistro,
  registrarAcao,
} from '@/services/api'
import { carregarDadosUsuario, limparDadosUsuario } from '@/store/dadosUsuario'

const SESSION_KEY = 'financepro-user'

function lerSessao() {
  try {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    if (user && typeof user.id === 'string') return user
  } catch {
    localStorage.removeItem(SESSION_KEY)
  }
  return null
}

export const usuarioAtual = ref(lerSessao())
export const estaLogado = computed(() => Boolean(usuarioAtual.value))

export async function entrar(email, senha) {
  const usuarios = await buscarUsuarioPorEmail(email)
  const usuario = usuarios.find((item) => item.password === senha)

  if (!usuario) throw new Error('Email ou senha incorretos.')

  await carregarDadosUsuario(usuario.id)
  await registrarAcao(usuario.id, 'login', 'usuario', usuario.id, 'Entrou na conta')
  usuarioAtual.value = {
    id: String(usuario.id),
    name: usuario.name,
    email: usuario.email,
    role: usuario.role,
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(usuarioAtual.value))
  return usuarioAtual.value
}

export async function cadastrar(nome, email, senha) {
  const usuarios = await buscarUsuarioPorEmail(email)
  if (usuarios.length) throw new Error('Já existe uma conta com esse email.')

  const usuario = await criarRegistro('Usuarios', {
    name: nome.trim(),
    email: email.trim().toLowerCase(),
    password: senha,
    role: 'user',
  })

  return entrar(usuario.email, senha)
}

export async function sair() {
  const usuario = usuarioAtual.value
  try {
    if (usuario) {
      await registrarAcao(usuario.id, 'logout', 'usuario', usuario.id, 'Saiu da conta')
    }
  } finally {
    usuarioAtual.value = null
    localStorage.removeItem(SESSION_KEY)
    limparDadosUsuario()
  }
  return usuario
}

export async function restaurarSessao() {
  if (!usuarioAtual.value) return
  await carregarDadosUsuario(usuarioAtual.value.id)
}
