
const API = 'http://localhost:3000/usuarios'

// Lista usuario que tem
export async function listarUsuarios() {
  const resposta = await fetch(API)
  const usuarios = await resposta.json()

  return usuarios
}

// Buscar um usuario especifico
export async function buscarUsuario(id) {
  const resposta = await fetch(`${API}/${id}`)
  const usuario = await resposta.json()

  return usuario
}

// criar uma conta pro usuario
export async function cadastrarUsuario(usuario) {
  const resposta = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  })

  const usuarioCadastrado = await resposta.json()

  return usuarioCadastrado
}

// att do usuario
export async function atualizarUsuario(id, dadosAtualizados) {
  const resposta = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosAtualizados)
  })

  const usuarioAtualizado = await resposta.json()

  return usuarioAtualizado
}

// Excluir a conta 
export async function excluirUsuario(id) {
  const resposta = await fetch(`${API}/${id}`, {
    method: 'DELETE'
  })

  return resposta.ok
}
