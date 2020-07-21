/**
 * 页面路由公共钩子函数处理
 * @author libaoxu@gaosiedu.com
 */

import SRC_CONFIG from 'src/config'
import utils from './utils'

let firstEntryRouter

const { noop } = utils

export default {
  init(vm, router, store, Opts) {

    if (router) {
      router.beforeEach(beforeEach)
      router.afterEach(afterEach)
    }

    function beforeEach(to, from, next) {

      if (utils.getFuncFalseResult({ func: Opts.beforeEach, context: this, args: [to, from, next]})) return false
      
      if (to.matched.length === 0) {
        if (SRC_CONFIG.ROUTE && SRC_CONFIG.ROUTE.NO_NAME_PATH) {
          location.href = SRC_CONFIG.ROUTE.NO_NAME_PATH
        }
        return 
      }

      next()
    }

    function afterEach (to, from, next) {
      const tracker = to.meta.tracker
      
      /**
       * 进入页面的统计
       */
      if (tracker instanceof Object && tracker.pad) {
        if (!firstEntryRouter) {
          firstEntryRouter = true
          // store.dispatch('TRACKER_READY', tracker)      
        } else {
          // store.dispatch('TRACKER_CHANGE', tracker)
        }
      }
    }

  }
}