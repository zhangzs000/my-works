
const noop = function () {}

/**
 * 通过配置参数和默认获取合适的实例对象 | null
 * 
 * @param {Object} options 配置参数
 * @param {Class} Ctor 构造函数
 * @param {Object} defaultOpt 
 * @returns {Ctor|Null} Ctor的实例对象 或 null
 */
function getInstanceByOptions (options, Ctor, defaultOpt) {
  return options && (options.constructor === Ctor
    ? options
    : options.constructor === Object
      && new Ctor(defaultOpt ? Object.assign(defaultOpt, options) : options))
  || null
}

/**
 * 获取方法的执行结果是否为false,
 * @return {Boolean} 方法执行的结果为false: 为真, 
 *  没有方法 || 执行结果不为false, 返回假
 */ 
function getFuncFalseResult ({ func = noop, context = window, args = [] }) {
  return typeof func === 'function' && (func(...args) === false)
}

export default {
  getInstanceByOptions,
  getFuncFalseResult,
  noop
}