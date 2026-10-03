/// <reference types="cypress" />
import {
    loginUsuario,
    verificarSeFormularioDeLoginEstaVisivel,
    verificarSeEstaNaPaginaDeLogin,
    verificarSeLinkDeLogoutNaoExiste,
} from '../../support/helpers/login-usuario';
import { verificarSePaginaInicialEstaVisivel } from '../../support/helpers/pagina-inicial';
import { faker } from '@faker-js/faker';

describe('Automation Exercise - Test Case 3', () => {
    it('Rejeitar login com email e senha incorretos', () => {
        // Usa um e-mail único sem cadastrar uma conta no site.
        const usuario = {
            email: `nao-cadastrado-${faker.string.uuid()}@example.com`,
            password: faker.internet.password(),
        };

        cy.visit('/');
        verificarSePaginaInicialEstaVisivel();

        cy.get('a[href="/login"]').click();
        verificarSeFormularioDeLoginEstaVisivel();

        loginUsuario(usuario);

        cy.get('.login-form form p')
            .should('be.visible')
            .and('have.text', 'Your email or password is incorrect!');
        verificarSeEstaNaPaginaDeLogin();
        verificarSeLinkDeLogoutNaoExiste();
    });
});
