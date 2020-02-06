const fetchListings = async () => {
  const craigslist = require('node-craigslist')
  const userPreferences = require('../utils/userPreferences')
  const {baseHost, city} = userPreferences
  let client = new craigslist.Client({
    baseHost,
    city,
  })

  const listings =
    (await client.search(userPreferences, '').catch(error => {
      console.error(error)
    })) || []

  return listings
}

module.exports = fetchListings
