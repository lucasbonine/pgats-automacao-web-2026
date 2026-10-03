import { faker } from '@faker-js/faker';

/**
 * Gera um novo objeto de usuário a cada chamada, sem acessar o site.
 * Os campos recebidos em alteracoes substituem os valores padrão.
 */
export function criarUsuario(alteracoes = {}) {
    return {
        name: faker.person.firstName(),
        email: `usuario-${faker.string.uuid()}@example.com`,
        password: faker.internet.password(),
        title: 'Mr',
        birthDay: '1',
        birthMonth: '5',
        birthYear: '1986',
        lastName: faker.person.lastName(),
        address: 'Rua de Teste, 123',
        country: 'India',
        state: 'RS',
        city: 'Pelotas',
        zipcode: '95900123',
        mobileNumber: '999999999',
        ...alteracoes,
    };
}
