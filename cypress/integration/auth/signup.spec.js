/// <reference types="Cypress" />
const { userBuilder } = require('../../support/generate')

context('Sign Up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup')
  })

  it('should sign up a new user', () => {
    const { email, password } = userBuilder()

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

  it('should redirect from /signup to / if authenticated', () => {
    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('No listings found')
  })

  it('should log out a new user', () => {
    cy.get('header')
      .find('a[data-testid="nav-item-logout"]')
      .click();
    cy.url().should('eq', 'http://localhost:3000/login')
  })
})