# PGATS — Automação Web 2026

Projeto de testes end-to-end com Cypress e JavaScript para o site [Automation Exercise](https://www.automationexercise.com/). Os dados de usuários são gerados com `@faker-js/faker` e os fluxos são executados pela interface, usando seletores CSS.

## Preparação

É necessário ter Node.js e npm instalados e acesso à internet para acessar o site de testes. Execute os comandos abaixo no terminal, na raiz do projeto.

Instale as dependências:

```bash
npm install
```

## Comandos para executar o Cypress

### Abrir a interface interativa

```bash
npx cypress open
```

Selecione **E2E Testing**, escolha um navegador e abra o arquivo de teste desejado.

### Executar todos os testes pelo terminal

```bash
npx cypress run
```

Executa os testes sem abrir uma janela visível do navegador e exibe o resultado no terminal.

### Executar apenas o teste de cadastro da aula

```bash
npx cypress run --spec "cypress/e2e/automation-exercise/automation-exercise-aula.cy.js"
```

### Executar apenas o caso 2 — Login com credenciais corretas

```bash
npx cypress run --spec "cypress/e2e/automation-exercise/automation-exercise-test-case-2.cy.js"
```

### Executar apenas o caso 3 — Login com credenciais incorretas

```bash
npx cypress run --spec "cypress/e2e/automation-exercise/automation-exercise-test-case-3.cy.js"
```

### Executar com o navegador visível

```bash
npx cypress run --headed --browser electron
```

Você também pode adicionar `--spec` a esse comando para executar somente um arquivo.

O script `npm test` ainda não está configurado para executar o Cypress. Utilize os comandos `npx cypress` acima.

## Testes existentes

### Cadastro de usuário — Aula

Arquivo: [automation-exercise-aula.cy.js](cypress/e2e/automation-exercise/automation-exercise-aula.cy.js).

O teste gera nome, sobrenome e e-mail com Faker, acessa a página de cadastro e preenche os dados pessoais, senha, data de nascimento e endereço. Também marca as opções de newsletter e ofertas, cria a conta e verifica se a mensagem `Account Created!` está visível.

Esse cenário termina na confirmação do cadastro e mantém a conta criada no site.

### Caso 2 — Login com e-mail e senha corretos

Arquivo: [automation-exercise-test-case-2.cy.js](cypress/e2e/automation-exercise/automation-exercise-test-case-2.cy.js).

No `beforeEach`, o teste gera dados de um usuário, cadastra a conta pela interface usando o helper `cadastrarUsuario`, confirma o cadastro e faz logout.

Em seguida, o cenário:

1. Acessa a página inicial e verifica sua visibilidade.
2. Abre a página de login e valida o título do formulário.
3. Preenche o e-mail e a senha da conta criada e realiza o login usando o helper `loginUsuario`.
4. Verifica o texto `Logged in as` com o nome do usuário.
5. Exclui a conta pela interface e valida a mensagem `Account Deleted!`.

O teste prepara sua própria conta e pode ser executado independentemente do teste da aula. A exclusão acontece no fim do cenário; se a execução falhar antes dessa etapa, a conta pode permanecer no site.

### Caso 3 — Login com e-mail e senha incorretos

Arquivo: [automation-exercise-test-case-3.cy.js](cypress/e2e/automation-exercise/automation-exercise-test-case-3.cy.js).

O teste gera um e-mail único sem cadastrar uma conta e uma senha com Faker. Verifica a página inicial, abre o formulário de login e valida seu título. Em seguida, usa `loginUsuario` para enviar as credenciais e verifica se a mensagem `Your email or password is incorrect!` está visível. Também confirma que permanece em `/login` e que o link de logout não existe.

O cenário é independente e não cria nem exclui contas.

## Organização do projeto

```text
cypress/
├── e2e/
│   └── automation-exercise/
│       ├── automation-exercise-aula.cy.js
│       ├── automation-exercise-test-case-2.cy.js
│       └── automation-exercise-test-case-3.cy.js
├── fixtures/
│   └── example.json
└── support/
    ├── helpers/
    │   ├── cadastro-usuario.js
    │   └── login-usuario.js
    ├── commands.js
    └── e2e.js
cypress.config.js
package.json
```

- `cadastro-usuario.js`: helper que recebe os dados do usuário e a URL do site, preenche o cadastro pela interface e envia o formulário. As validações e o logout ficam no teste que o utiliza.
- `login-usuario.js`: helper que recebe e-mail e senha no objeto `usuario`, preenche e envia o formulário de login já aberto. A navegação e as validações ficam no teste.
- `commands.js`: arquivo reservado para comandos personalizados; atualmente contém apenas exemplos comentados.
- `e2e.js`: arquivo de suporte carregado antes dos testes; importa `commands.js`.
- `cypress.config.js`: configuração do Cypress, com gravação de vídeo e reexecução automática por alteração de arquivos desativadas.
- `fixtures/example.json`: arquivo de exemplo, atualmente não utilizado pelos testes.

## Solução de problema no PowerShell

Se a inicialização apresentar `Invalid or incompatible cached data (cachedDataRejected)` e a variável `ELECTRON_RUN_AS_NODE` estiver definida, remova-a apenas da sessão atual do terminal e tente novamente:

```powershell
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
npx cypress open
```
