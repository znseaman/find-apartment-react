const bottleneckWrap = require('../../utils/bottleneck');
const listingFilter = require('./checks/listingFilter');
const detailsFilter = require('./checks/detailsFilter');
const postFilter = require('./checks/postFilter');
const Listing = require('../../models/listing');
const cleanPrice = require('./clean/price');

const prepareClient = require("./prepareClient");
const searchListings = require("./searchListings");
const searchDetails = require("./searchDetails");
const fetchData = require("../../utils/fetchData");
const throttledSearchListings = bottleneckWrap(searchListings);
const throttledSearchDetails = bottleneckWrap(searchDetails);
const throttledFetchData = bottleneckWrap(fetchData);

/**
 * Fetch listings data from craigslist
 *
 * Example cron expression:
 * run at 7:00 am everyday
 * 		0 7 * * *
 */
const User = require("../../models/user");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const { ne: $ne } = Op;
const scrape = [
  "15 5 * * *",
  async function () {
    // get all the active users (i.e. ones with sessions set)
    const users = await User.findAll({
      where: {
        session_id: {
          [$ne]: null
        }
      },
      attributes: ["id"]
    });
    // const users = Array.from({ length: 1 }, (o, i) => ({ 'id': i + 1 }));

    for await (const user of users) {
      const { id } = user;

      var options = { client: '', superPreferences: {} };
      try {
        options = await prepareClient(id);
      } catch (error) {
        console.error(error);
        continue;
      }

      var listings = [];
      try {
        // 1st request for data and needs to be throttled
        listings = await throttledSearchListings(options);
      } catch (error) {
        console.error(error);
        continue;
      }

      // Limit the number of listings to 3
      // listings = [...listings.slice(0, 3)];

      // Series of requests based on the listings above
      const { client } = options;
      for await (const listing of listings) {
        /* After Search Checks */
        try {
          await listingFilter(listing);
        } catch (error) {
          console.error(error);
          continue;
        }

        // clean the price from listing
        const price = cleanPrice(listing.price);

        var details;
        try {
          details = await throttledSearchDetails(client, listing);
        } catch (error) {
          console.error(error);
          continue;
        }

        /* After Details Checks */
        var detailsExtracted = {};
        try {
          detailsExtracted = await detailsFilter(details);
        } catch (error) {
          console.error(error);
          continue;
        }

        detailsExtracted.price = price;
        detailsExtracted.images = listing.images;
        detailsExtracted.pid = listing.pid;
        detailsExtracted.userId = id;

        // detailsExtracted is combined with details & data coming from detailFilter

        var originalPostData;
        try {
          // Next request to get additional data from original posting url
          const { url } = details;
          originalPostData = await throttledFetchData(url);
        } catch (error) {
          console.error(error);
          continue;
        }

        /* After Original Post Data Checks */
        var originalDataExtracted = {};
        try {
          originalDataExtracted = await postFilter(originalPostData, detailsExtracted);
        } catch (error) {
          console.error(error);
          continue;
        }

        Listing.create(originalDataExtracted);
      }
    }
    console.log('FINISHED!')
  },
  null,
  true,
  "America/Vancouver"
];

/**
 * Fetch status of listings and delete them if they have been deleted or flagged
 *
 */
const heartbeatListings = require("./heartbeat");
const heartbeat = [
  "0 7 * * *",
  async function () {
    const listings = await Listing.findAll();
    heartbeatListings(listings);
  },
  null,
  true,
  "America/Vancouver"
];

module.exports = {
  scrape,
  heartbeat
}