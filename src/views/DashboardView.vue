:
<script setup>
// FUTURO: Aqui entrarão os imports, reatividade (ref/computed) e tals. e vamo ter q fazer as funções,mas provalvelmente vai ser tudo componentizado eu acho
</script>

<template>
  <main class="dashboard-container">
    <section class="welcome-header">
      <h1>Bem-vindo de volta!</h1>
      <p>Aqui está um resumo das suas finanças</p>
    </section>

    <section class="cards-saldos">
      <div class="card card-green">
        <!-- nem sabia que isso era possivel -->

        <div class="card-dinheiro">
          <span>Saldo Total</span>
          <h2>R$ 5.000,00</h2>
        </div>

        <div class="card-icone">$</div>
      </div>

      <div class="card">
        <div class="card-dinheiro">
          <span>Receitas do Mês</span>
          <h2 class="text-green">R$ 5.300,00</h2>
          <small class="text-green">+ Entradas</small>
        </div>

        <div class="card-icone icone-verde">+</div>
      </div>

      <div class="card">
        <div class="card-dinheiro">
          <span>Despesas do Mês</span>
          <h2 class="text-red">R$ 650,00</h2>
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
        <p>
          Gráfico interativo será integrado aqui na etapa [DA-06] e como que faz um esse diacho de
          grafico???
        </p>
      </div>
    </section>

    <section class="section-box">
      <div class="section-header">
        <h2>Últimas Movimentações</h2>
        <button class="btn-primario">+ Nova Transação</button>
      </div>

      <div class="transactions-list">
        <div class="transaction-item">
          <div class="item-info">
            <div class="badge icone-verde">+</div>

            <div>
              <h3>Salário Mensal</h3>
              <small>Salário</small>
            </div>
          </div>

          <div class="item-valor">
            <strong class="text-green">+ R$ 4.500,00</strong>
            <small>05/07/2026</small>
          </div>
        </div>

        <div class="transaction-item">
          <div class="item-info">
            <div class="badge icone-vermelho">-</div>

            <div>
              <h3>Supermercado</h3>
              <small>Alimentação</small>
            </div>
          </div>

          <div class="item-valor">
            <strong class="text-red">- R$ 350,00</strong>
            <small>08/07/2026</small>
          </div>
        </div>

        <div class="transaction-item">
          <div class="item-info">
            <div class="badge icone-vermelho">-</div>

            <div>
              <h3>Combustível</h3>
              <small>Transporte</small>
            </div>
          </div>

          <div class="item-valor">
            <strong class="text-red">- R$ 180,00</strong>
            <small>10/07/2026</small>
          </div>
        </div>
      </div>
    </section>
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
  ); /* nao tava conseguindo deixar um do lado do outro e pedi "ajudinha"*/

  gap: 20px;
  margin-bottom: 25px;
}

.card {
  /* precisamos componentizar esses cards pra  nao ter dor de cabeça*/
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

/* BOTÃO DE AÇÃO */

.btn-primario {
  background-color: #00875a;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

/* LISTA DE TRANSAÇÕES */

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

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

/* Por que choras sor Kennedy? */
</style>
