const { userBuilder } = require('./generate')

Cypress.Commands.add('createUser', overrides => {
  const user = userBuilder(overrides)
  return cy
    .request({
      url: 'http://localhost:7000/signup',
      method: 'POST',
      body: user,
    })
    .then(() => user)
})