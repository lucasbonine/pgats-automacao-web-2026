function verificarSePaginaInicialEstaVisivel() {
    cy.get('#slider').should('be.visible');
}

module.exports = {
    verificarSePaginaInicialEstaVisivel
};
