import r from '../request'
import PublicUrls from '../public-urls'

const REST = PublicUrls.REST
const GET = PublicUrls.GET

export default {
  // 获取评审列表
  getReviewList: REST('a/changes/?o=DETAILED_ACCOUNTS', r.AUTO_LOADING)
}