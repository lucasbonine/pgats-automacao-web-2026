/// <reference types="cypress" />

//navega para a raiz do site
export function navegarParaRaizDoSite() {
    cy.visit('/');
}

//verifica que está na página inicial
export function verificarSePaginaInicialEstaVisivel() {
    return cy.get('#slider').should('be.visible');
}
