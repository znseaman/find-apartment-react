const ignoredLocations = require('./ignoredLocations')
const Listing = require('../../../models/listing')

function listingFilter(listing) {
  return new Promise(async (resolve, reject) => {
    // skip ignored locations
    const { location } = listing
    if (ignoredLocations.test(location)) {
      return reject('listingFilter - Ignored location found')
    }

    // check whether the pid already exists in the listings table
    const { pid } = listing
    const exists = await Listing.findOne({
      where: {
        pid,
      },
      attributes: ['pid'],
    })
    if (exists) {
      return reject('listingFilter - Duplicate post found')
    }

    return resolve()
  })
}

module.exports = listingFilter
