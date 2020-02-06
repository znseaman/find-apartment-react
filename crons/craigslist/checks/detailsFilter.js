const hasCoordinates = require('./hasCoordinates')
const noPets = require('./noPets')
const pointInPolygon = require('./pointInPolygon')
const cleanCoordinates = require('../clean/coordinates')

function detailsFilter(details) {
  return new Promise(async (resolve, reject) => {
    // skip details without a mapUrl
    const {mapUrl} = details
    if (!mapUrl) {
      return reject('detailsFilter - Ignored details without mapUrl')
    }

    // skip if no coordinates found
    const hasCoords = hasCoordinates(mapUrl)
    if (!hasCoords) {
      return reject(
        'detailsFilter - Ignored details lacking easily parsable coordinates',
      )
    }

    // clean coordinates
    const [latitude, longitude, zoom] = cleanCoordinates(hasCoords[0])

    // skip if there's a mention of no pets, dogs, or cats
    const {description} = details
    if (noPets.test(description)) {
      return reject(
        'detailsFilter - Ignored details as they are not pet-friendly',
      )
    }

    // skip if lat,lng is not within one of the polygons
    const coordinates = [longitude, latitude]
    const poly = pointInPolygon.search(...coordinates)
    if (!poly) {
      return reject(
        'detailsFilter - Ignored details as they are not within the City of Vancouver',
      )
    }

    const {NAME: polygon_name} = poly.properties
    const point = {
      type: 'Point',
      coordinates,
      crs: {
        type: 'name',
        properties: {name: 'EPSG:4326'},
      },
    }

    return resolve({
      ...details,
      latitude,
      longitude,
      point,
      zoom,
      polygon_name,
    })
  })
}

module.exports = detailsFilter
