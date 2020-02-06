const prepareClient = require('../prepareClient');

describe('prepareClient', () => {
  it('returns client & superPreferences', async () => {
    const userPreferences = {
      type: 'craigslist',
      city: 'Vancouver',
      baseHost: 'craigslist.ca',
      hasPic: 1,
      category: 'apa',
      maxPrice: 2000,
      minPrice: 1000,
      postedToday: 1,
    };

    const { client, superPreferences } = await prepareClient(userPreferences);

    expect(client).toBeDefined();

    expect(superPreferences).toBeDefined();
    expect(superPreferences.city).toBe('Vancouver');
    expect(superPreferences.maxPrice).toBe(2000);
    expect(superPreferences.minPrice).toBe(1000);
    expect(superPreferences.postedToday).toBe(1);
    expect(superPreferences.hasPic).toBe(1);
  })
})