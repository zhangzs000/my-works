/**
 * 公共api接口请求集合 demo
 * @author libaoxu@gaosiedu.com 2017-01-05
 */

import SRC_CONFIG from 'src/config'
import $common from 'utils/common'

const getCurryUrl = $common.getCurryUrl

/**
 * 请求类型
 * @type {Object}
 */
const REQ_TYPE = SRC_CONFIG.REQ_TYPE

/**
 * host 相关配置
 */
const CONFIG = SRC_CONFIG.APIS

/**
 * 请求根链接, 线上可能是http://api.aixuexi.com/这个地址
 * @type {String}
 * @example http://192.168.199.140:8080/godfather/
 */
const ROOT_URL = CONFIG.root


/**
 * root地址  post 请求函数, 执行后得到json对象
 * @type {Function}
 */
const postRoot = getCurryUrl(ROOT_URL, REQ_TYPE.POST)

/**
 * 给postRoot 增加默认的参数, 变成x-www-form-urlencoded形势
 */
const postRootXForm = function (url, loading) {
  return postRoot(url, loading, {
    //以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样。
    emulateJSON: true
  })
}

/**
 * 是否自动等待
 */
const AUTO_LOADING = true

export default {
	// /**
	//  * 登录接口
	//  * username: 账号
	//  * password: 密码
	//  * @example: username: 18600102914, password: 123456
	//  */
	// passwordLogin: postLoginRoot('user/passwordLogin', AUTO_LOADING, {
	// 	emulateJSON: true
	// })
}
