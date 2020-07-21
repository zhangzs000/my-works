/**
 * 收集请求, 并处理请求相关逻辑
 */
import { getSerializeParam } from 'service/utils'
import SRC_CONFIG from 'src/config'
import mock from 'mocks'
import request from './request'
import { common } from 'utils'
import serviceConfig from 'service/config'

const { SHORT_PARAMS_LIST } = serviceConfig

/**
 * service请求具体逻辑
 */
const serviceRequest = request.serviceRequest

const IS_DEV = process && process.env.NODE_ENV === 'development'

/**
 * 是否走mock, 平时开发时候放开, 打包时候需要注意注释
 * @type Boolean
 */
const IS_MOCK = SRC_CONFIG.IS_MOCK

/**
 * apis配置方法
 * @param {Object} apis 中的的配置对象
 * @return {Object} apiRequest api请求对象
 * 
 * @example
 * import S from 'service'
 * S.login({password:'xxx', username:'damon'})
 *  .then(ret => {console.log(ret)})
 *  .catch(err => {console.log(err)})
 */
const getApiCollection = function (apiConfig) {
  const apiCollection = {}

  for (let key in apiConfig) {
    const _api = apiConfig[key]

    /**
     * 应用层的请求方法
     * @property {Object} data ajax请求数据
     * @property {Object} settings 用户设置
     * @property {Object} options 给vueResource的headers相关的参数
     * @return {Promise} 请求返回的promise对象, resolve请求成功的data
     */
    apiCollection[key] = (data = {}, settings = {}, options = {}) => {
      // console.log(_api)
      const params = getServiceParams(_api, { data, settings, options })

      setServiceUrl(params)

      /**
       * 因为mock只能拦截本次的ajax请求, 每次ajax请求之前, 都需要拦截一下
       */
      if (IS_DEV && IS_MOCK) mock.intercept(key, params)

      return serviceRequest(params)
    }
  }

  return apiCollection
}

/**
 * 获得service请求的配置参数
 * @param {Object} _api 是一个有type, url, loading, options对象
 * @param {Object} mixObj 是应用层用户传递过来的对象
 * @property {Object} data ajax请求数据
 * @property {Object} settings 用户设置
 * @property {Object} options 给vueResource的headers相关的参数
 * 
 * @return {Object} params 
 *  params.url: 请求url
 *  params.type 请求类型
 *  params.loading 是否loading(这里处理进行整合)
 *  params.data 
 *  params.options 给vueResource的headers相关的参数 (处理整合)
 *  params.settings 用户设置
 */
function getServiceParams(_api, { data, settings, options }) {
  const params = Object.assign({}, _api, { data, settings })

  _api.settings = _api.settings || {}

  // 合并用户和配置的options
  params.options = Object.assign(_api.options || {}, options)

  // 合并settings配置
  params.settings = Object.assign(_api.settings, settings)

  if (_api.loading == null) {
    _api.loading = _api.settings.loading || false
  }
  // 支持用户的第二配置loading
  params.loading = settings.loading != null ? settings.loading : _api.loading

  return params
}

/**
 * 设置service配置对象的url
 * @param {Object} params service配置对象
 */
function setServiceUrl(params) {
  let { type, url, data } = params

  // get请求把data拼接到url上, data就是options, 作为vueHttp的第二个参数
  if (SHORT_PARAMS_LIST.indexOf(type) > -1) {
    params.url = url
      + (data && typeof data === 'object' && !common.isEmptyObject(data)
        ? ('?' + getSerializeParam(data))
        : '')
    params.data = null
  }
  return params || {}
}

export default {
  init: function (_service, _httpType) {
    request.init(_service, _httpType)
    return this
  },

  getApiCollection
}