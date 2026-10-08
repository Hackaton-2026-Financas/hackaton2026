import { ref } from "vue";
import { atualizarRegistro, criarRegistro, removerRegistro, registrarAcao } from '@/services/api'
import { usuarioAtual } from '@/store/auth'
import { adicionarTransacao } from '@/store/transacoes'

export const metas = ref([]);

function usuarioId() {
  if (!usuarioAtual.value) throw new Error('Entre na sua conta para gerenciar metas.')
  return usuarioAtual.value.id
}

export async function criarMeta(dados) {
  const userId = usuarioId()
  const meta = await criarRegistro('Metas', { ...dados, userId })
  metas.value.push(meta)
  await registrarAcao(userId, 'criacao', 'meta', meta.id, `Criou a meta "${meta.title}"`)
}

export async function removerMeta(id) {
  const userId = usuarioId()
  const meta = metas.value.find((item) => item.id === id)
  if (!meta) return

  await removerRegistro('Metas', id)
  metas.value = metas.value.filter((item) => item.id !== id)
  await registrarAcao(userId, 'remocao', 'meta', id, `Removeu a meta "${meta.title}"`)
}

export async function contribuirComMeta(meta, valor) {
  const userId = usuarioId()
  const valorAtual = Number(meta.valorAtual) + valor
  await atualizarRegistro('Metas', meta.id, { valorAtual })
  meta.valorAtual = valorAtual
  await adicionarTransacao({
    titulo: `Contribuição para meta: ${meta.title}`,
    categoria: 'meta',
    valor,
    data: new Date().toLocaleDateString('pt-BR'),
    tipo: 'saida',
  })
  await registrarAcao(userId, 'contribuicao', 'meta', meta.id, `Adicionou R$ ${valor.toFixed(2)} à meta "${meta.title}"`)
}

export async function resgatarMeta(meta) {
  const userId = usuarioId()
  const valor = Number(meta.valorAtual)
  await atualizarRegistro('Metas', meta.id, { valorAtual: 0 })
  meta.valorAtual = 0
  await adicionarTransacao({
    titulo: `Resgate da meta: ${meta.title}`,
    categoria: 'meta',
    valor,
    data: new Date().toLocaleDateString('pt-BR'),
    tipo: 'entrada',
  })
  await registrarAcao(userId, 'resgate', 'meta', meta.id, `Resgatou R$ ${valor.toFixed(2)} da meta "${meta.title}"`)
}
