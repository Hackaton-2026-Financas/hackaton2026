<script setup>
defineProps({
  titulo: String,
  categoria: String,
  valor: String,
  vencimento: String,
  status: String,
  id: Number
})

defineEmits(['remover', 'concluir'])
</script>

<template>
  <div
    class="card"
    :class="{
      atrasada: status === 'atrasada',
      pendente: status === 'pendente',
      paga: status === 'paga'
    }"
  >
    <div class="card-topo">
      <h3>{{ titulo }}</h3>

      <div class="card-acoes">
        <button
          v-if="status !== 'paga'"
          class="botao-concluir"
          @click="$emit('concluir')"
          aria-label="Marcar como paga"
        >
          ✓
        </button>

        <button
          class="botao-lixeira"
          @click="$emit('remover')"
          aria-label="Remover conta"
        >
          🗑
        </button>
      </div>
    </div>

    <p class="categoria">{{ categoria }}</p>
    <p class="valor">{{ valor }}</p>
    <p class="vencimento">
      {{ vencimento }}
    </p>

    <span
      v-if="status === 'atrasada'"
      class="status atrasada-status"
    >
      Atrasada!
    </span>

    <span
      v-else-if="status === 'pendente'"
      class="status pendente-status"
    >
      Pendente
    </span>

    <span
      v-else
      class="status paga-status"
    >
      ✓ Paga
    </span>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  border-radius: 11px;
  padding: 17px;
  min-height: 130px;
}

.card.atrasada,
.card.pendente {
  border: 1px solid #e53935;
}

.card.paga {
  border: 1px solid #b8e5d5;
}

.card-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-acoes {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.card h3 {
  margin: 0 0 8px;
  color: #172b4d;
  font-size: 16px;
  font-weight: 700;
}

.card p {
  margin: 6px 0;
  color: #64748b;
  font-size: 13px;
}

.card .valor {
  color: #172b4d;
  font-size: 14px;
  font-weight: 700;
}

.card .vencimento {
  color: #64748b;
  font-size: 12px;
}

.status {
  display: inline-block;
  margin-top: 3px;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
}

.atrasada-status {
  background-color: #ffe5e5;
  color: #e53935;
}

.pendente-status {
  background-color: #fff4d6;
  color: #d97706;
}

.paga-status {
  background-color: #e2f8ef;
  color: #00a878;
}

.botao-lixeira,
.botao-concluir {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0;
  transition: background-color 0.15s ease, transform 0.1s ease;
}

.botao-lixeira {
  background: #f1f5f9;
  color: #64748b;
}

.botao-lixeira:hover {
  background: #ffe5e5;
  color: #e53935;
}

.botao-concluir {
  background: #e2f8ef;
  color: #00a878;
  font-weight: 700;
}

.botao-concluir:hover {
  background: #00b386;
  color: white;
}

.botao-lixeira:active,
.botao-concluir:active {
  transform: scale(0.92);
}
</style>