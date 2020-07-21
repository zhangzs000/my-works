const config = require('../config');
var proxy = require('express-http-proxy')
var ProgressPlugin = require('webpack/lib/ProgressPlugin')
var utils = require('../utils')
var ora = require('ora')
var path = require('path')
var webpackConfig = require('../webpack/webpack.dev.config')
var express = require('express')
var webpack = require('webpack')

var app = express()


process.env.NODE_ENV = 'development'

// 监听端口
var port = config.port

var proxyTable = config.proxy

var compiler = webpack(webpackConfig)

// 设置静态文件目录
function setStatic() {
  app.use('/assets', express.static(path.join(path.resolve(), 'src/assets')))
  app.use('/libs', express.static(path.join(path.resolve(), 'src/assets/libs')))
  app.use('/css', express.static(path.join(path.resolve(), 'src/assets/css')))
}
// 编译webpack
function webpackCompiler() {
  var
  spinner = ora('building...')
  
  process.nextTick(() => {
    spinner.start()
  })
  compiler.apply(
    new ProgressPlugin(function (percentage, msg) {
      spinner.text = 'building... ' + (percentage * 100).toFixed(0) + '% ' + msg
      if (percentage === 1) {
        spinner.stop()
      }
    })
  )
  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
      chunks: false,
      assets: true
    }
  })
  var hotMiddleware = require('webpack-hot-middleware')(compiler)
  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })
  app.use(require('connect-history-api-fallback')())
  app.use(devMiddleware)
  app.use(hotMiddleware)
}

// var proxyOption = {
//   target: 'http://localhost:8080',
//   pathRewrite: {
//      '^/api/' : '/' // 重写请求，api/解析为/
//    },
//    changeOrigoin:true
//  };

// 设置后端接口代理
function setProxy() {
  proxyTable.forEach(function (_proxy) {
    // app.all(
    //   _proxy.url,
    //   proxy(
    //     _proxy.host,
    //     decorateProxy.call(this)
    //   )
    // )
    // app.all(
    //   _proxy.url,
    //   proxy({
    //     target: _proxy.host,
    //     pathRewrite: {
    //       '^/api/' : '/' // 重写请求，api/解析为/
    //     },
    //   })
    // )
    app.all(
      _proxy.url,
      proxy(_proxy.host)
    )
  })
}
//代理装饰
function decorateProxy() {
  return {
    // proxy 还附带 decorateRequest 这个函数？
    decorateRequest: function (proxyReq, originalReq) {
      proxyReq.headers['appId'] = '2'
      return proxyReq
    }
  }
}
// 绑定mock apis
function bindMock() {
  app.use('/token', mockjs(path.join(path.resolve(), 'src/mocks')))
}

// 启动服务
function startServer() {
  // if (config.mock) {
  //   // bindMock()
  //   // mock.intercept(key, params)
  //   mymock.intercept('token', {role:1, password:2})
  // } else {
    setProxy()
  // }
  webpackCompiler()
  setStatic()
  app.listen(port, function (err) {
    if(err) {
      console.log(err)
      return
    }
    console.log('Listening at http://' + utils.getIpV4() + ':' + port + '\n')
  })
}
startServer()