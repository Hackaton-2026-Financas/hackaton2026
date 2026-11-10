<script setup>
import { onMounted, reactive, ref } from 'vue'
import {
  atualizarUsuario,
  buscarUsuario,
  cadastrarUsuario,
  excluirUsuario,
  listarUsuarios
} from '@/servico/usuarios'

const usuarios = ref([])
const idBusca = ref('')
const mensagem = ref('')
const erro = ref(false)
const carregando = ref(false)
const editando = ref(false)

const dadosUsuario = reactive({
  id: '',
  nome: '',
  email: '',
  senha: ''
})

async function carregarUsuarios() {
  carregando.value = true
  mensagem.value = ''
  erro.value = false

  try {
    usuarios.value = await listarUsuarios()
    return true
  } catch (erroDaApi) {
    mensagem.value = `Não foi possível listar os usuários. ${erroDaApi.message}`
    erro.value = true
    return false
  } finally {
    carregando.value = false
  }
}

async function buscarPorId() {
  mensagem.value = ''
  erro.value = false

  if (!idBusca.value.trim()) {
    mensagem.value = 'Digite um ID para buscar.'
    erro.value = true
    return
  }

  carregando.value = true

  try {
    const usuario = await buscarUsuario(idBusca.value.trim())

    if (!usuario) {
      usuarios.value = []
      mensagem.value = 'Nenhum usuário encontrado com esse ID.'
      return
    }

    usuarios.value = [usuario]
  } catch (erroDaApi) {
    mensagem.value = `Não foi possível buscar o usuário. ${erroDaApi.message}`
    erro.value = true
  } finally {
    carregando.value = false
  }
}

function limparFormulario() {
  dadosUsuario.id = ''
  dadosUsuario.nome = ''
  dadosUsuario.email = ''
  dadosUsuario.senha = ''
  editando.value = false
}

function prepararEdicao(usuario) {
  dadosUsuario.id = usuario.id
  dadosUsuario.nome = usuario.nome
  dadosUsuario.email = usuario.email
  dadosUsuario.senha = usuario.senha
  editando.value = true
  mensagem.value = ''
  erro.value = false
}

async function salvarUsuario() {
  mensagem.value = ''
  erro.value = false

  const nome = dadosUsuario.nome.trim()
  const email = dadosUsuario.email.trim().toLowerCase()
  const senha = dadosUsuario.senha

  if (!nome || !email || senha.length < 4) {
    mensagem.value = 'Preencha todos os campos e use uma senha com pelo menos 4 caracteres.'
    erro.value = true
    return
  }

  carregando.value = true

  try {
    const estavaEditando = editando.value
    const listaUsuarios = await listarUsuarios()
    const emailJaCadastrado = listaUsuarios.some(
      (usuario) =>
        usuario.email.toLowerCase() === email &&
        String(usuario.id) !== String(dadosUsuario.id)
    )

    if (emailJaCadastrado) {
      mensagem.value = 'Este email já está cadastrado para outro usuário.'
      erro.value = true
      return
    }

    const dadosAtualizados = { nome, email, senha }

    if (editando.value) {
      await atualizarUsuario(dadosUsuario.id, {
        id: dadosUsuario.id,
        ...dadosAtualizados
      })
    } else {
      await cadastrarUsuario(dadosAtualizados)
    }

    limparFormulario()
    const listaAtualizada = await carregarUsuarios()

    if (listaAtualizada) {
      mensagem.value = estavaEditando
        ? 'Usuário atualizado com sucesso.'
        : 'Usuário cadastrado com sucesso.'
    }
  } catch (erroDaApi) {
    mensagem.value = `Não foi possível salvar o usuário. ${erroDaApi.message}`
    erro.value = true
  } finally {
    carregando.value = false
  }
}

async function removerUsuario(usuario) {
  if (!window.confirm(`Deseja excluir o usuário ${usuario.nome}?`)) {
    return
  }

  mensagem.value = ''
  erro.value = false

  try {
    await excluirUsuario(usuario.id)
    const listaAtualizada = await carregarUsuarios()

    if (listaAtualizada) {
      mensagem.value = 'Usuário excluído com sucesso.'
    }
  } catch (erroDaApi) {
    mensagem.value = `Não foi possível excluir o usuário. ${erroDaApi.message}`
    erro.value = true
  }
}

onMounted(carregarUsuarios)
</script>

<template>
  <section class="usuarios">
    <h1>Usuários</h1>

    <p v-if="mensagem" class="mensagem" :class="{ erro }" role="status">
      {{ mensagem }}
    </p>

    <form class="busca" @submit.prevent="buscarPorId">
      <label for="idBusca">Buscar usuário pelo ID</label>
      <input id="idBusca" v-model="idBusca" type="text" placeholder="Digite o ID" />
      <button type="submit" :disabled="carregando">Buscar</button>
      <button type="button" :disabled="carregando" @click="carregarUsuarios">
        Listar todos
      </button>
    </form>

    <h2>{{ editando ? 'Editar usuário' : 'Cadastrar usuário' }}</h2>
    <form class="formulario" @submit.prevent="salvarUsuario">
      <label for="nome">Nome</label>
      <input id="nome" v-model="dadosUsuario.nome" type="text" required />

      <label for="email">Email</label>
      <input id="email" v-model="dadosUsuario.email" type="email" required />

      <label for="senha">Senha (mínimo 4 caracteres)</label>
      <input
        id="senha"
        v-model="dadosUsuario.senha"
        type="password"
        minlength="4"
        required
      />

      <div class="botoes">
        <button type="submit" :disabled="carregando">
          {{ carregando ? 'Aguarde...' : editando ? 'Salvar alterações' : 'Cadastrar' }}
        </button>
        <button v-if="editando" type="button" @click="limparFormulario">Cancelar</button>
      </div>
    </form>

    <h2>Usuários cadastrados</h2>
    <p v-if="carregando">Carregando usuários...</p>
    <p v-else-if="usuarios.length === 0">Nenhum usuário para mostrar.</p>

    <div v-else class="tabela">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.email }}</td>
            <td class="botoes">
              <button type="button" @click="prepararEdicao(usuario)">Editar</button>
              <button type="button" @click="removerUsuario(usuario)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.usuarios {
  max-width: 900px;
  margin: 32px auto;
  padding: 24px;
  color: #222;
}

.usuarios h1,
.usuarios h2 {
  margin: 0 0 16px;
}

.usuarios h2 {
  margin-top: 24px;
}

.busca,
.formulario {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 480px;
}

.busca {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: end;
}

.busca label {
  grid-column: 1 / -1;
}

.usuarios input {
  min-width: 0;
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.usuarios button {
  padding: 9px 14px;
  border: 0;
  border-radius: 4px;
  background: #059669;
  color: white;
  cursor: pointer;
}

.usuarios button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.botoes {
  display: flex;
  gap: 8px;
}

.tabela {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.mensagem {
  color: #087443;
}

.mensagem.erro {
  color: #b42318;
}

@media (max-width: 600px) {
  .usuarios {
    margin: 16px auto;
    padding: 16px;
  }

  .busca {
    grid-template-columns: 1fr;
  }

  .busca label {
    grid-column: auto;
  }
}
</style>
