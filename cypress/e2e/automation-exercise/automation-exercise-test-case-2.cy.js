/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { cadastrarUsuario } from '../../support/helpers/cadastro-usuario';
import { loginUsuario } from '../../support/helpers/login-usuario';

describe('Automation Exercise - Test Case 2', () => {
    const baseUrl = 'https://www.automationexercise.com';
    let usuario;

    beforeEach(() => {
        usuario = {
            name: faker.person.firstName(),
            email: `login-${faker.string.uuid()}@example.com`,
            password: faker.internet.password(),
            title: 'Mr',
            birthDay: '1',
            birthMonth: '5',
            birthYear: '1986',
            lastName: faker.person.lastName(),
            address: 'Rua de Teste, 123',
            country: 'India',
            state: 'RS',
            city: 'Pelotas',
            zipcode: '95900123',
            mobileNumber: '999999999',
        };

        // Prepara uma conta pela interface, sem depender do teste de cadastro.
        cadastrarUsuario(usuario, baseUrl);

        //verifica se está na página de conta criada
        cy.get('[data-qa="account-created"]')
            .should('be.visible')
            .and('contain.text', 'Account Created!');

        //clica no botão continue
        cy.get('[data-qa="continue-button"]').click();
        
        //verifica que o nome do usuário aparece no topo da página como logado
        cy.get('.shop-menu a:has(.fa-user)')
            .should('be.visible')
            .and('contain.text', `Logged in as ${usuario.name}`);

        // realiza logout
        cy.get('a[href="/logout"]').click();
        
        //verifica que o logout foi feito
        cy.get('.login-form h2')
            .should('be.visible')
            .and('have.text', 'Login to your account');
    });

    it('Realizar login com email e senha corretos e excluir a conta', () => {
        cy.visit(`${baseUrl}/`);
        cy.get('#slider').should('be.visible');

        //clica no login
        cy.get('a[href="/login"]').click();
        
        //verifica que está na página de login
        cy.get('.login-form h2')
            .should('be.visible')
            .and('have.text', 'Login to your account');

        // Realiza login com o usuário cadastrado anteriormente.
        loginUsuario(usuario);

        //verifica que usuário está logado
        cy.get('.shop-menu a:has(.fa-user)')
            .should('be.visible')
            .and('contain.text', `Logged in as ${usuario.name}`);


        //clica em delete account
        cy.get('a[href="/delete_account"]').click();
        
        //verifica que a mensagem de conta deletada apareceu
        cy.get('[data-qa="account-deleted"]')
            .should('be.visible')
            .and('contain.text', 'Account Deleted!');
    });
});
