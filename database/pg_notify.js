var pg = require('./db')
var EventEmitter = require('events')
var util = require('util')
const scrapeListings = require('../crons/craigslist/scrape')
const User = require('../models/user')

// Build and instantiate our custom event emitter
function DbEventEmitter() {
  EventEmitter.call(this)
}

util.inherits(DbEventEmitter, EventEmitter)
var dbEventEmitter = new DbEventEmitter()

// Define the event handlers for each channel name
dbEventEmitter.on('new_user', ({id, email}) => {
  // remove temporary test generated users
  if (email.match('temp-user-')) {
    setTimeout(() => {
      User.destroy({
        where: {
          id,
        },
      })
    }, 1000 * 60 * 5) // 5 minutes after running the test

    // prevent getting listings
    return false
  }

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
  client.on('notification', function(msg) {
    let payload = JSON.parse(msg.payload)
    dbEventEmitter.emit(msg.channel, payload)
  })

  // Designate which channels we are listening on. Add additional channels with multiple lines.
  client.query('LISTEN new_user')
})
