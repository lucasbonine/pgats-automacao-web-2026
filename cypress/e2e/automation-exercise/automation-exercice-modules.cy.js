/// <reference types="cypress" />

describe('Automation Exercise', () => {

    it.only('Cadastrar novo usuário com sucesso', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href*=login]').click();

        /** Iniciar Cadastro */
        iniciarCadastro();
        /** Iniciar Cadastro */

        /** Preencher Cadastro */
        preencherCadastro();
        /** Preencher Cadastro */

        /** Verificar Cadastro efetuado */
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
        cy.get('[data-qa="login-email"]').type('pgats-aut-1792010891341@email.com');
        cy.get('[data-qa="login-password"]').type('123456');
        cy.get('[data-qa="login-button"]').click();

        //ASSERT
        cy.get('a > b').should('contain', 'PGATS Aut');


    });


    it('Efetuar Login de Usuário com email e senha incorretos', () => {
        //ACT
        cy.visit('https://automationexercise.com/login');
        cy.get('[data-qa="login-email"]').type('pgats-aut-1792010891341@email.com');
        cy.get('[data-qa="login-password"]').type('654321');
        cy.get('[data-qa="login-button"]').click();

        //ASSERT
        cy.get('form[action*="login"] > p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Your email or password is incorrect!')
            .and('contain.text', 'Your email or password is incorrect!');

    });


    it('Efetuar Logout', () => {

        //ACT
        cy.visit('https://automationexercise.com/login');
        cy.get('[data-qa="login-email"]').type('pgats-aut-1792010891341@email.com');
        cy.get('[data-qa="login-password"]').type('123456');
        cy.get('[data-qa="login-button"]').click();

        cy.get('a[href*="/logout"]').should('be.visible').click();

        cy.get('.login-form > h2').should('be.visible');
        cy.get('a[href*="/logout"]').should('not.exist');
        cy.url().should('include', 'login');

    });

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {

        cy.visit('https://automationexercise.com/');
        cy.get('a[href*=login]').click();

        cy.get('[data-qa="signup-name"]').type('PGATS Aut');
        cy.get('[data-qa="signup-email"]').type('pgats-aut-1792010891341@email.com');

        cy.get('[data-qa="signup-button"]').click();

        cy.get('form[action*="/signup"] > p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Email Address already exist!')
            .and('contain.text', 'Email Address already exist!');

    });

});

function iniciarCadastro() {
    /** Iniciar Cadastro */
    cy.get('[data-qa="signup-name"]').type('PGATS Aut');
    cy.get('[data-qa="signup-email"]').type(`pgats-aut-${Date.now()}@email.com`);
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
    //cy.get('[data-qa="continue-button"]').click();

    cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain', 'Account Created!');
}