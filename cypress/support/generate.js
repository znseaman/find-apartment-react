const { build, fake, sequence } = require('test-data-bot')

const userBuilder = build('User').fields({
  email: sequence(x => `temp-user-${x}@test.com`),
  password: fake(f => f.internet.password())
})

module.exports = {
  userBuilder,
}