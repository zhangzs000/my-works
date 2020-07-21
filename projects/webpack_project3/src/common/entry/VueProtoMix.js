/**
 * Vue.prototype 原型上的混合
 * @author libaoxu@gaosiedu.com
 */

import { common } from 'utils'
import loading from 'components/loading'
// import PcToast from 'service/comp/toast'
import tracker from 'utils/tracker'
import { Message, Loading, Notification } from 'element-ui'
// import { Indicator, Toast } from 'mint-ui'
import NAPI from 'nadaptor'

/**
 * 因为babel解析问题, 这里得暂存一下, 原因待定
 * @type {Function} _Message
 */
const _Message = Message
const _MessageBox = NAPI.ui.MessageBox
const _Notification = Notification

// const _Indicator = Indicator
// const _Toast = Toast

/**
 * 将一些公用方法, 放到Vue.prototype下, 这样在methods参数中可以通过this调用
 * @param Vue Vue方法对象
 */
export default function VueProtoMix(Vue) {
  
  Object.defineProperties(Vue.prototype, {
    $common: {
      get () {
        return common
      }
    },

    /**
     * 全局通用loading
     * @return {Object}
     * this.$loading.show() loading展现
     * this.$loading.close() 关闭
     */ 
    $loading: {
      value: loading
    },

    /**
     * 统计功能
     */
    $tracker: {
      value: tracker
    }
  })

  Vue.use(Loading.directive)

  // Vue.prototype.$loading = Loading.service

  /* element-ui */
  Vue.prototype.$notify = _Notification
  Vue.prototype.$message = _Message

  /* mint 相关 */
  // Vue.prototype.$toast = _Toast
  // Vue.prototype.$toast.show = _Toast
  Vue.prototype.$messagebox = _MessageBox
  // Vue.prototype.$indicator = _Indicator

  /* NAPI.ui.MessageBox 根据移动端和 pc 端选择合适组件*/
  Vue.prototype.$msgbox = _MessageBox
  Vue.prototype.$alert = _MessageBox.alert
  Vue.prototype.$confirm = _MessageBox.confirm
  Vue.prototype.$prompt = _MessageBox.prompt
}