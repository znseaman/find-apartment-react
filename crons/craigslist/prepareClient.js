const setupClient = require("./setupClient");
const getUserPreferences = require("./getUserPreferences");
const { getRandomFSA_Vancouver, getRandomInt } = require('./getRandomFS');

async function prepareClient(userId, logging = true) {
  if (logging) console.log(`\n-------------------------------------\n`);
  if (logging)
    console.log(`Getting data from craigslist for userId #${userId} ...`);

  var userPreferences = { baseHost: '', city: '' };
  try {
    userPreferences = await getUserPreferences(userId);
  } catch (error) {
    throw error;
  }

  const superPreferences = {
    ...userPreferences,
    postal: getRandomFSA_Vancouver()(),
    searchDistance: getRandomInt(1, 40),
    nocache: 1
  };
  const client = setupClient(userPreferences);
  return { client, superPreferences };
}

module.exports = prepareClient;