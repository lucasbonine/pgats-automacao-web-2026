/// <reference types="cypress" />
import { faker } from '@faker-js/faker';


describe('Automation Exercise', () =>{

    it('Cadastrar um novo usuário com sucesso', () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName });

        cy.visit('/');
        cy.get('a[href*=login]').click(); //redirecionamento para página de login


       cy.get('[data-qa="signup-name"]').type(firstName); //entra nome
       cy.get('[data-qa="signup-email"]').type(email); //entra email
       cy.get('[data-qa="signup-button"]').click(); //clica em signup

       //--------- Dentro da Página de cadastro -----------

       //radio button e check boxes
       cy.get('#id_gender2').check(); //seleciona gender 2

       //password
       cy.get('[data-qa="password"]').type('123456');

       //selects de data de nascimento
       cy.get('[data-qa="days"]').select('1'); //dia
       cy.get('[data-qa="months"]').select('5'); //mês
       cy.get('[data-qa="years"]').select('1986'); //ano

       //checks
       cy.get('#newsletter').check();
       cy.get('#optin').check();

       //address
       cy.get('[data-qa="address"]').type('rua 123'); 
       

       //nome, sobrenome e company
       cy.get('[data-qa="first_name"]').type(firstName); //first name
       cy.get('[data-qa="last_name"]').type(lastName); //last name
       cy.get('[data-qa="company"]').type('Lucas corp'); //company


       //country
       cy.get('[data-qa="country"]').select('India');

       //state
       cy.get('[data-qa="state"]').type('RS');

       //city
       cy.get('[data-qa="city"]').type('pelotas');

       //zipcode
       cy.get('[data-qa="zipcode"]').type('95900123');

       //mobile number
       cy.get('[data-qa="mobile_number"]').type('9999999');

       //clica no criar conta
       cy.get('[data-qa="create-account"]').click();

       //assert de sucesso
       cy.get('[data-qa="account-created"]').should('be.visible').and('contain.text', 'Account Created!');

    });

});
