function iniciarCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
}

function preencherCadastro() {
    cy.get('#id_gender2').check();
    cy.get('[data-qa="password"]').type('123456');

    // Selects e Comboboxes -> select
    cy.get('[data-qa="days"]').select('1');
    cy.get('[data-qa="months"]').select('January');
    cy.get('[data-qa="years"]').select('2000');

    // Checkboxes -> check        
    cy.get('#newsletter').check();
    cy.get('#optin').check();

    cy.get('[data-qa="first_name"]').type('Lucas');
    cy.get('[data-qa="last_name"]').type('Bonine');
    cy.get('[data-qa="address"]').type('Rua Teste, 123');
    cy.get('[data-qa="country"]').select('Canada');
    cy.get('[data-qa="state"]').type('RS');
    cy.get('[data-qa="city"]').type('Pelotas');
    cy.get('[data-qa="zipcode"]').type('6987456');
    cy.get('[data-qa="mobile_number"]').type('123456789');

    cy.get('[data-qa="create-account"]').click();
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
    cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain', 'Account Created!');
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
    cy.get('form[action*="/signup"] > p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Email Address already exist!')
        .and('contain.text', 'Email Address already exist!');
}

module.exports = {
    iniciarCadastro,
    preencherCadastro,
    verificarSeCadastroFoiEfetuadoComSucesso,
    verificarSeMensagemDeCadastroExistenteFoiExibida
}