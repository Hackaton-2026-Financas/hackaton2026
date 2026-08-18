
  <script setup>
defineProps({
  titulo: String,
  categoria: String,
  valor: String,
  vencimento: String,
  status: String
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
        title="Remover conta"
      >
        🗑
      </button>
    </div>

    <span class="categoria">
      {{ categoria }}
    </span>

    <p class="valor">
      {{ valor }}
    </p>

    <p class="vencimento">
      Vencimento: {{ vencimento }}
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

  background: white;
  border-radius: 11px;
  padding: 17px;

  min-height: 150px;
}

/* Bordas condicionais */

.card.atrasada,
.card.pendente {
  border: 1px solid #ff9b9b;
}

.card.paga {
  border: 1px solid #d1d5db;
}

/* Parte superior */

.card-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card h3 {
  margin: 0;

  color: #172b4d;
  font-size: 16px;
}

/* Categoria */

.categoria {
  display: inline-block;

  margin-top: 8px;
  padding: 4px 8px;

  border-radius: 5px;

  background: #eef2f7;
  color: #64748b;

  font-size: 11px;
}

/* Valor */

.valor {
  margin: 14px 0 5px;

  color: #172b4d;

  font-size: 17px;
  font-weight: 700;
}

/* Vencimento */

.vencimento {
  margin: 0;

  color: #64748b;
  font-size: 12px;
}

/* Status */

.status {
  display: inline-block;

  margin-top: 12px;
  padding: 4px 8px;

  border-radius: 5px;

  font-size: 11px;
  font-weight: 600;
}

/* Atrasada */

.atrasada-status {
  background: #ffe5e5;
  color: #e53935;
}

/* Pendente */

.pendente-status {
  background: #fff3cd;
  color: #b7791f;
}

/* Paga */

.paga-status {
  background: #e2f8ef;
  color: #00a878;
}

/* Botão lixeira */

.botao-lixeira {
  background: transparent;
  border: none;

  color: #94a3b8;

  font-size: 18px;

  cursor: pointer;
}

.botao-lixeira:hover {
  color: #e53935;
}
</style>

