/// <reference types="cypress" />
import { criarUsuario } from '../../support/factories/usuario';
import { cadastrarUsuario } from '../../support/helpers/cadastro-usuario';
import { loginUsuario } from '../../support/helpers/login-usuario';

describe('Automation Exercise - Test Case 4', () => {
    let usuario;

    beforeEach(() => {
        usuario = criarUsuario();

        // Prepara uma conta pela interface, sem depender do teste de cadastro.
        cadastrarUsuario(usuario);

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
        cy.location('pathname').should('eq', '/login');
    });

    it('Realizar logout e retornar à página de login', () => {
        cy.visit('/');
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

        // realiza logout
        cy.get('a[href="/logout"]').click();

        //verifica que voltou para a página de login
        cy.location('pathname').should('eq', '/login');

        //verifica que o logout foi feito
        cy.get('.login-form h2')
            .should('be.visible')
            .and('have.text', 'Login to your account');
        //verifica que o login aparece e o logout não aparece
        cy.get('a[href="/login"]').should('be.visible');
        cy.get('a[href="/logout"]').should('not.exist');

        //verifica que o nome do usuário não aparece mais no topo da página
        cy.get('.shop-menu a:has(.fa-user)').should('not.exist');
    });
});
