<script setup>
<<<<<<< HEAD

defineProps({
  titulo: String,
  categoria: String,
  valor: String,
  vencimento: String,
  status: String
})

defineEmits(['remover'])

=======
import { RouterLink } from 'vue-router';
import { saldoTotal, formatarMoeda } from '@/store/transacoes.js';
>>>>>>> ccb43a19e608c9b4632670fdf203fea3fbc3f903
</script>


<template>
<<<<<<< HEAD

  <article
    class="card"
    :class="{
      atrasada: status === 'atrasada',
      pendente: status === 'pendente',
      paga: status === 'paga'
    }"
  >

    <div class="card-topo">

      <h3>{{ titulo }}</h3>

    </div>


    <span class="categoria">
      {{ categoria }}
    </span>


    <div class="informacao">
      <span class="icone">＄</span>
      <strong>{{ valor }}</strong>
    </div>


    <div
      class="vencimento"
      :class="{
        'vencimento-atrasado': status === 'atrasada'
      }"
    >

      <span class="calendario">▣</span>

      <span>{{ vencimento }}</span>

        <p v-if="status === 'atrasada'"> </p>
          (Atrasada!)
       

     

    </div>

  </article>

=======
    <header class="top-header">
        <div class="logo-container">
            <RouterLink to="/">
                <img src="#" alt="logo">
            </RouterLink>
        </div>
        <h2 class="saldoAtual">Saldo atual: {{ formatarMoeda(saldoTotal) }}</h2>
    </header>
>>>>>>> ccb43a19e608c9b4632670fdf203fea3fbc3f903
</template>


<style scoped>
<<<<<<< HEAD

/* =========================
   CARD
========================= */

.card {
  width: 100%;

  box-sizing: border-box;

  background: #ffffff;

  border-radius: 12px;

  padding: 20px;

  min-height: 150px;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
=======
.top-header {
    position: fixed;
    top: 0;
    left: 0;       
    right: 0;   
    height: 60px; 
    background: #f8f8f8;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    padding: 0 24px;
    box-sizing: border-box;
    z-index: 100;
    color: #000;
>>>>>>> ccb43a19e608c9b4632670fdf203fea3fbc3f903
}


/* ATRASADA */

.card.atrasada,
.card.pendente {
  border: 2px solid #ffb1b7;
}

<<<<<<< HEAD

/* PAGA */

.card.paga {
  border: 1px solid #cfd8e3;
=======
.saldoAtual {
    font-size: 16px; 
    font-weight: 600;
>>>>>>> ccb43a19e608c9b4632670fdf203fea3fbc3f903
}


/* =========================
   TOPO
========================= */

.card-topo {
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
}


.card h3 {
  margin: 0;

  color: #263b55;

  font-size: 16px;
  font-weight: 700;
}


/* =========================
   LIXEIRA
========================= */

.botao-lixeira {
  background: transparent;

  border: none;

  padding: 4px;

  color: #94a3b8;

  font-size: 16px;

  cursor: pointer;

  transition: 0.2s;
}


.botao-lixeira:hover {
  color: #dc3545;

  transform: scale(1.1);
}


/* =========================
   CATEGORIA
========================= */

.categoria {
  display: inline-block;

  background: #f1f5f9;

  color: #64748b;

  padding: 5px 10px;

  border-radius: 4px;

  font-size: 12px;

  margin-bottom: 14px;
}


/* =========================
   VALOR
========================= */

.informacao {
  display: flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 12px;

  color: #263b55;
}


.informacao strong {
  font-size: 14px;
}


.icone {
  font-size: 18px;

  color: #475569;
}


/* =========================
   VENCIMENTO
========================= */

.vencimento {
  display: flex;

  align-items: center;

  gap: 9px;

  color: #64748b;

  font-size: 14px;
}


.calendario {
  font-size: 16px;

  color: #475569;
}


.vencimento-atrasado {
  color: #c83442;
}

</style>