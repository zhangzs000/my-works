const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
var htmlGenerator = require('./htmlGenerator')
var config = require('../config')

module.exports = merge(baseConfig, {
	devtool: 'inline-source-map',
	devServer: {
		port: 8889, //
		// 那个文件夹下的内容放在服务器上。
		contentBase: path.join(__dirname, '../../prod'),
		proxy: {
      // 解决cookie不能放在8080端口下的问题，这样就能拿到cookie，cookie中有sessionID,就可以设置到request上
      '/token': {
        target: 'http://localhost:4000',
        // /api/token => http://localhost:3000/token
        pathRewrite: { '^/token': '/token' }
      }
    }
	},
	plugins: [].concat(
    htmlGenerator(config.views)
  ),
	mode:'development'
})