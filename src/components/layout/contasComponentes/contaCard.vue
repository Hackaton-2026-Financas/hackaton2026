<script setup>
defineProps({
  titulo: String,
  categoria: String,
  valor: String,
  vencimento: String,
  status: String,
  id: Number
})

defineEmits(['remover'])

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

      <button
        class="botao-lixeira"
        @click="$emit('remover')"
        aria-label="Remover conta"
      >
        🗑
      </button>
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
  border: 1px solid #ff9b9b;
}

.card.paga {
  border: 1px solid #b8e5d5;
}


.card-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
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


.botao-lixeira {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
}

.botao-lixeira:hover {
  color: #e53935;
}

</style>

