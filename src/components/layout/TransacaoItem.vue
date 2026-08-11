<script setup>
defineProps({
  titulo: { type: String, required: true },
  categoria: { type: String, required: true },
  valor: { type: String, required: true },
  data: { type: String, required: true },
  tipo: { type: String, required: true },
});
</script>

<template>
  <div class="transaction-item">
    <div class="item-info">
      <div :class="['badge', tipo === 'entrada' ? 'icone-verde' : 'icone-vermelho']">
        {{ tipo === 'entrada' ? '+' : '-' }}
      </div>

      <div>
        <h3>{{ titulo }}</h3>
        <small>{{ categoria }}</small>
      </div>
    </div>

    <div class="item-valor">
      <strong :class="tipo === 'entrada' ? 'text-green' : 'text-red'">
        {{ tipo === 'entrada' ? '+' : '-' }} {{ valor }}
      </strong>
      <small>{{ data }}</small>
    </div>
  </div>
</template>

<style scoped>
.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f8fafc;
  border-radius: 8px;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-info h3 {
  margin: 0;
  font-size: 14px;
}

.item-info small,
.item-valor small {
  color: #64748b;
}

.badge {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.item-valor {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.icone-verde {
  background-color: #d1fae5;
  color: #065f46;
}

.icone-vermelho {
  background-color: #fee2e2;
  color: #991b1b;
}

.text-green {
  color: #059669;
}

.text-red {
  color: #dc2626;
}
</style>