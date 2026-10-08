const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}/${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(
      `Falha ao acessar o banco de dados (${response.status})${detail ? `: ${detail}` : ''}`,
    )
  }

  if (response.status === 204) return null
  return response.json()
}

export function listar(resource, userId) {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : ''
  return request(`${resource}${query}`)
}

export function buscarUsuarioPorEmail(email) {
  return request(`Usuarios?email=${encodeURIComponent(email.trim().toLowerCase())}`)
}

export function criarRegistro(resource, values) {
  return request(resource, {
    method: 'POST',
    body: JSON.stringify({ id: crypto.randomUUID(), ...values }),
  })
}

export function atualizarRegistro(resource, id, values) {
  return request(`${resource}/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  })
}

export function removerRegistro(resource, id) {
  return request(`${resource}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export async function registrarAcao(userId, acao, entidade, entidadeId, descricao) {
  return criarRegistro('Historicos', {
    userId,
    acao,
    entidade,
    entidadeId: String(entidadeId),
    descricao,
    data: new Date().toISOString(),
  })
}
