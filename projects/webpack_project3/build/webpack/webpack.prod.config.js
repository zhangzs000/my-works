const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
var htmlGenerator = require('./htmlGenerator')
var config = require('../config')
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
	plugins:[ 
		// new cleanWebpackPlugin(['prod'],{
		// 	root: path.resolve(__dirname, '../../')
		// }),
	].concat(htmlGenerator(config.views)),
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				name: 'commons',
	// 				chunks: 'initial',
	// 				minChunks: 2
	// 			}
	// 		}
	// 	}
	// },
	mode:'production'
})