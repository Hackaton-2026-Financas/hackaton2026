<script setup>
import { removerTransacao } from '@/store/transacoes.js';

defineProps({
  id: {
    type: Number,
    required: true
  },
  titulo: String,
  categoria: String,
  valor: String,
  data: String,
  tipo: String
});
</script>

<template>
  <div class="transacao-item">
    <div class="info-esquerda">
      <div :class="['icone-tipo', tipo === 'entrada' ? 'bg-verde' : 'bg-vermelho']">
        {{ tipo === 'entrada' ? '+' : '-' }}
      </div>
      <div class="detalhes">
        <strong>{{ titulo }}</strong>
        <span class="categoria">{{ categoria }}</span>
      </div>
    </div>

    <div class="info-direita">
      <div class="valores">
        <span :class="['valor', tipo === 'entrada' ? 'text-verde' : 'text-vermelho']">
          {{ tipo === 'entrada' ? '+ ' : '- ' }}{{ valor }}
        </span>
        <small class="data">{{ data }}</small>
      </div>

      <button 
        class="btn-deletar" 
        title="Remover transação" 
        @click="removerTransacao(id)"
      >
        X
      </button>
    </div>
  </div>
</template>

<style scoped>
.transacao-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.info-esquerda {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icone-tipo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.bg-verde { background-color: #d1fae5; color: #065f46; }
.bg-vermelho { background-color: #fee2e2; color: #991b1b; }

.detalhes {
  display: flex;
  flex-direction: column;
}

.categoria {
  font-size: 12px;
  color: #64748b;
  text-transform: capitalize;
}

.info-direita {
  display: flex;
  align-items: center;
  gap: 16px;
}

.valores {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.valor {
  font-weight: bold;
}

.text-verde { color: #059669; }
.text-vermelho { color: #dc2626; }

.data {
  font-size: 11px;
  color: #94a3b8;
}

.btn-deletar {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-deletar:hover {
  background-color: #fee2e2;
}
</style>