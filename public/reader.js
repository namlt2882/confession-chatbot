let fs = require('fs')
function read(fileLocation, callback) {
    fs.readFile(`./${fileLocation}`, callback)
}
module.exports = { read }