<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="header">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dashBoard">DashBoard</RouterLink>
        <RouterLink to="/metas">Metas</RouterLink>
        <RouterLink to="/simulador">Simulador</RouterLink>
        <RouterLink to="/contas">Contas</RouterLink>
        <RouterLink to="/relatorio">Relatório</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </div>
</template>
<style scoped>
.header{
    background: #fff;
    padding: 1vw;
}
</style>