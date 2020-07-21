/**
 * 全局通用loading
 * @return {Object}
 * $loading.show(); loading展现
 * $loading.close(); 关闭
 */ 

import { Loading } from 'element-ui';

let loadingInstance;

export default {
  /**
   * loading展现
   * 
   * @param {Object} options 显示文案
   * options.target	Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点	object/string	—	document.body
   * options.body	同 Loading 指令中的 body 修饰符	boolean	—	false
   * options.fullscreen	同 Loading 指令中的 fullscreen 修饰符	boolean	—	true
   * options.lock	同 Loading 指令中的 lock 修饰符	boolean	—	false
   * options.text	显示在加载图标下方的加载文案	string	—	—
   * options.customClass	Loading 的自定义类名	string	—	—
   * 
   * @param {String} options 显示文案
   * 
   * @return {Class} loading的单例对象
   * 
   * @example http://element.eleme.io/#/zh-CN/component/loading
   */ 
  show (options) {
    options = typeof options === 'string'
      ? {
        text: options
      } : options;

    if (!loadingInstance) {
      return loadingInstance = Loading.service(options);
    }

    return Object.assign(loadingInstance, options);
  },

  close () {
    loadingInstance.close();
    loadingInstance = null;
    return this;
  }
};