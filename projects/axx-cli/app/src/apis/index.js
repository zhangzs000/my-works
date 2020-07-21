/**
 * Created by zyh on 16/6/13.
 * 后端交互层，导出所有后端交互的接口
 */


import PublicUrls from './public-urls.js'

import code from './code'

let REST = PublicUrls.REST

/**
 * 返回api集合
 * import API from 'apis'
 * API.login({password:'xxx', username:'damon'})
 *  .then(ret => {console.log(ret)})
 *  .catch(err => {console.log(err)})
 * */
const apiCollection = {
  /**
   * 代码托管接口
   */
  code
}

export default apiCollection
