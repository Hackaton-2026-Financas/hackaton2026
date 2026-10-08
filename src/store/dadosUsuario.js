import { contas } from '@/store/contas'
import { metas } from '@/store/meta'
import { transacoes } from '@/store/transacoes'
import { listar } from '@/services/api'

export async function carregarDadosUsuario(userId) {
  const [transacoesDoUsuario, contasDoUsuario, metasDoUsuario] = await Promise.all([
    listar('Transacoes', userId),
    listar('Contas', userId),
    listar('Metas', userId),
  ])

  transacoes.value = transacoesDoUsuario
  contas.value = contasDoUsuario
  metas.value = metasDoUsuario
}

export function limparDadosUsuario() {
  transacoes.value = []
  contas.value = []
  metas.value = []
}
