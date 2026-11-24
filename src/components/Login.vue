
<script setup>
// Desativar aviso de nome do componente com uma palavra só
/* eslint vue/multi-word-component-names: "off" */
import { ref as criarReferencia, reactive as criarObjetoReativo } from 'vue'
import { cadastrarUsuario as cadastrarNoServico, listarUsuarios } from '@/servico/usuarios'

const emitir = defineEmits(['entrar'])

const naTelaCadastro = criarReferencia(false)
const mensagem = criarReferencia('')
const erro = criarReferencia(false)
const carregando = criarReferencia(false)

const dadosEntrada = criarObjetoReativo({
  email: '',
  senha: ''
})

const dadosCadastro = criarObjetoReativo({
  nome: '',
  email: '',
  senha: ''
})

// Alternar entre entrar e cadastrar

function abrirCadastro() {
  naTelaCadastro.value = true
  mensagem.value = ''
}

function abrirEntrada() {
  naTelaCadastro.value = false
  mensagem.value = ''
}

// Cadastrar usuário

async function cadastrarUsuario() {
  mensagem.value = ''
  erro.value = false

  const nome = dadosCadastro.nome.trim()
  const email = dadosCadastro.email.trim().toLowerCase()

  if (!nome || !email || dadosCadastro.senha.length < 4) {
    mensagem.value = 'Preencha todos os campos e use uma senha com pelo menos 4 caracteres.'
    erro.value = true
    return
  }

  carregando.value = true

  try {
    const usuarios = await listarUsuarios()
    const emailJaCadastrado = usuarios.some(
      (usuario) => usuario.email.toLowerCase() === email
    )

    if (emailJaCadastrado) {
      mensagem.value = 'Este e-mail já está cadastrado.'
      erro.value = true
      return
    }

    const usuario = await cadastrarNoServico({ nome, email, senha: dadosCadastro.senha })

    alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${nome}.`)
    dadosCadastro.nome = ''
    dadosCadastro.email = ''
    dadosCadastro.senha = ''
    emitir('entrar', usuario)
  } catch (erroDoServico) {
    mensagem.value = `Não foi possível cadastrar. ${erroDoServico.message}`
    erro.value = true
  } finally {
    carregando.value = false
  }

}

// Entrar na conta

async function entrarNaConta() {
  mensagem.value = ''
  erro.value = false
  carregando.value = true

  try {
    const usuarios = await listarUsuarios()
    const email = dadosEntrada.email.trim().toLowerCase()
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email.toLowerCase() === email &&
        usuario.senha === dadosEntrada.senha
    )

    if (!usuarioEncontrado) {
      mensagem.value = 'E-mail ou senha incorretos.'
      erro.value = true
      return
    }

    alert(`Entrada realizada com sucesso. Bem-vindo(a), ${usuarioEncontrado.nome}!`)
    dadosEntrada.email = ''
    dadosEntrada.senha = ''
    emitir('entrar', usuarioEncontrado)
  } catch (erroDoServico) {
    mensagem.value = `Não foi possível acessar sua conta. ${erroDoServico.message}`
    erro.value = true
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="pagina">
    <div class="cartao" :class="{ 'modo-cadastro': naTelaCadastro }">

      <div class="lado-formulario caixa-cadastro">
        <form @submit.prevent="cadastrarUsuario">
          <h1>Criar conta</h1>

          <input
            type="text"
            placeholder="Nome"
            v-model="dadosCadastro.nome"
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            v-model="dadosCadastro.email"
            required
          />

          <input
            type="password"
            placeholder="Senha (mínimo 4 caracteres)"
            v-model="dadosCadastro.senha"
            minlength="4"
            required
          />

          <p v-if="mensagem" class="mensagem" :class="{ erro }" role="status">
            {{ mensagem }}
          </p>
          <button type="submit" :disabled="carregando">
            {{ carregando ? 'Aguarde...' : 'Cadastrar' }}
          </button>
        </form>
      </div>

      <div class="lado-formulario caixa-entrada">
        <form @submit.prevent="entrarNaConta">
          <h1>Entrar na <br /> sua conta</h1>

          <input
            type="email"
            placeholder="E-mail"
            v-model="dadosEntrada.email"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            v-model="dadosEntrada.senha"
            required
          />

          <p v-if="mensagem" class="mensagem" :class="{ erro }" role="status">
            {{ mensagem }}
          </p>
          <button type="submit" :disabled="carregando">
            {{ carregando ? 'Aguarde...' : 'Entrar' }}
          </button>
        </form>
      </div>

      <div class="alternancia">
        <div class="fundo">

          <div class="painel painel-esquerdo">
            <h1>Seja bem-vindo</h1>
            <p>Acesse sua conta</p>

            <button type="button" class="secundario" @click="abrirEntrada">
              Entrar
            </button>
          </div>

          <div class="painel painel-direito">
            <h1>Bem-vindo de volta</h1>
            <p>Crie sua conta aqui</p>

            <button type="button" class="secundario" @click="abrirCadastro">
              Cadastrar
            </button>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.pagina {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  padding: 20px;
}

.cartao {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

h1 {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
  line-height: 0.80;
  margin: 0 0 18px;
  color: #222;
}

.fundo h1 {
  color: #fff;
}

p {
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 10px 0 25px;
}

.lado-formulario {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

input {
  background: #f2f2f2;
  border: none;
  border-radius: 4px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  font-size: 14px;
}

input:focus {
  outline: 2px solid #00BB7D;
  outline-offset: 1px;
}

.caixa-entrada {
  left: 0;
  width: 50%;
  z-index: 2;
}

.cartao.modo-cadastro .caixa-entrada {
  transform: translateX(100%);
}

.caixa-cadastro {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.cartao.modo-cadastro .caixa-cadastro {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: revelar 0.6s;
}

@keyframes revelar {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

button {
  border-radius: 20px;
  border: 1px solid #00BB7D;
  background: linear-gradient(to right, #00BB7D, #00885b);
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: transform 0.3s;
}

button:hover {
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.mensagem {
  margin: 8px 0;
  color: #087443;
}

.mensagem.erro {
  color: #b42318;
}

button.secundario {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.alternancia {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.cartao.modo-cadastro .alternancia {
  transform: translateX(-100%);
}

.fundo {
  background: linear-gradient(135deg, #00BB7D 0%, #019a67 50%, #009563 100%);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.cartao.modo-cadastro .fundo {
  transform: translateX(50%);
}

.painel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.painel-esquerdo {
  transform: translateX(-20%);
}

.cartao.modo-cadastro .painel-esquerdo {
  transform: translateX(0);
}

.painel-direito {
  right: 0;
  transform: translateX(0);
}

.cartao.modo-cadastro .painel-direito {
  transform: translateX(20%);
}

@media (max-width: 768px) {
  .cartao {
    min-height: 640px;
  }

  .lado-formulario,
  .caixa-entrada,
  .caixa-cadastro {
    width: 100%;
    left: 0;
  }

  .alternancia,
  .cartao.modo-cadastro .alternancia {
    display: none;
  }

  .caixa-cadastro {
    opacity: 0;
    z-index: 1;
    transform: translateY(-100%);
  }

  .cartao.modo-cadastro .caixa-cadastro {
    opacity: 1;
    z-index: 5;
    transform: translateY(0);
  }

  .cartao.modo-cadastro .caixa-entrada {
    transform: translateY(100%);
  }
}

/* Fundo branco para a pagina. */

.pagina {
  background: #fff;
}
</style>

<style>
html:has(.pagina),
body:has(.pagina) {
  background: #fff;
}
</style>
