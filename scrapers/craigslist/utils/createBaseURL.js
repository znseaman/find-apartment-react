function createBaseURL({ city = '', baseHost = '', category = '' } = {}) {
  if (!city || !baseHost || !category) throw Error('All arguments must be longer than 1 character')
  if (!/\./.test(baseHost)) throw Error(`Argument, baseHost, must contain a '.'`)
  if (category.length - 1 == 3) throw Error(`Argument, category, must only be 3 characters long`)

  return `https://${city}.${baseHost}/search/${category}`
}

module.exports = createBaseURL