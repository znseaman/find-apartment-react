const createSearchPreferences = require('../createSearchPreferences')

const city = 'vancouver'
const baseHost = 'craigslist.org'
const category = 'apa'

const userPreferences = {
  city,
  baseHost,
  category,
}

describe('createSearchPreferences', () => {
  it('returns userPreferences without city, baseHost, category', () => {
    const searchPreferences = createSearchPreferences(userPreferences);

    expect(searchPreferences).toHaveProperty('city', undefined)
    expect(searchPreferences).toHaveProperty('baseHost', undefined)
    expect(searchPreferences).toHaveProperty('category', undefined)
  })
})