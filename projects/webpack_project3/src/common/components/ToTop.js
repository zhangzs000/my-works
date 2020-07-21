// import _debounce from 'lodash/debounce'
import { common } from 'utils'

const DEFUALT = {
  text: '返回顶部'
}

const oCss = {
  el: `
    display: none;
    position: fixed;
    z-index: 9999;
    bottom: 40px;
    right: 30px;
    height: 50px;
    width: 50px;
    cursor: pointer;
  `,

  text: `
    display: none;
    background-color: #89ba28;
    font-size: 16px;
    color: #fff;
    width: 100%;
    height: 100%;
    line-height: 1.3;
    letter-spacing: 2px;
    box-sizing: border-box;
    /* padding: 5px; */
    text-indent: 0px;
    /* text-align: justify; */
    padding-left: 8px;
    padding-top: 5px;
  `,

  logoWraper: `
    display: block;
    opacity: 0.7;
    background-color: rgb(0, 0, 0);
    height: 100%;
    position: relative;
  `,

  logo: `
    width: 20px;
    height: 20px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: bottom;
    -moz-transform-origin: bottom;
    -o-transform-origin: bottom;
    -ms-transform-origin: bottom;
    transform-origin: bottom;
    border-left: 2px solid #fff;
    border-top: 2px solid #fff;
    position: absolute;
    left: 7px;
    top: 16px;
  `
}

const getTemplate = function (obj, oCss) {
  return `
    <div data-node="text" style="${oCss.text}">${obj.text}</div>
    <div data-node="logoWraper" style="${oCss.logoWraper}">
      <span class="logo" style="${oCss.logo}"></span>
    </div>
  `
}

const getScrollTop = function () {
  let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
  return scrollTop = typeof scrollTop === 'number' ? scrollTop : +scrollTop.replace('px', '')
}

const setScrollTop = function (num) {
  let target = num === 0 ? num : (num + 'px')
  // alert(target)
  let tid = setTimeout(function () {
    let nowTop = getScrollTop()
    if (nowTop !== target) {
      setScrollTop(target)
    } else {
      clearTimeout(tid)
    }
  })
  document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = target 
} 

let __instance__ = false

/**
 * 节流函数 
 * @param {Function} func 回调函数
 * @param {Number} wait 等待时间
 * @param {Object} options 配置参数
 * @property options.leading false: 如果你想禁用第一次首先执行的
 * @property options.trailing false: 你想禁用最后一次执行的话
 */
export const throttle = function (func, wait, options = {}) {
    let timeout
    let context
    let args
    let result
    let previous = 0;
    if (!options) options = {};

    const later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    const throttled = function() {
      let now = Date.now();
      if (!previous && options.leading === false) previous = now;
      let remaining = wait - (now - previous);
      // console.log('remaining: ', remaining, 'now: ', now, 'previous: ', previous, remaining > wait)
      context = this;
      args = arguments;
      // remaining > wait 防止用户修改系统时间
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          // console.log('clear timeout')
          clearTimeout(timeout);
          timeout = null;
        }
        // console.log('remaining <=0 || remaining > wait')
        // 进来之后 previous 才被赋值, 保证第一次执行成功
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) { // !timeout, 保证上一次later执行完的 标识
        // console.log('!timeout: ', timeout)
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
}

/**
 * 防抖函数: 
 * @param {Function} func 逻辑函数
 * @param {Number} wait 间隔时间
 * @param {Boolean} immediate 是否立即执行
 */
export const debounce = function (func, wait, immediate) {
  let timeout
  let args
  let context
  let timestamp
  let result

  const later = function () {
    // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    let last = Date.now() - timestamp

    // console.log('last: ', last, 'last - wait: ',  last - wait)
    if (last < wait) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }

  }

  const debounced = function () {
    context = this
    args = arguments
    timestamp = Date.now()
    // 第一次调用该方法时，且immediate为true，则调用func函数
    let callNow = immediate && !timeout
    // console.log('timestamp: ', timestamp, 'timeout: ', timeout)
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}


class ToTop {

  constructor (opts) {
    if (__instance__) {
      return this
    }

    __instance__ = true

    this.el = null
    this.refs = {
      text: null,
      logoWraper: null
    }

    this.options = Object.assign(DEFUALT, opts)

    this.createDom()
    .css()
    .bindEvents()
    .render()
  }

  createDom () {
    this.el = document.createElement('div')
    this.el.innerHTML = getTemplate(this.options, oCss)

    this.refs.text = this.el.querySelector('[data-node="text"]')
    this.refs.logoWraper = this.el.querySelector('[data-node="logoWraper"]')

    return this
  }

  css () {
    this.el.style.cssText = oCss.el

    return this
  }

  scrollThrottled () {
    return throttle((e) => {
      // console.log('func....', getScrollTop())
      if (getScrollTop() > 100) {
        this.el.style.display = 'block'
      } else {
        this.el.style.display = 'none'
      }
    }, 300)
  }

  clickHandle (e) {
    setScrollTop(0)
  }

  mouseEnterHandle (e) {
    this.refs.text.style.display = 'block'
    this.refs.logoWraper.style.display = 'none'
  }

  mouseLeaveHandle (e) {
    this.refs.text.style.display = 'none'
    this.refs.logoWraper.style.display = 'block'
  }

  bindEvents () {
    window.addEventListener('scroll', this.scrollThrottled.bind(this)())

    this.el.addEventListener('click', this.clickHandle.bind(this))

    if (common.isPc) {
      this.el.addEventListener('mouseover', this.mouseEnterHandle.bind(this))
      this.el.addEventListener('mouseout', this.mouseLeaveHandle.bind(this))
    }

    return this
  }

  render () {
    document.body.appendChild(this.el)   

    return this
  }

}

export default ToTop