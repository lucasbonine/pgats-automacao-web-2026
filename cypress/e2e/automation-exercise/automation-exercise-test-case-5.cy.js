/// <reference types="cypress" />
import {
    verificarSeUsuarioEstaLogado,
    verificarSeEstaNaPaginaDeLogin,
} from '../../support/helpers/login-usuario';
import { verificarSePaginaInicialEstaVisivel } from '../../support/helpers/pagina-inicial';
import { criarUsuario } from '../../support/factories/usuario';
import { cadastrarUsuario, verificarSeCadastroFoiEfetuadoComSucesso } from '../../support/helpers/cadastro-usuario';

describe('Automation Exercise - Test Case 5', () => {
    let usuario;

    beforeEach(() => {
        usuario = criarUsuario();

        //cadastra o usuário para utilizar o mesmo email no teste
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

    it('Rejeitar cadastro com email já cadastrado', () => {
        cy.visit('/');

        //verifica que está na página inicial
        verificarSePaginaInicialEstaVisivel();

        //clica no login
        cy.get('a[href="/login"]').click();

        //verifica que o formulário de cadastro apareceu
        cy.get('.signup-form h2')
            .should('be.visible')
            .and('have.text', 'New User Signup!');

        //preenche o nome e o email cadastrado anteriormente
        cy.get('[data-qa="signup-name"]').type(usuario.name);
        cy.get('[data-qa="signup-email"]').type(usuario.email);

        //clica em signup
        cy.get('[data-qa="signup-button"]').click();

        //verifica que a mensagem de email já cadastrado apareceu
        cy.get('.signup-form form p')
            .should('be.visible')
            .and('have.text', 'Email Address already exist!');
    });
});
