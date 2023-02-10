//Testa links corretos pt1
describe('Primeiro teste de login', () => {
  it('encontra a página correta', () => {
    cy.visit('https://app-test.varejo360.com')

    cy.url().should('include', '/login')

  })
})

//Testa links corretos pt2
describe('Segundo teste de login', () => {
  it('encontra a página correta', () => {
    cy.visit('https://app-test2.varejo360.com')

    cy.url().should('include', '/login')

  })
})
