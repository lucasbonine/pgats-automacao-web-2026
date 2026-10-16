/// <reference types="cypress" />

describe('Automation Exercise', () => {

    it('Cadastrar novo usuário com sucesso', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href*=login]').click();
        iniciarCadastro('PGATS Aut', `pgats-aut-${Date.now()}@email.com`);
        preencherCadastro();
        verificarSeCadastroFoiEfetuadoComSucesso();
    });

    it('Efetuar Login de Usuário com email e senha corretos', () => {
        //ARRANGE
        /**
         * Ter uma conta para efeturar o Login
         * pgats-aut-1792010891341@email.com / 123456
         */

        //ACT
        cy.visit('https://automationexercise.com/login');
        preencherLogin('pgats-aut-1792010891341@email.com', '123456');
        verificarSeLoginFoiEfetuadoComSucesso();
    });


    it('Efetuar Login de Usuário com email e senha incorretos', () => {
        //ACT
        cy.visit('https://automationexercise.com/login');
        preencherLogin('pgats-aut-1792010891341@email.com', '654321')
        verificarSeMensagemDeErroFoiExibidaNoLogin()
    });


    it('Efetuar Logout', () => {
        //ACT
        cy.visit('https://automationexercise.com/login');
        preencherLogin('pgats-aut-1792010891341@email.com', '123456')
        efetuarLogout();
        verificarSeOUsuaraioFoiDeslogado();
    });

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href*=login]').click();
        iniciarCadastro('PGATS Aut', 'pgats-aut-1792010891341@email.com')
        verificarSeMensagemDeCadastroExistenteFoiExibida();
    });
});


// CADASTRO
function iniciarCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
}

function preencherCadastro() {
    cy.get('#id_gender2').check();
    cy.get('[data-qa="password"]').type('123456');

    // Selects e Comboboxes -> select
    cy.get('[data-qa="days"]').select('1');
    cy.get('[data-qa="months"]').select('January');
    cy.get('[data-qa="years"]').select('2000');

    // Checkboxes -> check        
    cy.get('#newsletter').check();
    cy.get('#optin').check();

    cy.get('[data-qa="first_name"]').type('Lucas');
    cy.get('[data-qa="last_name"]').type('Bonine');
    cy.get('[data-qa="address"]').type('Rua Teste, 123');
    cy.get('[data-qa="country"]').select('Canada');
    cy.get('[data-qa="state"]').type('RS');
    cy.get('[data-qa="city"]').type('Pelotas');
    cy.get('[data-qa="zipcode"]').type('6987456');
    cy.get('[data-qa="mobile_number"]').type('123456789');

    cy.get('[data-qa="create-account"]').click();
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
    cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain', 'Account Created!');
}

// LOGIN
function preencherLogin(email, senha) {
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha);
    cy.get('[data-qa="login-button"]').click();
}


function verificarSeLoginFoiEfetuadoComSucesso() {
    /** verificarSeLoginFoiEfetuadoComSucesso() */
    //ASSERT
    cy.get('a > b').should('contain', 'PGATS Aut');
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
    cy.get('form[action*="login"] > p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Your email or password is incorrect!')
        .and('contain.text', 'Your email or password is incorrect!');
}

function efetuarLogout() {
    cy.get('a[href*="/logout"]').should('be.visible').click();
}

function verificarSeOUsuaraioFoiDeslogado() {
    cy.get('.login-form > h2').should('be.visible');
    cy.get('a[href*="/logout"]').should('not.exist');
    cy.url().should('include', 'login');
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
    cy.get('form[action*="/signup"] > p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Email Address already exist!')
        .and('contain.text', 'Email Address already exist!');
}