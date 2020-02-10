const queryStringify = require('../queryStringify')
const userPreferences = require('../userPreferences')

const params = {
  ...userPreferences,
  city: undefined,
  baseHost: undefined,
  category: undefined,
}

describe('queryStringify', () => {
  it('returns param as string', () => {
    const qs = queryStringify(params)

    expect(qs).toMatch(/hasPic=/)
    expect(qs).toMatch(/max_price=/)
    expect(qs).toMatch(/min_price=/)
    expect(qs).toMatch(/postedToday=/)
  })
})