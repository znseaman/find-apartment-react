const Listing = require('../../models/listing')

const getUserPreferences = require('./getUserPreferences');
const prepareClient = require('./prepareClient')
const searchListings = require('./searchListings')
const searchDetails = require('./searchDetails')
const fetchData = require('../../utils/fetchData')
const bottleneckWrap = require('../../utils/bottleneck')
const throttledSearchListings = bottleneckWrap(searchListings)
const throttledSearchDetails = bottleneckWrap(searchDetails)
const throttledFetchData = bottleneckWrap(fetchData)

const listingFilter = require('./checks/listingFilter')
const detailsFilter = require('./checks/detailsFilter')
const postFilter = require('./checks/postFilter')
const cleanPrice = require('./clean/price')

const scrapeCraigslist = async (id, logging = true) => {
  try {
    var userPreferences = await getUserPreferences(id)
    var options = await prepareClient(userPreferences)

    if (logging)
      console.log(`Getting data from craigslist for userId #${id} ...`)

    // 1st request for data and needs to be throttled
    var listings = await throttledSearchListings(options)
  } catch (error) {
    throw error
  }

  // Series of requests based on the listings above
  const { client } = options
  for await (const listing of listings) {
    try {
      /* After Search Checks */
      await listingFilter(listing)

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

      Listing.create(originalDataExtracted)
    } catch (error) {
      console.error(error)
      continue
    }
  }
}

module.exports = scrapeCraigslist
