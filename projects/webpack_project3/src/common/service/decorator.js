/**
 * 请求装饰, 主要给请求装饰loading
 */
import AutoLoading from 'service/comp/autoLoading'
import NAPI from 'src/common/nadaptor'
import SRC_CONFIG from 'src/config'
import { getLocalStorage } from 'src/common/utils/getStorage'
/**
 * 加载动画实例对象
 */
let autoloading = new AutoLoading()
const logoutOrNot = () => {
  let userIdPage = ''
  if (!userIdPage) {
    let userIdDom = document.getElementById('text-userId')
    if (userIdDom) {
      userIdPage = userIdDom.innerText
    }
  }
  let userIdToken = getLocalStorage('LOGIN', Array).fetch()[0].userId
  if (userIdToken && userIdPage) {
    if (userIdToken != userIdPage) {
      location.href = SRC_CONFIG.LOGOUT_PAGE+`?loginBackUrl=${location.href}`
    }
  }
}
/**
 * 请求装饰器
 * 处理所有 get post 请求的前后
 * 如 loading 动画等
 * 
 * @param {Service} target Service的实例对象
 * @param {String} httpType 需要装饰的http请求方法名
 */
export default function decorator(target, httpType) {
  if (!target[httpType]) {
    console.warn('don\'t have the httpType in Service Class Instance')
    return target
  }
  const _request = target[httpType].bind(target)

  // 请求装饰, 重写Service.prototype.request|vueResource 上的方法, 并内部调用刚刚保存的方法
  target[httpType] = function (params, done, error) {

    // 判断是否用户在一个浏览器登录了两个账号
    // logoutOrNot()
    const loading = params.loading
    loading && autoloading.show()

    _request(
      // 请求参数
      params,
      // 请求成功回调
      (ret) => {
        done(ret)
        loading && autoloading.hide()
      },
      // 请求失败回调
      (err) => {
        error && error(err)
        loading && autoloading.hide()
      }
    )

    return this
  }
  return target
}


/**
 * 发送异常接口错误日志
 */
function errorQuestLog (params, ret) {
  // NAPI.stat.send('API_ERROR', {errmsg: Object.assign(params,  ret, {date: new Date()}) })
}

/**
 * 发送错误日志
 */
function errorLog (params, err) {
  // NAPI.stat.send('NET_ERROR', {errmsg: Object.assign(params,  {err: err},  {date: new Date()} )})
}