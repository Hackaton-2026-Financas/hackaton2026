<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <header class="top-header">
        <div class="logo-container">
            <RouterLink to="/">
                <img src="#" alt="logo">
            </RouterLink>
            <h2>*Saldo atual:00,00*</h2>
        </div>
    </header>

    <aside class="sidebar">
        <nav>
            <h2><RouterLink to="/">Home</RouterLink></h2>
            <h2><RouterLink to="/dashBoard">DashBoard</RouterLink></h2>
            <h2><RouterLink to="/metas">Metas</RouterLink></h2>
            <h2><RouterLink to="/simulador">Simulador</RouterLink></h2>
            <h2><RouterLink to="/contas">Contas</RouterLink></h2>
            <h2><RouterLink to="/relatorio">Relatório</RouterLink></h2>
            <h2><RouterLink to="/about">About</RouterLink></h2>
        </nav>
    </aside>
</template>

<style scoped>
/* --- ESTILOS DO HEADER --- */
.top-header {
    position: fixed;
    top: 0;
    left: 0;       right: 0;   
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
    display: flex;
    justify-content: space-between;
}

/* --- ESTILOS DA SIDEBAR --- */
.sidebar {
    position: fixed;
    top: 60px;    
    left: 0;
    width: 160px;          
    height: calc(100vh - 60px);
    background: #f8f8f8;
    z-index: 99;   
    padding: 24px 16px;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
}

nav {
    display: flex;
    flex-direction: column;
    gap: 20px;             
    align-items: flex-start;
}

h1, h2 {
    margin: 0;
}

a {
    text-decoration: none;
    color: gray;
    font-size: 16px;
    display: block;
    width: 100%;
}

a:hover {
    color: #333; 
}

.router-link-active {
    font-weight: bold;
    color: #000;
}
</style>