const setupClient = require('../setupClient')

describe('setupClient', () => {
  it('returns craigslist client class instance', async () => {
    const userPreferences = {
      type: 'craigslist',
      city: 'Vancouver',
      baseHost: 'craigslist.ca',
      hasPic: 1,
      category: 'apa',
      maxPrice: 2000,
      minPrice: 1000,
      postedToday: 1,
    }

    const client = await setupClient(userPreferences)

    expect(client).toBeDefined()
  })
})
