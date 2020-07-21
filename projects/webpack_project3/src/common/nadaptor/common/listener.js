/**
 * 为body 和 window 一些通用事件做一个统一的入口和出口, 让这些全局变量的事件不再混乱, 不再随意, 可维护
 * 相同命名空间只绑定一次原生事件, 其他事件放入队列里, 统一执行 
 * 支持浏览器事件, 自定义事件, 支持命名空间
 * 
 * @author libaoxu@gaosiedu.com 2016-12-20
 */

const MAP_NAME_SPACE = 'LI_BAO_XU';

let events = {

};

let listener = {

};

let handler = {

};

/**
 * 给dom绑定事件, 支持自定义事件, 支持命名空间
 * 
 * @param {Element|window|Object} obj 需要绑定事件的对象
 * @param {String} type 事件类型
 * @param {Function} 事件执行的方法
 * @param {Boolean} capture 是否捕获
 * 
 * @example
 * 
 * 原生事件
 * listener.on(window, 'click', function () {})
 * 命名空间
 * listener.on(window, 'click.abc', function () {})
 * 自定义事件
 * listener.on(window, 'abc', function () {})
 * 不传elem情况
 * listener.on('header', function () {})
 */ 
listener.on = function (obj, type, func, capture) {
  // 支持传两种参数情况
  if (typeof obj === 'string' && typeof type === 'function') {
    obj = handler;
    type = obj;
    func = type;
  }
  
  /**
   * 1 产生唯一标识, 和events的key映射, 这样dom元素和evens没有对象引用关系, 防止垃圾回收失效和内存泄漏等情况
   * 2 标识设为可读, 不能随意修改
   */ 
  if (!obj.listenerFlag) Object.defineProperty(obj, 'listenerFlag', {
    value: (MAP_NAME_SPACE + Math.random()).replace('.', '')
  });
  let _flag = obj.listenerFlag;

  events[_flag] = events[_flag] || (events[_flag] = {})

  let eventList = events[_flag][type];

  // 没有队列时候, 进行绑定, 只绑定一次
  if (!eventList) {
    eventList = events[_flag][type] = [];

    // 命名空间情况: 'click.aixuexi' => 'click'
    let realType = type.split('.')[0];
    // realType可能会更改, originType 暂存一下
    let originType = realType;
    /**
     * 原生事件, 进行绑定真实事件 
     * 自定义事件, 只进入队列, 等待自定义事件触发
     */
    (
      ('on' + realType in obj)
      || (realType = getCompatibleTypes(realType))
    ) 
    && obj.addEventListener(realType, (e) => {
      // 统一源事件类型
      e.originType = originType;
      // 真实绑定的事件
      e.realType = realType;
      eventList.forEach((f) => f.call(obj, eventCompalible(e)));
    }, capture || false);

  }

  eventList.push(func);

  // 可链式调用
  return this;
};

/**
 * 解绑定
 */ 
listener.off = function (obj, type, func) {
  if (obj.listenerFlag in events) {
    let eventList = events[obj.listenerFlag][type];

    if (!eventList || !eventList.splice) return this;

    // 如果传入函数, 则只从队列中解除该事件对应的某个函数, 其他的不影响
    if (typeof func === 'function') {
      let index;
      if ((index = eventList.indexOf(func)) > -1) {
        eventList.splice(index, 1);
      }
    } else {
      // 如果只传入type, 则全部解除
      clearQueue(eventList);
    }
  }

  return this;
};

/**
 * 主动触发
 */ 
listener.trigger = function (obj, type, ...rest) {
  if (obj.listenerFlag in events) {
    let eventList = events[obj.listenerFlag][type];
    eventList && eventList.forEach && eventList.forEach((f) => f.apply(obj, rest));
  }

  return this;
};

/**
 * 只绑定一次
 */ 
listener.once = function (obj, type, func) {
  this.off(obj, type, func);
  this.on.apply(this, [...arguments]);

  return this;
};

/**
 * 清除队列信息, 但是不改变地址引用
 * @param {Array} eventList 事件队列
 */ 
function clearQueue (eventList) {

  for (let i = 0, len = eventList.length; i < len;) {
    eventList.splice(i, 1);
    len --;
  }
}

/**
 * 兼容的事件类型集合
 * @type {Object}
 */ 
const COMPATIBLE_EVENT_TYPES = {
  mousewheel: [
    {
      type: 'mousewheel',
      test: function () {
        // chrome, ie
        return 'on' + this.type in document;
      }
    }, 
    {
      type: 'DOMMouseScroll',
      // 火狐
      test: !!navigator.userAgent.match(/Firefox/i)
    }
  ]
};

/**
 * 根据不同浏览器兼容性, 获取不同的事件名称
 * 
 * @return {String | Boolean} 事件类型 或 没有该事件
 */ 
function getCompatibleTypes (type) {
  let eventList = COMPATIBLE_EVENT_TYPES[type];
  let len;
  if (eventList && (len = eventList.length) > 0) {
    for (let i = 0; i < len; i ++) {
      let item = eventList[i];
      let result;

      switch (item && item.test && item.test.constructor) {
        case Function : 
          result = item.test();
        break;

        case Boolean:
          result = item.test;
        break;
      }

      // 如果为真, 直接返回type类型, 同时跳出循环
      // 否则继续循环, 直接到循环结束, 返回没有该事件的对应
      if (result) { 
        return item.type;
      }

    }
  }
  
  // 如果没有合适的type类型, 则返回false
  return false;
}

/**
 * event对象的兼容处理
 */
const COMPATIBLE_EVENTS = {
  mousewheel: function (event) {
    event.delta = event.wheelDelta && event.wheelDelta / 120;
    return event;
  },
  DOMMouseScroll: function (event) {
    event.delta = -(event.detail || 0) / 3;
    return event;
  }
};

/**
 * 事件的兼容性处理
 */
function eventCompalible (event) {
  event = event || window.event;

  let handler = COMPATIBLE_EVENTS[event.type];
  return typeof handler === 'function' ? handler.call(COMPATIBLE_EVENTS, event) : event;
}

export default listener;

