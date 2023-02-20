//Testa links corretos pt1
describe('Primeiro teste de link', () => {
  it('encontra a página correta - app-test', () => {
    cy.visit('https://app-test.varejo360.com')

    cy.url().should('include', '/login')
    cy.clearCookies()

  })
})

//Testa links corretos pt2
describe('Segundo teste de login', () => {
  it('encontra a página correta - app-test2', () => {
    cy.visit('https://app-test2.varejo360.com')

    cy.url().should('include', '/login')
    cy.clearCookies()

  })
})

//Testa links corretos pt3
describe('Terceiro teste de login', () => {
    it('encontra a página correta - página interna', () => {
//    cy.intercept('POST', '/categoria', failOnStatusCode: false, {fixture:'categoriaComumSucesso.json'})
    cy.request({
        baseurl: 'https://app-test2.varejo360.com', url:'https://app-test2.varejo360.com/categoria',
        failOnStatusCode:false,
    }).then((resp) => {
        expect(resp.status).to.eq(404)
    })
    cy.clearCookies()

    })
})

describe('Quarto teste de login', () => {
    it('encontra a página correta - página interna ADM', () => {
    cy.request({
        baseurl: 'https://app-test2.varejo360.com', url:'https://app-test2.varejo360.com/admin/empresas',
        failOnStatusCode:false,
    }).then((resp) => {
        expect(resp.status).to.eq(404)
    })
    cy.clearCookies()

    })
})