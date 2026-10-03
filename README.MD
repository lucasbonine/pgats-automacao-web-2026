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

## Testes existentes

O projeto contém cinco cenários. Todos acessam a URL definida no `.env` por meio de `cy.visit('/')` e usam seletores CSS com `cy.get()` para localizar os elementos. As verificações repetidas ficam nos helpers e são chamadas explicitamente pelos testes; as validações específicas permanecem nos cenários.

| Cenário | Preparação dos dados | Helpers utilizados | Resultado esperado |
| --- | --- | --- | --- |
| Cadastro — Aula | Dados gerados diretamente com Faker. | Cadastro no próprio teste e confirmação pelo helper. | Conta criada com sucesso. |
| Caso 2 — Login correto | Novo usuário gerado pela factory `criarUsuario()` no `beforeEach`. | `cadastrarUsuario` e `loginUsuario`. | Login realizado e conta excluída. |
| Caso 3 — Login incorreto | E-mail com UUID e senha gerados com Faker, sem cadastro. | `loginUsuario`. | Mensagem de erro e permanência na página de login. |
| Caso 4 — Logout | Novo usuário gerado pela factory `criarUsuario()` no `beforeEach`. | `cadastrarUsuario` e `loginUsuario`. | Sessão encerrada e retorno à página de login. |
| Caso 5 — E-mail já cadastrado | Conta criada com a factory `criarUsuario()` no `beforeEach`. | `cadastrarUsuario`. | Cadastro repetido rejeitado com mensagem de e-mail existente. |

### Cadastro de usuário — Aula

Arquivo: [automation-exercise-aula.cy.js](cypress/e2e/automation-exercise/automation-exercise-aula.cy.js).

O teste gera nome, sobrenome e e-mail com Faker, acessa a página de cadastro e preenche os dados pessoais, senha, data de nascimento e endereço. Também marca as opções de newsletter e ofertas, cria a conta e verifica se a mensagem `Account Created!` está visível.

Esse cenário termina na confirmação do cadastro e mantém a conta criada no site.

### Caso 2 — Login com e-mail e senha corretos

Arquivo: [automation-exercise-test-case-2.cy.js](cypress/e2e/automation-exercise/automation-exercise-test-case-2.cy.js).

No `beforeEach`, o teste chama a factory `criarUsuario()` para gerar um objeto novo com os dados de cadastro e e-mail único. Em seguida, cadastra a conta pela interface usando o helper `cadastrarUsuario`, confirma o cadastro e faz logout.

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

### Caso 4 — Logout do usuário

Arquivo: [automation-exercise-test-case-4.cy.js](cypress/e2e/automation-exercise/automation-exercise-test-case-4.cy.js).

No `beforeEach`, o teste usa a factory `criarUsuario()` para gerar os dados, cria uma conta pela interface usando `cadastrarUsuario` e encerra a sessão automática do cadastro. A factory centraliza os campos também utilizados pelo caso 2, retornando um objeto novo a cada chamada. O cenário pode ser executado independentemente dos demais testes.

Em seguida, o cenário:

1. Acessa a página inicial e verifica sua visibilidade.
2. Abre o formulário de login e valida o título `Login to your account`.
3. Realiza login com as credenciais criadas usando `loginUsuario`.
4. Valida o texto `Logged in as` com o nome do usuário.
5. Clica em logout e verifica o redirecionamento para `/login`.
6. Confirma que o formulário e o link de login estão visíveis e que o link de logout e a identificação do usuário não existem.

O teste termina com a sessão encerrada e mantém a conta criada no site.

### Caso 5 — Cadastro com e-mail já existente

Arquivo: [automation-exercise-test-case-5.cy.js](cypress/e2e/automation-exercise/automation-exercise-test-case-5.cy.js).

No `beforeEach`, gera um usuário com `criarUsuario()`, cadastra a conta pela interface usando `cadastrarUsuario` e faz logout. O teste acessa a página inicial, abre o cadastro, valida `New User Signup!` e envia o nome e o mesmo e-mail já cadastrado. Por fim, verifica a mensagem `Email Address already exist!`.

O cenário prepara sua própria conta, usa seletores CSS e a URL do `.env`. A conta permanece cadastrada após a execução.

## Geração de dados de usuário

Os casos 2, 4 e 5 usam a factory `criarUsuario`, em `cypress/support/factories/usuario.js`, para gerar os dados de cadastro. Cada chamada retorna um objeto novo, com nome e senha gerados pelo Faker e um e-mail com UUID.

```js
import { criarUsuario } from '../../support/factories/usuario';

const usuario = criarUsuario();
const usuarioPersonalizado = criarUsuario({ name: 'Lucas', city: 'Pelotas' });
```

As propriedades informadas substituem os valores padrão. A factory apenas gera dados; os helpers continuam responsáveis pelo cadastro e login pela interface. Nos testes, chame `criarUsuario()` no `beforeEach` para preparar dados novos a cada execução.

## Seletores CSS usados no projeto

O seletor CSS passado para `cy.get()` indica quais elementos localizar. Depois, o Cypress executa ações como `.click()` ou validações como `.should('be.visible')`.

### Seletores por atributo: `[atributo="valor"]`

Os colchetes buscam um atributo HTML. O operador `=` exige o valor exato. Por exemplo, `[data-qa="login-email"]` encontra o elemento com `data-qa="login-email"`. `data-qa` é um atributo personalizado usado no site para identificar elementos.

```js
//preenche o email
cy.get('[data-qa="login-email"]').type(usuario.email);
```

Adicionar uma tag restringe a busca: `a[href="/login"]` encontra links `<a>` cujo `href` seja exatamente `/login`. Já `a[href*=login]` usa `*=` para procurar o trecho `login` em qualquer posição do atributo, incluindo `/login?origem=home`. A busca é pelo atributo, não pelo texto visível.

### ID, classe e descendentes

- **ID (`#`)**: `#slider` encontra o elemento com `id="slider"`. Um ID deve ser único na página.
- **Classe (`.`)**: `.login-form` encontra elementos que tenham essa classe, mesmo que possuam outras classes.
- **Descendentes (espaço)**: `.login-form h2` encontra títulos `<h2>` dentro de `.login-form`, em qualquer profundidade. `.signup-form form p` encontra parágrafos dentro de um formulário na área de cadastro. O elemento retornado é o da última parte do seletor.

O espaço não exige um filho direto; para isso, a sintaxe CSS seria `>`.

### Elemento que contém outro: `:has()`

`.shop-menu a:has(.fa-user)` encontra links dentro de `.shop-menu` que contenham um descendente com a classe `.fa-user`. O alvo é o link `<a>`, não o ícone. O texto do usuário é verificado depois:

```js
//verifica que usuário está logado
cy.get('.shop-menu a:has(.fa-user)')
    .should('be.visible')
    .and('contain.text', `Logged in as ${usuario.name}`);
```

### Vários atributos e valores dinâmicos

```js
cy.get(`input[name="title"][value="${usuario.title}"]`).check();
```

Os atributos escritos juntos, sem espaço, devem pertencer ao mesmo `<input>`. As crases e `${usuario.title}` são JavaScript: se o título for `Mr`, o seletor será `input[name="title"][value="Mr"]`. Depois, `.check()` marca a opção.

### Seletores, ações e validações

`.click()`, `.clear()`, `.type()`, `.check()` e `.select()` são ações, não seletores. `be.visible` verifica visibilidade; `not.exist` verifica ausência no DOM, não apenas um elemento escondido. `have.text` compara o texto completo, enquanto `contain.text` verifica um trecho.

`cy.location('pathname')` consulta o caminho da URL, sem selecionar elementos. Um seletor pode encontrar vários elementos; restrinja os atributos ou o contexto quando a ação exigir um único alvo.

## Organização do projeto

```text
cypress/
├── e2e/
│   └── automation-exercise/
│       ├── automation-exercise-aula.cy.js
│       ├── automation-exercise-test-case-2.cy.js
│       ├── automation-exercise-test-case-3.cy.js
│       ├── automation-exercise-test-case-4.cy.js
│       └── automation-exercise-test-case-5.cy.js
├── fixtures/
│   └── example.json
└── support/
    ├── factories/
    │   └── usuario.js
    ├── helpers/
    │   ├── cadastro-usuario.js
    │   ├── login-usuario.js
    │   └── pagina-inicial.js
    ├── commands.js
    └── e2e.js
cypress.config.js
package.json
```

- `cadastro-usuario.js`: reúne `cadastrarUsuario`, que preenche e envia o cadastro pela interface, e `verificarSeCadastroFoiEfetuadoComSucesso`, que verifica a visibilidade e o texto `Account Created!`. O teste da aula e os casos 2, 4 e 5 chamam a verificação explicitamente. A navegação após a confirmação e o logout ficam nos testes.
- `login-usuario.js`: reúne `loginUsuario` e as verificações `verificarSeFormularioDeLoginEstaVisivel`, `verificarSeUsuarioEstaLogado(usuario)`, `verificarSeEstaNaPaginaDeLogin` (caminho `/login`) e `verificarSeLinkDeLogoutNaoExiste`. Cada verificação retorna a cadeia Cypress e é chamada separadamente pelo teste.
- `pagina-inicial.js`: contém `navegarParaRaizDoSite`, que executa `cy.visit('/')` usando a URL configurada no Cypress, e `verificarSePaginaInicialEstaVisivel`, que verifica a visibilidade de `#slider`.
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
