/// <reference types="cypress" />

/**
 * Preenche e envia o formulário de login, que deve estar aberto.
 * Retorna a cadeia Cypress; as validações ficam no teste.
 * @param {{ email: string, password: string }} usuario
 */
export function loginUsuario(usuario) {
    cy.get('[data-qa="login-email"]').clear().type(usuario.email);
    cy.get('[data-qa="login-password"]').clear({ log: false }).type(usuario.password, { log: false });

    return cy.get('[data-qa="login-button"]').click();
}
