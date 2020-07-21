
import cookies from 'utils/cookies';

const TOKEN_KEY = 'token';

let userInfoMock =  {
  'institutionId': 25,
  'insId': 25,
  'insName': '前端测试',
  'menu': {
    'gaosibei': 1,
    'tr': 1,
    'qzqmcp': 1,
    'zxsc': 1,
    'rxcp': 1,
    'xzsy': 1,
    'sk': 1,
    'bk': 1,
    'bm': 1,
    'cp': 1,
  },
  'roles': ['teacher', 'admin','manage'],
  'telephone': '18700000011',
  'userId': 28,
  'id': 28,
  'username': '<a href="http://www.aixuexi.com/">登录爱学习</a>',
  'name': 'Gucci',
  // 0 普通机构，1 双师权限的普通机构(听课机构) ，2 可以创建主讲双师机构
  /*
    
  */
  'doubleTeacherStatus': 2
};

let userInfo = {}

export default {

  set (info) {
    if (info && typeof info === 'object') return Object.assign(userInfo, info);
  },

  user () {
    return this.get();
  },

  get () {
    return userInfo;
  },

  getToken () {
    return cookies.getItem(TOKEN_KEY) || '';
  },

  setToken (val, time) {
    return cookies.setItem(TOKEN_KEY, ...arguments);
  },

  getMock() {
    return userInfoMock
  }

};