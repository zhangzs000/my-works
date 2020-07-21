
var config = require('./config')
// 这个要放在 require('./webpack/webpack.prod.config')之前，否则htmlGenerator里面是undefined
process.env.NODE_ENV = config.build.env
var webpackConfig = require('./webpack/webpack.prod.config')
var utils = require('./utils')
var bundleAnalysis = require('./server/analysis')

var webpack = require('webpack')
var ProgressPlugin = require('webpack/lib/ProgressPlugin')
var os = require("os")
var path = require('path')
var ora = require('ora')
// 安装 shelljs 对 rm/mkdir 等命令的支持
require('shelljs/global')



if(utils.getArgs()[1] === 'build:analysis') {
  bundleAnalysis(webpackConfig)
}

webpackCompile()

// webpack编译
function webpackCompile() {

  var
  spinner = ora('')
  spinner.start()
  // 这个也会移除啊，clean-html-plugin一样么
  // console.log('config.build.prodRoot: ',config.build.prodRoot)
  rm('-rf', config.build.prodRoot)
  mkdir('-p', config.build.prodRoot)
  mkdir('-p', config.build.prodRoot + '/')
  // 因为 prod.config cleanWebpackPlugin 的原因，先清空了prod，后有打包的，导致这句话没用。先不管这个。
  cp('-R', path.join(__dirname, '../src/assets/'),
    config.build.prodRoot + (os.platform() === 'darwin' ? '/assets/' : '/assets/')
  )
  webpackConfig.watch = true
  // webpackConfig.progress = true

  var compiler = webpack(webpackConfig)

  compiler.apply(
    new ProgressPlugin(function (percentage, msg) {
      spinner.text = 'building for production... ' + (percentage * 100).toFixed(0) + '% ' + msg;
    })
  )

  compiler.run(function (err, stats) {

    if(stats.hasErrors()) {
      console.log('构建失败，错误信息如下：')
      console.log(stats.toString({
        'errors-only': true
      }))
    } else {
      console.log('\nwebpack打包完成, 时间为：' + (stats.endTime - stats.startTime) + 'ms')
    }

    spinner.stop()
    if (err) throw err
  })
}