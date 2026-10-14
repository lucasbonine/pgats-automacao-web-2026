/// <reference types="cypress" />

describe('Automation Exercise', () => {
   
    it.only('deve cadastrar novo usuário com sucesso', () => {
        // Gera um e-mail diferente a cada execução
        const emailDinamico = `pgats-aut-${Date.now()}@email.com`;

        cy.visit('https://automationexercise.com/');
        cy.get('a[href*=login]').click();

        cy.get('[data-qa="signup-name"]').type('PGATS Aut');
        cy.get('[data-qa="signup-email"]').type(emailDinamico);

        cy.get('[data-qa="signup-button"]').click();

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
        cy.get('[data-qa="continue-button"]').click();

        cy.contains('a', 'Logout').should('be.visible');
    });

    it('Efetuar Login de Usuário com email e senha corretos', () =>{
        /**
         * Ter uma conta para efeturar o Login
         * pgats-aut-1792010891341@email.com / 123456
         */

        
    });
});