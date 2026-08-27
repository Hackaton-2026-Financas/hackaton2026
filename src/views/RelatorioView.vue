<script setup>
import { ref, computed } from 'vue'
import {
  saldoTotal,
  formatarMoeda,
  receitasTotais,
  despesasTotais,
  despesasPorCategoria,
} from '@/store/transacoes'
import { quantidadeNaoPagas } from '@/store/contas'
const score = ref(85)
const scoreDescription = ref('Excelente')

const taxaPoupancaValor = computed(() => {
  const receitas = receitasTotais.value
  const despesas = despesasTotais.value
  if (receitas <= 0) return 0
  return ((receitas - despesas) / receitas) * 100
})
const taxaFormatada = computed(() => {
  return `${taxaPoupancaValor.value.toFixed(1)}%`
})

const categoriaLabels = {
  alimentacao: 'Alimentação',
  transporte: 'Transporte',
  lazer: 'Lazer',
  salario: 'Salário',
  outros: 'Outros',
}

const corClasse = (cat) => {
  switch (cat) {
    case 'alimentacao':
      return 'verde'
    case 'transporte':
      return 'azul'
    case 'lazer':
      return 'roxo'
    default:
      return 'roxo'
  }
}



const despesasPorCategoriaLocal = despesasPorCategoria
</script>

<template>
  <div class="conteiner">
    <!-- Topo -->
    <header class="topo">
      <div>
        <h1>Relatório de Saúde Financeira 📊</h1>
        <h2>Análise completa das suas finanças</h2>
      </div>
      <button class="btn-exportar">
        
        Exportar PDF
      </button>
    </header>

    <!-- Seção do Score -->
    <section class="secao-card secao-score">
      <div class="score-cabecalho">
        <div class="score-icone">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div class="score-info">
          <span class="score-rotulo">Score de Saúde Financeira</span>
          <div class="score-valor">
            <span class="numero">{{ score }}</span>
            <span class="status">{{ scoreDescription }}</span>
          </div>
        </div>
      </div>
      <div class="trilho-barra-progresso">
        <div class="preenchimento-barra-progresso" :style="{ width: score + '%' }"></div>
      </div>
    </section>

    <!-- Cards de Estatísticas -->
    <section class="grid-cards">
      <div class="item-card">
        <div class="cabecalho-card">
          <div class="wrapper-icone verde">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span class="titulo-card">Saldo Atual</span>
        </div>
        <p class="valor-card">{{ formatarMoeda(saldoTotal) }}</p>
      </div>

      <div class="item-card">
        <div class="cabecalho-card">
          <div class="wrapper-icone azul">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <span class="titulo-card">Receitas/Mês</span>
        </div>
        <p class="valor-card">{{ formatarMoeda(receitasTotais) }}</p>
      </div>

      <div class="item-card">
        <div class="cabecalho-card">
          <div class="wrapper-icone vermelho">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
              <polyline points="17 18 23 18 23 12" />
            </svg>
          </div>
          <span class="titulo-card">Despesas/Mês</span>
        </div>
        <p class="valor-card">{{ formatarMoeda(despesasTotais) }}</p>
      </div>

      <div class="item-card">
        <div class="cabecalho-card">
          <div class="wrapper-icone roxo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <span class="titulo-card">Taxa de Poupança</span>
        </div>
        <p class="valor-card">{{ taxaFormatada }}</p>
      </div>
    </section>

    <!-- Despesas por Categoria -->
    <section class="secao-card secao-despesas">
      <h2 class="titulo-secao">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Despesas por Categoria
      </h2>

      <div class="conteudo-despesas">
        <p>Era para ter um grafico aqui</p>

        <!-- Lista de Categorias -->
        <ul class="categoria-lista">
          <li
            v-for="item in despesasPorCategoriaLocal"
            :key="item.categoria"
            class="categoria-item"
          >
            <div class="categoria-info">
              <span class="ponto" :class="corClasse(item.categoria)"></span>
              <span>{{ categoriaLabels[item.categoria] || item.categoria }}</span>
            </div>
            <strong>{{ formatarMoeda(item.valor) }} — {{ item.porcentagem.toFixed(0) }}%</strong>
          </li>
          <li v-if="despesasPorCategoriaLocal.length === 0" class="categoria-item">
            <div class="categoria-info">
              <span>Nenhuma despesa registrada</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Diagnóstico e Recomendações -->
    <section class="secao-card secao-diagnostico">
      <h2 class="titulo-secao">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        Diagnóstico e Recomendações
      </h2>
      <div class="lista-alertas">
        <div class="card-alerta alerta-verde" v-if="taxaPoupancaValor > 20">
          <p>Ótima taxa de poupança!</p>
        </div>
        <div class="card-alerta alerta-laranja" v-else-if="taxaPoupancaValor >= 10">
          <p>Taxa de poupança moderada. Considere revisar seus gastos.</p>
        </div>
        <div class="card-alerta alerta-laranja" v-else-if ="taxaPoupancaValor < 10 && taxaPoupancaValor != 0">
          <p>Taxa de popupança preocupante!</p>
        </div>
        <div class="card-alerta alerta-laranja">
          <p>Você tem {{ quantidadeNaoPagas }} conta(s) pendente(s)!</p>
        </div>
        <div class="card-alerta alerta-laranja">
          <p>Sua maior despesa é em: Alimentação (R$ 350.00)</p>
        </div>
      </div>
    </section>

    <!-- Rodapé -->
    <footer class="rodape">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      Relatório gerado em 18 de agosto de 2026
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:global(body) {
  background-color: #f8fafc;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  margin: 0;
  padding: 0;
}

.conteiner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Topo */
.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.topo h2 {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 400;
  margin-top: 4px;
}

.btn-exportar {
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-exportar:hover {
  background-color: #059669;
}

/* Seção Padrão */
.secao-card {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 24px;
}

.titulo-secao {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

/* Seção de Score */
.secao-score {
  background-color: #eafaf1;
  border-color: #d1f2d9;
}

.score-cabecalho {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.score-icone {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2.5px solid #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  background-color: #ffffff;
}

.score-rotulo {
  font-size: 0.875rem;
  color: #64748b;
}

.score-valor {
  display: flex;
  align-items: baseline;
  gap: 10px;

  .numero {
    font-size: 2rem;
    font-weight: 700;
    color: #0f172a;
  }

  .status {
    color: #10b981;
    font-weight: 700;
    font-size: 1.125rem;
  }
}

.trilho-barra-progresso {
  width: 100%;
  height: 10px;
  background-color: #cbd5e1;
  border-radius: 999px;
  overflow: hidden;
}

.preenchimento-barra-progresso {
  height: 100%;
  background-color: #0f172a;
  border-radius: 999px;
}

/* Cards de Estatísticas */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.item-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}

.cabecalho-card {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.wrapper-icone {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.verde {
    background: #d1fae5;
    color: #10b981;
  }
  &.azul {
    background: #dbeafe;
    color: #3b82f6;
  }
  &.vermelho {
    background: #fee2e2;
    color: #ef4444;
  }
  &.roxo {
    background: #f3e8ff;
    color: #a855f7;
  }
}

.titulo-card {
  font-size: 0.875rem;
  color: #64748b;
}

.valor-card {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}

/* Despesas por Categoria */
.conteudo-despesas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 32px;
}

@media (max-width: 768px) {
  .conteudo-despesas {
    grid-template-columns: 1fr;
  }
}

.wrapper-grafico {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.grafico-pizza {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: conic-gradient(#10b981 0% 54%, #3b82f6 54% 82%, #a855f7 82% 100%);
}

.rotulo-grafico {
  position: absolute;
  font-size: 0.8rem;
  font-weight: 500;
}

.rotulo-alim {
  top: 10px;
  left: 15px;
  color: #10b981;
}
.rotulo-trans {
  bottom: 0px;
  left: 10px;
  color: #3b82f6;
}
.rotulo-lazer {
  bottom: 25px;
  right: 25px;
  color: #a855f7;
}

.categoria-lista {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.categoria-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
}

.categoria-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #334155;
}

.ponto {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  &.verde {
    background-color: #10b981;
  }
  &.azul {
    background-color: #3b82f6;
  }
  &.roxo {
    background-color: #a855f7;
  }
}

/* Diagnóstico */
.lista-alertas {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-alerta {
  padding: 14px 18px;
  border-radius: 8px;
  font-size: 0.9rem;
  border-left: 4px solid;

  &.alerta-verde {
    background-color: #ecfdf5;
    border-color: #10b981;
    color: #065f46;
  }

  &.alerta-laranja {
    background-color: #fffbe1;
    border-color: #f59e0b;
    color: #92400e;
  }
}

/* Rodapé */
.rodape {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #94a3b8;
  font-size: 0.85rem;
  margin-top: 12px;
}
</style>
