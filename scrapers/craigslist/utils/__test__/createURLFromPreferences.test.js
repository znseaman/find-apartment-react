const createUrlFromPreferences = require('../createURLFromPreferences')
const userPreferences = require('../userPreferences')

describe('createUrlFromPreferences', () => {
  it('creates a URL', () => {
    const url = createUrlFromPreferences(userPreferences)

    expect(url).toBe(`https://${userPreferences.city}.${userPreferences.baseHost}/search/${userPreferences.category}?hasPic=1&max_price=5000&min_price=4000&postedToday=0`)
  })
})