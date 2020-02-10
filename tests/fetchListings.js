const fetchListings = async () => {
  const craigslist = require('node-craigslist')
  const userPreferences = require('../utils/userPreferences')
  const { baseHost, city } = userPreferences
  let client = new craigslist.Client({
    baseHost,
    city,
  })

  userPreferences.category = 'foa'

  const listings =
    (await client.search(userPreferences, '').catch(error => {
      console.error(error)
    })) || []

  console.log(listings);

  return listings
}

module.exports = fetchListings
