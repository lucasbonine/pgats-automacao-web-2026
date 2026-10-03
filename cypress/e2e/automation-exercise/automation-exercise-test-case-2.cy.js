/// <reference types="cypress" />
import {
    loginUsuario,
    verificarSeFormularioDeLoginEstaVisivel,
    verificarSeUsuarioEstaLogado,
} from '../../support/helpers/login-usuario';
import { navegarParaRaizDoSite, verificarSePaginaInicialEstaVisivel } from '../../support/helpers/pagina-inicial';
import { criarUsuario } from '../../support/factories/usuario';
import { cadastrarUsuario, verificarSeCadastroFoiEfetuadoComSucesso } from '../../support/helpers/cadastro-usuario';

describe('Automation Exercise - Test Case 2', () => {
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
        verificarSeFormularioDeLoginEstaVisivel();
    });

    it('Realizar login com email e senha corretos e excluir a conta', () => {
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


        //clica em delete account
        cy.get('a[href="/delete_account"]').click();
        
        //verifica que a mensagem de conta deletada apareceu
        cy.get('[data-qa="account-deleted"]')
            .should('be.visible')
            .and('contain.text', 'Account Deleted!');
    });
});
