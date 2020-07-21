/**
 * Created by zyh on 16/6/13.
 * 后端交互层，导出所有后端交互的接口
 */

import r from './request'
const URLS = '/'
const POST = r.getRequest(URLS, 'post')
const PUT = r.getRequest(URLS, 'put')
const GET = r.getRequest(URLS, 'get')
const REST = r.getRESTful(URLS)

/**
 * 返回api集合
 * import API from 'apis'
 * API.login({password:'xxx', username:'damon'})
 *  .then(ret => {console.log(ret)})
 *  .catch(err => {console.log(err)})
 * */
const apiCollection = {
  adv: {
    delete: REST ('section{/id}', r.AUTO_LOADING ),
    addedOrSoldOut: REST ('section{/id}', r.AUTO_LOADING ),
  },
}

export default apiCollection
