<script setup>
import { RouterLink } from 'vue-router';
import { formatarMoeda, saldoTotal } from '@/store/transacoes';
</script>

<template>
    <header class="top-header">
        <div class="logo-container">
            <RouterLink to="/">
                <h1>FinancePro</h1>
            </RouterLink>
          
        </div>
        <h2 class="saldoAtual"> {{ formatarMoeda(saldoTotal) }}</h2>
    </header>

</template>

<style scoped>
.top-header {
    position: fixed;
    top: 0;
    left: 0;       right: 0;   
    height: 60px; 
    background: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    padding: 0 24px;
    box-sizing: border-box;
    z-index: 100;
    color: #000;
}

.logo-container a {
    text-decoration: none;
    color: #059669;
}

.logo-container h1 {
    color: #059669;
}
.saldoAtual{
    font-size: 16px; 
    font-weight: 600;
    color: #059669;
}
</style>