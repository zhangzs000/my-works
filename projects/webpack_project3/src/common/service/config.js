export default {
  /**
   * 请求类型
   * @type {Object}
   */
  REQ_TYPE: {
    POST: 'post',
    GET: 'get',
    JSONP: 'jsonp',
    DELETE: 'delete',
    HEAD: 'head',
    PUT: 'put',
    PATCH: 'patch'
  },

  /**
   * 两个参数的请求数组
   */
  SHORT_PARAMS_LIST: ['get', 'head', 'delete', 'jsonp']
}