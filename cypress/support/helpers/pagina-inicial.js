/// <reference types="cypress" />

//verifica que está na página inicial
export function verificarSePaginaInicialEstaVisivel() {
    return cy.get('#slider').should('be.visible');
}
