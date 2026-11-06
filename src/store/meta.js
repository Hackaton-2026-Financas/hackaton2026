import { ref, watch } from 'vue'

const STORAGE_KEY = 'hackaton2026-metas'
const DB_URL = '/db.json'

async function carregarMetasIniciais() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY)

    if (salvo) {
      return JSON.parse(salvo)
    }

    const resposta = await fetch(DB_URL)

    if (!resposta.ok) {
      return []
    }

    const dados = await resposta.json()

    return Array.isArray(dados.metas) ? dados.metas : []
  } catch (erro) {
    console.warn('Não foi possível carregar as metas iniciais:', erro)
    return []
  }
}

export const metas = ref([])

carregarMetasIniciais().then((dados) => {
  metas.value = dados
})

watch(
  metas,
  (valor) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(valor))
  },
  { deep: true },
)
