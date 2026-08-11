<script setup>
import { ref, reactive } from 'vue'


const naTelaCadastro = ref(false)

const dadosLogin = reactive({
  email: '',
  senha: ''
})

const dadosCadastro = reactive({
  nome: '',
  email: '',
  senha: ''
})

function mudarParaCadastro() {
  naTelaCadastro.value = true
}

function mudarParaLogin() {
  naTelaCadastro.value = false
}

function logarUsuario() {
  alert(`Login feito com sucesso com o e-mail: ${dadosLogin.email}! Acesso liberado.`)

  dadosLogin.email = ''
  dadosLogin.senha = ''
}

function cadastrarUsuario() {
  alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${dadosCadastro.nome}. Acesso liberado.`)

  dadosCadastro.nome = ''
  dadosCadastro.email = ''
  dadosCadastro.senha = ''
}
</script>

<template>
  <div class="wrapper">
    <div class="card" :class="{ 'is-signup': naTelaCadastro }">

      <div class="form-side signup-box">
        <form @submit.prevent="cadastrarUsuario">
          <h1>Criar conta</h1>
          <input type="text" placeholder="Nome" v-model="dadosCadastro.nome" required />
          <input type="email" placeholder="Email" v-model="dadosCadastro.email" required />
          <input type="password" placeholder="Senha" v-model="dadosCadastro.senha" required />
          <button type="submit">Entrar</button>
        </form>
      </div>

      <div class="form-side login-box">
        <form @submit.prevent="logarUsuario">
          <h1>Entrar na <br>sua conta</h1>
          <input type="Email" placeholder="Email" v-model="dadosLogin.email" required />
          <input type="password" placeholder="Senha" v-model="dadosLogin.senha" required />
          <button type="submit">Entrar</button>
        </form>
      </div>

      <div class="switch-container">
        <div class="switch-bg">
          <div class="switch-panel panel-left">
            <h1>seja bem vindo</h1>
            <p>continuar o login</p>
            <button type="button" class="ghost" @click="mudarParaLogin">𝙀𝙣𝙩𝙧𝙖𝙧</button>
          </div>
          <div class="switch-panel panel-right">
            <h1>Olá Mundo</h1>
            <p>Criar a sua conta</p>
            <button type="button" class="ghost" @click="mudarParaCadastro">𝙀𝙣𝙩𝙧𝙖𝙧</button>
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

.wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  padding: 20px;
}

.card {
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

.switch-bg h1 {
  color: #fff;
}

p {
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 10px 0 25px;
}

.form-side {
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

.login-box {
  left: 0;
  width: 50%;
  z-index: 2;
}

.card.is-signup .login-box {
  transform: translateX(100%);
}

.signup-box {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.card.is-signup .signup-box {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: reveal 0.6s;
}

@keyframes reveal {
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

button.ghost {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
}

.switch-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.card.is-signup .switch-container {
  transform: translateX(-100%);
}

.switch-bg {
  background: linear-gradient(135deg, #00BB7D 0%, #019a67 50%, #009563 100%);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.card.is-signup .switch-bg {
  transform: translateX(50%);
}

.switch-panel {
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

.panel-left {
  transform: translateX(-20%);
}

.card.is-signup .panel-left {
  transform: translateX(0);
}

.panel-right {
  right: 0;
  transform: translateX(0);
}

.card.is-signup .panel-right {
  transform: translateX(20%);
}

@media (max-width: 768px) {
  .card {
    min-height: 640px;
  }

  .form-side,
  .login-box,
  .signup-box {
    width: 100%;
    left: 0;
  }

  .switch-container,
  .card.is-signup .switch-container {
    display: none;
  }

  .signup-box {
    opacity: 0;
    z-index: 1;
    transform: translateY(-100%);
  }

  .card.is-signup .signup-box {
    opacity: 1;
    z-index: 5;
    transform: translateY(0);
  }

  .card.is-signup .login-box {
    transform: translateY(100%);
  }
}
</style>