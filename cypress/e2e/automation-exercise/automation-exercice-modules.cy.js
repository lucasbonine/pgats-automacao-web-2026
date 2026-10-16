/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

const cadastro = require('../../modules/cadastro/index')
const login = require('../../modules/login/index')

describe('Automation Exercise', () => {

    it('Cadastrar novo usuário com sucesso', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href*=login]').click();
        cadastro.iniciarCadastro('PGATS Aut', faker.internet.email());
        cadastro.preencherCadastro();
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso();
    });

    it('Efetuar Login de Usuário com email e senha corretos', () => {
        //ARRANGE
        /**
         * Ter uma conta para efeturar o Login
         * pgats-aut-1792010891341@email.com / 123456
         */

        cy.visit('https://automationexercise.com/login');
        login.preencherLogin('pgats-aut-1792010891341@email.com', '123456');
        login.verificarSeLoginFoiEfetuadoComSucesso();
    });

    it('Efetuar Login de Usuário com email e senha incorretos', () => {
        cy.visit('https://automationexercise.com/login');
        login.preencherLogin('pgats-aut-1792010891341@email.com', '654321')
        login.verificarSeMensagemDeErroFoiExibidaNoLogin()
    });

    it('Efetuar Logout', () => {
        cy.visit('https://automationexercise.com/login');
        login.preencherLogin('pgats-aut-1792010891341@email.com', '123456')
        login.efetuarLogout();
        login.verificarSeOUsuaraioFoiDeslogado();
    });

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href*=login]').click();
        cadastro.iniciarCadastro('PGATS Aut', 'pgats-aut-1792010891341@email.com')
        cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida();
    });
});
