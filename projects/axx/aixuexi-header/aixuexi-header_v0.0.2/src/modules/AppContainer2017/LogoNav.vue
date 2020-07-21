<!--
  logo 和导航区域
  @author libaoxu@gaosiedu.com 2016-12-15

-->
<template>
  <div class="logo-nav-conatiner">
    <div class="logo-nav-content clearfix">
      <div class="nav-content" v-if="isShowNav">
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
      default: true
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
    },
    
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
    },
  },
  mounted() {
    
  },
  events: {
    
  },

  watch: {

  }

}

</script>


<style lang="less" scoped>
@import '~commonStyleLess/variable.less';

@height-num: 50;

.logo-nav-conatiner {
  width: 100%;
  min-width: @var-content-width-num * 1px;
  background-color: #eaf3db;  
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
  // float: left;
  display: inline-block;
  // position: absolute;
  // top: 50%;
  // margin-top: @img-height-num / 2 * -1px;
  // margin-left: 15px;

  /*img {
    width: 153px;
    height: 52px;
  }*/
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
  // left: 240px;
  // position: absolute;
  // float: left;
  margin-left: 220px;

  .item {
    float: left;
    margin: 0 15px;
    font-size: 14px;
  }

  .link {
    display: block;
    background-repeat: no-repeat;
    background-position: 0 center;
    position: relative;
    &:hover,
    &.active {
      color: @var-theme-color;
      
      /* 测评相关 */
      /*
      &.rxcp  {
        background-image: url(./images/nav/cp-active.png);
      }
      &.termtest  {
        background-image: url(./images/nav/term-active.png);
      }
      &.gaosibei  {
        background-image: url(./images/nav/gaosibei-active.png);
      }
      */
      /*培训相关
      &.mycourse {
        background-image: url(./images/nav/train/mycourse-active.png);
      }
      &.allcourse {
        background-image: url(./images/nav/train/allcourse-active.png);
      }
      &.manage {
        background-image: url(./images/nav/train/manage-active.png);
      }
      */

    }
    &.active {
      cursor: default;
    }

    &.no-active {
      cursor: default;
      color: #333;
    }

    /*测评相关*/
    /*
    &.rxcp {
      background-image: url(./images/nav/cp-grey.png);
    }
    &.termtest {
      background-image: url(./images/nav/term-grey.png);
    }
    &.gaosibei {
      background-image: url(./images/nav/gaosibei-grey.png);
    }
    */
    /*培训相关
    &.mycourse {
      background-image: url(./images/nav/train/mycourse.png);
    }
    &.allcourse {
      background-image: url(./images/nav/train/allcourse.png);
    }
    &.manage {
      background-image: url(./images/nav/train/manage.png);
    }
    */
  }
  .nav-content-list {
    position: relative;
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


</style>