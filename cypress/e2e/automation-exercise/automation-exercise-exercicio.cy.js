/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro/index');
const compra = require('../../modules/compra/index');
const login = require('../../modules/login/index');
const paginaInicial = require('../../modules/pagina-inicial/index');
const produtos = require('../../modules/produtos/index');
const inscricao = require('../../modules/inscricao/index');
const carrinho = require('../../modules/carrinho/index');
const checkout = require('../../modules/checkout/index');

describe('Automation Exercise - Exercício para casa', () => {
    it('Cenário 8 - Verificar produtos e detalhes do primeiro produto', () => {
        cy.visit('/');
        paginaInicial.verificarSePaginaInicialEstaVisivel();
        produtos.acessarProdutos();
        produtos.abrirPrimeiroProduto();
        produtos.verificarDetalhesDoPrimeiroProduto();
    });

    it('Cenário 9 - Buscar produto', () => {
        cy.visit('/');
        paginaInicial.verificarSePaginaInicialEstaVisivel();
        produtos.acessarProdutos();
        produtos.buscarProduto('Blue Top');
        produtos.verificarResultadoDaBusca('Blue Top', 1);
    });

    it('Cenário 10 - Inscrever e-mail na página inicial', () => {
        cy.visit('/');
        paginaInicial.verificarSePaginaInicialEstaVisivel();
        inscricao.inscreverEmail(`pgats-subscription-${Date.now()}@example.com`);
        inscricao.verificarInscricaoComSucesso();
    });

    it('Cenário 15 - Comprar com cadastro antes do checkout', () => {
        const nome = 'PGATS Compra';
        const email = `pgats-compra-15-${Date.now()}@example.com`;
        const senha = 'Teste123456';

        cy.visit('/');
        paginaInicial.verificarSePaginaInicialEstaVisivel();
        cy.get('a[href="/login"]').click();
        cadastro.iniciarCadastro(nome, email);
        compra.preencherCadastroParaCompra(senha);
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso();
        compra.continuarAposCadastro();
        compra.verificarUsuarioLogado(nome);

        carrinho.adicionarProduto(1);
        carrinho.acessarCarrinho();
        carrinho.verificarProdutoNoCarrinho(1, 'Blue Top');
        carrinho.prosseguirParaCheckout();
        checkout.verificarEnderecos();
        checkout.verificarResumoDoPedido();
        checkout.confirmarPedido('Entregar em horário comercial.');
        checkout.preencherPagamento(nome);
        checkout.pagarEConfirmarPedido();
        checkout.verificarPedidoConfirmado();
    });

    it('Cenário 16 - Comprar com login antes do checkout', () => {
        const nome = 'PGATS Compra';
        const email = `pgats-compra-16-${Date.now()}@example.com`;
        const senha = 'Teste123456';

        cy.visit('/');
        paginaInicial.verificarSePaginaInicialEstaVisivel();
        // Preparação: criar uma conta independente e encerrar a sessão.
        cy.get('a[href="/login"]').click();
        cadastro.iniciarCadastro(nome, email);
        compra.preencherCadastroParaCompra(senha);
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso();
        compra.continuarAposCadastro();
        compra.verificarUsuarioLogado(nome);
        login.efetuarLogout();
        login.verificarSeOUsuaraioFoiDeslogado();

        cy.get('.shop-menu a[href="/"]').click();
        paginaInicial.verificarSePaginaInicialEstaVisivel();
        cy.get('a[href="/login"]').click();
        login.preencherLogin(email, senha);
        compra.verificarUsuarioLogado(nome);

        carrinho.adicionarProduto(1);
        carrinho.acessarCarrinho();
        carrinho.verificarProdutoNoCarrinho(1, 'Blue Top');
        carrinho.prosseguirParaCheckout();
        checkout.verificarEnderecos();
        checkout.verificarResumoDoPedido();
        checkout.confirmarPedido('Entregar em horário comercial.');
        checkout.preencherPagamento(nome);
        checkout.pagarEConfirmarPedido();
        checkout.verificarPedidoConfirmado();
    });
});
