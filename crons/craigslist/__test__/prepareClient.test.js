const prepareClient = require('../prepareClient');

describe('prepareClient', () => {
  it('returns client & superPreferences', () => {
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

    const superPreferences = prepareClient(userPreferences);

    expect(superPreferences).toBeDefined();
    expect(superPreferences.type).toBe('craigslist');
    expect(superPreferences.city).toBe('Vancouver');
    expect(superPreferences.baseHost).toBe('craigslist.ca');
    expect(superPreferences.hasPic).toBe(1);
    expect(superPreferences.category).toBe('apa');
    expect(superPreferences.maxPrice).toBe(2000);
    expect(superPreferences.minPrice).toBe(1000);
    expect(superPreferences.postedToday).toBe(1);

    expect(superPreferences.postal).toBeDefined();
    expect(superPreferences.searchDistance).toBeDefined();
    expect(superPreferences.nocache).toBe(1);

  })
})