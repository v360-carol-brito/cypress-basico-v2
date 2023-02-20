// Testa login usuário ADM
describe('Primeiro teste de login', () => {
  it('login correta - ADM', () => {

    cy.visit('https://app-test2.varejo360.com')//Entar no site

    //Intercepts necessários
    cy.intercept('POST', '/auth/token', {fixture:'tokenAdminSucesso.json'})
    cy.intercept('GET', '/me', {fixture: 'meAdminSucesso.json'})

    cy.intercept('GET', '/reports/search*', {fixture: 'reportSearchSucesso.json'})
    cy.intercept('GET', '/company/crttypes', {fixture: 'companyCrttypesSucesso.json'})
    cy.intercept('GET', '/company/search*', {fixture: 'companySearchSucess.json'})

    // Fazer login
    cy.get('#email').type('hello@world.com')
    cy.get('#password').type('12345678')

    //Clicar no botão "Entrar"
    cy.get('#root > div.container.login > div:nth-child(2) > div > div > div > form > div:nth-child(3) > button > span').click()

    // Deve entrar com o ID do usuário na página
    cy.url().should('include', '/admin/empresas') //assert
    cy.clearCookies()

  })
})


// Testa login usuário comum
describe('Segundo teste de login', () => {
  it('login correta - comum', () => {

    cy.visit('https://app-test2.varejo360.com')//Entar no site

    //Intercepts necessários
    cy.intercept('POST', '/auth/token', {fixture:'tokenComumSucesso.json'})
    cy.intercept('GET', '/me', {fixture: 'meComumSucesso.json'})
    cy.intercept('GET', '/category/allByUser', {fixture:'allByUserComumSucesso.json'})

    // Fazer login
    cy.get('#email').type('hello@world.com')
    cy.get('#password').type('12345678')

    //Clicar no botão "Entrar"
    cy.get('#root > div.container.login > div:nth-child(2) > div > div > div > form > div:nth-child(3) > button > span').click()

    // Deve entrar com o ID do usuário na página
    cy.url().should('include', '/categoria') //assert
    cy.clearCookies()

  })
})


//Caso esqueci minha senha
describe('Terceiro teste de login', () => {
  it('login correta - esqueci a senha', () => {

    //Intercepts necessários
    cy.intercept('POST', '/auth/token', {fixture:'tokenEsqueciSucesso.json'})
    cy.intercept('GET', '/me', {fixture: 'meEsqueciSucesso.json'})
    cy.intercept('POST', '/resetPwd', {fixture:'resetPwdSucesso.json'})
    cy.intercept('POST', '/account/updatePwd', {fixture:'updatePWDSucesso.json'})
    cy.intercept('GET', '/category/allByUser', {fixture:'allByUserEsqueciSucesso.json'})

    //Acessar "Esqueci minha Senha"
    cy.visit('https://app-test2.varejo360.com')
    cy.contains('Esqueci minha senha').click()

    // Solicitar nova senha
    cy.get('#email').type('carolina.brito+m2@meuvarejo360.com.br')
    cy.contains('Solicitar nova senha').click()
    cy.wait(200)

    //Login com senha temporária
    cy.get('#email').type('carolina.brito+m2@meuvarejo360.com.br')
    cy.get('#password').type('dNhUiEHY68KU')

    //Clicar no botão "Entrar"
    cy.get('#root > div.container.login > div:nth-child(2) > div > div > div > form > div:nth-child(3) > button > span').click()
    cy.wait(200)

    //Cadastro de nova senha
    cy.get('#password').type('Miguel123')
    cy.get('#confirmaSenha').type('Miguel123')

    //Clicar no botão "Entrar"
    cy.get('button').first().click()
    cy.wait(200)

    // Deve entrar com o ID do usuário na página
    cy.url().should('include', '/categoria')
    cy.clearCookies()

  })
})

//Caso email não cadastrado
describe('Quarto teste de login', () => {
  it('login falho - email não cadastrado', () => {

    cy.visit('https://app-test2.varejo360.com')//Entar no site

    //Intercepts necessários
    cy.intercept('POST', '/auth/token', {fixture:'tokenComumFalho.json'})
    cy.intercept('POST', '/auth/refreshtoken', {fixture:'tokenEsqueciSucesso.json'})//Sem esse refreshtoken o teste não finaliza

    // Fazer login
    cy.get('#email').type('hello@world.com')
    cy.get('#password').type('12345678')

    //Clicar no botão "Entrar"
    cy.get('#root > div.container.login > div:nth-child(2) > div > div > div > form > div:nth-child(3) > button > span').click()


    cy.request({
        baseurl: 'https://app-test2.varejo360.com', url:'https://app-test2.varejo360.com/auth/token',
        failOnStatusCode:false,
    }).then((resp) => {
        expect(resp.status).to.eq(404)
    })

    cy.url().should('include', '/login')
    cy.clearCookies()

  })
})

//Caso esqueci email não cadastrado
 describe('Quinto teste de login', () => {
    it('login falho - campos vazios', () => {

        cy.visit('https://app-test2.varejo360.com')//Entar no site

        //Clicar no botão "Entrar"
        cy.get('#root > div.container.login > div:nth-child(2) > div > div > div > form > div:nth-child(3) > button > span').click()

        //Sem email/senha preenchidos
        cy.get('.field').invoke('text').then((text) => {
            expect(text).contains('Deve ser um e-mail válido.')
            expect(text).contains('A senha deve conter no mínimo 8 caracteres.')
        })
        cy.clearCookies()

    })
})

//Caso esqueci minha senha
describe('Sexto teste de login', () => {
  it('login sucesso - esqueci a senha (voltar)', () => {

    //Acessar "Esqueci minha Senha"
    cy.visit('https://app-test2.varejo360.com')
    cy.contains('Esqueci minha senha').click()
    cy.get('#root').should('contain', 'Resetar Senha');

    //Voltar pra tela de login
    cy.contains('Voltar').click()
    cy.get('#root').should('contain', 'Entrar');

    // Deve entrar com o ID do usuário na página
    cy.url().should('include', '/login')
    cy.clearCookies()

  })
})