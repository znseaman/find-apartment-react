const { getRandomFSA_Vancouver, getRandomInt } = require('./getRandomFS')

function prepareClient(userPreferences) {
  const superPreferences = {
    ...userPreferences,
    postal: getRandomFSA_Vancouver()(),
    search_distance: 5,
    // searchDistance: getRandomInt(1, 40),
    nocache: 1,
  }
  return superPreferences
}

module.exports = prepareClient
