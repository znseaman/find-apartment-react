const searchListings = ({ client, superPreferences, logging = true }) => {
  return client.search(superPreferences, '').then(async res => {
    console.log(`Search Listings Date:`, new Date(Date.now()))
    return res
  })
}

module.exports = searchListings
