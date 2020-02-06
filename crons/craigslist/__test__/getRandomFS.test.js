const { getRandomFSA_Vancouver } = require('../getRandomFS')

describe('getRandomFS', () => {
  it('function returns V5Z', () => {
    const postalCode = getRandomFSA_Vancouver(5)('Z')

    expect(postalCode).toBe('V5Z')
  })

  it('function returns V6E', () => {
    const postalCode = getRandomFSA_Vancouver(6)('E')

    expect(postalCode).toBe('V6E')
  })

  it('function returns V7Y', () => {
    const postalCode = getRandomFSA_Vancouver(7)('Y')

    expect(postalCode).toBe('V7Y')
  })

  it('function when ran without arguments starts with V', () => {
    const postalCode = getRandomFSA_Vancouver()()

    expect(postalCode).toMatch(/^V\d[A-Z]$/)
  })
})
