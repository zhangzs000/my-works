<!--
  任务列表
  libaoxu@gaosi.edu.com 2016-12-23

-->
<template>

  <div class="task-container">
    <h3 class="task-container-title">成长任务</h3>

    <!-- 进度条 -->
    <div class="task-progress">
      <div class="weav-container"></div>
      <p class="percent">{{ taskData.percent }}%</p>
      <h4 class="progress-title">任务完成度</h4>
      <div class="text-info">
        <p class="datetime">最新进度于{{ new Date().format('yyyy-MM-dd') }}</p>
        <p class="datefrom">推送至校长管理系统</p>
      </div>
    </div>

    <!-- 任务列表容器 -->
    <div class="task-list-wraper">

      <!-- 左侧列表 -->
      <ul class="task-list">
        <li class="item"
          v-for="obj in taskData.masterJobs"
          :class="{
            'active': obj.status === 'ACTIVE',
            'complete': obj.status === 'COMPLETE',
            'waiting': obj.status === 'WAITING',
            'spread': obj.isSpread
          }"

          :type="obj.type">
          
          <i class="line"></i>

          <!-- 只有WAITING状态是不可以点击的 -->
          <div class="content"
            @click="spreadSubList($event, obj, obj.status !== 'WAITING')">
            <h4 class="item-title">{{ obj.title }}</h4>
            <span class="state"></span>
          </div>
          

          <!-- 自容器过渡动画 -->
          <transition name="sub-container-spread"
            @before-enter="subContainerBeforeEnter"
            @enter="subContainerEnter"
            @before-leave="subContainerBeforeLeave"
          >
            
            <div
              v-show="obj.isSpread" 
              class="sub-task-container ">
              <p class="sub-desc">{{ obj.desc }}</p>
              <h4 class="sub-content-title">任务内容:&nbsp;</h4>

              <!-- 子任务列表 -->
              <ul class="sub-task-list">
                <li class="sub-item"
                  v-for="subObj in obj.subJobList"
                  :class="{
                    'active': subObj.status === 'ACTIVE',
                    'complete': subObj.status === 'COMPLETE',
                    'waiting': subObj.status === 'WAITING',
                    
                  }">

                  <h5 class="sub-title">{{ subObj.title }}</h5>
                  <i class="sub-state"></i>
                  <a 
                    class="goto-content"
                    :href="subObj.status !== 'WAITING' && subObj.content || 'javascript:void(0)'" 
                    target="_blank"
                    @click="updateTaskStatus($event, subObj, subObj.status === 'COMPLETE')"
                    ></a>
                </li>
              </ul>

            </div>
          </transition>
          
        </li>

      </ul>
      <!-- 左侧列表结束 -->

    </div>

  </div>

</template>

<script>

// const mock = {
//   masterJobs: [
//     {
//       desc: "Hi~欢迎来到爱学习！现在，请允许我带您一起来了解爱学习吧。",
//       id: 0,
//       status: "ACTIVE",
//       subJobList: [
//         {
//           content: "http://r.aixuexi.com/guides",
//           desc: "Hi~欢饮来到爱学习！现在，请允许我带您一起来了解爱学习吧。",
//           displayType: "dialog_page_include",
//           id: 1,
//           masterJobId: 0,
//           orderIndex: 1,
//           status: "ACTIVE",
//           title: "观看新手引导",
//           userJobId: 2087
//         }
//       ],
//       title: "观看新手引导",
//       type: "REQUIRED",
//       version: "1.0"
//     }
//   ],
//   percent: 0
// }

export default {
  
  props: {
    /**
     * 列表数据 
     */
    taskData: {

    }
  },
  
  components: {

  },

  data () {
    return {

    };
  },

  computed: {

  },

  methods: {
    /**
     * 展开子列表
     * @param {Event} 事件对象
     * @param {Object} 点击的li对应的数据对象
     * @param {Boolean} 是否可以展开标识
     */ 
    spreadSubList (event, obj, flag) {
      // 有一些状态如 'ACTIVE' 是不能展开的
      if (!flag) return flag;

      // 有些属性,需要注入之后, 才能支持vue的get set
      // 这里加一个注入的标识
      obj._set = obj._set || {
        isSpread: false
      };

      if (!obj._set.isSpread) {
        obj._set.isSpread = true;
        this.$set(obj, 'isSpread', false);
      }
      obj.isSpread = !obj.isSpread;

    },

    /**
     * 自容器进入前钩子, 获取容器高度, 并存储
     */ 
    subContainerBeforeEnter (el) {
      if (!el._height) {
        el._height = el.offsetHeight || this.$common.getDisplayNoneOffset(el).height;
      }

      el.style.height = 0 + 'px';
    },

    subContainerEnter (el) {
      /**
       * display 为none => display: block, 直接给height赋值, 渲染失效
       * 因为: transition效果只会存在于重绘中
       * 所以: 需要在dom中offsetHeight | clientHeight一下, 强制刷新浏览器的重排和重绘, transition 渲染才能生效
       */ 
      el.offsetHeight;
      el.style.height = el._height + 'px';
    },

    subContainerBeforeLeave (el) {
      el.style.height = 0 + 'px';
    },

    /**
     * 更新任务状态了
     * @param {Event} e 事件对象
     * @param {Object} params 点击的li对应的数据对象
     * @param {Boolean} flag 是否完成状态标识
     */ 
    updateTaskStatus (e, params, flag) {
      e.stopPropagation();
      
      // 如果是已完成状态不通知父级, 更新列表
      if (flag) return flag;

      this.$emit('update-task-status', e, params);
    }

  },

  events: {
    
  },

  mounted () {

  }
}

</script>


<style lang="less" scoped>
@import '~commonStyleLess/common.less';

/* 外部容器边框高度 */
@border-wraper-num: 4;
.task-container {
  height: 100%;
  border: @border-wraper-num * 1px solid #fff;
  border-top: 0;
}

/* 标题高度 */
@title-height-num: 36;
/* 标题底边框高 */
@title-bottom-num: 2;
.task-container-title {
  line-height: @title-height-num * 1px;
  background: #e8ebed;
  border-top: @border-wraper-num * 1px solid #fff;
  border-bottom: @title-bottom-num * 1px solid #ccdad8;
  text-align: left;
  padding-left: 15px;
  font-weight: bold;
  color: #474646;
  position: relative;
  z-index: 100;
}

/* 进度区域右侧宽度 */
@progress-width-num: 140;

@list-wraper-top: @title-height-num + @title-bottom-num + @border-wraper-num;
@line-color: #ccdbd7;
@line-left-num: 22;

.task-list-wraper {
  overflow: auto;
  height: 100%;
  margin-right: (@progress-width-num + 10) * 1px;
  box-sizing: border-box;
  position: relative;

  padding-top: @list-wraper-top * 1px;
  top: -@list-wraper-top * 1px;

  &:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    left: @line-left-num * 1px;
    top: 0px;
    background-color: @line-color;
  }
}

/* 容器内标准行搞 */
@line-height-num: 64;

/* 标题左侧距离 */
@title-left-num: 50;

.task-list {

  @active-color: #db5432;
  @grey-color: #ccc;
  
  cursor: default;

  .item {
    overflow: hidden;
    background-color: #fff;
    position: relative;
    /*border-bottom: 1px solid #ddd;*/

    &:after {
      content: '';
      display: block;
      width: 100%;
      background-color: #ddd;
      height: 1px;
      margin-left: 50px;
    }

    /* 类型为 可选情况 */
    &[type=OPTIONAL] {
      .item-title {
        
        &:after {
          content: '可选';
          display: inline-block;
          border: 1px solid #db5334;
          color: #db5334;
          font-size: 14px;
          line-height: 22px;
          padding: 0 10px;
          margin-left: 10px;
        }
      }
    }

    .line {
      position: absolute;
      height: 100%;
      width: 2px;
      left: @line-left-num * 1px;
      top: 0;
      background-color: @line-color;
    }

    .content {
      height: 64px;
      position: relative;
      cursor: pointer;
    }

    .item-title {
      font-size: 16px;
      color: #4c597b;
      margin-left: @title-left-num * 1px;
      height: 63px;
      line-height: @line-height-num * 1px;
      text-align: left;
      /*margin: 0 20px 0 44px;*/
      position: relative;
      /*width: 26px;*/
      
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: -40px;
        height: 100%;
        width: 26px;
        background-repeat: no-repeat;
        /*background-image: url('../images/header/task-wait.png');*/
        background-position: 0 center;
        /*background-size: 26px;*/
      }
    }

    .state {
      position: absolute;
      color: #ccc;
      height: 100%;
      line-height: @line-height-num * 1px;
      font-size: 14px;
      right: 40px;
      top: 0;
      
      &:before {
        display: inline-block;
      }

      &:after {
        content: '';
        right: -22px;
        transition-property: transform;
        transition-duration: .3s;
      }

    }

    /* 展开时候处理 */
    &.spread {
      background-color: #f3f3f3;

      /*.sub-task-container {
        height: auto;
      }*/

      .state {
       
        &:after {
          transform: rotate(180deg);
        }

      }

      &:last-of-type {
        &:after {
          height: 0;
        }
      }

    }

    /* 进行中状态 */
    &.active {

      .state {
        &:before {
          content: '进行中';
          color: @active-color;
        }
      }

      /* 标题图片改变 */
      .item-title {
        &::before {
          background-image: url('../images/header/task-guide.png');
        }
      }
    }

    /* 完成状态 */
    &.complete {
      .state {
        &:before {
          content: '已完成';
        }
      }

      .item-title {
        &::before {
          background-image: url('../images/header/task-complete.png');
        }
      }
    }

    /* 等待状态 */
    &.waiting {
      .content {
        cursor: default;
      }

      .state {
        &:before {
          content: '等待开启';
        }
      }

      .item-title {
        &::before {
          background-image: url('../images/header/task-wait.png');
        }
      }
    }


  }


  /* 子容器 */
  .sub-task-container {
    /*display: none;*/
    /*height: auto;*/

    /*transition: height .3s, display .3s;*/

    margin-left: @title-left-num * 1px;
    text-align: left;

    .sub-desc {
      font-size: 14px;
      color: #9f9f9f;
      line-height: 18px;
    }

    .sub-content-title {
      font-size: 14px;
    }
  }

  /* 子列表 */
  .sub-task-list {
    
    .sub-item {
      position: relative;
      border-bottom: 1px solid #dddddd;

      &:hover {
        background-color: #e2e5e7;
        
        &.complete {
          .goto-content {
            opacity: .6;
          }
        }
      }

      /* li最后一项 */
      &:last-of-type {
        border-bottom: 0 none;
      }

      .sub-title {
        display: inline-block;
        font-size: 16px;
        line-height: 32px;
        margin-left: 50px;

        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 18px;
          height: 100%;
          width: 18px;
          background-repeat: no-repeat;
          /*background-image: url('../images/header/task-wait-min.png');*/
          background-position: 0 center;
          /*background-size: 18px;*/

        }
      }

      .sub-state {
        display: inline-block;

        &:after {
          display: block;
          font-size: 14px;
          margin-left: 6px;
        }
      }

      .goto-content {
        line-height: 18px;
        border-radius: 999px;
        text-align: center;
        font-size: 12px;
        /*width: 70px;*/
        padding: 0 10px;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        right: 12px;
        font-weight: bold;
        border-width: 2px;
        border-style: solid;

        &:after {
          display: block;          
        }

      }


      &.active {
        
        .sub-state {
          &:after {
            content: '进行中';
            color: #db5432;
          }
        }

        .sub-title {
          &:before {
            background-image: url('../images/header/task-guide-mini.png');
          }
        }

        .goto-content{
          background-color: #db5432;
          border-color: #db5432;
          color: #fff;
          cursor: pointer;

          &:after {
            content: '现在就去';
          }
        }
      }
      /* 进行中end */

      &.complete {
        /*background-color: #e2e5e7;*/

        .sub-state{
          &:after {
            content: '已完成';
            color: #999;
          }
        } 

        .sub-title {
          &::before {
            background-image: url('../images/header/task-complete-mini.png');
          }
        }

        .goto-content{
          background-color: #e2e5e7;
          border-color: #4c597B;
          color: #4c597B;
          opacity: 0;
          transition-property: opacity;
          transition-duration: .3s;

          &:after {
            content: '再做一遍';
          }
        }
      }
      /* 完成结束 */

      &.waiting {

        .sub-state{
          &:after {
            content: '等待开启';
            color: #9ba0a1;
          }
        }

        .sub-title {
          &::before {
            background-image: url('../images/header/task-wait-mini.png');
          }
        }

        .goto-content {
          background-color: #f3f3f3;
          color: #9ba0a1;
          border-color: #9ba0a1;
          display: none;

          &:after {
            content: '等待开启';
            cursor: default;
          }
        }

      }
      /* 等待结束 */

    }
    /* 子item */

  }
  /* 子列表结束 */

}

.task-progress {
  width: @progress-width-num * 1px;
  float: right;
  height: 100%;
  max-height: 600px;
  position: relative;
  box-sizing: border-box;
  padding-top: 42px;
  top: -42px;

  .weav-container {
    height: 100px;
  }

  .percent {
    position: absolute;
    width: 100px;
    text-align: center;
    font-size: 16px;
    color: #2f8cbe;
    top: 100px;
    left: 50%;
    margin-left: -50px;
  }

  .progress-title {
    font-size: 12px;
    color: #308bbf;
    text-align: center;
    font-weight: 400;
  }

  .text-info {
    color: #999;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
    position: absolute;
    bottom: 12px;
  }
}

.sub-container-spread-enter-active,
.sub-container-spread-leave-active {
  transition: height .3s cubic-bezier(1.0, 0.5, 0.8, 1.0), opacity .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);

}

.sub-container-spread-enter,
.sub-container-spread-leave {
  opacity: 0;
}


</style>