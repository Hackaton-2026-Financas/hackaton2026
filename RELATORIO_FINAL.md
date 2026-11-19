# Relatorio Final do Projeto FinancePro

**Projeto:** FinancePro - plataforma de educacao financeira  
**Equipe:** Arthur, Camilly, Irene, Joao, Caio e Maico  
**Tecnologias:** Vue 3, Vite, Vue Router, Chart.js, JSON Server e JavaScript  
**Data:** 18 de novembro de 2026

## 1. Resumo executivo

O FinancePro foi desenvolvido como uma aplicacao web destinada a ajudar pessoas a organizar suas financas pessoais e aprender conceitos basicos de educacao financeira. O sistema permite cadastrar receitas e despesas, acompanhar contas a pagar e pagas, criar metas financeiras, consultar um score de saude financeira e estudar conteudos sobre porcentagem, juros, credito e reservas de emergencia.

O projeto atende ao objetivo principal de unificar planejamento financeiro, acompanhamento de movimentacoes e educacao financeira em uma unica plataforma. Durante o desenvolvimento, o grupo utilizou o Vue 3 com Vite, criou componentes reutilizaveis, separou os dados em stores e implementou persistencia de dados por usuario por meio de uma API local com JSON Server.

## 2. Objetivo do projeto

O objetivo do FinancePro foi criar uma ferramenta simples e acessible que possibilita:

- Registrar entradas e saidas financeiras;
- Visualizar saldo, receitas e despesas;
- Organizar contas pendentes e pagas;
- Criar e acompanhar metas financeiras;
- Gerar um resumo da situacao financeira;
- Estudar conceitos financeiros por meio de glossario e trilha de aprendizado;
- Administrar usuarios cadastrados.

## 3. Arquitetura e tecnologias

A aplicacao foi estruturada em componentes Vue, views associadas a rotas e stores responsaveis pelo estado financeiro.

### Tecnologias utilizadas

- **Vue 3:** construcao da interface e dos componentes;
- **Vite:** servidor de desenvolvimento e empacotamento;
- **Vue Router:** navegacao entre paginas e protecao de rotas;
- **JSON Server:** API REST local para usuarios e dados financeiros;
- **Chart.js e Vue Chart.js:** dependencias disponiveis para visualizacao grafica;
- **JavaScript moderno:** regras de negocio, filtros, calculos e reatividade;
- **HTML e CSS:** estrutura, responsividade e identidade visual.

### Estrutura principal

- `src/views`: paginas acessiveis da aplicacao;
- `src/components`: componentes reutilizaveis;
- `src/store`: estado das transacoes, contas, metas e sessao;
- `src/servico`: chamadas HTTP relacionadas aos usuarios;
- `src/router`: definicao e protecao das rotas;
- `db.json`: banco de dados utilizado pelo JSON Server.

## 4. Implementacao por pagina

### Pagina inicial

A pagina inicial apresenta o proposito da plataforma e permite navegar para o login, cadastro ou dashboard. Tambem apresenta resumidamente os recursos de dashboard, metas, contas e relatórios.

### Login e cadastro

A tela permite alternar entre entrada e cadastro de usuarios. O login verifica email e senha na API local. O cadastro valida campos obrigatorios, exige senha com pelo menos quatro caracteres e impede o uso de um email ja cadastrado.

O usuario autenticado e armazenado no navegador por meio do `localStorage`, permitindo recuperar a sessao ao atualizar a pagina.

### Dashboard

O dashboard mostra:

- Saldo total;
- Receitas do mes;
- Despesas do mes;
- Quantidade de metas ativas;
- Quantidade de contas nao pagas;
- Ultimas movimentacoes.

Tambem permite cadastrar novas transacoes informando tipo, categoria, valor e descricao. Entradas e saidas podem ser removidas da lista. Os valores exibidos sao calculados automaticamente pelas stores.

O grafico de evolucao patrimonial ao longo dos meses ainda nao foi implementado.

### Contas

A pagina Gerenciador de Contas permite:

- Criar uma conta com titulo, categoria, valor e vencimento;
- Separar contas pendentes e pagas;
- Marcar uma conta como paga;
- Excluir uma conta;
- Calcular o total de contas pendentes e pagas.

### Metas

A pagina permite criar metas financeiras com titulo, valor alvo e data de vencimento. Tambem oferece acompanhamento visual do progresso e permite:

- Remover metas;
- Adicionar dinheiro a uma meta;
- Impedir aporte superior ao restante da meta;
- Validar se existe saldo suficiente;
- Resgatar o dinheiro guardado;
- Registrar aportes e resgates como transacoes financeiras.

### Relatorio

A pagina gera um diagnostico financeiro com base nos dados cadastrados. Ela apresenta:

- Score de saude financeira;
- Status do score;
- Barra de progresso;
- Saldo atual;
- Receitas mensais;
- Despesas mensais;
- Taxa de poupanca;
- Despesas agrupadas por categoria;
- Maior categoria de gasto;
- Alertas sobre contas pendentes e situacao da poupanca.

A exportacao para PDF ainda nao esta implementada. O grafico de pizza tambem esta pendente e os dados por categoria sao apresentados atualmente em lista.

### Glossario

O glossario apresenta termos importantes de educacao financeira, como capital, juros, montante, inflacao, liquidez e juros compostos. Existe um campo de busca que filtra os termos pelo titulo.

### Trilha de aprendizado

A trilha oferece licoes sobre:

- Porcentagem;
- Aumentos e descontos;
- Juros simples;
- Juros compostos;
- Orcamento 50/30/20;
- Reserva de emergencia;
- Inflacao e poder de compra;
- Cartao e dividas.

Cada licao apresenta explicacao, formula, exemplo, alternativas e feedback de acerto ou erro. A sequencia impede o acesso a licoes futuras antes da conclusao das anteriores.

### Sobre nos

A pagina apresenta a missao do projeto, os objetivos da plataforma, os valores da equipe e os integrantes. A interface inclui cards informativos e fotos da equipe.

### Usuarios

A pagina de usuarios e acessivel apenas ao administrador. Ela oferece um CRUD completo para usuarios:

| Operacao | Metodo | Endpoint |
|---|---|---|
| Listar usuarios | GET | `/usuarios` |
| Consultar usuario por ID | GET | `/usuarios/:id` |
| Cadastrar usuario | POST | `/usuarios` |
| Atualizar usuario | PATCH | `/usuarios/:id` |
| Excluir usuario | DELETE | `/usuarios/:id` |

Tambem existem validacoes de campos, impedimento de emails duplicados e mensagens de sucesso ou erro.

## 5. Persistencia dos dados financeiros

As transacoes, contas e metas sao separadas por usuario no recurso `dadosFinanceiros` da API. Ao iniciar uma sessao, o sistema busca o registro financeiro correspondente ao usuario. Caso nao exista registro, ele cria um registro vazio.

Sempre que transacoes, contas ou metas forem alteradas, o sistema agenda uma nova gravacao na API apos 300 milissegundos. Isso evita chamadas excessivas e evita perder alteracoes durante operacoes sucessivas.

O sistema tambem informa visualmente falhas de carregamento ou persistencia.

## 6. Controle de acesso

As rotas financeiras exigem login. A rota de usuarios exige uma conta administradora. Usuarios normais nao possuem acesso ao painel administrativo.

A conta administrativa utilizada nos testes e:

- Email: `admin@financepro.com`
- Senha: `admin1234`

## 7. CRUD realizado

O CRUD principal foi implementado para usuarios por meio do JSON Server. A interface permite:

- **Criar:** formulario de cadastro;
- **Ler:** listagem geral e busca por ID;
- **Atualizar:** edicao de nome, email e senha;
- **Excluir:** remocao mediante confirmacao.

O aplicativo tambem realiza operacoes CRUD em dados financeiros em contexto local: transacoes podem ser criadas e removidas, contas podem ser criadas, atualizadas pelo status e removidas, e metas podem ser criadas, atualizadas pelo progresso e removidas.

## 8. Dificuldades encontradas

As principais dificuldades do grupo foram:

- Aprender o Vue 3 e compreender reatividade;
- Integrar HTML, CSS e JavaScript dentro de componentes;
- Aprender a dividir o projeto em componentes;
- Compartilhar estado entre paginas;
- Integrar o front-end com JSON Server;
- Preservar dados financeiros separadamente para cada usuario;
- Definir comportamentos para validacao, acesso e persistencia.

## 9. Limitacoes atuais

- Nao existe simulador financeiro implementado;
- O dashboard nao possui grafico real de evolucao;
- O relatorio nao gera PDF;
- O grafico de pizza do relatorio esta pendente;
- O projeto utiliza JSON Server e autenticacao local, portanto nao deve ser usado em producao com dados reais;
- As senhas ficam armazenadas sem criptografia;
- Os dados nao possuem backup ou servidor externo;
- O sistema nao utiliza banco de dados convencional.

## 10. Conclusao

O FinancePro apresentou uma entrega funcional composta por paginas principais de entrada, dashboard, controle de contas, metas, educacao financeira, relatorio e administracao de usuarios. O projeto alcançou o objetivo central de apoiar o usuario no acompanhamento das financas pessoais e na aprendizagem de conceitos basicos.

O trabalho demonstrou a aplicacao pratica de componentes Vue, rotas protegidas, reatividade, stores, integracao com API, validacoes e persistencia de dados. Os pontos pendentes sao melhorias visuais e analiticas, especialmente graficos, simulador financeiro e exportacao de PDF.
