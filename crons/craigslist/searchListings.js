const searchListings = ({ client, superPreferences, logging = true }) => {
  return client.search(superPreferences, '').then(async res => {
    if (logging) console.log(`Search Listings Date:`, new Date(Date.now()))
    if (logging) console.log(`Listings:`, res)
    return res
  })
}

module.exports = searchListings
