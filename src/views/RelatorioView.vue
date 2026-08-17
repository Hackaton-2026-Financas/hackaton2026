<script setup>
import { ref } from 'vue'
const score = ref(85)
const scoreDescription = ref("Excelente")
</script>

<template>

<section class="topo">
    <div>
        <h1>Relatório de Saúde Financeira</h1>
        <h2>Análise completa das suas finanças</h2>
    </div>
    <div>
        <button>Exportar PDF</button>
    </div>
</section>
<section class="main">
    <section class="score">
        <h2>Score de Saúde Financeira</h2>
        <div>
            <p id="score">{{ score }}</p>
            <p>{{ scoreDescription }}</p>
        </div>
    </section>
    <section class="cards">
      <ul>
        <li>
          <p>Saldo Atual</p>
          <p id="number">R$ 5.000,00</p>
        </li>
        <li>
          <p>Receitas/Mês</p>
          <p id="number">R$ 5.300,00</p>
        </li>
        <li>
          <p>Despesas/Mês</p>
          <p id="number">R$ 650,00</p>
        </li>
        <li>
          <p>Taxa Poupança</p>
          <p id="number">87.7%</p>
        </li>
      </ul>
    </section>
    <section class="despesasCategorias">
      <h2>Despesas por Categorias</h2>
      <section>
        <div class="graficoPizza">
        </div>
        <div class="categorias">
          <ul class="categoria-lista">
            <li class="categoria-item categoria-verde">
              <p>
                Alimentaçao
              </p>
              <p> R$350,00 </p>
            </li>
            <li class="categoria-item categoria-azul">
              <p>
                Transporte
              </p>
              <p>R$180,00</p>
            </li>
            <li class="categoria-item categoria-amarelo">
              <p>
                Lazer
              </p>
              <p>R$150,00</p>
            </li>
          </ul>
        </div>
      </section>
    </section>
</section>


</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

body {
  background-color: #F4F7F9;
}

section.topo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 20px;
    color: #112233;
    font-family: "Open Sans", sans-serif;
    width: 100%;
    box-sizing: border-box;
}

.topo h1 {
    font-weight: 600;
    font-size: 2rem;
    margin: 0;
    margin-bottom: 0.3vw;
}

.topo h2 {
    font-size: 1rem;
    font-weight: 300;
}

.topo button {
    background-color: #00a878;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 15px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.topo button:hover {
    background-color: #008f65;
}

section.main {
    display: block;
    background-color: #ffffff;
    align-items: center;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    border-radius: 12px;
    padding: 20px;
}
section.score {
    padding: 20px;
    background-color: #e9ece9;
    border-radius: 12px;
    width: 100%;
        color: #112233;
    box-sizing: border-box;
    border: 1px solid #c1d9c7;
}
.score div {
    display: flex;
    align-items: center;
    gap: 20px;
    min-height: 80px;
}

.score div p#score {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    line-height: 1;
}

.score div p:last-child {
    margin: 0;
    align-self: center;
    line-height: 1.2;
}
section.cards {
    margin-top: 20px;
}

.cards ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.cards li {
    flex: 1 1 220px;

    border: 1px solid #dfeee4;
    color: #112233;
    border-radius: 12px;
    padding: 16px 18px;
    align-items: center;
    gap: 12px;
}

.cards li p {
    margin: 0;
}
.cards li p#number {
    font-size: 1.5rem;
    font-weight: 600;
}

.despesasCategorias {
    margin-top: 20px;
    border: 1px solid #dfeee4;
    border-radius: 12px;
    padding: 16px 18px;
    color: #112233;
}
.despesasCategorias h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 12px;
}
.despesasCategorias .categoria-lista {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.despesasCategorias .categoria-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-left: 20px;
  line-height: 1.4;
}

.despesasCategorias .categoria-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #00a878;
}

</style>
