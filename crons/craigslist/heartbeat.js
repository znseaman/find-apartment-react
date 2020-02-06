const axios = require('axios')
const Listing = require('../../models/listing')

function wasFlagged(html) {
  const regex = /flagged for removal/g
  return regex.test(html)
}

function wasDeleted(html) {
  const regex = /deleted/g
  return regex.test(html)
}

const heartbeatCraigslist = async listings => {
  console.log(`\n-------------------------------------\n`)
  console.log(
    `Starting check for deleted / flagged listings for ${listings.length} listings on craigslist...`,
  )

  // wrap axios.get in bottleneck
  const bottleneckWrap = require('../../utils/bottleneck')
  const throttledGet = bottleneckWrap(axios.get)

  let totalDeleted = 0
  // Loop through listings for urls
  for await (const listing of listings) {
    const {id, postedAt} = listing

    // TODO: move this to the DB level in a cron job there, instead of via node
    // 			more efficient to be cleaning these up at that level, than in node
    const {differenceInDays} = require('date-fns')
    const days = differenceInDays(Date.now(), new Date(postedAt))
    if (days > 30) {
      // delete listing from the DB
      const res = await Listing.destroy({
        where: {
          id,
        },
      })

      if (res) {
        totalDeleted += 1
      }

      continue
    }

    const {url} = listing
    // TODO: fix what occurs when this throws an error due to destructuring
    const {data} = (await throttledGet(url)
      .then(res => {
        console.log(`Axios Get Request Complete At:`, new Date(Date.now()))
        return res
      })
      .catch(async error => {
        if (error.response) {
          console.log(`ERROR THROWN IN: heartbeat.js`)
          console.log(error.response.status)
          console.log(error.response.headers)

          if (error.response.status === 404) {
            // delete listing from the DB
            const res = await Listing.destroy({
              where: {
                id,
              },
            })

            if (res) {
              totalDeleted += 1
            }
          }
        }
      })) || {data: ''}

    if (!data) {
      continue
    }

    // Check if the page contains "deleted" or "flagged"
    if (wasFlagged(data) || wasDeleted(data)) {
      // delete listing from the DB
      const res = await Listing.destroy({
        where: {
          id,
        },
      })

      if (res) {
        totalDeleted += 1
      }
    }
  }

  console.log('Finished check for deleted / flagged listings on craigslist')
  console.log(`Deleted ${totalDeleted} irrelevant listings from craigslist`)
  console.log(`\n-------------------------------------\n`)
}

module.exports = heartbeatCraigslist
