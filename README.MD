# PGATS — Automação Web 2026

Projeto de testes end-to-end com Cypress e JavaScript para o site [Automation Exercise](https://www.automationexercise.com/). Os dados de usuários são gerados com `@faker-js/faker` e os fluxos são executados pela interface, usando seletores CSS.

## Preparação

É necessário ter Node.js e npm instalados e acesso à internet para acessar o site de testes. Execute os comandos abaixo no terminal, na raiz do projeto.

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` na raiz a partir do modelo (PowerShell):

```powershell
Copy-Item .env.example .env
```

Configure a URL do ambiente no `.env`:

```dotenv
CYPRESS_BASE_URL=https://www.automationexercise.com
```

O `cypress.config.js` carrega esse arquivo com `dotenv` e define `e2e.baseUrl`. Os testes e helpers usam `cy.visit('/')`. O `.env` é ignorado pelo Git; o `.env.example` contém o modelo para configurar outras instalações. Uma variável `CYPRESS_BASE_URL` já definida no ambiente tem prioridade sobre o arquivo. Reinicie o Cypress após alterar a configuração.

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

### Executar com o navegador visível

```bash
npx cypress run --headed --browser electron
```

O script `npm test` ainda não está configurado para executar o Cypress. Utilize os comandos `npx cypress` acima.


