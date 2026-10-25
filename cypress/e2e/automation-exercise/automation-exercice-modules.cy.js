/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

const cadastro = require('../../modules/cadastro/index')
const login = require('../../modules/login/index')

describe('Automation Exercise', () => {

    it('Cenário 1 - Cadastrar novo usuário com sucesso', () => {
        cy.visit('/');
        cy.get('a[href*=login]').click();
        cadastro.iniciarCadastro('PGATS Aut', faker.internet.email());
        cadastro.preencherCadastro();
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso();
    });

    it('Cenário 2 - Efetuar login com e-mail e senha corretos', () => {
        //ARRANGE
        /**
         * Ter uma conta para efeturar o Login
         * pgats-aut-1792010891341@email.com / 123456
         */

        cy.visit('/login');
        login.preencherLogin('pgats-aut-1792010891341@email.com', '123456');
        login.verificarSeLoginFoiEfetuadoComSucesso();
    });

    it('Cenário 3 - Efetuar login com senha incorreta', () => {
        cy.visit('/login');
        login.preencherLogin('pgats-aut-1792010891341@email.com', '654321')
        login.verificarSeMensagemDeErroFoiExibidaNoLogin()
    });

    it('Cenário 4 - Efetuar logout', () => {
        cy.visit('/login');
        login.preencherLogin('pgats-aut-1792010891341@email.com', '123456')
        login.efetuarLogout();
        login.verificarSeOUsuaraioFoiDeslogado();
    });

    it('Cenário 5 - Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('/');
        cy.get('a[href*=login]').click();
        cadastro.iniciarCadastro('PGATS Aut', 'pgats-aut-1792010891341@email.com')
        cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida();
    });
});
