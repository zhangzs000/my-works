/**
 * 公共api接口请求集合
 * @author libaoxu@gaosiedu.com 2017-01-05
 */

import SRC_CONFIG from 'src/config';
import { getCurryUrl } from 'service/utils'
import serviceConfig from 'service/config'

const rootMap = {
  TRAIN: 'http://f4687eb3.ngrok.io/'
}

/**
 * 请求类型
 * @type {Object}
 */
const { REQ_TYPE } = serviceConfig

/**
 * 是否开发环境
 * @type {Boolean}
 */
const IS_DEV = process && process.env.NODE_ENV === 'development';
/**
 * host 相关配置
 */
const CONFIG = IS_DEV ? SRC_CONFIG.DEV : SRC_CONFIG.PROD;

/**
 * 请求根链接, 线上可能是http://api.aixuexi.com/这个地址
 * @type {String}
 * @example http://192.168.199.140:8080/godfather/
 */
// const ROOT_URL = rootMap[SRC_CONFIG.PC_SCHEME] || CONFIG.root;
const ROOT_URL = CONFIG.loginInfoRoot || CONFIG.root;
/**
 * root地址  post 请求函数, 执行后得到json对象
 * @type {Function}
 */
const postRoot = getCurryUrl(ROOT_URL, REQ_TYPE.POST);

/**
 * 给postRoot 增加默认的参数, 变成x-www-form-urlencoded形势
 */
const postRootXForm = function (url, loading) {
  return postRoot(url, loading, {
    //以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样。
    emulateJSON: true
  });
};


/**
 * 是否自动等待
 */
const AUTO_LOADING = true;


export default {

	/**
	 * 用户信息
	 */
	loginInfo: postRootXForm('user/loginInfo', {
    loading: AUTO_LOADING,
    // 接口请求返回值, 不检测登录状态
    checkLogin: false,
    // 没有弹窗
    isToast: false
  }),

};
