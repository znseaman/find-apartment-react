const Listing = require('../../models/listing')

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

const scrapeCraigslist = async id => {
  var options = {client: '', superPreferences: {}}
  try {
    options = await prepareClient(id)
  } catch (error) {
    throw error
  }

  var listings = []
  try {
    // 1st request for data and needs to be throttled
    listings = await throttledSearchListings(options)
  } catch (error) {
    throw error
  }

  // Series of requests based on the listings above
  const {client} = options
  for await (const listing of listings) {
    /* After Search Checks */
    try {
      await listingFilter(listing)
    } catch (error) {
      console.error(error)
      continue
    }

    // clean the price from listing
    const price = cleanPrice(listing.price)

    var details
    try {
      details = await throttledSearchDetails(client, listing)
    } catch (error) {
      console.error(error)
      continue
    }

    /* After Details Checks */
    var detailsExtracted = {}
    try {
      detailsExtracted = await detailsFilter(details)
    } catch (error) {
      console.error(error)
      continue
    }

    detailsExtracted.price = price
    detailsExtracted.images = listing.images
    detailsExtracted.pid = listing.pid
    detailsExtracted.userId = id

    // detailsExtracted is combined with details & data coming from detailFilter

    var originalPostData
    try {
      // Next request to get additional data from original posting url
      const {url} = details
      originalPostData = await throttledFetchData(url)
    } catch (error) {
      console.error(error)
      continue
    }

    /* After Original Post Data Checks */
    var originalDataExtracted = {}
    try {
      originalDataExtracted = await postFilter(
        originalPostData,
        detailsExtracted,
      )
    } catch (error) {
      console.error(error)
      continue
    }

    Listing.create(originalDataExtracted)
  }
}

module.exports = scrapeCraigslist
