/**
 * js 内置对象上的一些属性信息的扩展
 */ 

/**
 * 不管Promise对象最后状态是 Fulfilled | Rejected, 最后执行的finally函数
 * @param {Function} 回调函数
 */ 
if (!Promise.prototype.finally) Promise.prototype.finally = function (callback) {
  let p = this.constructor;
  return this.then(
    value => Promise.resolve(callback.call(this, value)),
    reason => Promise.reject(callback.call(this, reason)).then(null, () => { throw reason })
  );
};

/**
 * Object对象下默认的属性描述
 */ 
const DEFAULT_DESCRIPTOR = {
  enumerable: false,
  configurable: true,
  writable: true
};

/**
 * 对象过滤条函数, 功能与Array.prototype.filter 类似
 *  防止被遍历, 可以调用, 不能修改
 *  不能用filter 转码会有冲突
 * @param {Function} func 传入的函数
 * @return {Object} 符合条件的对象(地址引用)
 */
Object.defineProperty(Object.prototype, 'filter', {
  value: function filter (func) {
    // 因为Object.prototype, 是原型链最高层, this 会指向很多类型, 所以如果不是对象类型, 则不进行遍历
    if (!Object.isObject(this)) return {};
    
    let key;
    let value;
    for (key in this) {
      
      if (this.hasOwnProperty(key)) {
        value = this[key];
        // 符合条件的放到新数组里
        if (func.call(this, value, key)) {
          return value
        }
      }
    }

  },
  ...DEFAULT_DESCRIPTOR
});

/**
 * 对象的循环函数, 类数组forEach
 * @param {Function} func 传入的参数
 * @return {Object} 对象本身
 */
Object.defineProperty(Object.prototype, 'forEach', {
  value: function forEach (func) {
    
    if (!Object.isObject(this)) return {};

    let key;
    let value;

    for (key in this) {
      
      if (this.hasOwnProperty(key)) {
        value = this[key];
        // 符合条件的放到新数组里
        if (func.call(this, value, key) === false) {
          break;
        }
      }
    }

    return this;
  },
  ...DEFAULT_DESCRIPTOR
});

/**
 * 对象的map函数, 产生新的对象
 * @param {Function} func 传入的参数
 * @return {Object} 对象本身
 */
Object.defineProperty(Object.prototype, 'map', {
  value: function map (func) {
    
    if (!Object.isObject(this)) return {};
    let newMap = {};
    let key;
    let value;

    for (key in this) {
      
      if (this.hasOwnProperty(key)) {
        value = this[key];
        // 符合条件的放到新数组里
        newMap[key] = func.call(this, value, key);
      }
    }

    return newMap;
  },
  ...DEFAULT_DESCRIPTOR
});


const toString = Object.prototype.toString;
const OBJECT_STRING = '[object Object]';
/**
 * 是否为Object类型
 * @return {Boolean}
 */ 
Object.defineProperty(Object, 'isObject', {
  value: function isObject (obj) {
    return toString.call(obj) === OBJECT_STRING;
  },
  ...DEFAULT_DESCRIPTOR
});

/**
 * 是否空对象
 * @return {Boolean}
 */ 
Object.defineProperty(Object, 'isEmptyObject', {
  value: function isEmptyObject (obj) {
    let key;

    for (key in obj) {
      return false;
    }

    return true;
  },
  ...DEFAULT_DESCRIPTOR
});

/**
 * Function.prototype.bind扩展, 增加可传参数
 * @param {any} 第一个参数保存是上下文, 其他参数是函数执行的参数
 * @return {Function} 返回新的函数, 调用函数本身, 并传入修改的上下文指向
 */
Function.prototype.proxy = function proxy (...rest) {
  var args = [...rest];
  var context = args.splice(0, 1);

  return (...rest) => {
    this.apply(context, [...rest].concat(args));
  };

};


/**
 * Date.prototype下的格式方法
 * @param {String} format 格式化方式
 * @example
 *    年-月-日 时:分:秒
 *    yyyy-MM-dd hh:mm:ss:SS => 2016-10-29 10:22:22.176
 *    yyyy年MM月dd日 hh:mm:ss:SS => 2016年10月29日 10:22:22.176
 */
Date.prototype.format = function (format) {
  let date = {
    'y+': this.getFullYear(),
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S+': this.getMilliseconds()
  };
  let k;

  for (k in date) {
    let re = new RegExp("(" + k + ")");
    format = format.replace(re, function ($1) {
      return date[k] < 10 ? '0' + date[k] : date[k];
    });
  }

  return format;
};
/**
 * String.getQuery获取指定url中的参数
 * @param {String} getQuery 获取参数
 * @example 
 * arrangementId=>2118
 */
String.prototype.getQuery = function(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = this.substr(this.indexOf("\?")+1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}
