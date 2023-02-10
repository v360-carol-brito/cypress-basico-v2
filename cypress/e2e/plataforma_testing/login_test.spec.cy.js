// Testa login usuário ADM
describe('Primeiro teste de login', () => {

  it('encontra a página correta', () => {

    cy.visit('https://app-test2.varejo360.com')

    cy.intercept('POST', '*/token', {statusCode:200, fixture:'tokenAdminSucesso.json'})
    cy.intercept('GET', '*/me', {statusCode:200, fixture: 'meAdminSucesso.json'})

    cy.intercept('GET', '*/reports/search*', {statusCode:200, fixture: 'reportSearchSucesso.json'})

    cy.intercept('GET', '*/company/crttypes', {statusCode:200, fixture: 'companyCrttypesSucesso.json'})

    cy.intercept('GET', '*/company/search*', {statusCode:200, fixture: 'companySearchSucesso.json'})


    // Confirma acesso correto
//    cy.url().should('include', '/login')

    // Fazer login
    cy.get('#email').type('hello@world.com')

    //  Verificar que o email foi inserido corretamente
//    cy.get('#email').should('have.value', 'carolina.brito@varejo360.com')

    // Inserir senha
    cy.get('#password').type('12345678')


//    cy.contains('.p-button-label p-c').click() //<span class="p-button-label p-c">Entrar</span>
//    cy.get('.p-button-label p-c').click()
//    cy.contains('Entrar').click()
//    cy.get('.btn').click()
//    cy.focused().click()
//    cy.contains('.p-button-label p-c','Entrar').click()
    //#root > div.container.login > div:nth-child(2) > div > div > div > form > div:nth-child(3) > button > span
    cy.get('#root > div.container.login > div:nth-child(2) > div > div > div > form > div:nth-child(3) > button > span').click()



    // Deve entrar com o ID do usuário na página
    // includes '/commands/actions'
    cy.url().should('include', '/admin/empresas') //assert


  })
})


//// Testa login usuário comum
//describe('Segundo teste de login', () => {
//  it('encontra a página correta', () => {
//    cy.visit('https://app-test.varejo360.com')
//
//    // Confirma acesso correto
//    cy.url().should('include', '/login')
//
//    // Fazer login
//    cy.get('#email').type('carolina.brito+m1@meuvarejo360.com.br')
//    // Inserir senha
//    cy.get('#password').type('Varejo360')
//
//    //  Verificar que o email foi inserido corretamente
//    cy.get('#email').should('have.value', 'carolina.brito+m1@meuvarejo360.com.br')
//
//
//
//
//    cy.contains('submit').click()
//
//    // Deve entrar com o ID do usuário na página
//    // includes '/commands/actions'
//    cy.url().should('include', '/painel/selecionar?step=0')
//
//  })
//})



////Caso esqueci minha senha
//cy.contains('Esqueci minha senha').click()