/**
 * 统计js
 * @author libaoxu@gaosiedu.com 2017-03-09
 */

import $common from 'utils/common';
import NAPI from 'nadaptor';
import SRC_CONFIG from 'src/config';

const AIXUEXI_REFER = 'AIXUEXI_REFER';

const pTracker = $common.insertTagToDocument(window, document, 'script', 'http://omjm32dtk.bkt.clouddn.com/alilog.js?v=' + Date.now());

/**
 * 统计方法执行的条件判断
 * @param {String} methodName 方法名
 * @param {Array} args 参数数组
 */
const $tracker = function (methodName, args) {
  if (!window.Tracker) {
    return pTracker.then(function () {
      return methodExec(window.Tracker, methodName, args);
    });
  } else {
    return methodExec(window.Tracker, methodName, args);
  }
};

const methodExec = function (obj, methodName, args) {
  return obj[methodName] && obj[methodName](...args);
};

const DECODE_HREF = decodeURIComponent(location.href);

const getPageId = function (url) {
  return url && url.split && url.split('?')[0];
};

const DA_SRC = '首页';
const DA_ACT = 'ready';
const PROJECT_NAME = '管理系统';
const U_TYPE = 'teacher';
const PLAT_FORM = 'web';

/**
 * 统计默认配置参数
 * ua:'浏览器ua信息'
 * screen_height: 1920
 * screen_width: 1080
 * da_time: 2017-03-01 11:22:15
 * 
 * @property {String} da_src 具体页面名称
 * @property {String} da_act "ready,collect,click"
 * @property {String} os 操作系统信息
 * @property {Object} da_ext 附加信息
 * @property {String} net_type 网络环境
 * @property {String} utm_content 页面中的具体链接
 * @property {String} utm_term 
 * @property {String} page_name 爱学习-项目名称
 * @property {String} uid 用户id
 * @property {String} refer 来源标识
 * @property {String} channel app的下载渠道
 * @property {String} platform 平台 'web' | ios | android
 * @property {String} page_id 页面标识(目前用url来配置)
 * @property {String} utype 用户类型标识(teacher, student, schoolmaster)
 * @property {String} model 手机型号
 * @property {String} ua navigator.userAgent
 * @property {String} da_time 客户端时间戳
 * @property {String} screen_width 宽度
 * @property {String} screen_height 高度
 * @property {String} browser 浏览器
 * @property {String} browser_version 浏览器版本
 * 
 * @description http://wiki.dev.aixuexi.com/wiki/images/4/45/%E5%9F%8B%E7%82%B9%E6%95%B0%E6%8D%AE-finaly_.pdf
 */
const SEND_OPTIONS = {
  da_src: DA_SRC,
  da_act: DA_ACT,
  os: navigator.platform,
  da_ext: '',
  net_type: navigator.connection && navigator.connection.type || '',
  utm_content: encodeURIComponent(DECODE_HREF),
  utm_term: '',
  page_name: '爱学习-' + (SRC_CONFIG.PROJECT_NAME || PROJECT_NAME),
  uid: '',
  refer: document.referrer || encodeURIComponent(DECODE_HREF),
  channel: '', 
  platform: PLAT_FORM,
  page_id: encodeURIComponent(getPageId(DECODE_HREF)),
  utype: SRC_CONFIG.U_TYPE || U_TYPE,
  // model: '',
  // ua: '',
  // da_time: '',
  // screen_width: '',
  // screen_height: '',
  // browser: '',
  // browser_version: ''
};

let _refer = SEND_OPTIONS.refer;

export default {
  send: function (opts) {
    let loginInfo = NAPI.user.get();
    let decodeHref = decodeURIComponent(location.href);
    let nowUrl = encodeURIComponent(decodeHref);
    let originPageId = getPageId(location.href);

    // 页面链接变了, 且没有刷新浏览器情况, 需要重新设置refer
    if (SEND_OPTIONS.utm_content !== nowUrl) {
      // 获取之前的utm_content
      _refer = SEND_OPTIONS.utm_content;

      SEND_OPTIONS.refer = _refer || SEND_OPTIONS.refer;
      SEND_OPTIONS.utm_content = nowUrl;
      SEND_OPTIONS.page_id = encodeURIComponent(originPageId);

    }

    if (loginInfo && loginInfo.id) {
      opts = Object.assign(SEND_OPTIONS, { uid: loginInfo.id }, opts);
      $tracker('send', [opts]);
    }
  }
};