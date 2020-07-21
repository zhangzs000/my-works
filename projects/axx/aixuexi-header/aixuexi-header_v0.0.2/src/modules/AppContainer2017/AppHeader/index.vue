<!--
  头部
  @author libaoxu@gaosiedu.com 2016-12-15
-->
<template>
  <div class="new-header-wrap">
    <div class="header-bg" :class="{'logoNavShadow': !isShowNav}" :style="{'min-width':appHeaderWidth+'px'}" >
      <!-- 头部容器 -->
      <div class="header-container clearfix" :style="{'width':appHeaderWidth+'px'}">
        <!--2017 头部的logo-->
        <a class="header-left-logo" href="http://xuexia0.aixuexi.com/"></a>
        <div class="header-left-list" ref = "headerLeftList">
          <!-- 服务端的数据 该菜单为1的时候, 有权限, 能看到; active-noNav:如果没有二级导航-->     
          <div class="part" v-for="(item, key, index) in isInMenusPrivilege">
            <!-- linkKey 限制链接 -->
            <span class="part-item">
              <a :class="{'active': key === activeHeader && isShowNav,'active-noNav': key === activeHeader && !isShowNav }" 
                :href="
                  (item.link || 'javascript: void(0)')
                "
              >{{ item.name }}</a>
                <!-- 二级导航部分-->  
                  <div v-if="key === activeHeader && isShowNav" class="nav-content-list clearfix" :style="{'left':activeHeaderLeft+'px'}" ref="navTabs">
                    <div 
                      class="item" 
                      v-for="(val, key) in navMap"
                      v-if="hasPrivilege(val) && isInMenusPrivilegeNav(val.menuKey)"
                    >
                      <a class="link" 
                        :target="val.target || '_self'" 
                        :href="val.link || 'javascript:void(0)'"
                        :class="{
                          'nav-active': key === activeNav,
                          [val.className]: val.className,
                          [val.tracker && val.tracker.className]: val.tracker && val.className
                        }"
                        :data-pad="val.tracker && val.tracker.pad"
                        @click="gsBarStylefn(1)"
                        >
                        <span>{{ val.name }}</span>
                        <img v-if="val.isShowTip"style="width:36px;height:28px;position:absolute;right:-36px;top:-8px" src="../images/header/2017/bikan.png">
                      </a>
                    </div>
                  <div class="active-bar" :style="gsBarStyle"></div>
                </div>
             </span>
            
          </div>
        </div>

        <!-- 右侧 -->
        <ul class="header-right">
          <!-- 用户 -->
          <li class="part user">
            <span class="text"><b class="text-username" v-html="user.username"></b></span>
            <span id="text-userId" style="display: none" v-html="user.userId"></span>
            <ul class="user-oparate">
              <li class="item pass" >
                <a href="http://i.aixuexi.com/modifyPwd/toModifyPwd">修改密码</a>
              </li>
              <li class="item logout">
                <a href="javascript:void(0)" @click="logout()">退出</a>
              </li>
            </ul>
          </li>
          <!--帮助-->
          <li class="part help">
            <a class="text" href="http://help.aixuexi.com" :class="{'help-ac':isActiveHelp}">帮助</a>
          </li>

          <!-- 任务 -->
            
          <!--@click="headerListClick($event, task)"-->
        
          <li class="part task"
            :class="{'active': task.isActive}"
            v-clickoutside="handlerClose"
            v-if="activeHeader !== 'sk' && task.num > 0"
          >
            <div class="text-wraper">
              <span class="text">任务
                <i class="mini-num-tast" v-if="task.num > 0">{{ task.num }}</i>  
              </span>
            </div>

            <div class="click-block tast-list">
              <!-- 任务列表 -->
              <task :task-data="task.data"
                @update-task-status="updateTaskStatus"></task>
            </div>
          </li>
          <!-- 消息 -->
          <li class="part message"
            :class="{'active': message.isActive}"
            @click="headerListClick($event, message)"
            v-clickoutside="handlerClose"
          >
            <div class="text-wraper">
              <span class="text"></span> 
              <i class="mini-num" v-if="message.num > 0">{{ message.num }}</i>
            </div> 
            <div class="click-block message-list">
              <message :message-data="message.data"
                @load-more="messageLoadMore"
              ></message>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="logo-nav-conatiner" :style="{'min-width':appHeaderWidth+'px'}" v-if="isShowNav"></div>
  </div>
</template>

<script>

import NAPI from 'nadaptor';
import S from 'service';

import task from './task';
import message from './message';
/**
 * 事件集合
 * @type {Object}
 */ 
const events = {
  BODY_CLICK: 'BODY_CLICK'
};

/**
 * 链接
 * @type {Object}
 */ 
const LINK_MAP = {
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
};
/**
 * 个人中心的一些需要操作的
 * @type {Object}
 */ 
const USER_OPERATE = {
  pass: {
    link: 'http://i.aixuexi.com/modifyPwd/toModifyPwd',
    text: '修改密码'
  },
  logout: {
    link: 'http://www.aixuexi.com/logout',
    text: '退出'
  }
};

const PROMISE_List = [];

/**
 * 初始化sevice 该请求的接口
 * @type {Object}
 */ 
const INIT_SERVICE_MAP = {
  // 任务数量的get和set
  taskNum: {
    // GET: 'getTaskNum',
    // SET: 'setTaskNum'
  },
  // 消息数量的get 和  set
  messageNum: {
    GET: 'getMessageNum',
    SET: 'setMessageNum'
  },
};

/**
 * 任务service请求GET SET 对应的方法名
 * @type {Object} 
 */ 
const TASK_SERVICE = {
  GET: 'getTaskList',
  SET: 'setTaskList'
};

/**
 * 消息请求
 */ 
const MESSAGE_SERVICE = {
  GET: 'getMessages',
  SET: 'setMessages'
};

/**
 * 更新任务
 */ 
const UPDATE_TASK = {
  GET: 'getUpdateTaskStatus',
  SET: 'setUpdateTaskStatus'
};

/**
 * 单个任务的请求
 */ 
const UPDATE_SINGAL_TASK = {
  GET: 'getUpdateSingalTask',
  SET: 'setUpdateSingalTask'
};

export default {
  
  props: {

    /**
     * 头部当前高亮链接的信息, 上面LINK_MAP中定义了
     * key: bk
     * key: frontTest
     * ...
     */ 
    activeHeader: {
      type: String,
      default: 'frontTest'
    },
    appHeaderWidth: {
      type: Number,
      default: 1200
    },
    isShowNav: {
      type: Boolean,
      default: true
    },
    /**
     * 高亮导航
     */ 
    activeNav: {
      type: String,
      default: 'termTest'
    },
    /**
     * logo标题
     */
    logoTitle: {
      type: String,
      default: '系统'
    },

    navMap: {
      type: Object
    },
  },
  
  components: {
    message,
    task
  },

  data () {
    return {
      /**
       * 导航列表
       */ 
      linkMap: LINK_MAP,

      /**
       * 个人中心相关操作
       */ 
      userOperate: USER_OPERATE,

      /**
       * 任务中心
       */ 
      task: {
        // 类型
        type: 'task',
        // service请求集合
        service: TASK_SERVICE,
        // 任务数量
        num: 0,
        // 是否展开
        isActive: false,
        // 得到数据给子组件
        data: {},
        // 单例用的
        _instance: false
      },

      /**
       * 消息中心
       */ 
      message: {
        type: 'messge',
        service: MESSAGE_SERVICE,
        // 任务数量
        num: 0,
        // 是否点击
        isActive: false,
        data: {},
        _instance: false
      },

      previousObj: {
        isActive: false
      },
      /**
      * 二级导航
      */
      gs_tabs: '',
      /**
      * 二级条样式
      */
      gsBarStyle: '',
      /**
      * 头部列表
      */
      gs_header: '',
      /**
      * 头部列表高亮索引
      */
      activeIndex: 0,
      /**
      * 头部列表高亮宽度
      */
      activeHeaderWidth:0,
      /**
      * 帮助中心高亮
      */
      isActiveHelp: false,
      
    };
  },

  computed: {
    // 二级导航偏移量
    activeHeaderLeft () {
      if(!this.gs_tabs || !this.gs_header) return false;
      let offset = 15;
      let navWidth = 0;
      const LENGTH = 30;
      let headerOffsetLeft = 0;
      let tabOffsetLeft = 0;
      let activeHeaderOffset = 0;
      Array.from(this.gs_tabs).forEach((tab, index) => {
          let $el = this.gs_tabs[index];
          if (!$el) { return false; }
          navWidth += $el.clientWidth+LENGTH;
      });
      Array.from(this.gs_header).every((headerItem, index) => {
          let $el = this.gs_header[index];
          if (!$el) { return false; }
          if (headerItem.className.indexOf('active') >= 0) {
            return false;
          } else {
            activeHeaderOffset = $el.clientWidth + activeHeaderOffset;
            return true;
          }
      });
      headerOffsetLeft = this.$refs.headerLeftList.getBoundingClientRect().left;
      tabOffsetLeft = this.$refs.navTabs[0].getBoundingClientRect().left + (this.activeHeaderWidth/2);
      if(headerOffsetLeft > tabOffsetLeft) {
        return -activeHeaderOffset;
      } else {
        return Math.round(this.activeHeaderWidth/2-navWidth/2);
      }
    },
    /**
     * 菜单列表权限
     */ 
    menuPrivilege () {
      return NAPI.user.get().menu;
    },

    roles () {
      return NAPI.user.get().roles;
    },

    name () {
      return 123;
    },

 /**
     * 用户信息
     */ 
    user () {
      return NAPI.user.get();
    },
    isInMenusPrivilege () {
      let _linkMap = {}; 
      this.linkMap.forEach((item, key) => {
        switch (item.menuKey.constructor) {

          case String:
            if (this.menuPrivilege[item.menuKey] === 1) {
              _linkMap[key] = this.linkMap[key];
            }
        
          case Array:
            if (this.$common.isArrayInObject({arr: item.menuKey, obj: this.menuPrivilege, value: 1})) {
              _linkMap[key] = this.linkMap[key];
            }
        }
      })
      return _linkMap;
    },
    
  },

  methods: {
    logout() {
      // 校长首页广告弹出
      this.$emit('removeStorage', true);
      window.location.href="http://www.aixuexi.com/logout";
    },
    isInMenusPrivilegeNav(key) {
      return !key || this.menuPrivilege[key] === 1;
    },
    // 二级导航部分权限判断
    hasPrivilege (val) {
      if (val.hasPrivilege != null) {
        return typeof val.hasPrivilege === 'function' ? val.hasPrivilege(this) : val.hasPrivilege
      } 
      return true
    },
    isHideRoles (val) {
      return !val.hideRoles || !(this.$common.isAnyMatchArray(val.hideRoles, this.roles));
    },

    setLinkList () {
      
    },

    headerListClick (e, current) {
      e.stopPropagation();
    
      this.handlerHeaderData(current);

      if (current === this.previousObj) {
        if (current.isActive) return false;
          current.isActive = true;
      } else {
        current.isActive = true;

        // 地址引用, 上一次的current 也为false
        this.previousObj.isActive = false;
        this.previousObj = current;
      }
      
    },

    handlerHeaderData (current) {

      if (!current._instance) {
        current._instance = true;

        this.invokingService(current.service);
      }

    },
    // 事件绑定两次, 所有会重复执行两次
    handlerClose(e) {
      this.previousObj.isActive = false;
    },

    initService () {
     
      Object.keys(INIT_SERVICE_MAP).forEach(item => {
        this.invokingService(INIT_SERVICE_MAP[item]);
      });
    },

    /**
     * 调用service请求
     * 
     * @param {Object} oService GET(service请求的) 和 SET(service响应): 对应的方法名
     * const TASK_SERVICE = {
     *   GET: 'getTaskList',
     *   SET: 'setTaskList'
     * };
     * @param {Object} request 请求的参数
     */ 
    invokingService (oService, request) {
      // GET 是必选, SET 是可选
      if (this[oService.GET])
        return this.defineService(this[oService.GET](request), oService.SET && this[oService.SET].bind(this));
    },

    /**
     * 定义GET 和 SET 参数
     * @param {Promise} pGet 请求的promise对象
     * @param {Function} set 相应的函数
     */ 
    defineService (pGet, set) {
      return pGet && pGet.then && pGet.then(set);
    },
    
    /**
     * 获取任务
     */ 
    getTaskList () {
      return S.rUserTaskList({
        userId: this.user.userId
      });
    },

    getTaskNum () {
      return S.rTaskNum({
        userId: this.user.userId
      });
    },

    /**
     * 设置任务相关数据
     */ 
    setTaskList (data) {
      this.task.data = data;
    },

    setTaskNum (data) {
      this.task.num = data;
    },

    getMessageNum () {
      return S.serviceGetCountWeiDu({
        uId: this.user.userId
      });
    },

    getUpdateMessages () {
      return S.serviceUpdate({
        uId: this.user.userId
      });
    },

    /**
     * pageIndex 第几页的信息
     * @param {Object} request 请求参数
     */ 
    getMessages (request = { pageIndex: 1 }) {
      return S.serviceGetMessages({
        uId: this.user.userId,
        pageIndex: request.pageIndex || 1
      });
    },

    setMessageNum (data) {
      this.message.num = data;
    },

    setUpdateMessages (data) {
    },

    setMessages (data) {
      this.message.data = data;
    },

    /**
     * 消息组件, 加载更多消息
     */ 
    messageLoadMore (event, payload) {
      this.invokingService(MESSAGE_SERVICE, payload)
    },

    /**
     * 更新任务列表的的状态
     */ 
    updateTaskStatus (e, params) {
      this.invokingService(UPDATE_TASK, params)
      .then((res) => {
        return this.invokingService(UPDATE_SINGAL_TASK, params, res);
      })
      .then(res => {
        
        return Promise.all([
          // 更新任务数量
          this.invokingService(INIT_SERVICE_MAP.taskNum), 
          // 更新单个任务完成之后, 重新请求渲染任务列表
          this.invokingService(TASK_SERVICE)
        ]);

      });
    },

    getUpdateTaskStatus (request) {
      return S.rTaskConcreteCon({
        userJobId: request.userJobId
      })
    },

    setUpdateTaskStatus (response) {
      return Promise.resolve(response);
    },

    /**
     * 更新子任务
     * @param {request} 请求的参数
     * @param {preResponse} 上一次请求返回的参数
     */ 
    getUpdateSingalTask (request, preResponse) {
      return S.rSingleTask({
        userJobId: request.userJobId,
        userId: NAPI.user.get().userId,
        _i: new Date().getTime()
      })
    },
    setUpdateSingalTask (response) {
      return Promise.resolve(response);
    },
    /**
     * active_bar动态样式计算,为什么在style中不执行gsBarStyle()
     * @param {type} 0初始加载，1点type击切换
     */ 
    gsBarStylefn(type) {
      let gs_tabs = this.gs_tabs;
      if(!gs_tabs) return {};
      let style = {};
      let offset = 15;
      let tabWidth = 0;
      const LENGTH = 30;
      // this.$nextTick(() => {}) 类名不行
      if (type) {
        setTimeout(()=>{
          Array.from(gs_tabs).every((tab, index) => {
            let $el = gs_tabs[index];
            if (!$el) { return false; }
            if (tab.className.indexOf('active') < 0) {
              offset = $el.clientWidth + offset +LENGTH;
              return true;
            } else {
              tabWidth = $el.clientWidth;
              return false;
            }
          });
          this.getTransForm(offset, tabWidth, style);
        },360)
      } else {
        setTimeout(()=>{
          Array.from(gs_tabs).every((tab, index) => {
            let $el = gs_tabs[index];
            if (!$el) { return false; }
            if (tab.className.indexOf('active') >= 0) {
              tabWidth = $el.clientWidth;
              return false;
            } else {
              offset = $el.clientWidth + offset +LENGTH;
              return true;
            }
            });
            this.getTransForm(offset, tabWidth, style);
         },360)
      }
    },
    getTransForm (offset, tabWidth, style) {
      const transform = `translateX(${offset}px)`;
      style.width = tabWidth + 'px';
      style.transform = transform;
      style.msTransform = transform;
      style.webkitTransform = transform;
      this.gsBarStyle = style;
    },
    setActiveIndex () {
      Array.from(this.gs_header).forEach((item, index) => {
        if(item.className === 'active') {
          this.activeIndex = index;
        }
      });
    },  
    getActiveHeaderWidth () {
      let gs_header = this.gs_header;
      if(!gs_header) return false;
      setTimeout(()=>{
        this.setActiveIndex();
        Array.from(gs_header).every((tab, index) => {
          let $el = gs_header[index];
          if (!$el) { return false; }
          if (index === this.activeIndex) {
            this.activeHeaderWidth = $el.clientWidth;
            return false;
          } else {
            return true;
          }
        });
      },360)
    },
    getComputedWidth () {
        if (this.$refs.navTabs) {
          this.gs_tabs = this.$refs.navTabs[0].getElementsByTagName('a');
        }  
        if(this.$refs.headerLeftList) {
          this.gs_header =  this.$refs.headerLeftList.getElementsByTagName('a');
        }  
    } 
  },
  mounted () {
   
    this.initService();
    this.getComputedWidth();
    this.getActiveHeaderWidth();
    
    this.gsBarStylefn(0);    
    if(window.location.href.indexOf('http://help.aixuexi.com')>=0){
      this.isActiveHelp = true;
    }
  },
  watch: {
    'activeNav' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.gsBarStylefn(1);
      }
    }
  },
}

</script>


<style lang="less" scoped>
@import '~commonStyleLess/variable.less';

@header-height: 74px;
@header-height-num: 74;

.header-bg {
  width: 100%;
  // min-width: @var-content-width-num * 1px;
  height: @header-height;
  margin: 0 auto;
  position: relative;
  z-index: 3;
  background-color: #fff;
}
.logoNavShadow {
  box-shadow: 0 1px 6px #ccc;
}
.header-container {
  // width: @var-content-width-num * 1px;
  margin: 0 auto;
}

.header-left-list {
  position: relative;
  float: left;
  .part {
    float: left;
    height: @header-height;
    line-height: @header-height;
    .part-item {
      display: inline-block;
      position: relative;
      height: 74px;
      line-height: 74px;
    }
    a {
      display: inline-block;
      color: #333;
      font-size: 15px;
      padding: 0 15px;
      position: relative;
      z-index: 10;
      font-family: '微软雅黑';
      /*
      &.active,
      &:hover {
        color: #fff;
        cursor: pointer;
        background-color: @var-theme-color;
      }
      */
      &.active {
        color: #fff;
        cursor: pointer;
        background-color: @var-theme-color;
        background-image: url(../images/header/2017/active_arrow.png);
        background-repeat: no-repeat;
        background-position: bottom center;
        height: 74px;
        line-height: 74px;
      }
      &.active:hover {
        color: #fff;
      }
      &.active-noNav {
        color: #fff;
        cursor: pointer;
        background-color: @var-theme-color;
        line-height: 74px;
      }
      &.active-noNav:hover {
        color: #fff;
      }
      &:hover {
        cursor: pointer;
        color: @var-theme-color;
      }
    }

    &:first-of-type {
      margin-left: 0;
    }
  }
}

.header-right {
  float: right;
  
  .active() {
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom: 0;
    border-top: 0;
    box-shadow: none;
  }

  .part { 
    float: right;
    font-size: 15px;
    text-align: center;
    color: #333;
    cursor: pointer;
    position: relative;
    height: @header-height;
    line-height: @header-height;
    
    box-sizing: border-box;

    .text-wraper {
      position: absolute;
      width: 100%;
      height: @header-height;
      line-height: @header-height;
      z-index: 30;   
      
    }

    .text {
      display: inline-block;
      position: relative;
      line-height:74px;
      .mini-num-tast {
        content: '';
        position: absolute;
        top: 20px;
        right: -18px;
        background-color: #e60012;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 999px;
        font-size: 10px;
        font-style: normal;
        color: #fff;
      }
    }
    .mini-num {
        content: '';
        position: absolute;
        top: 20px;
        right: 3px;
        background-color: #e60012;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 999px;
        font-size: 10px;
        font-style: normal;
        color: #fff;
      }

    .click-block {
      display: none;
      position: absolute;
      overflow: hidden;
    }

    &.active {
      
      .text-wraper {
        .active();

      }

      .click-block {
        display: block;
        position: relative;
        top: (@header-height-num - 2)* 1px;
        background-color: #fff;
        border: 1px solid #ddd;
        overflow: hidden;
        z-index: 20;
        /*padding: 4px;*/
        /*border: 4px solid #fff;*/

        color: #4c597b;
      }
      .messge {
        .text-wrapper {
          z-index: 23;
        }
      }
    }
    
  }

  .service {
    margin-right: 15px;
  }

  .task {
    width: 66px;

    .tast-list {
      top: 74px;
      left: -280px;
      height: 440px;
      width: 640px;
      background-color: #fff;
    }
  }

  .message {
    width: 50px;
    
    .text {
       display: inline-block;
       height: 74px;
       width: 30px;
       background-image: url(../images/header/2017/message.png);
       background-repeat: no-repeat;
       background-position: center center;
    }
    .message-list {
      left: -143px;
      height: 437px;
      width: 338px;
    }
    &:hover {
     
    }
  }
 .help {
   width: 66px;
   a:hover {
    color: @var-theme-color;
   }
 }
  .user {
    width: 130px;
    cursor: pointer;
    
    .text {
      left: -6px;
      height: 74px;
      line-height: 74px;
      .text-username {
        display: inline-block;
        max-width: 90px;
        height: 74px;
        overflow: hidden;
        line-height: 74px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:after {
        display: block;
        content: '';
        position: absolute;
        width: 12px;
        height: 8px;
        top: 50%;
        margin-top: -3px;
        right: -20px;
        background-image: url(../images/header/arrow-down.png);
        background-repeat: no-repeat;
        transition-property: transform;
        transition-duration: .3s;
      }
    }
    


    &:hover {
      .active();

      .text {
        &:after {
          transform: rotate(180deg);
        }
      }

      .user-oparate {
        display: block;
        opacity: 1;
      }
    }

    .user-oparate {
      position: absolute;
      border: 1px solid #ddd;
      border-top: 0 none; 
      width: 100%;
      top: 74px;
      left: -1px;
      background-color: #fff;

      display: none;
      opacity: 0;
      transition: display .3s;
      box-sizing: content-box;
      .item {

        background-repeat: no-repeat;
        background-position: 14px center;
        height: 50px;
        line-height: 50px;
        &.pass {
          background-image: url(../images/header/pass.png)
        }

        &.logout {
          background-image: url(../images/header/logout.png)
        }
        
        &:hover {
          background-color: #EDEDF0;
        }
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }

  }
}

.header-left-logo {
  float: left;
  margin-right: 72px;
  height: @header-height;
  width: 148px;
  cursor: pointer;
  background-image: url(../images/header/2017/new-logo.png);
  background-repeat: no-repeat;
  background-color: #fff;
  background-size: 100% 60%;
  background-position: center center;
}
// 二级导航
.nav-content-list {
  position: absolute;
  width: 500px;
  height: 50px;
  .item {
    float: left;
    margin: 0 15px;
    height: 50px;
    line-height: 50px;
    .link {
      display: inline-block;
      position: relative;
      padding: 0;
      font-size: 14px;
      line-height: 50px;
      &:hover,
      &.nav-active {
        color: @var-theme-color;
      }
      &.nav-active {
        cursor: default;
      }
      &.no-active {
        cursor: default;
        color: #333;
      }
    }                     
  }
  .active-bar {
    position: absolute;
    bottom: 5px;
    left: 0;
    height: 4px;
    width: 0;
    background-color: @var-theme-color;
    z-index: 1;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
  }
 }
 .logo-nav-conatiner {
   width: 100%;
   height: 50px;
   background-color: #eaf3db; 
 }
 .help-ac {
   color: #89ba28;
 }
</style>