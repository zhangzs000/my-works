
const path = require('path');
const fs = require('fs');

module.exports = {
	devtool: 'inline-source-map',
	devServer: {
	 // proxy: {
	 // 	'*': 'http://127.0.0.1:9360'
	 // },
	 port: 8888,
	 https: {
		 // key: fs.readFileSync(path.join(__dirname, '../rootCA-key.pem')),
		 // cert: fs.readFileSync(path.join(__dirname, '../rootCA.pem'))
	 },
	 host: 'test.example.com',
	 // allowedHosts: ['test.example.com'],
	 watchContentBase: true,
	 // hot: true,
	 contentBase: path.join(__dirname, '../dist')
	},
	mode: 'development'

}
