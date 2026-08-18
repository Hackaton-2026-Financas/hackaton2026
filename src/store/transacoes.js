import { ref, computed } from 'vue';

export const transacoes = ref([]);

export const receitasTotais = computed(() => {
  return transacoes.value
    .filter((t) => t.tipo === 'entrada')
    .reduce((acumulador, t) => acumulador + t.valor, 0); 
});

export const despesasTotais = computed(() => {
  return transacoes.value
    .filter((t) => t.tipo === 'saida')
    .reduce((acumulador, t) => acumulador + t.valor, 0); 
});

export const saldoTotal = computed(() => {
  return receitasTotais.value - despesasTotais.value; 
});

export const formatarMoeda = (valor) => {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};