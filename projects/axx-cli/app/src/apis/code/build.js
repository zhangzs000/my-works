import r from '../request'
import PublicUrls from '../public-urls'

const REST = PublicUrls.REST
const GET = PublicUrls.GET

export default {
  // 提交编译
  sendBuild: REST('publish/build/', r.AUTO_LOADING),
  // 提交发布
  sendPublish: REST('publish/fabu/', r.AUTO_LOADING),
  // 撤销发布
  sendRevoke: REST('publish/chexiao/', r.AUTO_LOADING),
  // 同步回主干
  sendMerge: REST('publish/merge/', r.AUTO_LOADING),
  // 送测
  sendTest: REST('publish/sendmailtoqa/', r.AUTO_LOADING),
  // 查询编译结果
  checkBuild: REST('publish/build_result/', r.AUTO_LOADING)
}