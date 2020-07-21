/**
 * Created by zyh on 16/6/13.
 * 后端交互层，导出所有后端交互的接口
 */

/**
 * Service 实例
 * @type {Service}
 */
import service from 'service/service'
import decorator from 'service/decorator'
import apiConfig from 'src/apis'
import apiRequest from './api-request'
import { getExtendObject } from './utils'
import $ from 'jquery';
const getApiCollection = apiRequest.getApiCollection

/**
 * 返回api集合
 * import S from 'service'
 * S.login({password:'xxx', username:'damon'})
 *  .then(ret => {console.log(ret)})
 *  .catch(err => {console.log(err)})
 */
let apiCollection

/**
 * http请求类型, 
 * @example {String} 'request' ajax请求方式
 *                   'vueResource' vueResource 请求方式
 */
// const HTTP_TYPE = 'vueResource'
const HTTP_TYPE = 'request'


/**
 * 1 将VueResource 传入Vue中
 * Vue.use(VueResource)
 * 
 * 配置项
 * Vue.http.options.emulateHTTP = true
 * Vue.http.options.crossOrigin = true
 * Vue.http.headers.common['token'] = 123
 */

/**
 * 2 将Vue.http的方法 传入service的实例 service.vueHttp对象中
 * 同理: service.setReqInstance($.ajax)
 */
// service.setVueResourceInstance(Vue.http)
service.setReqInstance($.ajax)

// 3 装饰service, HTTP_TYPE(vueResource)这个方法
decorator(service, HTTP_TYPE)

// 4 初始化 apiRequest 请求
apiRequest.init(service, HTTP_TYPE)

function getInstanceApiCollection (apiConfig) {
  // 这样apiCollection 就赋值一次哦
  if (apiCollection) return apiCollection

  return Object.assign(
    apiCollection = getExtendObject(getApiCollection),
    getApiCollection(apiConfig)
  )
}

export default getInstanceApiCollection(apiConfig)

