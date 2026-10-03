/// <reference types="cypress" />
import {
    loginUsuario,
    verificarSeFormularioDeLoginEstaVisivel,
    verificarSeUsuarioEstaLogado,
    verificarSeEstaNaPaginaDeLogin,
    verificarSeLinkDeLogoutNaoExiste,
} from '../../support/helpers/login-usuario';
import { navegarParaRaizDoSite, verificarSePaginaInicialEstaVisivel } from '../../support/helpers/pagina-inicial';
import { criarUsuario } from '../../support/factories/usuario';
import { cadastrarUsuario, verificarSeCadastroFoiEfetuadoComSucesso } from '../../support/helpers/cadastro-usuario';

describe('Automation Exercise - Test Case 4', () => {
    let usuario;

    beforeEach(() => {
        usuario = criarUsuario();

        // Prepara uma conta pela interface, sem depender do teste de cadastro.
        cadastrarUsuario(usuario);

        //verifica se está na página de conta criada
        verificarSeCadastroFoiEfetuadoComSucesso();
        //clica no botão continue
        cy.get('[data-qa="continue-button"]').click();

        //verifica que o nome do usuário aparece no topo da página como logado
        verificarSeUsuarioEstaLogado(usuario);

        // realiza logout
        cy.get('a[href="/logout"]').click();

        //verifica que o logout foi feito
        verificarSeEstaNaPaginaDeLogin();
    });

    it('Realizar logout e retornar à página de login', () => {
        navegarParaRaizDoSite();
        verificarSePaginaInicialEstaVisivel();

        //clica no login
        cy.get('a[href="/login"]').click();

        //verifica que está na página de login
        verificarSeFormularioDeLoginEstaVisivel();

        // Realiza login com o usuário cadastrado anteriormente.
        loginUsuario(usuario);

        //verifica que usuário está logado
        verificarSeUsuarioEstaLogado(usuario);

        // realiza logout
        cy.get('a[href="/logout"]').click();

        //verifica que voltou para a página de login
        verificarSeEstaNaPaginaDeLogin();

        //verifica que o logout foi feito
        verificarSeFormularioDeLoginEstaVisivel();
        //verifica que o login aparece e o logout não aparece
        cy.get('a[href="/login"]').should('be.visible');
        verificarSeLinkDeLogoutNaoExiste();

        //verifica que o nome do usuário não aparece mais no topo da página
        cy.get('.shop-menu a:has(.fa-user)').should('not.exist');
    });
});
