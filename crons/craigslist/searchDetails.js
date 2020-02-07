async function searchDetails(client, listing, logging = true) {
  return client.details(listing).then(async res => {
    if (logging) console.log(`Search Details Date:`, new Date(Date.now()))
    return res
  })
}

module.exports = searchDetails
