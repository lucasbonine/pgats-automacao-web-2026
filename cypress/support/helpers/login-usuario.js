/// <reference types="cypress" />

/**
 * Preenche e envia o formulário de login, que deve estar aberto.
 * Retorna a cadeia Cypress; o teste chama as verificações separadamente.
 * @param {{ email: string, password: string }} usuario
 */
export function loginUsuario(usuario) {
    cy.get('[data-qa="login-email"]').clear().type(usuario.email);
    cy.get('[data-qa="login-password"]').clear({ log: false }).type(usuario.password, { log: false });

    return cy.get('[data-qa="login-button"]').click();
}

//verifica que o formulário de login apareceu
export function verificarSeFormularioDeLoginEstaVisivel() {
    return cy.get('.login-form h2')
        .should('be.visible')
        .and('have.text', 'Login to your account');
}

//verifica que usuário está logado
export function verificarSeUsuarioEstaLogado(usuario) {
    return cy.get('.shop-menu a:has(.fa-user)')
        .should('be.visible')
        .and('contain.text', `Logged in as ${usuario.name}`);
}

//verifica que está na URL de login
export function verificarSeEstaNaPaginaDeLogin() {
    return cy.location('pathname').should('eq', '/login');
}

//verifica que o logout não aparece
export function verificarSeLinkDeLogoutNaoExiste() {
    return cy.get('a[href="/logout"]').should('not.exist');
}
