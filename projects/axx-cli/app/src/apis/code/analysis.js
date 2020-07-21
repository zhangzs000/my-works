import r from '../request'
import PublicUrls from '../public-urls'

const REST = PublicUrls.REST
const GET = PublicUrls.GET

export default {
  // 获取分支列表
  getCodeInfo: REST('a/changes/', r.AUTO_LOADING),
  // 获取排行
  getCodeRank: REST('publish/getCodeRank/', r.AUTO_LOADING),
  // 获取统计图表
  getCodeCount: REST('publish/getCodeCount/', r.AUTO_LOADING),
}