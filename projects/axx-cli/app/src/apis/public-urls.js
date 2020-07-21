import r from './request'

//const URLS = '/shooter/'

const URLS = '/'

export default {
  // (mock)
  URLS: URLS

  , POST: r.getRequest(URLS, 'post')
  , PUT: r.getRequest(URLS, 'put')
  , GET: r.getRequest(URLS, 'get')
  , REST: r.getRESTful(URLS)
}
