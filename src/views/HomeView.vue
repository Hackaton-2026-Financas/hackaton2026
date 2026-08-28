<template>
  <main class="home">

    <section class="hero">

      <div class="hero-text">

        <span class="tag">
          Educação financeira para todos
        </span>

        <h1>
          Aprenda Hoje,<br>
          conquiste o <span>amanhã</span>
        </h1>

        <p>
          No FinancePro, você aprende, pratica e evolui suas
          finanças de forma simples, interativa e gratuita.
        </p>

        <div class="botoes">
          <button class="botao-principal">
            Criar conta Grátis →
          </button>

          <button class="botao-secundario">
            Explorar plataforma
          </button>
        </div>

      </div>

      <div class="imagem-home">
        <img src="/imgs/Capturadetelade2026-07-0312-45-551.jpg" alt="Dashboard FinancePro">
      </div>

    </section>


    <section class="cards">

      <div class="card">

        <h2>Dashboard</h2>
        <p>
          Ela serve para o usuário monitorar sua saúde financeira rapidamente, mostrando o saldo atual (R$), e o total de receitas e despesas do mês, um gráfico de evolução do patrimônio de janeiro a junho e o histórico das últimas movimentações bancárias.
        </p>

      </div>


      <div class="card">

        <h2>Metas</h2>

        <p>
  Serve para ajudar o usuário a planejar e alcançar seus objetivos financeiros.
        </p>

        <p>
          Em suma, ela funciona em três etapas:
        </p>

        <ol>
          <li>Definição</li>
          <li>Acompanhamento</li>
          <li>Foco</li>
        </ol>

      </div>


      <div class="card">

        <h2>Contas</h2>

        <p>
          Foi desenvolvido para facilitar o controle das suas
          finanças de forma simples, intuitiva e visual. Com ele,
          você acompanha todas as suas contas em um único lugar,
          separando facilmente o que ainda precisa ser pago do
          que já foi quitado.
        </p>

      </div>




      <div class="card">

        <h2>Relatório</h2>

        <p>
          Visualize um resumo das suas receitas, despesas e resultados,
          facilitando a análise dos seus hábitos e ajudando você a
          identificar onde pode melhorar.
        </p>

      </div>

    </section>

  </main>
</template>


<style scoped>

* {
  box-sizing: border-box;
}
.home {
  width: 100%;
  padding: 25px 30px 40px;
  font-family: Arial, Helvetica, sans-serif;
  color: #111;
}
.hero {
  min-height: 275px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid #ddd;
  padding: 60px 15px 30px;
}
.hero-text {
  max-width: 520px;
}
.tag {
  display: inline-block;
  padding: 7px 13px;
  background: #eeeeee;
  color: #00a878;
  border-radius: 6px;
  font-weight: bold;
  margin-bottom: 20px;
}
.hero h1 {
  font-size: 31px;
  line-height: 1.05;
  margin: 0 0 15px;
}
.hero h1 span {
  color: #00b987;
}
.hero p {
  color: #555;
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 25px;
}
.botoes {
  display: flex;
  gap: 10px;
}
button {
  font-size: 15px;
  padding: 11px 18px;
  border-radius: 9px;
  cursor: pointer;
}
.botao-principal {
  background: #00b987;
  border: none;
  color: white;
  font-weight: bold;
}
.botao-secundario {
  background: white;
  border: 1px solid #ccc;
}
.imagem-home {
  width: 390px;
  height: 220px;
  border-radius: 50%;
  background: #126978;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.imagem-home img {
  width: 80%;
  height: auto;
  background: white;
  border-radius: 8px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  padding: 25px 15px;
}
.card {
  min-height: 220px;
  padding: 15px;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  background: white;
}
.icone {
  font-size: 27px;
  color: #00b987;
  margin-bottom: 5px;
}
.card h2 {
  display: inline;
  font-size: 20px;
  margin-left: 5px;
}
.card span {
  display: block;
  color: #00b987;
  font-weight: bold;
  font-size: 13px;
  margin: 3px 0 10px 38px;
}
.card p {
  font-size: 13px;
  line-height: 1.4;
  font-weight: 500;
  margin: 8px 0;
}
.card ol {
  padding-left: 20px;
  font-size: 13px;
  font-weight: bold;
  line-height: 1.5;
}
@media (max-width: 900px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
  }
  .imagem-home {
    width: 100%;
    max-width: 390px;
  }
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .home {
    padding: 20px;
  }
  .cards {
    grid-template-columns: 1fr;
  }
  .hero h1 {
    font-size: 27px;
  }
  .botoes {
    flex-direction: column;
  }
}
</style>