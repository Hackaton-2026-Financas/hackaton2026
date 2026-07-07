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
            <p>{{ score }}</p>
            <p>{{ scoreDescription }}</p>
        </div>
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
    padding: 2vw;
    color: #112233;
    font-family: "Open Sans", sans-serif;

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
    background-color: #ffffff;
    align-items: center;
    margin: 2vw;
}
</style>