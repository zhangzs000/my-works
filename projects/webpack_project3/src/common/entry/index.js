/**
 * npm run dev 入口的主文件
 * @author libaoxu@gaosiedu.com
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

// import Directives from 'directives/index.js'
import Toast from 'service/comp/toast'
// import PageUp from 'components/PageUp'
// import VueLazyload from 'vue-lazyload'
// import Tracker from 'common/modules/tracker'
import S from 'service'
import NAPI from 'nadaptor'

import SRC_CONFIG from 'src/config'

import utils from './utils'
import VueProtoMix from './VueProtoMix'
import actions from './actions'
import enRouter from './enRouter'
// 基础样式
import 'commonStyleLess/base.less'
// console.log('commonStyleLess: ',commonStyleLess)
let router
let store

// 如果是生产环境, 有些开发人员预留的页面,不能展示, 跳转到首页
if (__prodHide__ && process.env.NODE_ENV === 'production') {
  console.error('首次加载循环跳转');
  location.href = '//www.aixuexi.com'
}

// 设置为true, 开启浏览器调试
// Vue.config.devtools = true

// webpack-base-config 中变为 externals, 已经变为全局
// Vue.use(VueResource)
// Vue.use(VueRouter)
// Vue.use(Vuex)
// Vue.use(VueLazyload)
// Directives.init(Vue)

VueProtoMix(Vue)

/**
 * LOGIN_PAGE 登录链接
 * @param {String}
 */
const LOGOUT_PAGE = SRC_CONFIG.LOGOUT_PAGE

const ERR_MSG = '用户登录信息获取失败'

const { noop, getInstanceByOptions, getFuncFalseResult } = utils

const toast = new Toast()

/**
 * 路由默认配置
 */
const RouteConfig = {
  mode: 'hash',
  base: __dirname
}

const DEFAULT_OPTS = {
  apis: {},
  RouteConfig: null,
  store: null,
  beforeInstance: noop,
  afterInstance: noop
}

actions.loginPromise.then(function (data) {
  NAPI.user.set(data)

  // NAPI.listener.trigger(window, 'login.header', NAPI.user.get(), 'memory')
},  (e) => {
  if (LOGOUT_PAGE) {
    location.href = LOGOUT_PAGE+`?loginBackUrl=${location.href}`
    toast.destroy()
  }

  toast.show(e || ERR_MSG)
})

/**
 * @param {Object} App
 */
export default (App, Prepares, Opts) => {
  Opts = Object.assign(DEFAULT_OPTS, Opts)

  if (Prepares != null && typeof Prepares === 'object') {
    if (getFuncFalseResult({ func: Prepares.setLocation })) return false
  }

  return actions.loginPromise.then(data => {

    if (getFuncFalseResult({ func: Opts.beforeInstance, args: [data] })) return false
    
    S.extend(Opts.apis)

    // 3. 创建 router 实例，然后传 `routes` 配置
    // 你还可以传别的配置参数, 不过先这么简单着吧。
    // 3.1 可能直接传过来就是 VueRouter实例情况, 直接赋值
    // 3.2 值尽量不要为 undefined 或 false 为 null更好
    router = getInstanceByOptions(Opts.RouteConfig, VueRouter, RouteConfig)
    store = getInstanceByOptions(Opts.store, Vuex.Store)
    
    // vue 实例
    window.__vm__ = new Vue({
      el: '#app',
      // components: { App, PageUp, Tracker, VueLazyload },
      components: { App },
      store,
      router,
      render(h) {
        // render 支持大写, 但是vue-devtool 对小写和中杠比较友好
        return (
          <div>
            <app></app>
            <tracker></tracker>
          </div>
        )
      }
    })

    Opts.afterInstance(data)

  /**
   * 引入项目公共头部
   */
  // let Legend = window.Legend
    
  // let legend = new Legend(Object.assign(SRC_CONFIG.LEGEND_CONFIG, {
  //   globalBar: {
  //     isShow: __globalBarHide__ ? false : true
  //   }
  // })) 

  // __checkLogin__ && legend.trigger('start') 

    enRouter.init(__vm__, router, store, Opts)
    return Promise.resolve({
      args: [...arguments],
      router,
      vm: window.__vm__
    })
  }, (e) => {
    if (__redirect__) {
      typeof __redirect__ === 'function'
        ? __redirect__()
        : (location.href = __redirect__)
      return 
    }

    if (LOGOUT_PAGE) {
      location.href = LOGOUT_PAGE+`?loginBackUrl=${location.href}`
      toast.destroy()
    }

    toast.show(e || ERR_MSG)
  })
}
