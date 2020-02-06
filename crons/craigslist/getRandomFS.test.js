const { getRandomFSA_Vancouver } = require('./getRandomFS')

describe('getRandomFS', () => {
  it('function returns V5Z', () => {
    const postalCode = getRandomFSA_Vancouver(0)(12)

    expect(postalCode).toBe('V5Z')
  })

  it('function returns V6E', () => {
    const postalCode = getRandomFSA_Vancouver(1)(3)

    expect(postalCode).toBe('V6E')
  })

  it('function returns V7Y', () => {
    const postalCode = getRandomFSA_Vancouver(2)(1)

    expect(postalCode).toBe('V7Y')
  })
})
