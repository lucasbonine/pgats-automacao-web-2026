function verificarEndereco(seletor) {
    cy.get(seletor).should('be.visible')
        .and('contain.text', 'Lucas Teste')
        .and('contain.text', 'PGATS')
        .and('contain.text', 'Rua Teste, 123')
        .and('contain.text', 'Apartamento 10')
        .and('contain.text', 'Toronto')
        .and('contain.text', 'Ontario')
        .and('contain.text', '123456')
        .and('contain.text', 'Canada')
        .and('contain.text', '11999999999');
}

function verificarEnderecos() {
    cy.contains('h2', 'Address Details').should('be.visible');
    verificarEndereco('#address_delivery');
    verificarEndereco('#address_invoice');
}

function verificarResumoDoPedido() {
    cy.contains('h2', 'Review Your Order').should('be.visible');
    cy.get('#product-1').should('contain.text', 'Blue Top');
    cy.get('#product-1 .cart_price').should('contain.text', 'Rs. 500');
    cy.get('#product-1 .cart_quantity button').should('have.text', '1');
    cy.get('#product-1 .cart_total').should('contain.text', 'Rs. 500');
}

function confirmarPedido(mensagem) {
    cy.get('textarea[name="message"]').type(mensagem);
    cy.contains('a', 'Place Order').click();
}

function preencherPagamento(nome) {
    cy.get('[data-qa="name-on-card"]').type(nome);
    cy.get('[data-qa="card-number"]').type('4111111111111111');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2030');
}

function pagarEConfirmarPedido() {
    cy.get('[data-qa="pay-button"]').click();
}

function verificarPedidoConfirmado() {
    cy.get('[data-qa="order-placed"]').should('be.visible').and('contain.text', 'Order Placed!');
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
}

module.exports = {
    verificarEndereco,
    verificarEnderecos,
    verificarResumoDoPedido,
    confirmarPedido,
    preencherPagamento,
    pagarEConfirmarPedido,
    verificarPedidoConfirmado
};
