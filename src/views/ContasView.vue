<script setup>


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
    <!-- Contas a pagar -->
    <section>
      <div class="naopagas">
        <h2>A Pagar</h2>
        <p>2 Contas</p>
        <p>Total</p>
        <h3>R$ 249,90</h3>
      </div>

      <div class="card">
        <h3>Energia Elétrica</h3>
        <p>Utilidades</p>
        <p>R$ 150,00</p>
        <p>24/06/2026</p>
        <span>Atrasada!</span>
      </div>

      <div class="card">
        <h3>Internet</h3>
        <p>Utilidades</p>
        <p>R$ 99,90</p>
        <p>19/06/2026</p>
        <span>Atrasada!</span>
      </div>
    </section>

    <!-- Contas pagas -->
    <section>
      <div class="pagas">
        <h2>Pagas</h2>
        <p>1 Conta</p>
        <p>Total</p>
        <h3>R$ 1.200,00</h3>
      </div>

      <div class="card">
        <h3>Aluguel</h3>
        <p>Moradia</p>
        <p>R$ 1.200,00</p>
        <p>09/06/2026</p>
      </div>
    </section>
  </main>
</template>


<style scoped>

/* Cabeçãlho */

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


/* == Botão == */

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


/* == Área principal == */

main {
  width: 100%;
  box-sizing: border-box;

  padding: 0 40px 40px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}


/* Caixas Principal */

main section {
  width: 100%;
  box-sizing: border-box;

  padding: 22px;

  border-radius: 16px;

  display: flex;
  flex-direction: column;

  gap: 14px;
}


/* A pagar */

main section:first-child {
  background-color: #fff9df;
  border: 1px solid #f3d45c;
}


/* Pagas */

main section:last-child {
  background-color: #ecfff7;
  border: 1px solid #8de0c2;
}


/*  Cabeçalho das Caixas */

.naopagas
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


/* Total */

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


/* Ícones dos Títulos */

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


/* Cartões */

.card {
  width: 100%;
  box-sizing: border-box;

  background-color: white;

  border-radius: 11px;

  padding: 17px;

  min-height: 130px;
}

/* Cartões atrasados */

.card1,
.card {
  border: 1px solid #ff9b9b;
}


/* Cartão pago */

.card3 {
  border: 1px solid #b8e5d5;
}


/* Títulos dos Cartões */

.card1 h3,
.card h3,
.card3 h3 {
  margin: 0 0 8px;

  color: #172b4d;

  font-size: 16px;
  font-weight: 700;
}


/* Informações */

.card1 p,
.card p,
.card3 p {
  margin: 6px 0;

  color: #64748b;

  font-size: 13px;
}


/* Valor */

.card1 p:nth-of-type(2),
.card p:nth-of-type(2),
.card3 p:nth-of-type(2) {
  color: #172b4d;

  font-size: 14px;
  font-weight: 700;
}


/* Data */

.card1 p:nth-of-type(3),
.card p:nth-of-type(3),
.card3 p:nth-of-type(3) {
  color: #64748b;

  font-size: 12px;
}


/* Atrasada */

.card1 span,
.card span {
  display: inline-block;

  margin-top: 3px;

  padding: 4px 8px;

  border-radius: 5px;

  background-color: #ffe5e5;

  color: #e53935;

  font-size: 11px;
  font-weight: 600;
}


/*  Espaçamento entre Cartões */

.card1 + .card {
  margin-top: 0;
}

</style>








