<!--
  头部
  @author libaoxu@gaosiedu.com 2016-12-15
-->
<template>

  <div class="header-bg">
    <!-- 头部容器 -->
    <div class="header-container">
      <ul class="header-left-list">
        <!-- 服务端的数据 该菜单为1的时候, 有权限, 能看到 -->
        <li class="part" v-for="(item, key) in linkMap"
          v-if="isInMenusPrivilege(item.menuKey)"
        >
          <!-- linkKey 限制链接,  -->
          <a :class="{'active': key === activeHeader}" 
            :href="
              (!item.linkKey || menuPrivilege[item.linkKey] === 1)
              && (item.link || 'javascript: void(0)')
            "
            >{{ item.name }}</a>
        </li>
      </ul>

      <!-- 右侧 -->
      <!-- <ul class="header-right"> -->
        <!-- 用户 -->
        <!-- <li class="part user">
          <span class="text">{{ user.username }}</span>
          <ul class="user-oparate">
            <li v-for="(obj, key) in userOperate" class="item" :class="key">
              <a :href="obj.link">{{obj.text}}</a>
            </li>
          </ul>
        </li> -->

        <!-- 消息 -->
        <!-- <li class="part message"
          :class="{'active': message.isActive}"
          @click="headerListClick($event, message)"
          v-clickoutside="handlerClose"
        >
          <div class="text-wraper">
            <span class="text">消息
              <i class="mini-num" v-if="message.num > 0">{{ message.num }}</i>  
            </span> 
          </div> 
          <div class="click-block message-list">
            <message :message-data="message.data"
              @load-more="messageLoadMore"
            ></message>
          </div>
        </li> -->

        <!-- 任务 -->
          <!-- 目前任务中心接口问题, 这一版先不做请求 -->
          <!--@click="headerListClick($event, task)"-->
        <!-- <li class="part task"
          :class="{'active': task.isActive}"
          v-clickoutside="handlerClose"
        >
          <div class="text-wraper">
            <span class="text">任务中心
              <i class="mini-num" v-if="task.num > 0">{{ task.num }}</i>  
            </span>
          </div>

          <div class="click-block tast-list">
            <!-- 任务列表 -->
            <!-- <task :task-data="task.data"
              @update-task-status="updateTaskStatus"></task>
          </div>
        </li> -->
        <!-- <li class="part service">
          客服电话：400-898-1009
        </li> -->
      <!-- </ul> --> 

    </div>

    <!--<div>{{appClick.count}}来说地方</div>-->

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
  xuexiao: {
    name: '学校管理',
    link: 'http://xuexiao.aixuexi.com',
    menuKey: 'bm'
  },
  frontTest: {
    name: '测评',
    menuKey: 'cp',
    link: 'http://front.aixuexi.com',
    // 链接是入学测评的, 
    linkKey: 'rxcp'
  },
  train: {
    name: '培训',
    menuKey: 'tr',
    link: 'http://px.aixuexi.com'
  },

  gaosibei: {
    name: '高斯杯',
    link: 'http://gaosibei.aixuexi.com',
    menuKey: ['gaosibei', 'rxcp'],
    // 需要权限控制
    hideRoles: /^teacher/
    
  },
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
    }
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
      }
    };
  },

  computed: {
    
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
    }
  },

  methods: {

    isInMenusPrivilege (key) {
      if (!key) return true;

      switch (key.constructor) {

        case String:
          return this.menuPrivilege[key] === 1;

        case Array:
          return this.$common.isArrayInObject({arr: key, obj: this.menuPrivilege, value: 1});
      }
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

    // getMessageNum () {
    //   return S.serviceGetCountWeiDu({
    //     uId: this.user.userId
    //   });
    // },

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
    }


  },


  mounted () {

    this.initService();

  }
}

</script>


<style lang="less" scoped>
@import '~commonStyleLess/variable.less';

@header-height: 32px;
@header-height-num: 32;

.header-bg {
  width: 100%;
  min-width: @var-content-width-num * 1px;
  height: @header-height;
  background: url(../images/header/header-bg.png) repeat-x #fff;
  margin: 0 auto;
  position: relative;
  z-index: 3;
}

.header-container {
  width: @var-content-width-num * 1px;
  margin: 0 auto;
}

.header-left-list {

  .part {
    float: left;
    margin: 0 15px;
    height: @header-height;
    line-height: @header-height;

    a {
      display: inline-block;
      color: #4c587B;
      font-size: 15px;

      &.active,
      &:hover {
        color: @var-theme-color;
        cursor: pointer;
      }
    }

    &:first-of-type {
      margin-left: 0;
    }
  }
}

.header-right {
  float: right;
  .part { 
    float: right;
    font-size: 15px;
    text-align: center;
    color: #4c587B;
    cursor: pointer;
    position: relative;
    height: @header-height;
    line-height: @header-height;

    box-sizing: border-box;

    .text-wraper {
      position: absolute;
      width: 100%;
      z-index: 3;
    }

    .text {
      display: inline-block;
      position: relative;

      .mini-num {
        content: '';
        position: absolute;
        top: 0;
        right: -22px;
        background-color: red;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 999px;
        font-size: 10px;
        font-style: normal;
        color: #fff;
      }
    }

    .click-block {
      display: none;
      position: absolute;
      overflow: hidden;
    }

    &.active {
      
      .text-wraper {

      }

      .click-block {
        display: block;
        top: 32px;
        background-color: #fff;
        border: 1px solid #ddd;
        overflow: hidden;
        /*padding: 4px;*/
        /*border: 4px solid #fff;*/

        color: #4c597b;
      }
    }
    

  }

  .service {
    margin-right: 15px;
  }

  .task {
    width: 156px;

    .tast-list {
      left: -246px;
      height: 440px;
      width: 640px;
    }
  }

  .message {
    width: 110px;

    .message-list {
      left: -121px;
      height: 437px;
      width: 338px;
    }
  }

  .user {
    width: 145px;
    cursor: pointer;
    
    .text {

      &:after {
        display: block;
        content: '';
        position: absolute;
        width: 12px;
        height: 8px;
        top: 50%;
        margin-top: -4px;
        right: -20px;
        background-image: url(../images/header/arrow-down.png);
        background-repeat: no-repeat;
        transition-property: transform;
        transition-duration: .3s;
      }
    }
    


    &:hover {

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
      left: -1px;
      background-color: #fff;

      display: none;
      opacity: 0;
      transition: display .3s;
      .item {

        background-repeat: no-repeat;
        background-position: 10px center;

        &.pass {
          background-image: url(../images/header/pass.png)
        }

        &.logout {
          background-image: url(../images/header/logout.png)
        }
        
        &:hover {
          background-color: #EDEDF0;
        }
      }
    }

  }
}

</style>