function hasCoordinates(mapUrl) {
  return mapUrl.match(
    /@(-?\d+\.\d+),(-?\d+\.\d+),(\d+\.?\d?)+z/g
  );
}

module.exports = hasCoordinates;