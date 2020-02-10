const cheerio = require('cheerio');

/*  Scrapes a listing node and returns an object with the
 *  following properties:
 *
 *    `location`, `pid` [listingFilter]
 *    `url` [searchDetails]
 *    `price` [cleanPrice]
 *    `images`
 */
function createListingObject(node, logging = false) {
  const $$ = cheerio.load(node)

  const repostOf = $$('li a').data('repost-of')
  if (logging) console.log(`repostOf`, repostOf)

  const url =
    $$('li a:nth-child(1)').attr('href') ||
    $$('.result-info a').attr('href')
  if (logging) console.log(`url`, url)

  if (!url) {
    return {};
  }

  const pid = String(
    $$('li a').data('pid') ||
    $$('.result-info a').data('id') ||
    url.match(/[\d]+(?=\.html)/)[0] ||
    url.match(/[\d]+(?=\.html)/)[0])
  if (logging) console.log(`pid`, pid)

  const location = $$('.result-meta .result-hood').text()
  if (logging) console.log(`location`, location)

  const price = $$('li a:nth-child(1) span').text() || $$('.result-meta .result-price').text()
  if (logging) console.log(`price`, price)

  const images = $$('li a:nth-child(1)').data('ids').replace(/1:/g, '').split(',').map(name => {
    return `https://images.craigslist.org/${name}_300x300.jpg`
  })
  if (logging) console.log(`images`, images)

  return {
    pid,
    url,
    location,
    price,
    images
  }
}

module.exports = createListingObject;