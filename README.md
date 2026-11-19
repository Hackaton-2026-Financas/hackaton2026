# Tema & Objetivo

O objetivo do nosso site era criar um app que permite, de forma simplificada, pessoas organizarem suas finanças pessoais para reduzir a falta de auto conhecimento pessoal sobre oque a pessoa tem, permitir ela analisar e perceber quais são os principais gastos e tambem manter conhecimentos de contas a pagar.

# Funcionabilidades Planejadas

- Dashboard: para inserir informações de despesas e entradas;
- Contas: Para manter ideia de contas a pagar;
- Metas: permitir você colocar metas e tentar bater elas no longo prazo;
- Relatorio: relatorio geral com score, despesas, saldo, receitas, taxa de poupança e gastos por categoria;
- Educação: educação basica sobre finanças e matematica financeira;
- Simulador: simulador basico de investimentos;

# Funcionabilidades aplicadas

- Dashboard: falta apenas graficco ao longo de meses;
- Contas: completo;
- Metas: falta botao para adicionar dinheiro para bater as metas, resto completo;
- Relatorio: falta adicionar mais tipos de alertas e grafico de pizza, resto completo;

# Quais dificuldades foram encontradas? 

Principalmente aprender o framework vue, integrar o script ao html/css (devido a falta de pratica ano passado) e componentizar o programa.

# Atividades de cada Integrante:

- Caio Luiz: Organizador do projeto e desenvolvimento do Relatorio.
- Joao Henrique: Organizador do codigo geral e desenvolvimento do Dashboard.
- Arthur Schmidt: Desenvolvimento de Metas.
- Camilly: Desenvolvimento de Contas e Designer Figma.
- Irene Bittelbrunn: Desenvolvimento Home & About, Designer Figma.
- Maico: Desenvolvimento do Login, auxilio geral a outras pessoas para desenvolverem as proprias paginas.

# Qual Nota o grupo atribui? 

8

# Justificativa

Acredito que completamos a principal funçao do site, mas falta duas paginas, certa otimizaçao e sentimos que poderiamos ter feito mais.

# Launching

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## CRUD de usuários (API)

Para executar, abra dois terminais:

```sh
npm run api
```

```sh
npm run dev
```

**Entidades:** `usuarios` e `dadosFinanceiros`, no arquivo `db.json`. Cada registro financeiro tem `usuarioId` e guarda as transações, contas e metas daquela conta.

| Campo | Tipo | Obrigatório |
|---|---|---|
| `id` | texto | Sim; gerado pela API no cadastro |
| `nome` | texto | Sim |
| `email` | texto | Sim |
| `senha` | texto | Sim no cadastro; opcional na edição |

### Validações de cadastro e edição

- Nome, e-mail e senha são obrigatórios no cadastro. A senha deve ter pelo menos 4 caracteres.
- O campo de e-mail usa `type="email"` e é obrigatório, então o navegador valida o formato antes do envio.
- O e-mail é convertido para minúsculas e espaços externos são removidos. O cadastro é impedido se já houver outro usuário com o mesmo e-mail, sem diferenciar maiúsculas de minúsculas.
- Na edição, nome e e-mail continuam obrigatórios. A senha pode ficar em branco para manter a atual; se uma nova senha for informada, deve ter pelo menos 4 caracteres.
- Essas validações são feitas na interface. O JSON Server de demonstração não aplica as mesmas regras a requisições HTTP diretas.

Cada registro de `dadosFinanceiros` pertence a um usuário pelo campo `usuarioId`. A tela `/usuarios` permite listar, consultar por ID, cadastrar, atualizar e excluir usuários; ela fica disponível apenas para a conta administradora. Contas normais acessam somente suas próprias finanças.

| Operação | Endpoint | Método |
|---|---|---|
| Listar | `/usuarios` | GET |
| Consultar por ID | `/usuarios/:id` | GET |
| Cadastrar | `/usuarios` | POST |
| Atualizar | `/usuarios/:id` | PATCH |
| Excluir | `/usuarios/:id` | DELETE |

**Responsável:** Maico (Login/Usuários), conforme a divisão descrita acima.

Contas fictícias para testar o login:

- `maico@email.com` / `maicoedu`
- `joao@email.com` / `1234`
- `admin@financepro.com` / `admin1234` (acessa o CRUD de usuários)

O JSON Server é usado como API de demonstração e não protege os endpoints contra acesso direto. Use apenas dados fictícios; os dados financeiros são separados por usuário na interface, mas não são adequados para publicação com informações reais.
