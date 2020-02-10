function createURL(baseURL = '', queryString = '') {
  if (!baseURL || !queryString) throw Error('All arguments must be at least 1 character long')
  return `${baseURL}?${queryString}`
}

module.exports = createURL