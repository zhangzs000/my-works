/**
 * 配置信息
 * @author libaoxu@gaosiedu.com
 * @date 2016-11-10
 */

// 测试的生产环境
const TEST_SERVICE = false;
const IS_DEV = process && process.env.NODE_ENV === 'development';

/**
 * 生产环境
 */
const PROD_CONF = {
  /**
   * 构建时资源路径
   */
  BUILD: {
    assetsPublicPath: '/'
  },

  /**
   * service请求配置
   */
  APIS: {
    //本项目: 线上访问的接口根地址
    root: '/thewolverine/',

    // 获取消息相关的接口, jsonp访问
    service: 'http://service.aixuexi.com/',

    // api访问的新接口
    api: 'http://api.aixuexi.com/',

    // 获取任务列表相关的接口
    r: 'http://r.aixuexi.com/',

    // 测试环境登录接口
    login: 'http://api.aixuexi.com/surrogates/'

    // root: '/',

    // // 获取消息相关的接口, jsonp访问
    // service: 'http://service.aixuexi.com/',

    // // api访问的新接口
    // api: 'http://api.aixuexi.com/',

    // // 获取任务列表相关的接口
    // r: 'http://r.aixuexi.com/',

    // // 测试环境登录接口
    // login: 'http://api.aixuexi.com/surrogates/',

    // // 获取用户信息
    // loginInfoRoot: 'http://wildkid1969.tunnel.2bdata.com/'
   
  },

  /**
   * 路由配置
   */
  ROUTE: {
    /*配置跨路由根路径*/
    ROUTER_PATH: '/'
  }
};

/**
 * 开发环境
 */
const DEV_CONF = {
  BUILD: {
    assetsPublicPath: '/'
  },

  /**
   * api通信
   */
  APIS: {
    /**
     * 线上访问的接口根地址
     */
    root: '/',

    /**
     * 获取消息相关的接口, jsonp访问
     */
    service: 'http://service.aixuexi.com/',

    /**
     * 配置跨域:
     */
    api: '/',

    /**
     * 获取任务列表相关的接口, 需配置跨域
     * '/userTaskList': 'r.aixuexi.com',
     * '/taskNum': 'r.aixuexi.com',
     */
    r: '/',

    /**
     * 登录相关接口, 配置跨域
     * '/surrogates/*': 'api.aixuexi.com',
     */
    login: '/',
    //loginInfoRoot: 'http://wildkid1969.tunnel.2bdata.com/',
    /*跨路由，根路径*/
    ROUTER_PATH:"/"
  },

  /**
   * 路由配置
   */
  ROUTE: {
    ROUTER_PATH:"/"
  }
};


/**
 * 配置别名
 */
const ALIAS = {
  styleLibraryLessName: 'common/styles/less-train'
}

const CONFIG = {
  ALIAS,

  PC_SCHEME: 'TRAIN',

  PROJECT_NAME: '培训中心',

  /**
   * 模拟接口
   * @type {Boolean}
   */
  IS_MOCK: false,

  /**
   * 接口代理地址
   * @type {Object}
   * Object.url: 链接地址
   * Object.host: 域名
   */
  PROXY_TABLE: {

    // 用户登录接口, 获得token
    //'/user/passwordLogin': 'surrogates.aixuexi.com',
    '/user/passwordLogin': '192.168.0.223:8027',

    // 任务相关
    '/userTaskList': 'r.aixuexi.com',
    '/taskNum': 'r.aixuexi.com',
    '/taskConcreteCon': 'r.aixuexi.com',
    '/singleTask': 'r.aixuexi.com',
    // 白名单
    // '/headmaster/whiteList': 'px.aixuexi.com',
    '/godfather/*': 'r.aixuexi.com',
    
    // 用户信息
    //'/user/loginInfo': 'zootropolis.aixuexi.com',
    '/user/loginInfo': '192.168.0.223:8029',
    //'/user/loginInfo':'3aa4f26b.ngrok.io',

    // 学校管理相关接口代理
    //'/api/*': 'theWolverine.aixuexi.com'
    //  '/course/*': 'theWolverine.aixuexi.com',
    //  '/subjectProduct/*': 'theWolverine.aixuexi.com',
    //  '/courseUser/*': 'theWolverine.aixuexi.com',
    //  '/role/*': 'theWolverine.aixuexi.com',
    //  '/user/*': 'theWolverine.aixuexi.com'
    
    // '/course/*': '172.16.6.166:8026',
    
    '/course/*': '192.168.0.223:8029',
    '/subjectProduct/*': '192.168.0.223:8029',
    '/courseUser/*': '192.168.0.223:8029',
    '/role/*': '192.168.0.223:8029',
    '/user/*': '192.168.0.223:8029',
    '/homework/*': '192.168.0.223:8029',
    '/qiniu/*': '192.168.0.223:8029',
    '/courserUser/*': '192.168.0.223:8029',
    '/courserUser/*': '192.168.0.223:8029', 

    // '/course/*': '3aa4f26b.ngrok.io',
    // '/subjectProduct/*': '3aa4f26b.ngrok.io',
    // '/courseUser/*': '3aa4f26b.ngrok.io',
    // '/role/*': '3aa4f26b.ngrok.io',
    // '/user/*': '3aa4f26b.ngrok.io',
    // '/homework/*': '3aa4f26b.ngrok.io',
    // '/qiniu/*': '3aa4f26b.ngrok.io',
    // '/courserUser/*': '3aa4f26b.ngrok.io',
    // '/courserUser/*': '3aa4f26b.ngrok.io',

    // 二期
    // '/course/*': '172.16.6.166:8029', 
  },  

  TEST_SERVICE,

  /**
   * 生产环境接口请求根域
   * @type {Object}
   */
  PROD: PROD_CONF.APIS,

  /**
   * 开发环境接口映射地址
   * @type {Object}
   */
  DEV: DEV_CONF.APIS,
  
  REQ_TYPE: {
    POST: 'post',
    GET: 'get',
    JSONP: 'jsonp',
    DELETE: 'delete',
    HEAD: 'head',
    PUT: 'put',
    PATCH: 'patch'
  },
  //LOGOUT_PAGE: '/paper/logout',
  //LOGOUT_PAGE: false,
  LOGOUT_PAGE: 'http://www.aixuexi.com/logout',
  //LOGOUT_PAGE: 'http://www.aixuexi.com/login',

  /**
   * 测评页面
   */
  FRONT_PAPGE: '/',

  /**
   * 首页
   */
  HOME_PAGE: 'http://i.aixuexi.com/',

  /**
   * 是否获取登录信息
   */
  IS_GET_LOGIN_INFO: true,
  // IS_GET_LOGIN_INFO: false,

  /**
   * 开发监听端口
   * 教师端: 8080
   * 校长端: 8081
   * pc端(测评): 8082
   * 学校管理(pc): 8083
   * 培训中心(pc): 8084
   * @type {Number}
   */
  PORT: 8084,

  OLD_ORG_CENTER_ROOT: 'http://xuexia0.aixuexi.com/'
};

module.exports = Object.assign(CONFIG, IS_DEV ? DEV_CONF : PROD_CONF);