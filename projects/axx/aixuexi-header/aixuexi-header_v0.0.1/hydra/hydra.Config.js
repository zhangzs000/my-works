(function(){

	Gaosi.config = {
		/**
		 * 输出日志
		 * @type {boolean}
		 */ 
		logger: true,
		/**
		 * 链接
		 * @type {Object}
		 */ 
		LINK: {
			LINK_MAP : {
			  xiaozhang: {
			    name: '校长首页',
			    link: 'http://xz.aixuexi.com',
			    menuKey: 'xzsy'
			  },
			  bk: {
			    name: '备课',
			    link: 'http://bk.aixuexi.com',
			    menuKey: 'bk'
			  },
			  sk: {
			    name: '授课',
			    link: 'http://ke.aixuexi.com',
			    menuKey: 'sk',
			  },
			  train: {
			    name: '培训直播',
			    menuKey: 'tr',
			    link: 'http://px.aixuexi.com'
			  },
			  frontTest: {
			    name: '测评中心',
			    menuKey: 'cp',
			    link: 'http://front.aixuexi.com',
			    // 链接是入学测评的, 
			    linkKey: 'rxcp'
			  },
			  shangcheng: {
			    name: '在线商城',
			    link: 'http://mall.aixuexi.com',
			    menuKey: 'zxsc'
			  },
			  xuexiao: {
			    name: '学校管理',
			    link: 'http://xuexiao.aixuexi.com',
			    menuKey: 'bm'
			  },
			  gaosibei: {
			    name: '高斯杯',
			    link: 'http://gaosibei.aixuexi.com',
			    menuKey: ['gaosibei', 'rxcp'],
			    // 需要权限控制
			    hideRoles: /^teacher/
			  }
			}
		},

	};
	let _config = window.GAOSICONFIG || {};
	Object.assign(Gaosi.config, _config);	
})();