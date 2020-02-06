function cleanCoordinates(coordinateString) {
  const [latitude, longitude, zoom] = coordinateString
    .replace('@', '')
    .replace('z', '')
    .split(',')

  return [latitude, longitude, zoom]
}

module.exports = cleanCoordinates
