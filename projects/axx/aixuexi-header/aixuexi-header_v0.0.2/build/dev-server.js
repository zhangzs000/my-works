var config = require('./config')
process.env.NODE_ENV = 'development'

var path = require('path')
var express = require('express')
var proxy = require('express-http-proxy')
var webpack = require('webpack')
var ora = require('ora')
var ProgressPlugin = require('webpack/lib/ProgressPlugin')

// var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack/webpack.prod.conf')
  : require('./webpack/webpack.dev.conf')


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var compiler = webpack(webpackConfig)

var spinner = ora('building for development...');

compiler.apply(new ProgressPlugin(function(percentage, msg) {
  spinner.text = 'building... ' + (percentage * 100).toFixed(0) + '% ' + msg;

  if (percentage === 1) {
    spinner.stop()
  }
}))

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
    spinner.stop()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (url) {
  var host = proxyTable[url]
  app.all(url, proxy(host))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static(config.dev.staticRoot))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
  spinner.start()  
})
