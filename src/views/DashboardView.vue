<script setup>
import { ref } from 'vue';
import ButtonChild from '@/components/ButtonChild.vue';
import TransacaoItem from '@/components/layout/TransacaoItem.vue';

import { 
  transacoes, 
  saldoTotal, 
  receitasTotais, 
  despesasTotais, 
  formatarMoeda 
} from '@/store/transacoes.js';

const exibirModal = ref(false);

const novoTipo = ref('saida');
const novaCategoria = ref('');
const novoValor = ref('');
const novaDescricao = ref('');

const abrirModal = () => {
  exibirModal.value = true;
};

const fecharModal = () => {
  exibirModal.value = false;
  limparFormulario();
};

const limparFormulario = () => {
  novoTipo.value = 'saida';
  novaCategoria.value = '';
  novoValor.value = '';
  novaDescricao.value = '';
};

const adicionarTransacao = () => {
  if (!novaCategoria.value || !novoValor.value || !novaDescricao.value) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  transacoes.value.unshift({
    id: Date.now(),
    titulo: novaDescricao.value,
    categoria: novaCategoria.value,
    valor: Number(novoValor.value), 
    data: new Date().toLocaleDateString('pt-BR'),
    tipo: novoTipo.value
  });

  fecharModal();
};
</script>

<template>
  <main class="dashboard-container">
    <section class="welcome-header">
      <h1>Bem-vindo de volta!</h1>
      <p>Aqui está um resumo das suas finanças</p>
    </section>

    <section class="cards-saldos">
      <div class="card card-green">
        <div class="card-dinheiro">
          <span>Saldo Total</span>
          <h2>{{ formatarMoeda(saldoTotal) }}</h2>
        </div>
        <div class="card-icone">$</div>
      </div>

      <div class="card">
        <div class="card-dinheiro">
          <span>Receitas do Mês</span>
          <h2 class="text-green">{{ formatarMoeda(receitasTotais) }}</h2>
          <small class="text-green">+ Entradas</small>
        </div>
        <div class="card-icone icone-verde">+</div>
      </div>

      <div class="card">
        <div class="card-dinheiro">
          <span>Despesas do Mês</span>
          <h2 class="text-red">{{ formatarMoeda(despesasTotais) }}</h2>
          <small class="text-red">- Saídas</small>
        </div>
        <div class="card-icone icone-vermelho">-</div>
      </div>

      <div class="card">
        <div class="card-dinheiro">
          <span>Metas Ativas</span>
          <h2>0</h2>
          <small>2 contas pendentes</small>
        </div>
        <div class="card-icone icone-azul">0</div>
      </div>
    </section>

    <section class="section-box">
      <h2>Evolução do Patrimônio</h2>
      <div class="grafico">
        <p>Gráfico interativo será integrado aqui na etapa [DA-06] e como que faz um esse diacho de grafico???</p>
      </div>
    </section>

    <section class="section-box">
      <div class="section-header">
        <h2>Últimas Movimentações</h2>
        <ButtonChild @click="abrirModal">
          + Nova Transação
        </ButtonChild>
      </div>

      <div class="transactions-list">
        <TransacaoItem 
          v-for="item in transacoes"
          :key="item.id"
          :titulo="item.titulo"
          :categoria="item.categoria"
          :valor="formatarMoeda(item.valor)" 
          :data="item.data"
          :tipo="item.tipo"
        />

        <p v-if="transacoes.length === 0" class="sem-transacoes">
          Nenhuma transação cadastrada até o momento.
        </p>
      </div>
    </section>

    <!-- MODAL, to começando a enjoar de mexer nessa modal -->
    <div class="modal-fundo" v-show="exibirModal">
      <div class="modal-caixa">
        <div class="modal-cabecalho">
          <h2>Nova Transação</h2>
          <button class="btn-fechar" @click="fecharModal">X</button>
        </div>

        <form class="modal-formulario" @submit.prevent="adicionarTransacao">
          <div class="grupo-input">
            <label>Tipo</label>
            <select v-model="novoTipo">
              <option value="saida">Despesa (Saída)</option>
              <option value="entrada">Receita (Entrada)</option>
            </select>
          </div>

          <div class="grupo-input">
            <label>Categoria</label>
              <select v-model="novaCategoria">
                <option value="" disabled>Selecione uma categoria</option>
                <option value="salario">Salário</option>
                <option value="lazer">Lazer</option>
                <option value="transporte">Transporte</option>
                <option value="alimentacao">Alimentação</option>
                <option value="outros">Outros</option>
              </select>
          </div>

          <div class="grupo-input">
            <label>Valor R$</label>
            <input v-model="novoValor" type="number" step="0.01" placeholder="R$ 0,00" />
          </div>

          <div class="grupo-input">
            <label>Descrição</label>
            <input v-model="novaDescricao" type="text" placeholder="Ex: Compra no supermercado" />
          </div>

          <button type="submit" class="btn-sucesso">
            Adicionar Transação
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.dashboard-container {
  padding: 20px 30px;
  background-color: #f8fafc;
  width: 100%;
  box-sizing: border-box;
}

.welcome-header {
  margin-bottom: 25px;
}
.welcome-header h1 {
  margin: 0;
  font-size: 24px;
}

.welcome-header p {
  margin: 5px 0 0 0;
  color: #64748b;
}

/* GRID DE CARDS */
.cards-saldos {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); 
  gap: 20px;
  margin-bottom: 25px;
}

.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-green {
  background-color: #0a936f;
  color: #ffffff;
  border: none;
}

.card-dinheiro span {
  font-size: 13px;
  color: #64748b;
}
.card-green .card-dinheiro span {
  color: #e2e8f0;
}
.card-dinheiro h2 {
  margin: 8px 0;
  font-size: 22px;
}
.card-dinheiro small {
  font-weight: 600;
}

/* ÍCONES */
.card-icone {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.2);
}

.icone-verde {
  background-color: #d1fae5;
  color: #065f46;
}

.icone-vermelho {
  background-color: #fee2e2;
  color: #991b1b;
}

.icone-azul {
  background-color: #dbeafe;
  color: #1e40af;
}

/* COR DE TEXTO */
.text-green {
  color: #059669;
}

.text-red {
  color: #dc2626;
}

/* section-box (Gráfico e Transações) */
.section-box {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 25px;
}

.section-box h2 {
  margin-top: 0;
  font-size: 18px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

/* ÁREA TEMPORÁRIA DO GRÁFICO */
.grafico {
  height: 200px;
  background-color: #f1f5f9;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

/* LISTA DE TRANSAÇÕES */
.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sem-transacoes {
  text-align: center;
  color: #94a3b8;
  padding: 16px 0;
  font-size: 14px;
}

/* ESTILOS DO MODAL */
.modal-fundo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; 
}

.modal-caixa {
  background-color: #ffffff;
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.modal-cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-cabecalho h2 {
  margin: 0;
  font-size: 18px;
  color: #1e293b;
}

.btn-fechar {
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #64748b;
  cursor: pointer;
}

.modal-formulario {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grupo-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.grupo-input label {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
}

.grupo-input input,
.grupo-input select {
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  outline: none;
}

.grupo-input input:focus,
.grupo-input select:focus {
  border-color: #0a936f;
}

.btn-sucesso {
  margin-top: 10px;
  width: 100%;
  background-color: #0a936f;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-sucesso:hover {
  background-color: #00875a;
}
</style>