import r from '../request'
import PublicUrls from '../public-urls'

const REST = PublicUrls.REST
const GET = PublicUrls.GET

export default {
  // 获取所有代码库列表
  getProjectList: GET('a/projects/?d', r.AUTO_LOADING),
  // 创建代码库
  createProject: REST('a/projects/{projectName}', r.AUTO_LOADING),
  // 添加收藏
  setWatchProject: REST('a/accounts/{id}/watched.projects', r.AUTO_LOADING),
  // 获取收藏列表
  getWatchProject: REST('a/accounts/self/watched.projects', r.AUTO_LOADING),
  // 取消收藏
  deleteWatchProject: REST('a/accounts/{id}/watched.projects:delete', r.AUTO_LOADING)
}