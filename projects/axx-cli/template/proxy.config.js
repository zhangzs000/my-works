
module.exports = [
  {
    host: 'localhost:8080',
    //url: '/shooter/*'
    url: '/publish/*'
  },
  {
    host: 'guanli.aixuexi.com',
    //url: '/shooter/*'
    url: '/chinatown/*'
  },
  {
    host: 'guanli.aixuexi.com',
    url: '/shooter/*'
  },
  {
    host: '192.168.0.21:8080', //板块 获取 广告类型
    url: '/notice/*'
  },
  {
    host: '192.168.3.68:8080', //板块 获取 广告类型
    url: '/garden/*'
  },

  //艺河**********************************************
  {
    host: '192.168.3.178:8080', //报名管理
    url: '/registration/*'
  },
  {
    host: '192.168.3.178:8080', //课程列表
    url: '/mallCourse/*'
  },
  {
    host: '192.168.3.178:8080', //七牛
    url: '/qiniu/*'
  },
  //家栋哥********************************************
  //{
  //  host: '192.168.3.182:8001', //报名管理
  //  url: '/registration/*'
  //},
  //{
  //  host: '192.168.3.182:8001', //课程列表
  //  url: '/mallCourse/*'
  //},
  //{
  //  host: '192.168.3.182:8001', //七牛
  //  url: '/qiniu/*'
  //},
  //{
  //  host: '192.168.3.182:8001', //七牛
  //  url: '/js/*'
  //},
  // {
  //   host: '192.168.3.125:8080', //作业批改
  //   url: '/normandyLand/*'
  // },
  {
    host: '192.168.3.149:8080', //作业批改
    url: '/normandyLand/*'
  },
  {
    host: '192.168.3.149:8180', //基础数据
    url: '/shooter/*'
  },
  {
    host: '192.168.0.162:8080', //权限&导航
    url: '/margincall/*'
  },
  {
    host: '192.168.3.181:8080', //权限&导航
    url: '/permission/*'
  },
  {
    host: '192.168.3.181:8080', //博斌
    url: '/authority/*'
  },
  {
    host: '192.168.3.181:8080', //登录博斌
    url: '/why/*'
  },
]
