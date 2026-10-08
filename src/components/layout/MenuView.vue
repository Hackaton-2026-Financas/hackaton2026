<script setup>
import { RouterLink } from 'vue-router';
import { inject } from 'vue';
import { useRouter } from 'vue-router'
import { usuarioAtual, sair } from '@/store/auth'

const estaLogado = inject("estaLogado")
const router = useRouter()

async function encerrarSessao() {
    try {
        await sair()
        router.push('/login')
    } catch (error) {
        router.push('/login')
        window.alert(error.message)
    }
}
</script>

<template>
    <aside class="sidebar">
        <nav>
            <h2><RouterLink to="/">Home</RouterLink></h2>
            <h2><RouterLink to="/dashBoard">DashBoard</RouterLink></h2>
            <h2><RouterLink to="/metas">Metas</RouterLink></h2>
            <h2><RouterLink to="/contas">Contas</RouterLink></h2>
            <h2><RouterLink to="/relatorio">Relatório</RouterLink></h2>
            <h2><RouterLink to="/trilha">Trilha</RouterLink></h2>
            <h2><RouterLink to="/glossario">Glossario</RouterLink></h2>
            <h2><RouterLink to="/about">Sobre Nós</RouterLink></h2>
            <h2 v-if="!estaLogado">
                <RouterLink to="/login">Login</RouterLink>
            </h2>
            <div v-else class="sessao">
                <span>{{ usuarioAtual.name }}</span>
                <button type="button" @click="encerrarSessao">Sair</button>
            </div>
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

.sessao {
    display: grid;
    gap: 8px;
    color: #475569;
    font-size: 14px;
    overflow-wrap: anywhere;
}

.sessao button {
    width: fit-content;
    padding: 6px 12px;
    border: 0;
    border-radius: 5px;
    background: #f1f5f9;
    color: #334155;
    cursor: pointer;
}

.router-link-active {
    transition: 0.3s;
    font-weight: bold;
    background: #059669;
    color: #fff
}
</style>