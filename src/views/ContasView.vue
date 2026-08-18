<script setup>
import contaCard from '../components/layout/contasComponentes/contaCard.vue';
</script>

<template>
  <header>
    <div class="contas">
      <h1>Gerenciador de Contas</h1>
      <p>Arraste e solte suas contas para organizá-las</p>
    </div>

    <button>+ Nova Conta</button>
  </header>

  <main>
  
    <section>
      <div class="naopagas">
        <h2>A Pagar</h2>
        <p>2 Contas</p>
        <p>Total</p>
        <h3>R$ 249,90</h3>
      </div>

      <contaCard
        titulo="Energia Elétrica"
        categoria="Utilidades"
        valor="R$ 150,00"
        vencimento="24/06/2026"
        status="atrasada"
      />

      <contaCard
        titulo="Internet"
        categoria="Utilidades"
        valor="R$ 99,90"
        vencimento="19/06/2026"
        status="atrasada"
      />
    </section>

  
    <section>
      <div class="pagas">
        <h2>Pagas</h2>
        <p>1 Conta</p>
        <p>Total</p>
        <h3>R$ 1.200,00</h3>
      </div>

      <contaCard
        titulo="Aluguel"
        categoria="Moradia"
        valor="R$ 1.200,00"
        vencimento="09/06/2026"
        status="paga"
      />
    </section>
  </main>
</template>

<style scoped>



header {
  width: 100%;
  box-sizing: border-box;
  padding: 35px 40px 25px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.contas h1 {
  margin: 0;
  color: #172b4d;
  font-size: 30px;
  font-weight: 700;
}

.contas p {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 14px;
}




header button {
  background: #00b386;
  color: white;

  border: none;
  border-radius: 8px;

  padding: 12px 18px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
}

header button:hover {
  background: #009b75;
}




main {
  width: 100%;
  box-sizing: border-box;

  padding: 0 40px 40px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}




main section {
  width: 100%;
  box-sizing: border-box;

  padding: 22px;

  border-radius: 16px;

  display: flex;
  flex-direction: column;

  gap: 14px;
}




main section:first-child {
  background-color: #fff9df;
  border: 1px solid #f3d45c;
}




main section:last-child {
  background-color: #ecfff7;
  border: 1px solid #8de0c2;
}



.naopagas,
.pagas {
  position: relative;

  min-height: 55px;
}

.naopagas h2,
.pagas h2 {
  margin: 0;

  color: #172b4d;

  font-size: 19px;
  font-weight: 700;
}

.naopagas p,
.pagas p {
  margin: 4px 0;

  color: #64748b;

  font-size: 13px;
}




.naopagas p:nth-of-type(2),
.pagas p:nth-of-type(2) {
  position: absolute;

  right: 0;
  top: 0;

  margin: 0;

  color: #64748b;
  font-size: 12px;
}

.naopagas h3,
.pagas h3 {
  position: absolute;

  right: 0;
  top: 17px;

  margin: 0;

  color: #172b4d;

  font-size: 16px;
  font-weight: 700;
}




.naopagas h2::before {
  content: "◷";

  margin-right: 8px;

  color: #f59e0b;
}

.pagas h2::before {
  content: "✓";

  margin-right: 8px;

  color: #00a878;
}




.card1,
.card2,
.card3 {
  width: 100%;
  box-sizing: border-box;

  background-color: white;

  border-radius: 11px;

  padding: 17px;

  min-height: 130px;
}



.card1,
.card2{
  border: 1px solid #ff9b9b;
}




.card2 {
  border: 1px solid #b8e5d5;
}




.card1 h3,
.card2 h3,
.card3 h3 {
  margin: 0 0 8px;

  color: #172b4d;

  font-size: 16px;
  font-weight: 700;
}




.card1 p,
.card2 p,
.card3 p {
  margin: 6px 0;

  color: #64748b;

  font-size: 13px;
}




.card1 p:nth-of-type(2),
.card2 p:nth-of-type(2),
.card3 p:nth-of-type(2) {
  color: #172b4d;

  font-size: 14px;
  font-weight: 700;
}




.card1 p:nth-of-type(3),
.card2 p:nth-of-type(3),
.card3 p:nth-of-type(3) {
  color: #64748b;

  font-size: 12px;
}




.card1 span,
.card2 span {
  display: inline-block;

  margin-top: 3px;

  padding: 4px 8px;

  border-radius: 5px;

  background-color: #ffe5e5;

  color: #e53935;

  font-size: 11px;
  font-weight: 600;
}


/* Espaçamento entre Cartões */

.card1 + .card2 {
  margin-top: 0;
}

</style>