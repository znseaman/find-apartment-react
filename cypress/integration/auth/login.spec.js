/// <reference types="Cypress" />

context('Log In', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('should login an existing user', () => {
    cy.createUser().then(user => {
      const { email, password } = user;

      cy.get('form')
        .find('[type="email"]')
        .type(email)

      cy.get('form')
        .find('[type="password"]')
        .type(password)

      cy.get('form')
        .find('button[type="submit"]')
        .click()

      cy.url().should('eq', 'http://localhost:3000/')
    })
  })

  it('should redirect from /login to / if authenticated', () => {
    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('No listings found')
  })

  it('should log out an existing user', () => {
    cy.get('header')
      .find('a[data-testid="nav-item-logout"]')
      .click();
    cy.url().should('eq', 'http://localhost:3000/login')
  })
})