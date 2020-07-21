/**
 * 进入页面时需要请求的动作
 * @author libaoxu@gaosiedu.com
 */

import S from 'service'
import entryApis from './apis'
import NAPI from 'nadaptor'
import SRC_CONFIG from 'src/config'

// api 扩展
S.extend(entryApis)

/**
 * 用户登录信息请求
 * @return {Promise}
 */
function loginInfoService () {
  return new Promise((resolve, reject) => {
    S.loginInfo()
    .then(function (data) {
      let id = ''
      // id 和 userId 只要有一个就行, 最后两个值都变成userId
      if (data && (id = data.id || data.userId)) {
        resolve(Object.assign(data, {
          userId: id,
          id, 
          insId: data.institutionId
        }))
      } else {
        reject()
      }
    })
    .catch(reject)
  })
}

const loginPromise = new Promise((resolve, reject) => {
  const _user =  NAPI.user.get()

  // window.__checkLogin__: build/webpack/entry.ejs: 进行注入的, src/views.js: 进行配置的
  // __checkLogin__是view.js中某个对象的属性-》entry的一个入口页面
  if (window.__checkLogin__ && SRC_CONFIG.IS_GET_LOGIN_INFO) {
    // 通过获取信息, 检查是否真的登录过期
    // 多异步并发, 不在回调处理
    return Promise.all([loginInfoService()])
    .then((dataList) => {
      resolve(dataList.reduce((previous, current) => Object.assign(previous, current)))
    }, reject)

  } else {
    // token 有问题 或 获得用户信息失效时, resolve一个默认的, 这样可以测试
    setTimeout(() => resolve(NAPI.user.getMock()))
  }
})

export default {
  loginPromise
}