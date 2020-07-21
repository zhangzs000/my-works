import r from '../request'
import PublicUrls from '../public-urls'

const REST = PublicUrls.REST
const GET = PublicUrls.GET

export default {
  // 获取用户信息
  getUserInfo: REST('a/accounts/self/detail', r.AUTO_LOADING),
  // 登录接口
  login: REST('publish/gerrit_login/', r.AUTO_LOADING),
  // 获取tag列表
  getTags: REST('a/projects/{projectName}/tags/', r.AUTO_LOADING),
  // 查看&权限接口
  operateAccess: REST('gerrit_ui/rpc/ProjectAdminService', r.AUTO_LOADING)
}