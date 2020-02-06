const craigslist = require('node-craigslist')

const setupClient = ({ baseHost, city }) => {
  return new craigslist.Client({
    baseHost,
    city,
  })
}

module.exports = setupClient
