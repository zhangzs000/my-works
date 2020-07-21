var config = require('../config')

function getEntry(views) {
  var newObj = {}

  for(var key in views) {
    newObj[key] = `${config.devpath}/pages/${key}/index.js`
  }
  return newObj
}

module.exports = getEntry