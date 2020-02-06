const { build, fake } = require('test-data-bot')
const { getRandomInt } = require('../../crons/craigslist/getRandomFS')

const userBuilder = build('User').fields({
  email: `temp-user-${getRandomInt(0, 100000000)}@test.com`,
  password: fake(f => f.internet.password()),
})

module.exports = {
  userBuilder,
}
