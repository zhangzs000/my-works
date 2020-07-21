<!--
  logo 和导航区域
  @author libaoxu@gaosiedu.com 2016-12-15

-->
<template>
  <div class="logo-nav-conatiner">
    <div class="logo-nav-content clearfix">

      <div class="logo-img-wraper">
        <div class="img-box"><img src="./images/nav/logo.png" alt="爱学习"></div>
        <h3 class="logo-title" v-if="isShowInsName && insName">{{ insName }}</h3>
        <h3 class="logo-title">{{ logoTitle }}</h3>
      </div>

      <div class="nav-content">
        <ul class="nav-content-list clearfix" v-if="isShowNav">
          <!--<li class="item no-active">
            <a>测评</a>
          </li>-->
          <!-- && isHideRoles(val) -->
          <li 
            class="item" 
            v-for="(val, key) in navMap"
            v-if="hasPrivilege(val) && isInMenusPrivilege(val.menuKey)"
          >
              <!--@click="val.link || $event.preventDefault()" -->
            <!-- 如果e.target为span, a标签会触发, 但是对于a标签的, 这个dom是否能拦截到? -->  
            <a class="link" 
              :target="val.target || '_blank'" 
              :href="val.link || 'javascript:void(0)'"
              :class="{
                active: key === activeNav,
                [val.className]: val.className,
                [val.tracker && val.tracker.className]: val.tracker && val.className
              }"
              :data-pad="val.tracker && val.tracker.pad"
              >
              <div class="active-bar"></div>
              <span>{{ val.name }}</span>
            </a>
          </li>
        </ul>
      
        <slot name="nav-content"></slot>
      </div>
      

    </div>
  </div>

</template>

<script>
import NAPI from 'nadaptor';

/**
 * 导航列表
 * @type {Array}
 */ 
const NAV_MAP = {
  enterTest: {
    link: 'http://front.aixuexi.com',
    name: '入学测评',
    // 权限用的
    menuKey: 'rxcp',
    hideRoles: /^teacher/,
    className: 'rxcp',
    trackerClassName: ''
  },
  termTest: {
    link: '',
    name: '期中期末测评',
    className: 'termtest',
    menuKey: 'qzqmcp',
    hasPrivilege: Boolean | Function,
    trackerClassName: 'maidian_ajax_page'
  }
  // gaosibei: {
  //   link: 'http://gaosibei.aixuexi.com',
  //   name: '高斯杯',
  //   menuKey: 'gaosibei',
  //   className: 'gaosibei',
  //   hideRoles: ['teacher']
  //   // 需要权限控制
  // }
};

export default {
  
  props: {

    /**
     * 高亮导航
     */ 
    activeNav: {
      type: String,
      default: 'termTest'
    },

    /**
     * 是否展示导航
     */
    isShowNav: {
      type: Boolean,
      default: false
    },

    /**
     * 是否展示机构名称
     */
    isShowInsName: {
      type: Boolean,
      default: false
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
    }

  },
  
  components: {

  },

  data () {
    return {

    };
  },

  computed: {
    insName () {
      return NAPI.user.get().insName || ''
    },

    /**
     * 菜单列表权限
     */ 
    menuPrivilege () {
      return NAPI.user.get().menu;
    },

    roles () {
      return NAPI.user.get().roles;
    }
  },

  methods: {
    isInMenusPrivilege(key) {
      return !key || this.menuPrivilege[key] === 1;
    },
    
    isHideRoles(val) {
      return !val.hideRoles || !(this.$common.isAnyMatchArray(val.hideRoles, this.roles));
    },

    hasPrivilege (val) {
      if (val.hasPrivilege != null) {
        return typeof val.hasPrivilege === 'function' ? val.hasPrivilege(this) : val.hasPrivilege
      } 
      return true
    }
  },

  events: {
    
  },

  watch: {

  }

}

</script>


<style lang="less" scoped>
@import '~commonStyleLess/variable.less';

@height-num: 70;

.logo-nav-conatiner {
  height: @height-num * 1px;
  width: 100%;
  min-width: @var-content-width-num * 1px;
  background-color: #fafafa;
  border-bottom: 2px solid #e4e4e4;
  
}
.logo-nav-content {
  width: @var-content-width-num * 1px;
  margin: 0 auto;
  position: relative;
  height: 100%;
  overflow: hidden;
}

.logo-img-wraper {
  @img-height-num: 34;

  height: @height-num * 1px;
  display: inline-block;
  .img-box,
  .logo-title {
    padding-top: (@height-num - @img-height-num) / 2 * 1px;
  }

  .img-box {
    float: left;
  }
  .logo-title {
    float: left;
    line-height: (@img-height-num + 2) * 1px;
    font-size: 18px;
    margin-left: 22px;
  }
}
.nav-content {
  height: @height-num * 1px;
  line-height: @height-num * 1px;
  display: inline-block;
  margin-left: 60px;

  .item {
    float: left;
    margin-left: 25px;
    font-size: 22px;
    margin-right: 40px;
  }

  .link {
    padding: 0 16px 0 36px;
    display: block;
    background-repeat: no-repeat;
    background-position: 0 center;
    position: relative;
    &:hover,
    &.active {
      color: @var-theme-color;
      .active-bar {
        display: block;
      }
      /* 测评相关 */
      &.rxcp  {
        background-image: url(./images/nav/cp-active.png);
      }
      &.termtest  {
        background-image: url(./images/nav/term-active.png);
      }
      &.gaosibei  {
        background-image: url(./images/nav/gaosibei-active.png);
      }

      /*培训相关*/
      &.mycourse {
        background-image: url(./images/nav/train/mycourse-active.png);
      }
      &.allcourse {
        background-image: url(./images/nav/train/allcourse-active.png);
      }
      &.manage {
        background-image: url(./images/nav/train/manage-active.png);
      }

    }

    &.active {
      cursor: default;
    }

    &.no-active {
      cursor: default;
      color: #333;
    }

    /*测评相关*/
    &.rxcp {
      background-image: url(./images/nav/cp-grey.png);
    }
    &.termtest {
      background-image: url(./images/nav/term-grey.png);
    }
    &.gaosibei {
      background-image: url(./images/nav/gaosibei-grey.png);
    }

    /*培训相关*/
    &.mycourse {
      background-image: url(./images/nav/train/mycourse.png);
    }
    &.allcourse {
      background-image: url(./images/nav/train/allcourse.png);
    }
    &.manage {
      background-image: url(./images/nav/train/manage.png);
    }
  }
  .nav-content-list {
    position: relative;
  }
  .active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    display: none;
    background-color: @var-theme-color;
    z-index: 1;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
  }
}


</style>