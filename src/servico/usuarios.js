
const API = 'http://localhost:3000/usuarios'

async function verificarResposta(resposta) {
  if (!resposta.ok) {
    throw new Error(`Erro ao acessar usuários: ${resposta.status}`)
  }
}

// Lista usuario que tem
export async function listarUsuarios() {
  const resposta = await fetch(API)
  await verificarResposta(resposta)
  const usuarios = await resposta.json()

  return usuarios
}

// Buscar um usuario especifico (seria o Read do CRUD)
export async function buscarUsuario(id) {
  const resposta = await fetch(`${API}/${id}`)

  if (resposta.status === 404) {
    return null
  }

  await verificarResposta(resposta)
  const usuario = await resposta.json()

  return usuario
}

// criar uma conta pro usuario (seria o Create do CRUD)
export async function cadastrarUsuario(usuario) {
  const resposta = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  })

  await verificarResposta(resposta)
  const usuarioCadastrado = await resposta.json()

  return usuarioCadastrado
}

// att do usuario (seria o Update do CRUD)
export async function atualizarUsuario(id, dadosAtualizados) {
  const resposta = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosAtualizados)
  })

  await verificarResposta(resposta)
  const usuarioAtualizado = await resposta.json()

  return usuarioAtualizado
}

// Excluir a conta do usuario (seria o Delete do CRUD)
export async function excluirUsuario(id) {
  const resposta = await fetch(`${API}/${id}`, {
    method: 'DELETE'
  })

  await verificarResposta(resposta)
  return true
}
