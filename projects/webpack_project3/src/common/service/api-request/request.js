import Toast from 'service/comp/toast'
import SRC_CONFIG from 'src/config'
import hooks from './hooks'

/**
 * service 对象
 */
let service

/**
 * httpType 请求类型
 */
let httpType

/**
 * @type {Toast} Toast实例对象
 */
const toast = new Toast()

/**
 * 请求service的具体函数
 */
function serviceRequest(params, ...rest) {
  hooks.init(params)
  hooks.handles.beforeSend()

  if (!service || !httpType) {
    console.warn('[service request]: Before calling serviceRequest, please call request.init function, and introduced service and httpType two parameters')
  }

  return new Promise((resovle, reject) => {
    /**
     * vue-resource 返回的 response: {body, data, Headers, status, bodyBlob, PromiseObj}
     *                    其中status为200为请求成功, data为服务端返回的数据
     */
    service[httpType](
      params,

      (response) => {
        let resData = response.data || response
        if (!resData) {
          toast.show({ message: '没有无数据' })
          return false
        }
        // 数据可能为字符串返回, 需要转义一下
        if (typeof resData === 'string') resData = JSON.parse(resData)
        if (resData.status === 1 /*0*/) {
          // 成功的值传入回调, 
          hooks.handles.afterSend({ response })

          resovle(handlerData(resData))
        } else {
          showErrorMsg(reject, params, resData)
        }
      },

      err => {
        // 请求成功，但是请求信息有误
        showErrorMsg(reject, params, err)
      },

      ...rest
    )
  })
}

/**
 * 处理数据
 * 服务端返回的有时候是 obj.body || obj.data 
 * obj.data 可能存在0的情况
 */
function handlerData(obj) {
  let _data = obj.body || obj.data

  if (_data != null) {
    return _data || _data === 0 && _data
  }
}

function showErrorMsg(reject, params, response) {
  const { settings } = params
  const { isToast, checkLogin } = settings
  const message = response.errorMessage || response.message
  const debugMsg = `[service request]: url: ${params.url} , message: ${message}`

  if (checkLogin !== false && 
    (window.__checkLogin__ && message == '用户未登录' 
      || (response && response.errorCode == 100300001))) {
    // 如果有登出页面
    if (SRC_CONFIG.LOGOUT_PAGE) {
      location.href = SRC_CONFIG.LOGOUT_PAGE+`?loginBackUrl=${location.href}`

      return toast.destroy()
    }
  }
  
  console.error(debugMsg)
  reject(message)

  // 支持再settings中配置isToast参数, 控制默认弹窗
  isToast !== false && toast.show({ message: message || '请求失败，请重试!' })
}

export default {
  init(_service, _httpType) {
    service = _service
    httpType = _httpType
    return this
  },

  serviceRequest
}