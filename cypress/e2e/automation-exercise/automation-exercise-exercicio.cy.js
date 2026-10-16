/// <reference types="cypress" />

describe('Automation Exercise - Exercício para casa', () => {
    it('Cenário 8 - Verificar produtos e detalhes do primeiro produto', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('#slider').should('be.visible');
        cy.get('a[href="/products"]').click();
        cy.location('pathname').should('eq', '/products');
        cy.contains('h2', 'All Products').should('be.visible');
        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
        cy.get('.features_items a[href="/product_details/1"]').click();
        cy.location('pathname').should('eq', '/product_details/1');
        cy.get('.product-information').should('be.visible').within(() => {
            cy.get('h2').should('have.text', 'Blue Top');
            cy.contains('Category: Women > Tops').should('be.visible');
            cy.contains('span', 'Rs. 500').should('be.visible');
            cy.contains('p', 'Availability:').should('be.visible').and('contain.text', 'In Stock');
            cy.contains('p', 'Condition:').should('be.visible').and('contain.text', 'New');
            cy.contains('p', 'Brand:').should('be.visible').and('contain.text', 'Polo');
        });
    });

    it('Cenário 9 - Buscar produto', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('#slider').should('be.visible');
        cy.get('a[href="/products"]').click();
        cy.contains('h2', 'All Products').should('be.visible');
        cy.get('#search_product').type('Blue Top');
        cy.get('#submit_search').click();
        cy.contains('h2', 'Searched Products').should('be.visible');
        cy.get('.features_items .productinfo').should('have.length.greaterThan', 0).each(($produto) => {
            cy.wrap($produto).scrollIntoView().should('be.visible');
            cy.wrap($produto).find('p').should('have.text', 'Blue Top');
        });
    });

    it('Cenário 10 - Inscrever e-mail na página inicial', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('#slider').should('be.visible');
        cy.get('#footer').scrollIntoView();
        cy.contains('h2', 'Subscription').should('be.visible');
        cy.get('#susbscribe_email').type(`pgats-subscription-${Date.now()}@example.com`);
        cy.get('#subscribe').click();
        cy.get('#success-subscribe').should('be.visible')
            .and('contain.text', 'You have been successfully subscribed!');
    });

    it('Cenário 15 - Comprar com cadastro antes do checkout', () => {
        const nome = 'PGATS Compra';
        const email = `pgats-compra-15-${Date.now()}@example.com`;
        const senha = 'Teste123456';

        cy.visit('https://automationexercise.com/');
        cy.get('#slider').should('be.visible');

        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="signup-name"]').type(nome);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.get('[data-qa="signup-button"]').click();
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
        cy.get('[data-qa="account-created"]').should('be.visible').and('contain.text', 'Account Created!');
        cy.get('[data-qa="continue-button"]').click();
        cy.contains('a', 'Logged in as').should('be.visible').and('contain.text', nome);

        cy.get('.features_items .productinfo a[data-product-id="1"]').click();
        cy.get('#cartModal').should('be.visible');
        cy.contains('#cartModal button', 'Continue Shopping').click();
        cy.get('header a[href="/view_cart"]').click();
        cy.location('pathname').should('eq', '/view_cart');
        cy.get('#product-1').should('be.visible').and('contain.text', 'Blue Top');
        cy.contains('a', 'Proceed To Checkout').click();
        cy.location('pathname').should('eq', '/checkout');
        cy.contains('h2', 'Address Details').should('be.visible');
        cy.get('#address_delivery').should('contain.text', 'Lucas Teste')
            .and('contain.text', 'Rua Teste, 123').and('contain.text', 'Toronto')
            .and('contain.text', 'Canada');
        cy.get('#address_invoice').should('contain.text', 'Lucas Teste')
            .and('contain.text', 'Rua Teste, 123').and('contain.text', 'Toronto')
            .and('contain.text', 'Canada');
        cy.contains('h2', 'Review Your Order').should('be.visible');
        cy.get('#product-1').should('contain.text', 'Blue Top');
        cy.get('#product-1 .cart_price').should('contain.text', 'Rs. 500');
        cy.get('#product-1 .cart_quantity button').should('have.text', '1');
        cy.get('#product-1 .cart_total').should('contain.text', 'Rs. 500');
        cy.get('textarea[name="message"]').type('Entregar em horário comercial.');
        cy.contains('a', 'Place Order').click();
        cy.get('[data-qa="name-on-card"]').type(nome);
        cy.get('[data-qa="card-number"]').type('4111111111111111');
        cy.get('[data-qa="cvc"]').type('123');
        cy.get('[data-qa="expiry-month"]').type('12');
        cy.get('[data-qa="expiry-year"]').type('2030');
        cy.get('[data-qa="pay-button"]').click();
        cy.get('[data-qa="order-placed"]').should('be.visible').and('contain.text', 'Order Placed!');
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
        cy.get('a[href="/delete_account"]').click();
        cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!');
        cy.get('[data-qa="continue-button"]').click();
    });

    it('Cenário 16 - Comprar com login antes do checkout', () => {
        const nome = 'PGATS Compra';
        const email = `pgats-compra-16-${Date.now()}@example.com`;
        const senha = 'Teste123456';

        cy.visit('https://automationexercise.com/');
        cy.get('#slider').should('be.visible');
        // Preparação: criar uma conta independente e encerrar a sessão.

        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="signup-name"]').type(nome);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.get('[data-qa="signup-button"]').click();
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
        cy.get('[data-qa="account-created"]').should('be.visible').and('contain.text', 'Account Created!');
        cy.get('[data-qa="continue-button"]').click();
        cy.contains('a', 'Logged in as').should('be.visible').and('contain.text', nome);

        cy.get('a[href="/logout"]').click();
        cy.location('pathname').should('eq', '/login');
        cy.get('.shop-menu a[href="/"]').click();
        cy.get('#slider').should('be.visible');
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(senha);
        cy.get('[data-qa="login-button"]').click();
        cy.contains('a', 'Logged in as').should('be.visible').and('contain.text', nome);

        cy.get('.features_items .productinfo a[data-product-id="1"]').click();
        cy.get('#cartModal').should('be.visible');
        cy.contains('#cartModal button', 'Continue Shopping').click();
        cy.get('header a[href="/view_cart"]').click();
        cy.location('pathname').should('eq', '/view_cart');
        cy.get('#product-1').should('be.visible').and('contain.text', 'Blue Top');
        cy.contains('a', 'Proceed To Checkout').click();
        cy.location('pathname').should('eq', '/checkout');
        cy.contains('h2', 'Address Details').should('be.visible');
        cy.get('#address_delivery').should('contain.text', 'Lucas Teste')
            .and('contain.text', 'Rua Teste, 123').and('contain.text', 'Toronto')
            .and('contain.text', 'Canada');
        cy.get('#address_invoice').should('contain.text', 'Lucas Teste')
            .and('contain.text', 'Rua Teste, 123').and('contain.text', 'Toronto')
            .and('contain.text', 'Canada');
        cy.contains('h2', 'Review Your Order').should('be.visible');
        cy.get('#product-1').should('contain.text', 'Blue Top');
        cy.get('#product-1 .cart_price').should('contain.text', 'Rs. 500');
        cy.get('#product-1 .cart_quantity button').should('have.text', '1');
        cy.get('#product-1 .cart_total').should('contain.text', 'Rs. 500');
        cy.get('textarea[name="message"]').type('Entregar em horário comercial.');
        cy.contains('a', 'Place Order').click();
        cy.get('[data-qa="name-on-card"]').type(nome);
        cy.get('[data-qa="card-number"]').type('4111111111111111');
        cy.get('[data-qa="cvc"]').type('123');
        cy.get('[data-qa="expiry-month"]').type('12');
        cy.get('[data-qa="expiry-year"]').type('2030');
        cy.get('[data-qa="pay-button"]').click();
        cy.get('[data-qa="order-placed"]').should('be.visible').and('contain.text', 'Order Placed!');
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
        cy.get('a[href="/delete_account"]').click();
        cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!');
        cy.get('[data-qa="continue-button"]').click();
    });
});


