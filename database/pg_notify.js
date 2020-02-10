var pg = require('./db')
var EventEmitter = require('events')
var util = require('util')
const scrapeListings = require('../crons/craigslist/scrape')
const { Op } = require("sequelize");
const User = require('../models/user')

// Build and instantiate our custom event emitter
function DbEventEmitter() {
  EventEmitter.call(this)
}

util.inherits(DbEventEmitter, EventEmitter)
var dbEventEmitter = new DbEventEmitter()

// Define the event handlers for each channel name
dbEventEmitter.on('new_user', async ({ id, email }) => {
  const test_user_prefix = 'temp-user-';
  // remove temporary test generated users
  if (email.match(test_user_prefix)) {
    setTimeout(() => {
      User.destroy({
        where: {
          email: {
            [Op.like]: `${test_user_prefix}%`
          },
        },
      })
    }, 1000 * 60 * 1) // 1 minute after running the test

    // prevent getting listings
    return false
  }

  // setup initial search settings for new user
  const {
    city,
    baseHost: base_host,
    hasPic: has_pic,
    category,
    maxPrice: max_price,
    minPrice: min_price,
    postedToday: posted_today,
  } = require('../utils/userPreferences')
  const userPreferences = {
    type: 'craigslist',
    base_host,
    city,
    category,
    has_pic,
    max_price,
    min_price,
    posted_today,
    userId: id,
  }

  // make them just a little different from the default
  userPreferences.min_price = 4000
  userPreferences.max_price = 5000

  const SearchSetting = require('../models/search_setting')
  const search_setting = await SearchSetting.create(userPreferences)

  console.log(`Attempting to get new data for new user with id of ${id} & email of ${email}...`);

  try {
    // get listings for a newly created user
    scrapeListings(id)
  } catch (error) {
    console.error(error)
  }
})

// Connect to Postgres (replace with your own connection string)
pg.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }

  // Listen for all pg_notify channel messages
  client.on('notification', function (msg) {
    let payload = JSON.parse(msg.payload)
    dbEventEmitter.emit(msg.channel, payload)
  })

  // Designate which channels we are listening on. Add additional channels with multiple lines.
  client.query('LISTEN new_user')
})
