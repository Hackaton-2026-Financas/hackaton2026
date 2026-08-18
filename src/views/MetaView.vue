<script setup>
import { ref, computed } from 'vue'

const showModal = ref(false)
const metas = ref([])
const form = ref({ title: '', amount: '', dueDate: '' })


const minDate = computed(() => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
})

function formatDate(dateString) {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  form.value = { title: '', amount: '', dueDate: '' }
}

function createMeta() {
  if (!form.value.title || !form.value.amount) return
  

  if (form.value.dueDate && form.value.dueDate < minDate.value) return

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
  <section class="fabrica">
    <div>
      <h2>Fábrica de Metas🎯</h2>
      <p>Crie e acompanhe seus objetivos financeiro aqui</p>
      <button class="nova" @click="openModal">+ Nova meta</button>
    </div>
  </section>

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
          <li
            v-for="meta in metas" :key="meta.id" class="meta-item"
            style="
              background-color: white;
              margin-bottom: 10px;
              padding: 10px;
              margin-right: 10px;
              width: 200px;
              height: 120px;
              border-radius: 10px;
              
              ">
            <div class="meta-info">
              <strong>{{ meta.title }}</strong>
              <div>Valor: R$ {{ meta.amount.toFixed(2) }}</div>
              <div v-if="meta.dueDate">Vence em: {{ formatDate(meta.dueDate) }}</div>
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
      <input v-model="form.dueDate" type="date" :min="minDate" />
      <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px">
        <button class="salvar" @click="createMeta">Salvar</button>
        <button class="nova" @click="closeModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
template input {
  color: black;
}

.metas,
.modal {
  color: #000;
}
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
  color: black;
}

.fabrica p {
  margin-top: 8px;
  margin-bottom: 20px;
  color: black;
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
  margin-bottom: 20px;
}

.nova:hover {
  background: #00b56f;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  display: block;
  background: #c6c6c6;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 480px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
}
.modal input,
.modal label {
  display: flex;

  display: block;
  width: 100%;
  margin-bottom: 8px;
}
.metas {
  text-align: center;
  background: #c6c6c6;
  border-radius: 16px;
  padding: 50px 120px 67px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

        /*quero fazer para quebrar linha quando esceder o numero de cards*/


.lista-metas {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.metas h3 {
  margin-bottom: 10px;
  font-size: 2.3rem;

}

.metas p {
  color: black;
  margin-bottom: 20px;
}

.salvar {
  background: #2ac08e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: 0.2s;
  margin-bottom: 20px;
}
.criar {
  background: #00d084;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.criar:hover {
  background: #00b56f;
}
</style>