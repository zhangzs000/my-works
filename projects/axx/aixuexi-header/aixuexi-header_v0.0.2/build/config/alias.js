/**
 * 文件别名集合
 * 文件统一用别名方式, 尽量不用 ../../这种相对路径, 使用别名, 方便使用、维护和移植
 * 
 * @example
 * js
 * good:  
 *  import srcConfig from 'src/config' 
 *  import NAPIConfig from 'nadapter/config' 
 * 
 * bad: 
 *  import srcConfig from '../../config' 
 *  import NAPIConfig from '../config' 
 * 
 * less:
 * good:  
 * @import '~assets/less/variable.less';
 * 
 * bad: 
 * @import '../../assets/less/variable.less';
 * 
 * @author libaoxu@gaosiedu.com 2016-12-12
 */

var path = require('path')

/**
 * src的相对根路径
 * @type {String}
 */ 
var SRC_PATH_STR = '../../src/';
var SRC_RELATIVE_PATH = path.resolve(__dirname, SRC_PATH_STR)

/**
 * src配置内容
 * @param {Object} SRC_CONFIG
 */ 
module.exports = function (SRC_CONFIG) {
  var SRC_ALIAS = SRC_CONFIG.ALIAS || {}

  return {
    // 根路径
    'src': path.resolve(SRC_RELATIVE_PATH),
    // mock数据
    "mocks": path.resolve(SRC_RELATIVE_PATH, (SRC_CONFIG.IS_MOCK ? 'mocks' : 'mocks/null.js')),
    // http请求封装
    'service': path.resolve(SRC_RELATIVE_PATH, 'common/service'),
    // 适配层
    'nadaptor': path.resolve(SRC_RELATIVE_PATH, 'common/nadaptor'),
    // 本地存储js
    'storage': path.resolve(SRC_RELATIVE_PATH, 'common/utils/storage')
  };

}