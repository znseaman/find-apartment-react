/// <reference types="Cypress" />
const { getRandomInt } = require("../../../crons/craigslist/getRandomFS")

context('Sign Up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup')
  })

  it('should remain on /signup after incorrect email', () => {
    const int = getRandomInt(0, 1000000)
    const email = `temp-user-${int}@`
    const password = `!#JFdklkjf${int}kfds!`

    cy.get('form')
      .find('[type="email"]')
      .type(email)

    cy.get('form')
      .find('[type="password"]')
      .type(password)

    cy.get('form')
      .find('button[type="submit"]')
      .click()

    cy.url().should('eq', 'http://localhost:3000/signup')
  });

  it('should remain on /signup after incorrect password', () => {
    const int = getRandomInt(0, 1000000)
    const email = `temp-user-${int}@email.com`
    const password = `123`

    cy.get('form')
      .find('[type="email"]')
      .type(email)

    cy.get('form')
      .find('[type="password"]')
      .type(password)

    cy.get('form')
      .find('button[type="submit"]')
      .click()

    cy.url().should('eq', 'http://localhost:3000/signup')
  });

  it('should sign up a new user', () => {
    const int = getRandomInt(0, 1000000)
    const email = `temp-user-${int}@test.com`
    const password = `!#JFdklkjf${int}kfds!`

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