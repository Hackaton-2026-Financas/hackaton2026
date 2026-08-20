<script setup>
import { RouterLink } from 'vue-router';
import { saldoTotal, formatarMoeda } from '@/store/transacoes.js';
</script>

<template>
    <header class="top-header">
        <div class="logo-container">
            <RouterLink to="/">
                <img src="@/assets/img/logoFinancePro.jpeg" alt="logo">
            </RouterLink>
        </div>
        <h2 class="saldoAtual">Saldo atual: {{ formatarMoeda(saldoTotal) }}</h2>
    </header>
</template>

<style scoped>
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
}

.logo-container img {
    display: block;
    max-height: 40px;
}

.saldoAtual {
    font-size: 16px; 
    font-weight: 600;
    color: #059669;
}
</style>