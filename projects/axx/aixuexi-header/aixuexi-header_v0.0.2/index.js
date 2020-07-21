// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var sourcePath = path.resolve(__dirname, '../../src/')
var SRC_CONFIG = require('../../src/config')
var views = require('../../src/pages/views');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../dist/prod/index.html'),
    assetsRoot: path.resolve(__dirname, '../../dist/prod'),
    // build:dev执行 时候出现的目录, 方便watch 和 map local使用
    // watchingIndex: path.resolve(__dirname, '../../dist/dev/index.html'),
    watchingAssetsRoot: path.resolve(__dirname, '../../dist/dev'),
    // assetsSubDirectory: 'static',
    assetsSubDirectory: ('static'),
    // 线上地址跟本地开发地址是有差异化的, 因为front.aixuexi.com/zootropolis/ 通过ngx代理过滤到 zootroplis.aixuexi.com/ 静态文件目录需要增加termtest
    assetsPublicPath: '/zootropolis/',
    staticRoot: path.resolve(__dirname, '../../src/assets/static/'),
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  
  dev: {
    env: require('./dev.env'),
    port: SRC_CONFIG.PORT,
    staticRoot: path.resolve(__dirname, '../../src/assets/static/'),
    assetsSubDirectory: ('static'),
    assetsPublicPath: '/',
    proxyTable: SRC_CONFIG.PROXY_TABLE,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  },

  sourcePath: sourcePath,
  
  views: views,

  alias: require('./alias')(SRC_CONFIG)
}
