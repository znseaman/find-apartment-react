const createBaseURL = require('./createBaseURL')
const queryStringify = require('./queryStringify')
const createSearchPreferences = require('./createSearchPreferences')
const createURL = require('./createURL')

const createUrlFromPreferences = userPreferences => {
  const baseURL = createBaseURL(userPreferences)
  const qs = queryStringify(createSearchPreferences(userPreferences))
  const url = createURL(baseURL, qs)

  return url;
}

module.exports = createUrlFromPreferences