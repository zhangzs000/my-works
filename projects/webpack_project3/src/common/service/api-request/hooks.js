/**
 * 请求过程中的处理对象
 */

import NAPI from 'nadaptor'

/**
 * 参数集合
 *  params.url: 请求url
 *  params.type 请求类型
 *  params.loading 是否loading
 *  params.data 
 *  params.options 给vueResource的headers相关的参数
 *  params.settings
 */
let _params


/**
 * token 默认字段名
 * @type {String}
 */
const TOCKEN_KEY = 'token'

/**
 * 设置请求headers 
 * @property {Object} options vueResource的第三个参数
 */ 
function setRequestHeaders ({options, settings}) {
  options.headers = options.headers || {}

  settings.setToken !== false && setTokenToHeaders(TOCKEN_KEY, options.headers)
}

/**
 * 将token放到headers
 * @param {String} key token字段名
 * @param {Object} headers 请求的headers
 */ 
function setTokenToHeaders (key, headers) {
  headers[key] = NAPI.user.getToken() || ''
}

/**
 * 设置响应的headers
 * @param {Object} headersMap 
 */ 
function setResponseHeaders ({ settings }, response) {
  // const headersMap = response.headers.map
  // settings.setToken !== false && setTokenToUser(headersMap.token && headersMap.token[0])
}

/**
 * 将token 存到cookie中
 * @param {String} key 字段名
 * @param {String} val 值
 */ 
function setTokenToUser (tokenVal) {
  tokenVal && NAPI.user.setToken(tokenVal)
}

/**
 * 只返回一个对象, 如果是用curry 存储params , 每次请求都创建一个对象, 不太好
 */
const hooks = {

  init(params) {
    _params = params
  },

  handles: {
    beforeSend() {
      const { settings = {} } = _params

      setRequestHeaders(_params)
      typeof settings.beforeSend === 'function' && settings.beforeSend(_params)
    },

    afterSend({ response }) {
      const { settings = {} } = _params

      setResponseHeaders(_params, response)
      typeof settings.afterSend === 'function' && settings.afterSend(_params)
    }
  }
}

export default hooks