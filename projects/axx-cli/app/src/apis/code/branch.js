import r from '../request'
import PublicUrls from '../public-urls'

const REST = PublicUrls.REST
const GET = PublicUrls.GET

export default {
  // 获取分支列表
  getBranchList: REST('publish/getall_branch/', r.AUTO_LOADING),
  // 新建分支
  createBranch: REST('publish/create_branch/', r.AUTO_LOADING),
  // 删除
  deleteBranch: REST('publish/delete_branch/', r.AUTO_LOADING),
  // 获取一个分支状态
  getAnBranchStatus: REST('publish/getAnBranchStatus/', r.AUTO_LOADING)
}