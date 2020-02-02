function cleanPrice(dirtyPrice) {
  return dirtyPrice.replace("$", "");
}

module.exports = cleanPrice;