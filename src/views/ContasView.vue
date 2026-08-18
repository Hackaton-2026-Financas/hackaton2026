<script setup>


</script>

<template>
<main class="main">
  <section>
    <div class="contas">
      <h1>Gerenciador de Contas</h1>
      <p>Arraste e solte suas contas para organizá-las</p>
    </div>

    <button>+ Nova Conta</button>
  </section>

  
  
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

.main {
  padding: 35px;
  min-height: calc(100vh - 60px);
  margin-left: 160px; /* espaço para a sidebar fixa */
  margin-top: 60px; /* espaço para o header fixo */
  background-color: #f8fafc;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}


.main > section:first-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;  
}


.contas h1 {
  margin: 0;
  color: #27364a;
  font-size: 28px;
}


.contas p {
  color: #64748b;
  margin-top: 8px;
}


button {
  background-color: #159b83;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 14px;
}


main > section:nth-of-type(2) {
  width: 45%;
  min-height: 390px;
  display: inline-block;
  vertical-align: top;
  background-color: #fffdf4;
  border: 1px solid #f1cf69;
  border-radius: 15px;
  padding: 20px;
  margin-right: 20px;
}


main > section:nth-of-type(3) {
  width: 45%;
  min-height: 390px;
  display: inline-block;
  vertical-align: top;
  background-color: #f2fffb;
  border: 1px solid #9de0cf;
  border-radius: 15px;
  padding: 20px;
}


.naopagas,
.pagas {
  position: relative;
  margin-bottom: 20px;
}


.naopagas h2,
.pagas h2 {
  margin: 0;
  color: #334155;
  font-size: 18px;
}


.naopagas p:first-of-type,
.pagas p:first-of-type {
  margin: 5px 0;
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
  top: 20px;
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
}


.card {
  background-color: white;
  border: 1px solid #dce3ea;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
}


main > section:nth-of-type(2) .card {
  border-color: #ff9aa2;
}


.card h3 {
  margin: 0 0 10px;
  color: #334155;
  font-size: 16px;
}


.card p {
  margin: 10px 0;
  color: #475569;
  font-size: 14px;
}


.card p:first-of-type {
  display: inline-block;
  margin: 0;
  padding: 5px 8px;
  background-color: #eef2f6;
  color: #64748b;
  border-radius: 4px;
  font-size: 12px;
}


.card p:nth-of-type(2) {
  margin-top: 16px;
  font-weight: bold;
}


.card p:nth-of-type(3) {
  margin-bottom: 0;
}


.card span {
  color: #e63946;
  font-size: 13px;
  font-weight: bold;
}


</style>








