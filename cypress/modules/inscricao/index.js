function inscreverEmail(email) {
    cy.get('#footer').scrollIntoView();
    cy.contains('h2', 'Subscription').should('be.visible');
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
}

function verificarInscricaoComSucesso() {
    cy.get('#success-subscribe').should('be.visible')
        .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
    inscreverEmail,
    verificarInscricaoComSucesso
};
