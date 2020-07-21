
/**
 * 序列化参数
 */
export const getSerializeParam = function (params) {
  let key
  let str = ''
  for (key in params) {
    str += '&' + key + '=' + params[key]
  }
  return str.substring(1)
}

/**
 * 可扩展的api对象
 * @param {Function) fRule 扩展前的规则函数
 * @return {Object} 扩展的方法集合
 * extend 方法, 根据扩展规则, 扩展到源对象上
 * // S（getExtendObject(fn)））的extend属性能给自己扩展属性,
 * 这个属性是个函数，可以将传入的值，再通过一层函数(fRule)包装，包装成函数，
 * 包装成
 * {
 * key: (data={}, settings = {}, options = {}) => { ... }
 * }
 */ 
export const getExtendObject = function (fRule) {
  var _service =  Object.create(null)

  return Object.defineProperty(_service, 'extend', {
    // 不可遍历
    enumerable: false,
    // 不能删除
    configurable: false,
    // 不能赋值
    writable: false,
    value: function serviceExtend (obj) {
      return Object.assign(this, fRule(obj))
    }
  })
}

/**
 * curryUrl的设置参数
 */
const defaultSetting = {
  /**
   * 错误弹窗
   */
  isToast: true,

  /**
   * 显示loading
   */
  loading: false
}

/**
 * 柯里化一下, 把rootURL 和 reqType保存到闭包里
 * 生成请求对象
 * 
 * @param {String} rootURL 根链接 http://192.168.199.140:8080/
 * @param {String} reqType 请求类型 'get' | 'post'
 */
export const getCurryUrl = (rootURL, reqType) => {

  /**
   * @param {String} urlName 具体的请求链接名称 schedule/getClassLessonByDay
   * @param {Objectb} settings 包括loading, isToast等提示等
   * @param {Object} options 一些请求的配置信息: 是vue-resource的一些Headers相关配置
   */
  return (urlName, settings, options) => {
    let loading
    const isSettingsObject = settings != null && settings instanceof Object
    // 如果不是object, 那这个参数表示loading
    if (!isSettingsObject) {
      loading = settings
    }
   
    return {
      url: rootURL + urlName,
      type: reqType,
      options: options || {},
      settings: Object.assign({}, defaultSetting, isSettingsObject ? settings : {
        loading
      })
    }
  }
}