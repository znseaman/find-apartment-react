const Listing = require('../../models/listing')

const getUserPreferences = require('./getUserPreferences')
const prepareClient = require('./prepareClient')
const setupClient = require('./setupClient')
const searchListings = require('./searchListings')
const searchDetails = require('./searchDetails')
const fetchData = require('../../utils/fetchData')
const bottleneckWrap = require('../../utils/bottleneck')
const throttledSearchListings = bottleneckWrap(searchListings)
const throttledSearchDetails = bottleneckWrap(searchDetails)
const throttledFetchData = bottleneckWrap(fetchData)

const searchRawListings = require('../../scrapers/craigslist/utils/searchRawListings')
const throttledSearchRawListings = bottleneckWrap(searchRawListings)

const listingFilter = require('./checks/listingFilter')
const detailsFilter = require('./checks/detailsFilter')
const postFilter = require('./checks/postFilter')
const cleanPrice = require('./clean/price')


const asyncReadFile = require('./asyncReadFile');
const path = require('path');
const whereToSaveJSON = path.resolve(__dirname, '../../data/scrapedListings.json');


const scrapeCraigslist = async (id, logging = true) => {
  console.log(`userId:`, id)
  // eslint-disable-next-line no-useless-catch
  try {

    var userPreferences = await getUserPreferences(id)

    // fix broken query with domain name changes for Canada

    // now, getting `Hostname/IP does not match certificate's altnames`
    userPreferences.baseHost = 'craiglist.org';
    userPreferences.city = userPreferences.city.toLowerCase();
    if (logging) console.log(`User preferences found for userId # ${id}`, userPreferences);
    var superPreferences = await prepareClient(userPreferences)
    var client = setupClient(userPreferences)

    if (logging)
      console.log(`Getting data from craigslist for userId #${id} ...`)

    // 1st request for data and needs to be throttled
    // var listings = await throttledSearchListings({ client, superPreferences })

    // read from json as if it was coming from throttledSearchListings
    // console.log(`whereToSaveJSON`, whereToSaveJSON)
    var data = await asyncReadFile(whereToSaveJSON, "utf-8")
    var { listings } = JSON.parse(data)

    // use throttledSearchRawListings since throttledSearchListings doesn't appear to be working...
    // superPreferences.type = undefined;
    // var listings = await throttledSearchRawListings(superPreferences, true)

  } catch (error) {
    throw error
  }

  // limit number of listings to only 3
  // listings = listings.slice(0, 3)

  // Series of requests based on the listings above
  for await (const listing of listings) {
    try {
      /* After Search Checks */
      await listingFilter(listing, id)

      const details = await throttledSearchDetails(client, listing)

      /* After Details Checks */
      const detailsExtracted = await detailsFilter(details)
      detailsExtracted.price = cleanPrice(listing.price)
      detailsExtracted.images = listing.images
      detailsExtracted.pid = listing.pid
      detailsExtracted.userId = id

      // NOTE: detailsExtracted is combined with details & data coming from detailFilter

      // Next request to get additional data from original posting url
      const { url } = details
      const originalPostData = await throttledFetchData(url)

      /* After Original Post Data Checks */
      const originalDataExtracted = await postFilter(
        originalPostData,
        detailsExtracted,
      )

      originalDataExtracted.latitude = Number(originalDataExtracted.latitude)
      originalDataExtracted.longitude = Number(originalDataExtracted.longitude)

      Listing.create(originalDataExtracted)
    } catch (error) {
      console.error(error)
      continue
    }
  }
}

module.exports = scrapeCraigslist
