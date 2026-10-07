<script setup>
import { computed, ref } from 'vue'

const busca = ref('')

const termos = [
  {
    titulo: 'Capital',
    definicao: 'Valor inicial que você aplica ou toma emprestado.',
  },
  {
    titulo: 'Juros',
    definicao: 'Preço do dinheiro no tempo: o que se paga ou se recebe por usar um capital.',
  },
  {
    titulo: 'Montante',
    definicao: 'Capital mais os juros acumulados.',
  },
  {
    titulo: 'Taxa de juros',
    definicao: 'Percentual aplicado sobre o capital em cada período, como 2% ao mês.',
  },
  {
    titulo: 'Inflação',
    definicao: 'Aumento geral e contínuo dos preços.',
  },
  {
    titulo: 'Poder de compra',
    definicao: 'Quanto você consegue comprar com certa quantia de dinheiro.',
  },
  {
    titulo: 'Liquidez',
    definicao: 'Facilidade de transformar um bem ou aplicação em dinheiro, sem perder valor.',
  },
  {
    titulo: 'Reserva de emergência',
    definicao: 'Dinheiro de alta liquidez guardado para imprevistos.',
  },
  {
    titulo: 'Juros rotativos',
    definicao: 'Juros cobrados no cartão quando a fatura não é paga por inteiro.',
  },
  {
    titulo: 'Juro sobre juro',
    definicao: 'Efeito dos juros compostos: os juros passam a render juros.',
  },
]

const termosFiltrados = computed(() => {
  const buscaNormalizada = busca.value.trim().toLocaleLowerCase('pt-BR')

  if (!buscaNormalizada) return termos

  return termos.filter((termo) =>
    termo.titulo.toLocaleLowerCase('pt-BR').includes(buscaNormalizada),
  )
})
</script>

<template>
  <header class="cabecalho">
    <div class="titulo">
      <h1>Glossário</h1>
      <p>Conheça os principais termos para cuidar melhor das suas finanças.</p>
    </div>
  </header>

  <main class="conteudo">
    <label class="campo-busca">
      <span>Buscar termo</span>
      <input
        v-model="busca"
        type="search"
        placeholder="Digite o título de um termo"
        aria-label="Buscar termo pelo título"
      />
    </label>

    <section class="lista-termos" aria-label="Termos do glossário">
      <article v-for="termo in termosFiltrados" :key="termo.titulo" class="termo">
        <h2>{{ termo.titulo }}</h2>
        <p>{{ termo.definicao }}</p>
      </article>

      <p v-if="termosFiltrados.length === 0" class="sem-resultados" role="status">
        Nenhum termo encontrado para "{{ busca }}".
      </p>
    </section>
  </main>
</template>

<style scoped>
.cabecalho {
  box-sizing: border-box;
  padding: 70px 24px 20px;
}

.titulo h1 {
  margin: 0;
  color: #172b4d;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
}

.titulo p {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 14px;
}

.conteudo {
  box-sizing: border-box;
  width: 100%;
  padding: 0 24px 30px;
}

.campo-busca {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  color: #172b4d;
  font-size: 14px;
  font-weight: 600;
}

.campo-busca input {
  box-sizing: border-box;
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  color: #172b4d;
  font: inherit;
  font-weight: 400;
}

.campo-busca input:focus {
  border-color: #00b386;
  outline: 2px solid #00b386;
  outline-offset: 1px;
}

.lista-termos {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.termo {
  box-sizing: border-box;
  min-height: 130px;
  padding: 18px;
  border: 1px solid #dbe4e8;
  border-radius: 14px;
  background: #fff;
}

.termo h2 {
  margin: 0 0 8px;
  color: #00a878;
  font-size: 18px;
  font-weight: 700;
}

.termo p {
  margin: 0;
  color: #475569;
  font-size: 14px;
  line-height: 1.5;
}

.sem-resultados {
  grid-column: 1 / -1;
  margin: 0;
  padding: 20px;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  color: #64748b;
  text-align: center;
}

@media (max-width: 900px) {
  .lista-termos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .cabecalho {
    padding: 40px 20px 20px;
  }

  .titulo h1 {
    font-size: 32px;
  }

  .conteudo {
    padding: 0 20px 24px;
  }

  .lista-termos {
    grid-template-columns: 1fr;
  }
}
</style>
