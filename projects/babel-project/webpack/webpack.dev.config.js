const path = require('path');
module.exports = {
  devtool: 'inline-source-map',
	devServer: {
		// port: 8888,
		contentBase: path.join(__dirname, '../prod')
	},
	mode:'development'
}