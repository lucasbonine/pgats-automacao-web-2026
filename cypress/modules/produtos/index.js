function acessarProdutos() {
    cy.get('a[href="/products"]').click();
    cy.location('pathname').should('eq', '/products');
    cy.contains('h2', 'All Products').should('be.visible');
}

function abrirPrimeiroProduto() {
    cy.get('.features_items .product-image-wrapper').should('be.visible');
    cy.get('.features_items .product-image-wrapper').first().find('a[href*="/product_details/"]').click();
}

function verificarDetalhesDoPrimeiroProduto() {
    cy.location('pathname').should('eq', '/product_details/1');
    cy.get('.product-information').should('be.visible');
    cy.get('.product-information h2').should('have.text', 'Blue Top');
    cy.contains('.product-information p', 'Category: Women > Tops').should('be.visible');
    cy.contains('.product-information span', 'Rs. 500').should('be.visible');
    cy.contains('.product-information p', 'Availability:').should('be.visible').and('contain.text', 'In Stock');
    cy.contains('.product-information p', 'Condition:').should('be.visible').and('contain.text', 'New');
    cy.contains('.product-information p', 'Brand:').should('be.visible').and('contain.text', 'Polo');
}

function buscarProduto(nome) {
    cy.get('#search_product').type(nome);
    cy.get('#submit_search').click();
}

function verificarResultadoDaBusca(nome, quantidade) {
    cy.contains('h2', 'Searched Products').should('be.visible');
    cy.get('.features_items .productinfo').should('have.length', quantidade).and('be.visible');
    cy.get('.features_items .productinfo p').should('have.text', nome);
}

module.exports = {
    acessarProdutos,
    abrirPrimeiroProduto,
    verificarDetalhesDoPrimeiroProduto,
    buscarProduto,
    verificarResultadoDaBusca
};
