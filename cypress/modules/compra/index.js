function preencherCadastroParaCompra(senha) {
    cy.contains('h2', 'Enter Account Information').should('be.visible');
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type(senha);
    cy.get('[data-qa="days"]').select('1');
    cy.get('[data-qa="months"]').select('January');
    cy.get('[data-qa="years"]').select('2000');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('[data-qa="first_name"]').type('Lucas');
    cy.get('[data-qa="last_name"]').type('Teste');
    cy.get('[data-qa="company"]').type('PGATS');
    cy.get('[data-qa="address"]').type('Rua Teste, 123');
    cy.get('[data-qa="address2"]').type('Apartamento 10');
    cy.get('[data-qa="country"]').select('Canada');
    cy.get('[data-qa="state"]').type('Ontario');
    cy.get('[data-qa="city"]').type('Toronto');
    cy.get('[data-qa="zipcode"]').type('123456');
    cy.get('[data-qa="mobile_number"]').type('11999999999');
    cy.get('[data-qa="create-account"]').click();
}

function continuarAposCadastro() {
    cy.get('[data-qa="continue-button"]').click();
}

function verificarUsuarioLogado(nome) {
    cy.contains('a', 'Logged in as').should('be.visible').and('contain.text', nome);
}

function excluirConta() {
    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
}

module.exports = {
    preencherCadastroParaCompra,
    continuarAposCadastro,
    verificarUsuarioLogado,
    excluirConta
};
