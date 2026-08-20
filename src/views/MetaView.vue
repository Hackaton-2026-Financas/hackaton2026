<script setup>
import { ref, computed } from 'vue'

const mostrarModal = ref(false)
const metas = ref([])
const novaMeta = ref({ title: '', amount: '', dueDate: '' })
const erroValor = ref('')

const dataMinima = computed(() => {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const dia = String(hoje.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
})

function formatarData(data) {
  if (!data) return ''
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function validarValor(e) {
  const valor = e.target.value

  if (valor !== '' && !/^\d*\.?\d*$/.test(valor)) {
    erroValor.value = 'Só é permitido números nesse campo'
  } else {
    erroValor.value = ''
  }
}

function abrirModal() {
  mostrarModal.value = true
}

function fecharModal() {
  mostrarModal.value = false
  novaMeta.value = { title: '', amount: '', dueDate: '' }
  erroValor.value = ''
}

function criarMeta() {
  if (!novaMeta.value.title || !novaMeta.value.amount) return
  if (novaMeta.value.dueDate && novaMeta.value.dueDate < dataMinima.value) return

  metas.value.push({
    id: Date.now(),
    title: novaMeta.value.title,
    amount: parseFloat(novaMeta.value.amount),
    dueDate: novaMeta.value.dueDate,
  })
  fecharModal()
}

function removerMeta(id) {
  metas.value = metas.value.filter((m) => m.id !== id)
}
</script>

<template>
  <section class="fabrica">
    <div>
      <h2>Fábrica de Metas 🎯</h2>
      <p>Crie e acompanhe seus objetivos financeiro aqui</p>
      <button class="nova" @click="abrirModal">+ Nova meta</button>
    </div>
  </section>

  <main>
    <div class="metas">
      <template v-if="metas.length === 0">
        <h3>Nenhuma meta criada ainda</h3>
        <p>Comece criando sua primeira meta financeira!</p>
        <button class="criar" @click="abrirModal">+ Criar primeira meta</button>
      </template>
      <template v-else>
        <h3>Suas metas</h3>
        <ul class="lista-metas">
          <li v-for="meta in metas" :key="meta.id" class="meta-item">
            <div class="meta-info">
              <strong>{{ meta.title }}</strong>
              <div>Valor: R$ {{ meta.amount.toFixed(2) }}</div>
              <div v-if="meta.dueDate">Vence em: {{ formatarData(meta.dueDate) }}</div>
            </div>
            <button class="remover" @click="removerMeta(meta.id)">Remover</button>
          </li>
        </ul>
      </template>
    </div>
  </main>

  <div v-if="mostrarModal" class="modal-backdrop" @click.self="fecharModal">
    <div class="modal">
      <h3>Criar Meta</h3>

      <label>Título</label>
      <input v-model="novaMeta.title" placeholder="Ex: Viagem" />

      <label>Valor (R$)</label>
      <input
        v-model="novaMeta.amount"
        type="number"
        inputmode="decimal"
        placeholder="Ex: 5000"
        @input="validarValor"
      />
      <span class="erro" v-if="erroValor">{{ erroValor }}</span>

      <label>Data de vencimento</label>
      <input v-model="novaMeta.dueDate" type="date" :min="dataMinima" />

      <div class="modal-actions">
        <button class="salvar" @click="criarMeta">Salvar</button>
        <button class="cancelar" @click="fecharModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.fabrica h2 {
  margin: 0;
  font-size: 32px;
  color: #1a1a1a;
}

.fabrica p {
  margin-top: 8px;
  margin-bottom: 20px;
  color: #555;
  font-size: 16px;
}

.nova {
  background: #2ac08e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.2s;
  margin-bottom: 20px;
}

.nova:hover {
  background: #00b56f;
}

.metas {
  text-align: center;
  background: linear-gradient(135deg, #f6fbf9 0%, #eaf6f0 100%);
  border: 1px solid #dcf0e6;
  border-radius: 16px;
  padding: 40px 20px;
  box-shadow: 0 6px 20px rgba(42, 192, 142, 0.08);
  max-width: 1100px;
  margin: 0 auto;
}

.metas h3 {
  margin-bottom: 6px;
  font-size: 1.8rem;
  color: #1a1a1a;
}

.metas p {
  color: #666;
  margin-bottom: 20px;
}

.lista-metas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.meta-item {
  background: #fff;
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.meta-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.meta-info strong {
  font-size: 17px;
  color: #1a1a1a;
}

.meta-info div {
  margin-top: 4px;
  color: #555;
  font-size: 14px;
}

.remover {
  margin-top: 12px;
  background: #fff0f0;
  color: #e53935;
  border: 1px solid #f3c6c6;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.remover:hover {
  background: #ffdcdc;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #ffffff;
  padding: 28px;
  border-radius: 14px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}

.modal h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.modal label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.modal input {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 15px;
  box-sizing: border-box;
}

.modal input:focus {
  outline: none;
  border-color: #2ac08e;
  box-shadow: 0 0 0 3px rgba(42, 192, 142, 0.15);
}

.erro {
  display: block;
  color: #e53935;
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 14px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
}

.salvar {
  background: #2ac08e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.salvar:hover {
  background: #00b56f;
}

.cancelar {
  background: #f1f1f1;
  color: #444;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.cancelar:hover {
  background: #e2e2e2;
}
/* Borda em volta do input */

.metas {
  text-align: center;
  background: linear-gradient(135deg, #f6fbf9 0%, #eaf6f0 100%);
  border: 3px solid rgba(42, 192, 142, 0.5);
  
  border-radius: 12px;

  padding: 40px 20px;
  box-shadow: 0 6px 20px rgba(42, 192, 142, 0.08);
  max-width: 1100px;
  margin: 0 auto;
}
</style>