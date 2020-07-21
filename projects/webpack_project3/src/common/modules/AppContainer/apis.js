/**
 * 公共api接口请求集合
 * @author libaoxu@gaosiedu.com 2017-01-05
 */

import SRC_CONFIG from 'src/config';
import { getCurryUrl } from 'service/utils'
import serviceConfig from 'service/config'

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
const ROOT_URL = CONFIG.root;

/**
 * api相关接口 根路径
 */
const API_ROOT_URL = CONFIG.api;

/**
 * 获取消息接口
 */
const SERVICE_ROOT_URL = CONFIG.service;

/**
 * 获取任务接口
 */
const R_ROOT_URL = CONFIG.r;


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
 * API_ROOT_URL get 请求函数
 * @type {Function}
 */
const getApiRoot = getCurryUrl(API_ROOT_URL, REQ_TYPE.GET);

/**
 * API_ROOT_URL post 请求
 */
const postApiRoot = getCurryUrl(API_ROOT_URL, REQ_TYPE.POST);

/**
 * SERVICE_ROOT_URL jsonp 请求
 */
const jsonpServiceRoot = getCurryUrl(SERVICE_ROOT_URL, REQ_TYPE.JSONP);

/**
 * R_ROOT_URL jsonp 请求
 */
const jsonpRRoot = getCurryUrl(R_ROOT_URL, REQ_TYPE.JSONP);

const getRRoot = getCurryUrl(R_ROOT_URL, REQ_TYPE.GET);


/**
 * 是否自动等待
 */
const AUTO_LOADING = false;

export default {

	/**
	 * 菜单栏
	 * token放到header里
	 */
	apiGetUserHeader: getApiRoot('inception/insCommon/menu', AUTO_LOADING),

	/**
	 * 获得登录的信息
	 * username: 18600102914
	 * password: 123456
	 */
	apiPasswordLogin: postApiRoot('surrogates/user/passwordLogin', AUTO_LOADING),

	/**
	 * 消息列表
	 * uId 用户Id number 必填
	 * pageIndex 第几页 number 必填
	 */
	serviceGetMessages: jsonpServiceRoot('message-service/message/getMessages', AUTO_LOADING),

	/**
	 * 更新消息
	 * uId 用户Id number 必填
	 */
	serviceUpdate: jsonpServiceRoot('message-service/message/update', AUTO_LOADING),

	/**
	 * 消息条数
	 * uId 用户Id number 必填
	 */
	// serviceGetCountWeiDu: jsonpServiceRoot('message-service/message/getCountWeiDu', {
	// 	loading: AUTO_LOADING,
	// 	isToast: false
	// }, {
	// 	jsonp: 'callback'
	// }),

	/**
	 * 公告 
	 * system: 'bk'
	 */
	servicDisplayColumn: jsonpServiceRoot('message-service/displayColumn/displayColumn?system=beike', {
		loading: AUTO_LOADING,
		isToast: false
	}),

	/**
	 * 任务列表
	 * userId 用户Id number 必填
	 */
	rUserTaskList: getRRoot('userTaskList', AUTO_LOADING),

	/**
	 * 完成任务, 更新状态
	 * userJobId: 任务id
	 */
	rTaskConcreteCon: getRRoot('taskConcreteCon', AUTO_LOADING),

	/**
	 * 单个任务
	 * userJobId: 任务id
	 * userId: 用户Id
	 * _i: 时间戳
	 */
	rSingleTask: getRRoot('singleTask', AUTO_LOADING),

	/**
	 * 任务数量
	 * userId 用户Id number 必填
	 */
	rTaskNum: getRRoot('taskNum', AUTO_LOADING)
};
