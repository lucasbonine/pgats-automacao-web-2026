/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('Automation Exercise', () => {

    it('Cadastrar novo usuário com sucesso', () => {
        cy.visit('/');
        cy.xpath('//a[@href="/login"]').click();

        cy.xpath('//input[@data-qa="signup-name"]').type('PGATS Aut');
        cy.xpath('//input[@data-qa="signup-email"]').type(`pgats-aut-${Date.now()}@email.com`);
        cy.xpath('//button[@data-qa="signup-button"]').click();
        cy.xpath('//input[@id="id_gender2"]').check();

        cy.xpath('//input[@data-qa="password"]').type('123456');

        // Selects e Comboboxes -> select
        cy.xpath('//select[@data-qa="days"]').select('1');
        cy.xpath('//select[@data-qa="months"]').select('January');
        cy.xpath('//select[@data-qa="years"]').select('2000');

        // Checkboxes -> check        
        cy.xpath('//input[@id="newsletter"]').check();
        cy.xpath('//input[@id="optin"]').check();

        cy.xpath('//input[@data-qa="first_name"]').type('Lucas');
        cy.xpath('//input[@data-qa="last_name"]').type('Bonine');
        cy.xpath('//input[@data-qa="address"]').type('Rua Teste, 123');
        cy.xpath('//select[@data-qa="country"]').select('Canada');
        cy.xpath('//input[@data-qa="state"]').type('RS');
        cy.xpath('//input[@data-qa="city"]').type('Pelotas');
        cy.xpath('//input[@data-qa="zipcode"]').type('6987456');
        cy.xpath('//input[@data-qa="mobile_number"]').type('123456789');

        cy.xpath('//button[@data-qa="create-account"]').click();

        cy.xpath('//*[@data-qa="account-created"]')
            .should('be.visible')
            .and('contain', 'Account Created!');
    });

    it('Efetuar Login de Usuário com email e senha corretos', () => {
        //ARRANGE
        /**
         * Ter uma conta para efeturar o Login
         * pgats-aut-1792010891341@email.com / 123456
         */

        //ACT
        cy.visit('/login');
        cy.xpath('//input[@data-qa="login-email"]').type('pgats-aut-1792010891341@email.com');
        cy.xpath('//input[@data-qa="login-password"]').type('123456');
        cy.xpath('//button[@data-qa="login-button"]').click();

        //ASSERT
        cy.xpath('//a[contains(normalize-space(.), "Logged in as")]/b')
            .should('be.visible')
            .and('contain', 'PGATS Aut');
    });


    it('Efetuar Login de Usuário com email e senha incorretos', () => {
        //ACT
        cy.visit('/login');
        cy.xpath('//input[@data-qa="login-email"]').type('pgats-aut-1792010891341@email.com');
        cy.xpath('//input[@data-qa="login-password"]').type('654321');
        cy.xpath('//button[@data-qa="login-button"]').click();

        //ASSERT
        cy.xpath('//form[@action="/login"]/p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Your email or password is incorrect!')
            .and('contain.text', 'Your email or password is incorrect!');

    });


    it('Efetuar Logout', () => {
        //ACT
        cy.visit('/login');
        cy.xpath('//input[@data-qa="login-email"]').type('pgats-aut-1792010891341@email.com');
        cy.xpath('//input[@data-qa="login-password"]').type('123456');
        cy.xpath('//button[@data-qa="login-button"]').click();

        cy.xpath('//a[@href="/logout"]').should('be.visible').click();

        cy.xpath('//div[contains(concat(" ", normalize-space(@class), " "), " login-form ")]/h2').should('be.visible');
        cy.xpath('//a[@href="/logout"]').should('not.exist');
        cy.url().should('include', 'login');
    });

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('/');
        cy.xpath('//a[@href="/login"]').click();

        cy.xpath('//input[@data-qa="signup-name"]').type('PGATS Aut');
        cy.xpath('//input[@data-qa="signup-email"]').type('pgats-aut-1792010891341@email.com');

        cy.xpath('//button[@data-qa="signup-button"]').click();

        cy.xpath('//form[@action="/signup"]/p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Email Address already exist!')
            .and('contain.text', 'Email Address already exist!');

    });
});