# PGATS — Automação Web 2026

Projeto desenvolvido para o trabalho de Automação Web da PGATS, usando Cypress e JavaScript no site [Automation Exercise](https://www.automationexercise.com/).

## Casos de teste

Foram automatizados os seguintes casos da página [Test Cases](https://www.automationexercise.com/test_cases):

| Caso | O que o teste faz |
|---|---|
| 1 | Cadastra um usuário com e-mail aleatório e confere a criação da conta. |
| 2 | Faz login com os dados corretos e confere o nome do usuário. |
| 3 | Tenta entrar com senha incorreta e confere a mensagem de erro. |
| 4 | Faz login, sai da conta e confere o retorno à tela de login. |
| 5 | Tenta cadastrar um e-mail já utilizado e confere o erro. |
| 8 | Abre o primeiro produto da lista e confere nome, categoria, preço, disponibilidade, condição e marca. |
| 9 | Busca por Blue Top e confere o produto encontrado e a quantidade de resultados. |
| 10 | Inscreve um e-mail no rodapé da página inicial e confere a mensagem de sucesso. |
| 15 | Cadastra uma conta antes da compra, confere endereços e pedido e finaliza o pagamento. |
| 16 | Cria uma conta, faz logout e entra novamente para realizar a compra e conferir sua confirmação. |

Os casos 1 a 5 estão em `automation-exercice-modules.cy.js` e os demais em `automation-exercise-exercicio.cy.js`. As funções usadas pelos testes ficam em `cypress/modules`, nos arquivos `index.js`.

Para os casos 2, 4 e 5, a conta informada no arquivo de teste precisa existir no site. Nenhum teste exclui contas.

## Preparação

Com Node.js e npm instalados, abra o terminal na pasta do projeto.

Instale as dependências:

```bash
npm install
```

Copie o arquivo de exemplo para `.env` (no PowerShell):

```powershell
Copy-Item .env.example .env
```

O arquivo já vem com a URL do site:

```dotenv
CYPRESS_BASE_URL=https://www.automationexercise.com
```

A URL também pode ser definida pela variável de ambiente `CYPRESS_BASE_URL`, que tem prioridade sobre o `.env`. Não envie o `.env` para o GitHub.

## Como executar

Para abrir o Cypress e escolher o teste:

```bash
npx cypress open
```

Na janela, selecione **E2E Testing**, o navegador e o arquivo de teste.

Para executar todos os testes pelo terminal:

```bash
npx cypress run
```

Para acompanhar a execução com o navegador aberto:

```bash
npx cypress run --headed --browser electron
```

Use os comandos acima; o `npm test` não está configurado neste projeto.

## GitHub Actions e relatórios

A pipeline roda os dois arquivos do trabalho final. Para configurar no GitHub, acesse **Settings → Secrets and variables → Actions → Variables** e crie a variável `CYPRESS_BASE_URL` com o valor `https://www.automationexercise.com`.

Depois, execute em **Actions → Web E2E Tests → Run workflow**.

O relatório do Mochawesome fica em `cypress/reports/index.html`. No GitHub Actions, baixe o artefato **relatorios** na página da execução. Ele também inclui as capturas de tela dos testes que falharem.
