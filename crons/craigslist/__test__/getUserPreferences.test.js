const getUserPreferences = require('../getUserPreferences')

describe('getUserPreferences', () => {
  it('should error if no userId passed in', async () => {
    try {
      await getUserPreferences()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('should error if the incorrect userId is passed in', async () => {
    try {
      await getUserPreferences(98798765457876)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})