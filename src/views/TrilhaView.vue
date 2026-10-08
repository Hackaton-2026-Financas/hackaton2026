<script setup>
import { computed, ref } from 'vue'

const unidades = [
  {
    titulo: 'Unidade 1: Base: porcentagem',
    licoes: [
      {
        titulo: 'Porcentagem',
        explicacao:
          'Porcentagem é uma fração de denominador 100. Para achar p% de um valor, multiplique o valor por p/100.',
        formula: 'p% de V = V × p / 100',
        passos: [
          'Queremos 15% de R$ 240.',
          '15 / 100 = 0,15.',
          '240 × 0,15 = R$ 36.',
        ],
        pergunta: 'Quanto é 15% de R$ 240?',
        opcoes: ['R$ 24', 'R$ 36', 'R$ 40', 'R$ 360'],
        respostaCorreta: 'R$ 36',
        mensagemCorreta: 'Correto! 15% de R$ 240 é R$ 36.',
      },
      {
        titulo: 'Aumentos e descontos',
        explicacao:
          'Aumentar p% é multiplicar por (1 + p/100). Descontar p% é multiplicar por (1 − p/100). Aumentos e descontos sucessivos não se cancelam.',
        formula: 'Final = V × (1 ± p/100)',
        passos: [
          'R$ 100 com aumento de 20%: 100 × 1,20 = 120.',
          'Desconto de 20% sobre 120: 120 × 0,80 = 96.',
          'Resultado: R$ 96, e não R$ 100.',
        ],
        pergunta:
          'Um produto de R$ 200 recebe desconto de 10% e depois aumento de 10%. Qual o preço final?',
        opcoes: ['R$ 198', 'R$ 200', 'R$ 202'],
        respostaCorreta: 'R$ 198',
        mensagemCorreta: 'Correto! 200 × 0,90 × 1,10 = R$ 198.',
      },
    ],
  },
  {
    titulo: 'Unidade 2: Juros',
    licoes: [
      {
        titulo: 'Juros simples',
        explicacao:
          'Nos juros simples, os juros incidem sempre sobre o capital inicial, então crescem de forma linear.',
        formula: 'J = C × i × n',
        passos: [
          'C = R$ 1.000, i = 2% ao mês, n = 5 meses.',
          'J = 1.000 × 0,02 × 5.',
          'J = R$ 100 e o montante é R$ 1.100.',
        ],
        pergunta: 'Qual o juro simples de R$ 500 a 3% ao mês durante 4 meses?',
        opcoes: ['R$ 60', 'R$ 62,75', 'R$ 15'],
        respostaCorreta: 'R$ 60',
        mensagemCorreta: 'Correto! 500 × 0,03 × 4 = R$ 60.',
      },
      {
        titulo: 'Juros compostos',
        explicacao:
          'Nos juros compostos, os juros de cada período são somados ao capital e passam a render também. É o chamado juro sobre juro.',
        formula: 'M = C × (1 + i)ⁿ',
        passos: [
          'C = R$ 1.000, i = 2% ao mês e n = 3.',
          '1,02³ ≈ 1,0612.',
          'M ≈ R$ 1.061,21.',
        ],
        pergunta:
          'R$ 1.000 a 10% ao ano, em juros compostos, por 2 anos. Qual o montante?',
        opcoes: ['R$ 1.200', 'R$ 1.210', 'R$ 1.100'],
        respostaCorreta: 'R$ 1.210',
        mensagemCorreta: 'Correto! 1.000 × 1,10² = R$ 1.210.',
      },
    ],
  },
  {
    titulo: 'Unidade 3: Dinheiro no dia a dia',
    licoes: [
      {
        titulo: 'Orçamento 50/30/20',
        explicacao:
          'Uma regra popular divide a renda líquida em 50% para necessidades, 30% para desejos e 20% para poupança e dívidas. É um ponto de partida, não uma lei.',
        formula: 'Poupança = renda × 20%',
        passos: [
          'Renda líquida: R$ 3.000.',
          'Necessidades: 3.000 × 0,50 = 1.500.',
          'Poupança: 3.000 × 0,20 = R$ 600.',
        ],
        pergunta:
          'Com renda líquida de R$ 4.000, quanto vai para desejos pela regra 50/30/20?',
        opcoes: ['R$ 800', 'R$ 1.200', 'R$ 2.000'],
        respostaCorreta: 'R$ 1.200',
        mensagemCorreta: 'Correto! 30% de R$ 4.000 são R$ 1.200.',
      },
      {
        titulo: 'Reserva de emergência',
        explicacao:
          'É um dinheiro guardado com liquidez (fácil de sacar) para imprevistos, como perder a renda. Uma orientação comum é guardar de 3 a 6 meses das despesas essenciais.',
        formula: 'Reserva = despesas mensais × meses',
        passos: [
          'Despesas essenciais: R$ 2.000 por mês.',
          'Meta de 6 meses: 2.000 × 6.',
          'Reserva: R$ 12.000.',
        ],
        pergunta:
          'Com despesas essenciais de R$ 2.500 por mês, qual a reserva para 4 meses?',
        opcoes: ['R$ 6.250', 'R$ 10.000', 'R$ 12.500'],
        respostaCorreta: 'R$ 10.000',
        mensagemCorreta: 'Correto! 2.500 × 4 = R$ 10.000.',
      },
      {
        titulo: 'Inflação e poder de compra',
        explicacao:
          'Inflação é o aumento geral dos preços. Ela reduz o poder de compra: com o mesmo dinheiro você compra menos.',
        formula: 'Valor real = Valor ÷ (1 + inflação)ⁿ',
        passos: [
          'R$ 1.000 parados com inflação de 5% ao ano.',
          'Após 1 ano: 1.000 ÷ 1,05 ≈ 952.',
          'O poder de compra caiu cerca de R$ 48.',
        ],
        pergunta:
          'Se a inflação foi de 10% e seu salário não mudou, o que acontece com o poder de compra?',
        opcoes: ['Aumenta', 'Fica igual', 'Diminui'],
        respostaCorreta: 'Diminui',
        mensagemCorreta: 'Correto! Com os preços maiores e o salário igual, o poder de compra diminui.',
      },
    ],
  },
  {
    titulo: 'Unidade 4: Crédito e dívidas',
    licoes: [
      {
        titulo: 'Cartão e dívidas',
        explicacao:
          'No rotativo do cartão, os juros incidem sobre o saldo devedor e costumam ser muito altos. Pagar só o mínimo faz a dívida crescer.',
        formula: 'Saldo novo = saldo × (1 + i) − pagamento',
        passos: [
          'Dívida de R$ 1.000 com juros de 10% ao mês.',
          'Sem pagar nada: 1.000 × 1,10 = 1.100.',
          'No segundo mês: R$ 1.210, crescendo como juros compostos.',
        ],
        pergunta:
          'Dívida de R$ 1.000 a 10% ao mês, sem nenhum pagamento. Quanto será o saldo após 2 meses?',
        opcoes: ['R$ 1.200', 'R$ 1.210', 'R$ 1.100'],
        respostaCorreta: 'R$ 1.210',
        mensagemCorreta: 'Correto! 1.000 × 1,10² = R$ 1.210.',
      },
    ],
  },
]

const licoes = unidades.flatMap((unidade, unidadeIndex) =>
  unidade.licoes.map((conteudo, licaoIndex) => ({
    ...conteudo,
    id: `${unidadeIndex}-${licaoIndex}`,
    unidade: unidadeIndex,
  })),
)

const licaoAtiva = ref(null)
const respostaSelecionada = ref('')
const feedback = ref('')
const licoesConcluidas = ref([])
const licoesIniciadas = ref([])
const licaoConcluidaAtiva = computed(
  () => licaoAtiva.value && licoesConcluidas.value.includes(licaoAtiva.value.id),
)
const numeroLicaoAtiva = computed(() => {
  if (!licaoAtiva.value) return 0

  return (
    licoes.filter((licao) => licao.unidade === licaoAtiva.value.unidade)
      .findIndex((licao) => licao.id === licaoAtiva.value.id) + 1
  )
})

const licaoDisponivel = (licao) => {
  const indice = licoes.findIndex((item) => item.id === licao.id)
  return indice === 0 || licoesConcluidas.value.includes(licoes[indice - 1].id)
}

const unidadesExibidas = computed(() =>
  unidades.map((unidade, unidadeIndex) => ({
    ...unidade,
    licoes: licoes.filter((licao) => licao.unidade === unidadeIndex),
  })),
)

function estadoDaLicao(licao) {
  if (licoesConcluidas.value.includes(licao.id)) return 'Concluída'
  if (licoesIniciadas.value.includes(licao.id)) return 'Em andamento'
  if (licaoDisponivel(licao)) return 'Não iniciado'
  return 'Bloqueada'
}

function estadoDaUnidade(unidadeIndex) {
  const licoesDaUnidade = licoes.filter((licao) => licao.unidade === unidadeIndex)
  const unidadeConcluida = licoesDaUnidade.every((licao) =>
    licoesConcluidas.value.includes(licao.id),
  )

  if (unidadeConcluida) return 'Concluída'
  if (
    licoesDaUnidade.some((licao) => licoesConcluidas.value.includes(licao.id)) ||
    licoesDaUnidade.some((licao) => licoesIniciadas.value.includes(licao.id)) ||
    licaoAtiva.value?.unidade === unidadeIndex
  ) {
    return 'Em andamento'
  }

  return 'Não iniciado'
}

function abrirLicao(licao) {
  if (!licaoDisponivel(licao)) return

  licaoAtiva.value = licao
  if (!licoesIniciadas.value.includes(licao.id)) {
    licoesIniciadas.value.push(licao.id)
  }
  const concluida = licoesConcluidas.value.includes(licao.id)
  respostaSelecionada.value = concluida ? licao.respostaCorreta : ''
  feedback.value = concluida ? licao.mensagemCorreta : ''
}

function voltarParaTrilha() {
  licaoAtiva.value = null
}

function verificarResposta() {
  if (!respostaSelecionada.value || !licaoAtiva.value || licaoConcluidaAtiva.value) return

  if (respostaSelecionada.value === licaoAtiva.value.respostaCorreta) {
    feedback.value = licaoAtiva.value.mensagemCorreta
    if (!licoesConcluidas.value.includes(licaoAtiva.value.id)) {
      licoesConcluidas.value.push(licaoAtiva.value.id)
    }
    return
  }

  feedback.value = 'Ainda não. Reveja o cálculo e tente novamente.'
}
</script>

<template>
  <main class="pagina-trilha">
    <header class="cabecalho">
      <div>
        <span class="etiqueta">Sua jornada financeira</span>
        <h1>Trilha de aprendizagem</h1>
        <p>Aprenda finanças passo a passo, no seu ritmo.</p>
      </div>
      <div class="progresso-resumo" aria-label="Progresso da trilha">
        <span class="progresso-icone" aria-hidden="true">✦</span>
        <span>{{ licoesConcluidas.length }} de {{ licoes.length }} lições concluídas</span>
      </div>
    </header>

    <template v-if="!licaoAtiva">
      <section class="unidades" aria-label="Unidades da trilha">
        <article
          v-for="(unidade, unidadeIndex) in unidadesExibidas"
          :key="unidade.titulo"
          class="unidade"
        >
          <header class="unidade-cabecalho">
            <div class="unidade-numero">{{ unidadeIndex + 1 }}</div>
            <div>
              <h2>{{ unidade.titulo }}</h2>
              <p>{{ estadoDaUnidade(unidadeIndex) }}</p>
            </div>
            <span class="unidade-contagem">{{ unidade.licoes.length }} lições</span>
          </header>

          <div class="lista-licoes">
            <button
              v-for="licao in unidade.licoes"
              :key="licao.id"
              class="licao"
              :class="{
                'licao-bloqueada': !licaoDisponivel(licao),
                'licao-concluida': licoesConcluidas.includes(licao.id),
              }"
              :disabled="!licaoDisponivel(licao)"
              @click="abrirLicao(licao)"
            >
              <span class="licao-icone" aria-hidden="true">
                {{ licoesConcluidas.includes(licao.id) ? '✓' : licaoDisponivel(licao) ? '▶' : '🔒' }}
              </span>
              <span class="licao-detalhes">
                <strong>{{ licao.titulo }}</strong>
                <small>{{ estadoDaLicao(licao) }}</small>
              </span>
              <span v-if="!licaoDisponivel(licao)" class="licao-ajuda">
                Conclua a anterior para liberar
              </span>
            </button>
          </div>
        </article>
      </section>
    </template>

    <section v-else class="aula">
      <button class="voltar" type="button" @click="voltarParaTrilha">
        ← Voltar para a trilha
      </button>

      <article class="cartao-aprendizado">
        <span class="etiqueta">
          Unidade {{ licaoAtiva.unidade + 1 }} · Lição {{ numeroLicaoAtiva }}
        </span>
        <h2>{{ licaoAtiva.titulo }}</h2>
        <p>{{ licaoAtiva.explicacao }}</p>
        <div class="formula">{{ licaoAtiva.formula }}</div>

        <h3>Exemplo resolvido</h3>
        <ol class="passos">
          <li v-for="(passo, index) in licaoAtiva.passos" :key="passo">
            <span>{{ index + 1 }}</span>
            <p>{{ passo }}</p>
          </li>
        </ol>
      </article>

      <article class="cartao-teste">
        <div class="teste-cabecalho">
          <div>
            <span class="etiqueta">Teste rápido</span>
            <h2>1 de 1</h2>
          </div>
          <span class="teste-icone" aria-hidden="true">?</span>
        </div>

        <fieldset class="pergunta">
          <legend>{{ licaoAtiva.pergunta }}</legend>
          <label
            v-for="opcao in licaoAtiva.opcoes"
            :key="opcao"
            class="opcao"
            :class="{ 'opcao-selecionada': respostaSelecionada === opcao }"
          >
            <input
              v-model="respostaSelecionada"
              type="radio"
              :value="opcao"
              :disabled="licaoConcluidaAtiva"
            />
            <span>{{ opcao }}</span>
          </label>
        </fieldset>

        <p
          v-if="feedback"
          class="feedback"
          :class="{ 'feedback-correto': licaoConcluidaAtiva }"
          role="status"
        >
          {{ feedback }}
        </p>

        <button
          class="botao-verificar"
          type="button"
          :disabled="!respostaSelecionada || licaoConcluidaAtiva"
          @click="verificarResposta"
        >
          {{ licaoConcluidaAtiva ? 'Lição concluída ✓' : 'Verificar' }}
        </button>
      </article>
    </section>
  </main>
</template>

<style scoped>
.pagina-trilha {
  box-sizing: border-box;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 58px 24px 40px;
  color: #172b4d;
}

.cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 28px;
}

.etiqueta {
  display: inline-block;
  color: #008f69;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.cabecalho h1 {
  margin: 5px 0 0;
  font-size: 36px;
  line-height: 1.2;
}

.cabecalho p {
  margin: 8px 0 0;
  color: #64748b;
}

.progresso-resumo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
  padding: 11px 15px;
  border: 1px solid #ccefe3;
  border-radius: 12px;
  background: #f0fdf8;
  color: #176b54;
  font-size: 13px;
  font-weight: 600;
}

.progresso-icone {
  color: #00a878;
  font-size: 20px;
}

.unidades {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.unidade {
  padding: 18px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 14px rgb(23 43 77 / 5%);
}

.unidade-cabecalho {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 15px;
  border-bottom: 1px solid #edf1f5;
}

.unidade-numero {
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 11px;
  background: #e8f8f2;
  color: #008f69;
  font-weight: 700;
}

.unidade-cabecalho h2 {
  margin: 0;
  font-size: 16px;
  line-height: 1.35;
}

.unidade-cabecalho p {
  margin: 3px 0 0;
  color: #64748b;
  font-size: 12px;
}

.unidade-contagem {
  margin-left: auto;
  color: #64748b;
  font-size: 12px;
  white-space: nowrap;
}

.lista-licoes {
  display: grid;
  gap: 9px;
  padding-top: 14px;
}

.licao {
  display: flex;
  width: 100%;
  min-height: 64px;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border: 1px solid #ccefe3;
  border-radius: 11px;
  background: #f5fdf9;
  color: #172b4d;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    transform 0.15s ease,
    background-color 0.15s ease;
}

.licao:not(:disabled):hover {
  transform: translateY(-1px);
  border-color: #00b386;
  background: #effcf6;
}

.licao:focus-visible,
.voltar:focus-visible,
.botao-verificar:focus-visible {
  outline: 3px solid #62d9b1;
  outline-offset: 2px;
}

.licao-bloqueada {
  border-color: #e2e8f0;
  background: #f8fafc;
  color: #64748b;
  cursor: not-allowed;
}

.licao-concluida {
  border-color: #8de0c2;
  background: #ecfff7;
}

.licao-icone {
  display: grid;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #d9f5e9;
  color: #008f69;
  font-size: 13px;
}

.licao-bloqueada .licao-icone {
  background: #e9eef3;
  color: #748398;
  font-size: 12px;
}

.licao-detalhes {
  display: grid;
  min-width: 0;
  gap: 3px;
}

.licao-detalhes strong {
  font-size: 14px;
}

.licao-detalhes small {
  color: #008f69;
  font-size: 12px;
}

.licao-bloqueada .licao-detalhes small {
  color: #748398;
}

.licao-ajuda {
  margin-left: auto;
  color: #748398;
  font-size: 11px;
  text-align: right;
}

.aula {
  width: min(100%, 760px);
  margin: 0 auto;
}

.voltar {
  margin: 0 0 16px;
  padding: 8px 0;
  border: 0;
  background: transparent;
  color: #008f69;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.cartao-aprendizado,
.cartao-teste {
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 14px rgb(23 43 77 / 5%);
}

.cartao-aprendizado h2 {
  margin: 6px 0 12px;
  font-size: 28px;
}

.cartao-aprendizado > p {
  color: #475569;
  line-height: 1.65;
}

.formula {
  margin: 18px 0 24px;
  padding: 16px;
  border-left: 4px solid #00b386;
  border-radius: 8px;
  background: #f0fdf8;
  color: #176b54;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
}

.cartao-aprendizado h3 {
  margin: 0 0 12px;
  font-size: 17px;
}

.passos {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.passos li {
  display: flex;
  align-items: center;
  gap: 12px;
}

.passos li > span {
  display: grid;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #e8f8f2;
  color: #008f69;
  font-weight: 700;
}

.passos p {
  margin: 0;
  color: #334155;
}

.cartao-teste {
  margin-top: 16px;
}

.teste-cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.teste-cabecalho h2 {
  margin: 4px 0 0;
  font-size: 18px;
}

.teste-icone {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 50%;
  background: #e8f8f2;
  color: #008f69;
  font-size: 20px;
  font-weight: 700;
}

.pergunta {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  border: 0;
}

.pergunta legend {
  margin-bottom: 12px;
  color: #172b4d;
  font-size: 18px;
  font-weight: 700;
}

.opcao {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px;
  border: 1px solid #dbe4e8;
  border-radius: 10px;
  color: #334155;
  cursor: pointer;
}

.opcao-selecionada {
  border-color: #00b386;
  background: #f0fdf8;
}

.opcao input {
  accent-color: #00a878;
}

.feedback {
  margin: 14px 0 0;
  color: #b45309;
  font-size: 14px;
  font-weight: 600;
}

.feedback-correto {
  color: #008f69;
}

.botao-verificar {
  width: 100%;
  margin-top: 18px;
  padding: 13px 18px;
  border: 0;
  border-radius: 10px;
  background: #00a878;
  color: #fff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.botao-verificar:hover:not(:disabled) {
  background: #008f69;
}

.botao-verificar:disabled {
  background: #9bd9c2;
  cursor: default;
}

@media (max-width: 760px) {
  .pagina-trilha {
    padding: 38px 20px 30px;
  }

  .cabecalho {
    align-items: flex-start;
    flex-direction: column;
  }

  .cabecalho h1 {
    font-size: 30px;
  }

  .unidades {
    grid-template-columns: 1fr;
  }

  .licao {
    flex-wrap: wrap;
  }

  .licao-ajuda {
    width: 100%;
    margin-left: 44px;
    text-align: left;
  }
}

@media (max-width: 420px) {
  .unidade {
    padding: 14px;
  }

  .unidade-cabecalho {
    align-items: flex-start;
  }

  .unidade-contagem {
    display: none;
  }

  .cartao-aprendizado,
  .cartao-teste {
    padding: 18px;
  }
}
</style>
