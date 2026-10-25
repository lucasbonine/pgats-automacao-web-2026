function adicionarProduto(id) {
    cy.get(`.features_items .productinfo a[data-product-id="${id}"]`).click();
    cy.get('#cartModal').should('be.visible');
    cy.contains('#cartModal button', 'Continue Shopping').click();
}

function acessarCarrinho() {
    cy.get('header a[href="/view_cart"]').click();
    cy.location('pathname').should('eq', '/view_cart');
}

function verificarProdutoNoCarrinho(id, nome) {
    cy.get(`#product-${id}`).should('be.visible').and('contain.text', nome);
}

function prosseguirParaCheckout() {
    cy.contains('a', 'Proceed To Checkout').click();
    cy.location('pathname').should('eq', '/checkout');
}

module.exports = {
    adicionarProduto,
    acessarCarrinho,
    verificarProdutoNoCarrinho,
    prosseguirParaCheckout
};
