<script setup>

defineProps({
  titulo: String,
  categoria: String,
  valor: String,
  vencimento: String,
  status: String
})

defineEmits(['remover'])

</script>


<template>

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

      <button
        class="botao-lixeira"
        @click="$emit('remover')"
        aria-label="Remover conta"
      >
        🗑
      </button>

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

</template>


<style scoped>

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
}


/* ATRASADA */

.card.atrasada,
.card.pendente {
  border: 2px solid #ffb1b7;
}


/* PAGA */

.card.paga {
  border: 1px solid #cfd8e3;
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