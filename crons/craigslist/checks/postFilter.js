const Listing = require('../../../models/listing')
const cleanDescription = require('../clean/description')

function postFilter(post, details) {
  return new Promise(async (resolve, reject) => {
    const {size} = post
    const {price, latitude, longitude} = details

    // check for duplicate post (the listing price, size, and coordinates are the same as a previously saved entry)
    // this protects against the multiple posts issue, when users post to get their listing to appear fresh when it's been on the market for a while
    const duplicate_post = await Listing.findOne({
      where: {
        price,
        size,
        latitude,
        longitude,
      },
      attributes: ['price', 'size', 'postedAt', 'latitude', 'longitude'],
    })

    if (duplicate_post) {
      // FEATURE IDEA: add a desperation level to the post depending on the posts that match title & coordinates criteria
      return reject('postFilter - Ignored duplicate post')
    }

    // Fixes listings with only 1 picture
    // 		if `listing` object registers as `hasPic: true`,
    //		`details` object will not have `images` property
    const {images = []} = details
    const {image} = post
    if (images.length === 0) images.push(image)

    // join urls together
    const imageUrls = images.join(',')

    // clean description before entering into the DB
    const description = cleanDescription(details.description)

    const {pid, title, url, zoom, postedAt, polygon_name, userId} = details
    const {beds, baths, amenities} = post
    return resolve({
      description,
      pid,
      title,
      url,
      imageUrls,
      latitude,
      longitude,
      // ElephantSQL doesn't support PostGIS
      // point,
      zoom,
      postedAt,
      polygon_name,
      userId,
      price,
      beds,
      baths,
      size,
      amenities,
      favorite: false,
    })
  })
}

module.exports = postFilter
