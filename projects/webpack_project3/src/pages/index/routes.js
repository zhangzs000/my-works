export default [
  { 
    path: '/', 
    redirect: '/mycourse'
  },
  { 
    path: '/mycourse', 
    name: 'mycourse', 
    meta: {
      activeNav: 'mycourse',
      title: '我的课程',
      tracker: {
        pad: 'aw603'
      }
    }, 
    component: resolve => require(['./mycourse'], resolve)
  },
  { 
    path: '/mycourse/detail', 
    name: 'mycourse/detail', 
    meta: {
      activeNav: 'mycourse',
      title: '我的课程-详情',
      tracker: {
        pad: 'aw604'
      }
    }, 
    component: resolve => require(['./mycourse/detail'], resolve)
  },
  { 
    path: '/manage', 
    name: 'manage', 
    meta: {
      activeNav: 'manage',
      title: '培训管理',
      tracker: {
        pad: 'aw607'
      }
    }, 
    component: resolve => require(['./manage'], resolve)
  },
];