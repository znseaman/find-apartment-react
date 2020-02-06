const Listing = require('../../models/listing')
const scrapeCraigslist = require('./scrape')

/**
 * Fetch listings data from craigslist
 *
 * Example cron expression:
 * run at 7:00 am everyday
 * 		0 7 * * *
 */
const User = require('../../models/user')
const Sequelize = require('sequelize')
const { Op } = Sequelize
const { ne: $ne } = Op
const scrape = [
  '12 14 * * *',
  async function() {
    // get all the active users (i.e. ones with sessions set)
    const users = await User.findAll({
      where: {
        session_id: {
          [$ne]: null,
        },
      },
      attributes: ['id'],
    })

    for await (const user of users) {
      const { id } = user

      try {
        await scrapeCraigslist(id)
      } catch (error) {
        console.error(error)
        continue
      }
    }
    console.log('FINISHED!')
  },
  null,
  true,
  'America/Vancouver',
]

/**
 * Fetch status of listings and delete them if they have been deleted or flagged
 *
 */
const heartbeatListings = require('./heartbeat')
const heartbeat = [
  '28 13 * * *',
  async function() {
    const listings = await Listing.findAll()
    heartbeatListings(listings)
  },
  null,
  true,
  'America/Vancouver',
]

module.exports = {
  scrape,
  heartbeat,
}
