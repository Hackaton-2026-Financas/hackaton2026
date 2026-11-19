import { nextTick, ref, watch } from 'vue'
import { contas } from '@/store/contas'
import { metas } from '@/store/meta'
import { transacoes } from '@/store/transacoes'

const API = 'http://localhost:3000/dadosFinanceiros'
const carregando = ref(false)
export const erroPersistencia = ref('')

let usuarioId = ''
let registroId = ''
let timerSalvamento
let filaSalvamento = Promise.resolve()

async function requisitar(url, opcoes = {}) {
  const resposta = await fetch(url, {
    ...opcoes,
    headers: {
      ...(opcoes.body ? { 'Content-Type': 'application/json' } : {}),
      ...opcoes.headers
    }
  })

  if (!resposta.ok) {
    throw new Error(`Erro ao salvar dados financeiros: ${resposta.status}`)
  }

  return resposta.status === 204 ? null : resposta.json()
}

function dadosAtuais() {
  return {
    id: registroId,
    usuarioId,
    transacoes: transacoes.value,
    contas: contas.value,
    metas: metas.value
  }
}

function salvarAgora() {
  if (!usuarioId || !registroId) return Promise.resolve()

  const dados = JSON.stringify(dadosAtuais())
  filaSalvamento = filaSalvamento
    .catch(() => {})
    .then(async () => {
      await requisitar(`${API}/${encodeURIComponent(registroId)}`, {
        method: 'PUT',
        body: dados
      })
      erroPersistencia.value = ''
    })

  return filaSalvamento
}

function agendarSalvamento() {
  if (carregando.value || !usuarioId || !registroId) return

  clearTimeout(timerSalvamento)
  timerSalvamento = setTimeout(() => {
    timerSalvamento = null
    salvarAgora().catch((erro) => {
      erroPersistencia.value = erro.message
    })
  }, 300)
}

watch([transacoes, contas, metas], agendarSalvamento, { deep: true })

export async function carregarDadosFinanceiros(id) {
  const idUsuario = String(id)

  if (usuarioId === idUsuario && registroId) return

  carregando.value = true
  usuarioId = idUsuario
  registroId = ''
  erroPersistencia.value = ''

  try {
    const registros = await requisitar(`${API}?usuarioId=${encodeURIComponent(idUsuario)}`)
    let registro = registros[0]

    if (!registro) {
      registro = await requisitar(API, {
        method: 'POST',
        body: JSON.stringify({
          usuarioId: idUsuario,
          transacoes: [],
          contas: [],
          metas: []
        })
      })
    }

    registroId = String(registro.id)
    transacoes.value = Array.isArray(registro.transacoes) ? registro.transacoes : []
    contas.value = Array.isArray(registro.contas) ? registro.contas : []
    metas.value = Array.isArray(registro.metas) ? registro.metas : []
    await nextTick()
  } catch (erro) {
    usuarioId = ''
    registroId = ''
    erroPersistencia.value = erro.message
    throw erro
  } finally {
    carregando.value = false
  }
}

export async function salvarDadosFinanceiros() {
  clearTimeout(timerSalvamento)
  timerSalvamento = null
  await salvarAgora()
}

export function limparDadosFinanceiros() {
  clearTimeout(timerSalvamento)
  timerSalvamento = null
  carregando.value = true
  usuarioId = ''
  registroId = ''
  transacoes.value = []
  contas.value = []
  metas.value = []
  carregando.value = false
}
