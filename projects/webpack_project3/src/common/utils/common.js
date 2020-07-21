/**
 * 一些公用和通用的方法, 包括工具方法
 * @author libaoxu@gaosiedu.com
 */

import './aspect';
import './protoExtension';
import { getCurryUrl } from 'service/utils'

let userAgent = navigator.userAgent;

const $common = {
  Promise: Promise,

  isIos: userAgent.match(/iPhone/i),

  isAndroid: !userAgent.match(/iPhone/i),

  isWx: userAgent.match(/MicroMessenger/i),

  isFirefox: userAgent.match(/Firefox/i),

  isPc: (function (userAgentInfo) {
    let Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    let length = Agents.length;

    let flag = true;
    for (let i = 0; i < length; i++) {
      if (userAgentInfo.indexOf(Agents[i]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  })(window.navigator.userAgent),

  /**
   * 获取周时间, 根据传入的参数来判断获取第几周的时间
   * @param {Number} 0: 本周, -1, 上一周, -2 上二周, 1 下一周
   * @param {String} 默认 'yyyy-MM-dd' : 年-月-日 : 2016-10-20
   * @return {Object} 
   *                  beiginTime: 开始时间
   *                  endTime: 结束时间
   */
  getWeekTime(num, formatRule) {
    // 当前日期
    let now = new Date();
    // 今天本周的第几天
    let nowDayOfWeek = now.getDay();
    // 当前日
    let nowDay = now.getDate()
    //当前月
    let nowMonth = now.getMonth();
    //当前年
    let nowYear = now.getFullYear();
    // 该周开始日期
    let weekStartDate;
    // 该周的结束日期
    let weekEndDate;

    /*
      国外星期天是 下周的第零天, 可国内算是本周最后一天, 所以这里如果本天是星期天的话, 就计算上周的日期, 算本周
      7的系数  num = 0, 本周
              num:-1, -1 * 7 = -7  表示上周
              num:-1, -2 * 7 = -14 表示上两周
    */
    let radio = (nowDayOfWeek == 0 ? num - 1 : num) * 7;

    // 默认 年-月-日 : 2016-10-20
    formatRule = formatRule || 'yyyy-MM-dd';

    let start = new Date(nowYear, nowMonth, (nowDay - nowDayOfWeek + 1) + radio);
    // 设置该周开始日期
    weekStartDate = start.format(formatRule);

    let end = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek) + radio);
    // 设置该周的结束日期
    weekEndDate = end.format(formatRule);

    return {
      beginTime: weekStartDate,
      endTime: weekEndDate
    };
  },

  /**
   * 将url中? 后面的参数, 变成一个json
   * @return {Object}
   * @example 'a=1&b=3' => {a: 1, b: 3}
   */
  getUrlParams(sourceStr) {
    // 防止hash值, 影响参数名称
    let search;
    if (sourceStr) {
      search = sourceStr.indexOf('?') > -1 ? sourceStr.split('?').slice(-1).toString() : sourceStr;
    } else {
      // 链接中的最后一个
      search = location.href.indexOf('?') > -1 && location.href.split('?').slice(-1).toString().replace(/#!\/.+/, '');
    }

    // 如果没有, 则返回空对象
    if (!search) return {};

    let searchArr = decodeURIComponent(search).split('&');

    let urlParams = {};

    searchArr.map((str) => {
      let paramArr = str.split('=');
      // 如果已经有该参数就不添加进去了
      if (urlParams[paramArr[0]]) return false;

      urlParams[paramArr[0]] = unescape(paramArr[1]);
    });

    return urlParams;
  },

  /**
   * 得到url中某个参数
   */
  getUrlQuery(name) {

    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let search = location.search.substring(1) || location.href.split('?')[1] && location.href.split('?')[1].replace(/#!\/.+/, '');
    if (!search) return false;
    let r = search.replace('#', '').match(reg);

    if (r != null) {
      // 对编码的字符串进行解码
      return unescape(r[2]);
    } else {
      return null;
    }
  },

  /**
   * 判断是数组或类数组
   * @param {Object} obj 传入的对象
   * @return {Boolean} 是否类数组
   */
  isArrayLike(obj) {
    if (!obj) {
      return false;
    }

    if (obj.splice) {
      return true;
    }

    // 存在 length属性
    //  且 
    //       如果obj.length 大于0 且 长度长度减一的值 在obj里
    //    或 obj.length === 0;
    return 'length' in obj
      && ((obj.length && (obj.length - 1) in obj)
        || obj.length === 0);
  },

  testMoney: (str) => {

    if (str == "") return true;

    return str.match(/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/i);
  },

  testMobile: (str) => {

    if (str == "") return false;

    return str.match(/^1[3|4|5|8|7][0-9]\d{8}$/i);
  },

  /**
   * 参数格式化, 符合url方式
   * @params {Object} {a: '123', age: '18'}
   * @return {String} 'a=123&age=18'
   */
  stringifyParams(params) {
    let name;
    let value;
    let str = '';

    for (name in params) {
      value = params[name];
      str += name + '=' + value + '&';
    }

    return str.slice(0, -1);
  },

  /**
   * 使图片跟容器适应
   * @type {Element} imgDom img标签的 dom对象
   */
  imgFitContainer(imgDom) {
    let width = imgDom.clientWidth;
    let height = imgDom.clientHeight;

    if (width / height > 1.2) {
      imgDom.style.width = 'auto';
      imgDom.style.height = '100%';
    } else {
      imgDom.style.width = '100%';
      imgDom.style.height = 'auto';
    }
  },

  /**
   * 判断对象是否为空
   * @return {Boolean} 是否是空对象
   */
  isEmptyObject(obj) {
    let key;

    for (key in obj) {
      return false;
    }

    return true;
  },

  /**
   * 获取display:none 元素的宽, 高
   * @param {Element} el 需要获取的dom元素
   * @return {Object} obj.height: 高, obj.width: 宽
   */
  getDisplayNoneOffset(el) {
    // 拷贝子元素
    let clone = el.cloneNode(true);
    let height = 0;
    let width = 0;

    // 创建一个临时 用visibility隐藏, 只为获取高度,
    clone.style.cssText = `display: block;
      position: absolute;
      visibility: hidden;
      height: auto;
      z-index: -10;
    `;

    // 父级存在且为dom元素
    if (el.parentElement && el.parentElement.nodeType === 1) {
      el.parentElement.appendChild(clone);
      height = clone.offsetHeight;
      width = clone.offsetWidth;
      // 获取完高度, 及时删除
      el.parentElement.removeChild(clone);
      clone = null;
    }

    return { height, width };
  },

  /**
   * 判断数组内的值, 是否相同
   * 
   * @param {Array} arr1 数组1
   * @param {Array} arr2 数组2
   * @return {Boolean} 是否内容相同
   * 
   * isSameValueArray(['teacher', 'manage'], ['teacher', 'manage']) => true
   * isSameValueArray(['teacher', 'a'], ['teacher', 'b']) => false
   */
  isSameValueArray(arr1, arr2) {
    // 类型不对, 直接false
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
      return false;
    }

    // 长度不相等, 肯定不内容不相同
    if (arr1.length !== arr2.length) {
      return false;
    }

    // 浅拷贝
    let one = Object.assign([], arr1);
    let two = Object.assign([], arr2);

    return one.sort().toString() === two.sort().toString();
  },

  /**
   * 正则和数组里面每一项匹配
   * @param {Object} 
   * param.reg {RegExp} 正则
   * param.arr {Array} 数组
   * 
   * @return {Boolean} 是否为真
   */
  isRegMatchArray({ reg = '', arr = '' }) {
    if (reg.constructor !== RegExp || !Array.isArray(arr)) {
      return false;
    }

    let len;
    let item;
    if ((len = arr.length) > 0) {
      for (let i = 0; i < len; i++) {
        item = arr[i];

        if (!reg.test(item)) {
          return false;
        }
      }
    }

    return true;
  },

  /**
   * 对象1, 和 数组 是否match
   * @param {RegExp | Array}
   * @param {Array}
   * 
   * @return {Boolean} 是否为真
   */
  isAnyMatchArray(any = '', arr) {
    if (!Array.isArray(arr)) return false;

    switch (any.constructor) {
      case RegExp:
        return this.isRegMatchArray({ reg: any, arr })
      case Array:
        return this.isSameValueArray(any, arr);
    }
  },

  /**
   * 数组里面的值, 是否都在对象里
   * @param {Object}
   * param.arr {Array} 数组
   * pramm.obj {Object} 对象
   * pramm.value {any} 判断是否相等, 相应规则的值
   * 
   * @return {Boolean} 是否数组里面的值都在对象里
   */
  isArrayInObject({ arr = '', obj = '', value }) {
    if (!Array.isArray(arr) || !Object.isObject(obj)) return false;

    for (let i = 0, len = arr.length; i < len; i++) {
      let key = arr[i];

      if (!(typeof key === 'string' && obj[key] === value)) {
        return false;
      }
    }

    return true;
  },

  insertTagToDocument(global, context, tagName, url) {
    return new Promise((resolve, reject) => {
      var elem = document.createElement(tagName);
      var firstElem = document.getElementsByTagName(tagName)[0];
      elem.async = 1;
      elem.src = url;

      if (firstElem) {
        firstElem.parentNode.insertBefore(elem, firstElem);
      } else {
        document.head.appendChild(elem);
      }

      elem.onload = resolve;
      elem.onerror = reject;
    });
  },

  /**
   * 获取dom元素到顶级定位父级的Offset值
   * @param {Element} elem dom元素
   * @return {Object} 
   * object.left: 左边的值
   * object.top: 顶部的值
   */
  getOffsetParent(elem) {
    let left = 0
    let top = 0;

    if (elem && elem.nodeType === 1) {
      do {
        left += elem.offsetLeft;
        top += elem.offsetTop;

        elem = elem.parentNode;
      } while (elem.parentNode);
    }

    return { left, top };
  },

  copy() {
    let target = arguments[0] || {}
    let i = 1
    let length = arguments.length
    let deep = false

    if (typeof target === 'boolean') {
      deep = target
      target = arguments[1] || {}
      i++
    }

    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {}
    }

    for (; i < length; i++) {
      let options
      if ((options = arguments[i]) != null) {
        for (let prop in options) {
          let src = target[prop]
          let copy = options[prop]

          if (target === copy) continue

          let copyIsArray
          if (deep && copy && (Object.isObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            let clone
            if (copyIsArray) {
              copyIsArray = false
              clone = src && Array.isArray(src) ? src : []
            } else {
              clone = src && Object.isObject(src) ? src : {}
            }

            target[prop] = $common.copy(deep, clone, copy)
          } else if (copy != null) {
            target[prop] = copy
          }
        }
      }
    }

    return target
  },

  getCurryUrl,

  getCrossRoutePath(viewName, query) {
    const pathnameReg = /\/([\w]+)\.html/
    const pathname = location.pathname
    
    pathnameReg.test(pathname)
    const rootPath = pathname.replace(RegExp.$1, viewName)

    let queryStr = ''
    if (query instanceof Object) {
      queryStr = this.stringifyParams(query)
    }

    return rootPath + (queryStr ? `?${queryStr}` : '')
  },

  saveSession (key, data) {
    typeof key === 'string' && data && data.constructor === Object && sessionStorage.setItem(key, JSON.stringify(data))
  },

  getSession(key) {
    let obj = sessionStorage.getItem(key)
    return obj && typeof obj === 'string' && JSON.parse(obj)
  },

  /**
  * zhangmeng 2017/10/09 格式化时间戳为指定格式
  */
  formatData (date, fmt) {
    date = date ? new Date(date) : new Date()
    fmt = fmt || "yyyy-MM-dd hh:mm:ss"
    // 正则表达式动态替换中的 yyyy MM dd hh mm ss
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length) ))
      }
    }
    return fmt
  },
  

  /**
   *deep copy
   * 深拷贝实现
   * marshal
   */
  deepCopy () {
    let obj = arguments[0] 
    if ( typeof obj !== 'object') return
    let new_obj = obj instanceof 'Array' ? [] : {}
    for ( let key in obj) {
      new_obj[key] = typeof obj[key] === 'object' ? $common.deepCopy(obj[key]) : obj[key]
    }
    return new_obj
  },
  /**
   * 验证手机号
   */
  matchPhoneReg(num) {
    const reg = /^1[3-9]\d{9}$|^000\d{8}$/
    // return num.match(reg) ? true : false
    return reg
  }   
}

export default $common