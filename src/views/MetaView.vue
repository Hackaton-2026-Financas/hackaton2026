<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const metas = ref([])
const form = ref({ title: '', amount: '', dueDate: '' })

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  form.value = { title: '', amount: '', dueDate: '' }
}

function createMeta() {
  if (!form.value.title || !form.value.amount) return
  metas.value.push({
    id: Date.now(),
    title: form.value.title,
    amount: parseFloat(form.value.amount),
    dueDate: form.value.dueDate,
  })
  closeModal()
}

function removeMeta(id) {
  metas.value = metas.value.filter((m) => m.id !== id)
}
</script>

<template>
  <div class="container">
    <header>
      <div class="fabrica">
        <h2>Fábrica de Metas🎯</h2>
        <p>Crie e acompanhe seus objetivos financeiro aqui</p>
        <button class="nova" @click="openModal">+ Nova meta</button>
      </div>
    </header>
    <main>
      <div class="metas">
        <template v-if="metas.length === 0">
          <h3>Nenhuma meta criada ainda</h3>
          <p>Comece criando sua primeira meta financeira!</p>
          <button class="criar" @click="openModal">+ Criar primeira meta</button>
        </template>
        <template v-else>
          <h3>Suas metas</h3>
          <ul class="lista-metas">
            <li v-for="meta in metas" :key="meta.id" class="meta-item">
              <div class="meta-info">
                <strong>{{ meta.title }}</strong>
                <div>Valor: R$ {{ meta.amount.toFixed(2) }}</div>
                <div v-if="meta.dueDate">Vence em: {{ meta.dueDate }}</div>
              </div>
              <div>
                <button class="criar" @click="removeMeta(meta.id)">Remover</button>
              </div>
            </li>
          </ul>
        </template>
      </div>
    </main>

    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <h3>Criar Meta</h3>
        <label>Título</label>
        <input v-model="form.title" placeholder="Ex: Viagem" />
        <label>Valor (R$)</label>
        <input v-model="form.amount" type="number" min="0" step="0.01" />
        <label>Data de vencimento</label>
        <input v-model="form.dueDate" type="date" />
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px">
          <button class="criar" @click="createMeta">Salvar</button>
          <button class="nova" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container h2,
h3,
p {
  color: black;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}

.fabrica h2 {
  margin: 0;
  font-size: 32px;
  color: white;
}

.fabrica p {
  margin-top: 8px;
  color: #bcbcbc;
  font-size: 17px;
}

.nova {
  background: #2ac08e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: 0.2s;
}

.nova:hover {
  background: #00b56f;
}

/* Modal básico */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 480px;
}
.modal input,
.modal label {
  display: block;
  width: 100%;
  margin-bottom: 8px;
}
.lista-metas {
  list-style: none;
  padding: 0;
  margin: 0;
}
.metas h3 {
  margin-bottom: 10px;
}

.metas p {
  color: #666;
  margin-bottom: 20px;
}

.criar {
  background: #00d084;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
}

.criar:hover {
  background: #00b56f;
}
</style>
