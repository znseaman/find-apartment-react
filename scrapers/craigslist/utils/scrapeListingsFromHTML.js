const cheerio = require('cheerio');
const asyncReadFile = require('./asyncReadFile')
const path = require('path')
const whereToSaveHTML = path.resolve(__dirname, '../test/data/scrapedListings.html')

async function scrapeListingsFromHTML(html) {
  if (!html) html = await asyncReadFile(whereToSaveHTML);

  const $ = cheerio.load(html)
  var listings = Array.from($(`#sortable-results > ul > li`))
  return listings
}

module.exports = scrapeListingsFromHTML