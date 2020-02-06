const setupClient = require('./setupClient')
const { getRandomFSA_Vancouver, getRandomInt } = require('./getRandomFS')

async function prepareClient(userPreferences) {
  const superPreferences = {
    ...userPreferences,
    postal: getRandomFSA_Vancouver()(),
    searchDistance: getRandomInt(1, 40),
    nocache: 1,
  }
  const client = setupClient(userPreferences)
  return { client, superPreferences }
}

module.exports = prepareClient
