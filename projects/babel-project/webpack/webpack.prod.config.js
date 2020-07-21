const path = require('path');
module.exports = {
  entry: {
		main: './src/index.js'
	},
	output: {
		filename: '[name].bundle.[hash].js',
		path: path.resolve(__dirname, '../prod')
  },
	mode:'production'
}