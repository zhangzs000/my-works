const path = require('path')
const proxy = require('./proxy')

const devpath = path.join(__dirname, '../../src')
const rootpath = path.join(__dirname, '../../')

// var SRC_ALIAS = SRC_CONFIG.ALIAS || {}

module.exports = {
  // 监听端口
  port: 8889,

  // 开发源文件路径
  devpath: devpath,

  // 定义别名
  alias: {
    "mocks": path.resolve(devpath, (true ? 'mocks' : 'mocks/null.js')),
    "commonStyleLess": path.resolve(devpath, (false || 'common/styles/less')),
    'modules': path.resolve(devpath, 'modules'),
    "common": path.resolve(devpath, 'common'),
    'src': path.resolve(devpath),
    'utils': path.resolve(devpath, 'common/utils'),
    'service': path.resolve(devpath, 'common/service'),
    'nadaptor': path.resolve(devpath, 'common/nadaptor'),
    'entry': path.resolve(devpath, 'common/entry'),
    "components": path.resolve(devpath, 'common/components'),
    // 'fantasy': path.resolve(rootpath, 'fantasy/src/'),
    // 'redux-common': path.resolve(rootpath, 'fantasy/src/redux-common'),
    // 'components': path.resolve(devpath, 'components'),
    // 'apis': path.resolve(devpath, 'apis'),
    // 'utils': path.resolve(devpath, 'utils'),
    // 'filters': path.resolve(devpath, 'apps/filters'),
    // 'modules': path.resolve(devpath, 'modules'),
    // 'mocks': path.resolve(devpath, 'mocks')
  },

  // 是否请求mock接口
  mock: false,

  // 请求代理配置
  proxy: proxy,

  views: require('../../src/pages/views'),

  build: {
    env: 'production',

    // 资源文件访问路径
    assetsSubDirectory: 'static',

    // 生产时输出路径配置
    prodRoot: path.join(rootpath, 'prod'),

    // 是否有source map
    // productionSourceMap: true
  },
  dev: {
    assetsSubDirectory: ('static'),
  }
}