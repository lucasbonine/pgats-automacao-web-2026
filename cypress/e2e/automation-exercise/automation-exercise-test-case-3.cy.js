/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { loginUsuario } from '../../support/helpers/login-usuario';

describe('Automation Exercise - Test Case 3', () => {
    it('Rejeitar login com email e senha incorretos', () => {
        // Usa um e-mail único sem cadastrar uma conta no site.
        const usuario = {
            email: `nao-cadastrado-${faker.string.uuid()}@example.com`,
            password: faker.internet.password(),
        };

        cy.visit('/');
        cy.get('#slider').should('be.visible');

        cy.get('a[href="/login"]').click();
        cy.get('.login-form h2')
            .should('be.visible')
            .and('have.text', 'Login to your account');

        loginUsuario(usuario);

        cy.get('.login-form form p')
            .should('be.visible')
            .and('have.text', 'Your email or password is incorrect!');
        cy.location('pathname').should('eq', '/login');
        cy.get('a[href="/logout"]').should('not.exist');
    });
});
