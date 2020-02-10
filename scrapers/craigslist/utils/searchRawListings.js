const axios = require('axios')
const scrapeListingsFromHTML = require('./scrapeListingsFromHTML')
const createListingObject = require('./createListingObject')
const createURLFromPreferences = require('./createURLFromPreferences')

const path = require('path')
const whereToSaveHTML = path.resolve(__dirname, '../test/data/scrapedListings.html')
const whereToSaveJSON = path.resolve(__dirname, '../test/data/scrapedListings.json');
const asyncWriteFile = require('./asyncWriteFile')

// workaround bad certificates on craigslist
const https = require('https');
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

async function searchRawListings(userPreferences, logging = false) {
  const url = createURLFromPreferences(userPreferences)
  if (logging) console.log(`url`, url)
  const dirtyListings = await instance.get(url).then(res => res.data)
  // save output to HTML, allowing to work without making requests to site
  if (logging) await asyncWriteFile(whereToSaveHTML, dirtyListings)

  const listingsNodesArray = await scrapeListingsFromHTML(dirtyListings)

  const listings = []
  for await (const listing of listingsNodesArray) {
    const listingObject = createListingObject(listing)
    if (Object.keys(listingObject).length == 0) {
      console.log(`dubious listing node`, listing);
      continue;
    }

    listings.push(listingObject)
  }

  // save output to JSON, allowing to work without making requests to site
  if (logging) await asyncWriteFile(whereToSaveJSON, JSON.stringify({ listings }, null, 2))

  return listings
}

module.exports = searchRawListings