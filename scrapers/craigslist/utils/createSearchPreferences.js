function createSearchPreferences(userPreferences) {
  return {
    ...userPreferences,
    city: undefined,
    baseHost: undefined,
    category: undefined
  }
}

module.exports = createSearchPreferences