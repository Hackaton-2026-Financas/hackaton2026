<template>
  <main class="conteudo">

    <h1>Sobre Nós</h1>

    <p class="subtitulo">
      Conheça a missão do FinancePro e nossa equipe.
    </p>

    <!-- CARDS -->
    <section class="grid">

      <div class="card">
        <h2>Nossa missão</h2>

        <p>
          Tornar a educação financeira acessível,
          prática e divertida para qualquer pessoa.
          Acreditamos que pequenas decisões conscientes
          podem transformar o futuro financeiro de
          milhares de brasileiros.
        </p>
      </div>


      <div class="card">
        <h2>O que você encontra na plataforma</h2>

        <p>
          - Conteúdos educativos<br>
          - Simuladores financeiros<br>
          - Desafios e quizzes<br>
          - Acompanhamento do progresso<br>
          - Dicas de investimento e planejamento
        </p>
      </div>


      <div class="card">
        <h2>Como surgiu</h2>

        <p>
          O FinancePro nasceu da ideia de facilitar o
          aprendizado sobre finanças pessoais por meio
          de uma plataforma moderna e intuitiva.
          Nosso objetivo é unir educação, tecnologia e
          interatividade para ajudar pessoas a
          desenvolverem hábitos financeiros saudáveis.
        </p>
      </div>


      <div class="card">
        <h2>Nossos Valores</h2>

        <div class="valores">

          <div>
            <strong>Compromisso</strong>
            <p>Oferecer conteúdo confiável e atualizado.</p>
          </div>

          <div>
            <strong>Transparência</strong>
            <p>Ensinar finanças de forma simples.</p>
          </div>

          <div>
            <strong>Inovação</strong>
            <p>Criar ferramentas para facilitar o aprendizado.</p>
          </div>

          <div>
            <strong>Acessibilidade</strong>
            <p>Educação financeira para todos.</p>
          </div>

        </div>
      </div>

    </section>


    <!-- EQUIPE -->
    <section class="secao">

      <h2 class="titulo-secao">
        👥 Equipe FinancePro
      </h2>

      <p class="texto-equipe">
        Somos desenvolvedores, designers e estudantes apaixonados
        por tecnologia e educação. Trabalhamos para construir uma
        plataforma intuitiva, segura e que realmente ajude nossos
        usuários a alcançarem seus objetivos financeiros.
      </p>


      <div class="equipe">

        <div class="pessoa azul">
          <img src="/images/arthur.jpeg" class="foto">
          <p>Arthur</p>
          <span>16 anos</span>
          <span>Des. Metas</span>
        </div>

        <div class="pessoa roxo">
          <img src="/images/camilly.jpeg" class="foto">
          <p>Camilly</p>
          <span>18 anos</span>
          <span>Des. contas</span>
        </div>

        <div class="pessoa laranja">
          <img src="/images/irene.png" class="foto">
          <p>Irene</p>
          <span>16 anos</span>
          <span>Des. Home e Sobre nós</span>
        </div>

        <div class="pessoa vermelho">
          <img src="/images/joao.jpg" class="foto">
          <p>João</p>
          <span>16 anos</span>
          <span>Des. DashBoard</span>
        </div>

        <div class="pessoa verde">
          <img src="/images/caio.jpg" class="foto">
          <p>Caio</p>
          <span>17 anos</span>
          <span>Des. Relatório</span>
        </div>

        <div class="pessoa rosa">
          <img src="/images/maico.jpg" class="foto">
          <p>Maico</p>
          <span>16 anos</span>
          <span>Des. Login</span>
        </div>

      </div>

    </section>


    <!-- CONTATO -->
    <section class="contato">

      <h2>Fale conosco</h2>

      <p>Email: contato@financepro.com</p>

      <p>Instagram: @financepro</p>

      <p>Telefone: (00) 00000-0000</p>

    </section>

  </main>
</template>


<style scoped>
* {
  box-sizing: border-box;
}
.conteudo {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 0px;
}
.conteudo h1 {
  display: block;
  font-size: 55px;
  margin: 10 0 0px;
  color: #111;
}
.subtitulo {
  margin: 0 0 18px;
  font-size: 18px;
  color: #555;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.card {
  min-height: 200px;
  background: white;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  padding: 15px;
  position: relative;
}
.card h2 {
  font-size: 20px;
  margin: 0 0 12px;
}
.card > p {
  font-size: 15px;
  line-height: 1.5;
  max-width: 90%;
}
.icone {
  position: absolute;
  right: 20px;
  bottom: 15px;
  font-size: 45px;
}
.valores {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.valores strong {
  font-size: 15px;
}
.valores p {
  font-size: 14px;
  margin: 3px 0 0;
} 
.secao {
  background: white;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  margin-top: 30px;
  padding: 15px;
}
.titulo-secao {
  font-size: 30px;
  margin: 0 0 8px;
}
.texto-equipe {
  font-size: 17px;
  line-height: 1.4;
  margin: 1 auto 25px;
  max-width: 700px;
}
.equipe {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 35px 40px;
  justify-items: center;
}
.pessoa {
  width: 165px;
  height: 275px;
  border-radius: 10px;
  padding: 12px;
  color: white;
  text-align: center;
}
.foto {
  width: 140px;
  height: 170px;
  background: white;
  border-radius: 7px;
  margin: 0 auto 10px;
}
.pessoa p {
  margin: 0;
  font-size: 17px;
}
.pessoa span {
  display: block;
  font-size: 15px;
}
.azul {
  background: linear-gradient(#0636ca, #15c7c7);
}

.roxo {
  background: linear-gradient(#d62ba4, #7724a4);
}

.laranja {
  background: linear-gradient(#ff9c0b, #d43800);
}

.vermelho {
  background: linear-gradient(#ff0000, #7c0000);
}

.verde {
  background: linear-gradient(#00c400, #315d2c);
}

.rosa {
  background: linear-gradient(#c9009b, #b90049);
}
.contato {
  background: white;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  margin-top: 15px;
  padding: 15px;
}
.contato h2 {
  font-size: 30px;
  margin: 0 0 15px;
}
.contato p {
  margin: 10px 0;
  font-size: 17px;
}
@media (max-width: 700px) {
  .conteudo {
    padding: 20px;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .equipe {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 450px) {

  .equipe {
    grid-template-columns: 1fr;
  }

}
</style>