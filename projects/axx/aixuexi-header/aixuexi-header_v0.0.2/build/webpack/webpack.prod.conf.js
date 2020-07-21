var path = require('path')
var config = require('../config')
var utils = require('../utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var htmlGenerator = require('./htmlGenerator');

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env
var random = (Math.random() + '').replace('0.', '');

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: false })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  // devtool: '#eval-source-map',
  output: {
    path: process.isWatch ? config.build.watchingAssetsRoot : config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash].js?v=' + random),
    chunkFilename: utils.assetsPath('js/[id].[hash].js?v=' + random)
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    // new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css?v=' + random)),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: process.env.NODE_ENV === 'testing'
    //     ? config.build.watchingIndex
    //     : config.build.index,
    //   template: 'src/common/index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    // split vendor js into its own file
    // package.json 引用的库
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common.vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
       
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../../node_modules')
          ) === 0
        )
      }
    }),
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ].concat(htmlGenerator())
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
