var path = require('path')
var config = require('../config')
var utils = require('../utils')
var projectRoot = path.resolve(__dirname, '../../')
var entries = require('./getEntries')()
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ElemeRoot = projectRoot + '/src/common/Eleme'

var postcssSalad = require('postcss-salad')
// 2rem 会影响pc端布局, 还没有exclude, include 选项
var px2rem = require('postcss-plugin-px2rem')

var px2remOpts = {
  rootValue: 100,
  unitPrecision: 3,
  // 选择器黑名单, 因mint ui 组件px值,已经按照二倍图的一半进行编写, 所以这个不转为rem
  selectorBlackList: ['html', /^body$/, /mint-/, /gaosi-/],
  // 白名单css属性, 默认都编译
  propWhiteList: [],
  // 黑名单css属性, 默认没有黑名单
  propBlackList: [],
  // 忽略原定义属性
  ignoreIdentifier: false,
  // 不替换之前的rem规则
  replace: true,
  // 查询
  mediaQuery: true,
  minPixelValue: 2
}

var postcssPlugins = [postcssSalad]

module.exports = {
  entry: entries,
  
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  
  resolve: {
    extensions: ['', '.js', '.css', '.vue', '.styl', '.html', '.less'],
    fallback: [path.join(__dirname, '../../node_modules')],
    alias: config.alias
  },

  resolveLoader: {
    fallback: [path.join(__dirname, '../../node_modules')]
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true
  },

  /**
   * key: import 的路径别名, 如: import Vue from 'vue'
   * value: window.Vue 的全局变量
   */
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'vue-resource': 'VueResource'
  },

  module: {
    // This seems to be a pre-built javascript file
    noParse: [
      /html2canvas/
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: [/node_modules/, ElemeRoot]
      },
      {
        test: /\.json$/,
        loader: 'json',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|pdf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.less$/, 
        loader: 'less'
      }
      // {
      //   test: /\.less$/,
        // loader: 'style-loader!css-loader!less-loader'
      //   // loader: "style-loader!css-loader!less-loader?strictMath&noIeCompat"
      //   loader: ExtractTextPlugin.extract(
      //       // activate source maps via loader query
      //       'css-loader?sourceMap!' +
      //       'less-loader?sourceMap'
      //   )
      // }
    ]
  },

  vue: {
    loaders: utils.cssLoaders(),
    postcss: postcssPlugins
  },
  
  postcss: function () {
    return postcssPlugins
  },

  plugins: [
    // extract inline css into separate 'styles.css'
    // new ExtractTextPlugin('static/css/common.styles.css')
  ]
}