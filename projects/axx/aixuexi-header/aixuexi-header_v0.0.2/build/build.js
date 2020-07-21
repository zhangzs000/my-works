// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var arguments = process.argv.splice(2)
var isWatch = arguments[0] === 'dev';
if (isWatch) {
  process.isWatch = true;
}

var path = require('path')
var config = require('./config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack/webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()
var assetsRoot = isWatch 
  ? config.build.watchingAssetsRoot
  : config.build.assetsRoot;

var assetsPath = path.join(assetsRoot, config.build.assetsSubDirectory)

rm('-rf', assetsPath)
mkdir('-p', assetsPath)

// 静态目录的文件和文件夹, 和assetsPath里面文件同级
cp('-R', config.build.staticRoot, path.resolve(assetsPath, '../'))

if (isWatch) {
  webpackConfig.watch = true
  webpackConfig.progress = true
  webpackConfig.devtool = '#source-map'
}

var compiler = webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
