<script setup>
import contaCard from '../components/layout/contasComponentes/contaCard.vue'
import { ref, computed, reactive } from 'vue'
import { contas } from '../store/contas.js'


const contasPagas = computed(() => contas.value.filter((conta) => conta.status === 'paga'))
const contasNaoPagas = computed(() => contas.value.filter((conta) => conta.status !== 'paga'))

function totalDe(lista) {
  return lista
    .reduce((total, conta) => total + parseFloat(conta.valor.replace('R$ ', '').replace('.', '').replace(',', '.')), 0)
    .toFixed(2)
    .replace('.', ',')
}

function removerConta(id) {
  contas.value = contas.value.filter((conta) => conta.id !== id)
}

function concluirConta(id) {
  const conta = contas.value.find((c) => c.id === id)
  if (conta) conta.status = 'paga'
}

// --- Modal "Nova Conta" ---

const modalAberto = ref(false)
const erro = ref('')

const form = reactive({
  titulo: '',
  categoria: '',
  valorNumero: '',
  vencimento: '',
  status: 'pendente',
})

function abrirModal() {
  form.titulo = ''
  form.categoria = ''
  form.valorNumero = ''
  form.vencimento = ''
  erro.value = ''
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
}

function formatarValor(numero) {
  return 'R$ ' + Number(numero).toFixed(2).replace('.', ',')
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-')
  return `${dia}/${mes}/${ano}`
}

function salvarConta() {
  if (!form.titulo || !form.categoria || !form.valorNumero || !form.vencimento) {
    erro.value = 'Preencha todos os campos.'
    return
  }

  const novoId = contas.value.length ? Math.max(...contas.value.map((c) => c.id)) + 1 : 1

  contas.value.push({
    id: novoId,
    titulo: form.titulo,
    categoria: form.categoria,
    valor: formatarValor(form.valorNumero),
    vencimento: formatarData(form.vencimento),
    status: form.status,
  })

  fecharModal()
}
</script>

<template>
  <header>
    <div class="contas">
      <h1>Gerenciador de Contas</h1>
      <p>Adicione Novas Contas e Organize Suas Finanças.</p>
    </div>

    <button class="nova" @click="abrirModal">+ Nova Conta</button>
  </header>

  <main>
    <section>
      <div class="naopagas">
        <h2>A Pagar</h2>
        <p>{{ contasNaoPagas.length }} Contas</p>
        <h3>R$ {{ totalDe(contasNaoPagas) }}</h3>
      </div>

      <contaCard
        v-for="conta in contasNaoPagas"
        :key="conta.id"
        :titulo="conta.titulo"
        :categoria="conta.categoria"
        :valor="conta.valor"
        :vencimento="conta.vencimento"
        :status="conta.status"
        :id="conta.id"
        @remover="removerConta(conta.id)"
        @concluir="concluirConta(conta.id)"
      />
    </section>

    <section>
      <div class="pagas">
        <h2>Pagas</h2>
        <p>{{ contasPagas.length }} Contas</p>
        <h3>R$ {{ totalDe(contasPagas) }}</h3>
      </div>

      <contaCard
        v-for="conta in contasPagas"
        :key="conta.id"
        :titulo="conta.titulo"
        :categoria="conta.categoria"
        :valor="conta.valor"
        :vencimento="conta.vencimento"
        :status="conta.status"
        :id="conta.id"
        @remover="removerConta(conta.id)"
        @concluir="concluirConta(conta.id)"
      />
    </section>
  </main>

  <div v-if="modalAberto" class="overlay" @click.self="fecharModal">
    <div class="modal">
      <h2>Nova Conta</h2>

      <form @submit.prevent="salvarConta">
        <label>
          Título
          <input v-model="form.titulo" type="text" placeholder="Ex: Energia Elétrica" />
        </label>

        <label>
          Categoria
          <input v-model="form.categoria" type="text" placeholder="Ex: Utilidades" />
        </label>

        <label>
          Valor (R$)
          <input v-model="form.valorNumero" type="number" step="0.01" min="0" placeholder="0,00" />
        </label>

        <label>
          Vencimento
          <input v-model="form.vencimento" type="date" />
        </label>

        <p v-if="erro" class="erro">{{ erro }}</p>

        <div class="botoes">
          <button type="button" class="cancelar" @click="fecharModal">Cancelar</button>
          <button type="submit" class="salvar">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
header {
  box-sizing: border-box;
  padding: 70px 24px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}
.nova{
  margin-right: 0;
}

.contas {
  min-width: 0;
  flex: 1 1 300px;
}

.contas h1 {
  color: #172b4d;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  overflow-wrap: break-word;
}

.contas p {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 14px;
}

header button {
  background: #00b386;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

header button:hover {
  background: #009b75;
}

main {
  width: 100%;
  box-sizing: border-box;
  padding: 0 24px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

main section {
  width: 100%;
  box-sizing: border-box;
  padding: 18px;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

main section:first-child {
  background-color: #fff9df;
  border: 1px solid #f3d45c;
}

main section:last-child {
  background-color: #ecfff7;
  border: 1px solid #8de0c2;
}

.naopagas,
.pagas {
  position: relative;
  min-height: 55px;
}

.naopagas h2,
.pagas h2 {
  margin: 0;
  color: #172b4d;
  font-size: 19px;
  font-weight: 700;
}

.naopagas p,
.pagas p {
  margin: 4px 0 0;
  color: #64748b;
  font-size: 13px;
}

.naopagas p:nth-of-type(2),
.pagas p:nth-of-type(2) {
  position: absolute;
  color: #64748b;
  font-size: 12px;
}

.naopagas h3,
.pagas h3 {
  position: absolute;
  right: 0;
  top: 17px;
  margin: 0;
  color: #172b4d;
  font-size: 16px;
  font-weight: 700;
}

.naopagas h2::before {
  content: '◷';
  margin-right: 8px;
  color: #f59e0b;
}

.pagas h2::before {
  content: '✓';
  margin-right: 8px;
  color: #00a878;
}

/* Modal */

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(23, 43, 77, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: white;
  border-radius: 14px;
  padding: 28px;
  width: 100%;
  max-width: 380px;
  box-sizing: border-box;
}

.modal h2 {
  margin: 0 0 18px;
  color: #172b4d;
  font-size: 20px;
  font-weight: 700;
}

.modal form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.modal label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #172b4d;
  font-size: 13px;
  font-weight: 600;
}

.modal input,
.modal select {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 9px 10px;
  font-size: 14px;
  font-family: inherit;
  color: #172b4d;
}

.modal input:focus,
.modal select:focus {
  outline: none;
  border-color: #00b386;
}

.erro {
  margin: 0;
  color: #e53935;
  font-size: 13px;
}

.botoes {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
}

.botoes button {
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.cancelar {
  background: #f1f5f9;
  color: #172b4d;
}

.cancelar:hover {
  background: #e2e8f0;
}

.salvar {
  background: #00b386;
  color: white;
}

.salvar:hover {
  background: #009b75;
}
</style>