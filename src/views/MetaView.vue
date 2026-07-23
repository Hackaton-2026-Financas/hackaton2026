<script setup>
</script>

<template>
    <div class="container">
        <header>
            <div class="fabrica">
                <h2>
                    Fábrica de Metas🎯
                </h2>
                <p>
                    Crie e acompanhe seus objetivos financeiro aqui
                </p>
                <button class="nova">
                    + Nova meta
                </button>

            </div>
        </header>
        <main>
            <div class="metas">
                <h3>
                    Nehuma meta criada ainda
                </h3>
                <p>
                    Comece criando sua primeira meta financeira!
                </p>
                <button class="criar">
                    + Criar primeira meta
                </button>
            </div>
        </main>


    </div>

</template>

<style scoped>
.container h2, h3, p{
    color: black;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
}

.fabrica h2 {
    margin: 0;
    font-size: 32px;
    color: white;
}

.fabrica p {
    margin-top: 8px;
    color: #bcbcbc;
    font-size: 17px;
}

.nova {
    background: #2ac08e;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: .2s;
}

.nova:hover {
    background: #00b56f;
}

.metas {
    background: white;
    border-radius: 15px;
    padding: 10vw 5vw;

    /*tem que arrumar o cabeçalho pra arrumar o card de metas!!!
    /*box-shadow: DEPOIS ARRUMO; */
    text-align: center;
}


.metas h3 {
    margin-bottom: 10px;
}

.metas p {
    color: #666;
    margin-bottom: 20px;
}

.criar {
    background: #00d084;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;    
}

.criar:hover {
    background: #00b56f;
}

</style>