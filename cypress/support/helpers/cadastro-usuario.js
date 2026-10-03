/// <reference types="cypress" />

//verifica se está na página de conta criada
export function verificarSeCadastroFoiEfetuadoComSucesso() {
    return cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain.text', 'Account Created!');
}

/**
 * Cadastra o usuário pela interface e termina na página de confirmação.
 * Recebe os dados do teste e retorna a cadeia Cypress para permitir encadeamento.
 */
export function cadastrarUsuario(usuario) {
    cy.visit('/');
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(usuario.name);
    cy.get('[data-qa="signup-email"]').type(usuario.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get(`input[name="title"][value="${usuario.title}"]`).check();
    cy.get('[data-qa="password"]').type(usuario.password, { log: false });
    cy.get('[data-qa="days"]').select(usuario.birthDay);
    cy.get('[data-qa="months"]').select(usuario.birthMonth);
    cy.get('[data-qa="years"]').select(usuario.birthYear);
    cy.get('[data-qa="first_name"]').type(usuario.name);
    cy.get('[data-qa="last_name"]').type(usuario.lastName);
    cy.get('[data-qa="address"]').type(usuario.address);
    cy.get('[data-qa="country"]').select(usuario.country);
    cy.get('[data-qa="state"]').type(usuario.state);
    cy.get('[data-qa="city"]').type(usuario.city);
    cy.get('[data-qa="zipcode"]').type(usuario.zipcode);
    cy.get('[data-qa="mobile_number"]').type(usuario.mobileNumber);

    return cy.get('[data-qa="create-account"]').click();
}
