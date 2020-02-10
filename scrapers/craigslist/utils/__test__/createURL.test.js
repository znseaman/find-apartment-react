const createURL = require('../createURL')

describe('createURL', () => {
  it('returns a URL', () => {
    const baseURL = `https://vancouver.craigslist.org/search/apa`
    const qs = `hasPic=1&max_price=5000&min_price=4000&postedToday=0`
    const url = createURL(baseURL, qs)

    expect(url).toBe(`${baseURL}?${qs}`)
  })

  it('throws if any arguments were empty strings OR if no parameters provided', () => {
    var baseURL = ``
    var qs = `hasPic=1&max_price=5000&min_price=4000&postedToday=0`
    expect(() => createURL(baseURL, qs)).toThrowError(/argument/)

    var baseURL = `https://vancouver.craigslist.org/search/apa`
    var qs = ``
    expect(() => createURL(baseURL, qs)).toThrowError(/argument/)
  })
})