const createBaseURL = require('../createBaseURL')

const city = 'vancouver'
const baseHost = 'craigslist.org'
const category = 'apa'

const userPreferences = {
  city,
  baseHost,
  category,
}

describe('createBaseURL', () => {
  it('throws if any arguments were empty strings OR if no arguments provided', () => {
    expect(() => createBaseURL({
      ...userPreferences,
      city: '',
    })).toThrowError(/arguments/)
    expect(() => createBaseURL({
      ...userPreferences,
      baseHost: '',
    })).toThrowError(/arguments/)
    expect(() => createBaseURL({
      ...userPreferences,
      category: '',
    })).toThrowError(/arguments/)
    expect(() => createBaseURL({
      city: '',
      baseHost: '',
      category: '',
    })).toThrowError(/arguments/)
    expect(() => createBaseURL({})).toThrowError(/arguments/)
    expect(() => createBaseURL()).toThrowError(/arguments/)
  })

  it('creates a baseURL', () => {
    const baseURL = createBaseURL(userPreferences);

    expect(baseURL).toBe(`https://${userPreferences.city}.${userPreferences.baseHost}/search/${userPreferences.category}`)
  })
})