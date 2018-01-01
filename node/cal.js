// const {Cal} = require('./CalClass.js');
const Cal = require('./CalClass.js');
console.log('Cla: ',Cal)
class AdCal extends Cal {
	multiply(a, b) {return a*b};
	divide(a, b) {return a/b};
}

module.exports = new AdCal()