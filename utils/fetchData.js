const axios = require('axios')
const cheerio = require('cheerio')

const fetchData = async url => {
  const {data} = (await axios.get(url).catch(error => {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    }
  })) || {data: ''}

  if (!data) {
    throw Error('No data found')
  }
  const $ = cheerio.load(data)

  let [beds, baths] = $(
    'body > section > section > section > div.mapAndAttrs > p:nth-child(2) > span:nth-child(1)',
  )
    .text()
    .replace(/br|ba/gi, '')
    .split(' / ')
    .map(Number)

  // catch listings without beds or baths specified
  if (Number.isNaN(beds) || beds == null) {
    beds = 0
  }
  if (Number.isNaN(baths) || baths == null) {
    baths = 0
  }

  // sometimes catches available move in day instead of the size, look for if it doesn't have "housing_movein_now" class
  const size = $(
    'body > section > section > section > div.mapAndAttrs > p:nth-child(2) > span:nth-child(2)',
  )
    .not('.housing_movein_now')
    .text()

  const amenities = $(
    'body > section > section > section > div.mapAndAttrs > p:nth-child(3) > span',
  )
    .map((i, el) => {
      return $(el).text()
    })
    .get()
    .join(', ')

  const image = $(
    'body > section > section > section > figure > div > div > div > div > img',
  ).attr('src')

  return {
    beds,
    baths,
    size,
    amenities,
    image,
  }
}

module.exports = fetchData
