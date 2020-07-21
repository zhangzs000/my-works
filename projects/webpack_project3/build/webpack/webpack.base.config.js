const path = require('path');
var config = require('../config')
// const cleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var entries = require('./getEntries')(config.views)
var webpack = require('webpack')

var projectRoot = path.resolve(__dirname, '../../')

const { VueLoaderPlugin } = require('vue-loader')

var utils = require('../utils2')

module.exports = {
	// 这个入口文件还挺诡异，require是绝对路径，webpack启动根路径是项目目录
	entry: Object.assign(entries, {
		main: './src/index.js',
		other: './src/other.js'
	}),
	output: {
		filename: '[name].bundle.[hash].js',
		// chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, '../../prod')
	},
	//externals, 已经变为全局, 就不要Vue.use(xxx)了吗？
	externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'vue-resource': 'VueResource'
  },
	// externals: {
  //   'externalsMock': 'Mocka'
	// },
	// externals: {
  //   'mock': 'Mock'
	// },
	//'jj': 'jquery', // 这也报错？？module.exports = jquery; external "jquery":1 Uncaught ReferenceError: jquery is not defined
		//'lodash': 'lodash'
	// externals: {
	// 	jj: 'window.jQuery'  // 难道这样写后，页面就没必要import了因为是全局window了？？
  // },
	resolve: {
		// 可以在导入时不使用扩展名
		extensions: ['.js', '.css', '.vue', '.styl', '.html', '.less'],
		alias: config.alias
	},
	plugins:[
		// new cleanWebpackPlugin(['dist'],{
		// 	root: path.resolve(__dirname, '../')
		// }),
		new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../../manifest.json'),
      sourceType: 'var'
    }),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'main.html',
			title: '主页面',
			minify: {
		        collapseWhitespace: true, // 官网很多参数
		        removeComments: true
		      },
			chunks: ['main', 'commons']
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'other.html',
			title: '附页面',
			chunks: ['other', 'commons']
		}),
		// make sure to include the plugin for the magic
    new VueLoaderPlugin()
	],
	module: {
	    rules: [
	      {
	        test: /\.(css|less)$/,
	        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
				},
	      {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        use: {
	          loader: 'babel-loader',
	          options: {
	            presets: [['env', { modules: false }], "stage-0"],
	            plugins: ['transform-runtime', 'syntax-dynamic-import', "transform-vue-jsx"]
	          }
	        }
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					include: projectRoot,
					exclude: /node_modules/
				},
				{
					test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					loader: 'url-loader',
					query: {
						limit: 10000,
						name: utils.assetsPath('img/[name].[hash:7].[ext]')
					}
				},
				/*
				解决vue中的jsx写法
				https://github.com/vuejs/babel-plugin-transform-vue-jsx
				cnpm install 
				babel-plugin-syntax-jsx 
				babel-plugin-transform-vue-jsx 
				babel-helper-vue-jsx-merge-props 
				babel-preset-env 
				--save-dev
				*/
	    ]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 2
				}
			}
		}
	},
	// mode:'development'
}