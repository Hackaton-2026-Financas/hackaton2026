<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <aside class="sidebar">
        <nav>
            <h2><RouterLink to="/">Home</RouterLink></h2>
            <h2><RouterLink to="/dashBoard">DashBoard</RouterLink></h2>
            <h2><RouterLink to="/metas">Metas</RouterLink></h2>
            <h2><RouterLink to="/contas">Contas</RouterLink></h2>
            <h2><RouterLink to="/relatorio">Relatório</RouterLink></h2>
            <h2><RouterLink to="/about">Sobre Nós</RouterLink></h2>
        </nav>
    </aside>
</template>

<style scoped>
/* --- ESTILOS DA SIDEBAR --- */
.sidebar {
    position: fixed;
    top: 60px;    
    left: 0;
    width: 160px;          
    height: calc(100vh - 60px);
    background: #fff;
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
    transition: 0.3s;
    padding: 5px;
    border-radius: 5px;
}

a:hover {
    color: #059669; 
    background: rgb(236, 230, 230);
    padding: 4px;
    transition: 0.3s;
}

.router-link-active {
    transition: 0.3s;
    font-weight: bold;
    background: #059669;
    color: #fff
}
</style>