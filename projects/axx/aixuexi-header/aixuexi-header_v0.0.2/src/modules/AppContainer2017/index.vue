<!--
  应用容器入口
  @author libaoxu@gaosiedu.com 2016-12-19
-->
<template>
  <div ref="appContainer">
    <!-- 头部 -->
    <app-header 
      :active-header="innerAppHeader.activeHeader"
      :is-show-nav="innerAppHeader.isShowNav"
      :active-nav="innerLogoNav.activeNav"
      :logo-title="innerLogoNav.logoTitle"
      :nav-map="innerLogoNav.navMap"
    ></app-header>

    <!-- 导航 
    <logo-nav    
      :is-show-nav="innerLogoNav.isShowNav" 
      :is-show-ins-name="innerLogoNav.isShowInsName"
    >
    </logo-nav>
  -->

    <div class="app-body clearfix"
      :style="innerAppBodyStyle">
      
      <slot name="app-body-side"></slot>
      <!-- 条幅 隐藏 -->
      <banner v-if="innerBanner.isShow"></banner>

      <main-container
        :style="innerMainContainer.oStyle"
        :comp-static-height="innerMainContainer.compStaticHeight"
        :bottom-height="45"
      >
        <slot name="main-container"></slot>
      </main-container>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './AppHeader';
//import LogoNav from './LogoNav';
import Banner from './Banner';
import MainContainer from './MainContainer';
import AppFooter from './AppFooter';
import S from 'service';
import apis from './apis';

/**
 * header 部分的api扩展
 */
if (apis && apis.constructor === Object) {
  S.extend(apis);
}

/**
 * prop类型为 Object时候, 即使设置默认值, 该prop会覆盖, 而不会合并
 * 所以使用 computed,  用innerProp, 进行合并
 *
 * @type {Object}
 */
const propDefault = {
  appHeader: {
    activeHeader: ''
  },

  logoNav: {
    // 当前高亮导航
    activeNav: ''
  },

  appBodyStyle: {

  },

  banner: {
    isShow: false
  },

  mainContainer: {
    // 部分组件所占用静态的高度
    compStaticHeight: 0,
    oStyle: {}
  }
}

export default {

  props: {

    /**
     * 头部
     */
    appHeader: {
      type: Object
    },

    /**
     * logo导航
     */
    logoNav: {
      type: Object
    },

    /**
     * 容器内容
     */
    appBodyStyle: {
      type: Object
    },

    /**
     * 辐条
     */
    banner:  {
      type: Object
    },

    /**
     * 主容器
     */
    mainContainer: {
      type: Object
    }

  },

  components: {
    AppHeader,
    AppFooter,
    Banner,
    //LogoNav,
    MainContainer,
  },

  computed: {
    innerAppHeader() {
      return Object.assign(propDefault.appHeader, this.appHeader)
    },

    innerLogoNav() {
      return Object.assign(propDefault.logoNav, this.logoNavData)
    },

    innerAppBodyStyle() {
      // debugger
      return Object.assign(propDefault.appBodyStyle, this.appBodyStyle)
    },

    innerBanner() {
      // return {}
      return Object.assign(propDefault.banner, this.banner)
    },

    innerMainContainer() {
      return Object.assign(propDefault.mainContainer, this.mainContainer)
    }
  },

  data () {

    return {
      /** 
       * 容器的offset dom信息
       */
      appContainerOffset: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      logoNavData: this.logoNav

    };
  },

  methods: {
    
  },

  events: {

  },

  beforeCreate () {
  },

  created () {


  },

  mounted () {
  }

}

</script>


<style lang="less" scoped>
@import '~commonStyleLess/variable.less';

.app-body {
  width: @var-content-width-num * 1px;
  margin: 0 auto 0px;
  position: relative;
  background-color: #fff;
  overflow-x: auto;
}

</style>