const fs = require('fs').promises
const asyncWriteFile = fs.writeFile

module.exports = asyncWriteFile