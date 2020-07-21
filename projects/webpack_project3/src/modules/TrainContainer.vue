<!--
  学校管理系统容器
  libaoxu@gaosiedu.com 2017-03-03

-->
<!--
<template>
  <app-container
    class="org-center-container"
    :app-header="$appContainer.appHeader"
    :logo-nav="$appContainer.logoNav"
    :main-container="$appContainer.mainContainer"
    :app-body-style="$appContainer.appBodyStyle">

    <div slot="app-body-side">
      <side-bar :settings="$appContainer.sideBar"></side-bar>
    </div>
    <div slot="main-container">
      <slot name="main-container"></slot>
    </div>
  </app-container>
</template>
-->

<script>
import AppContainer from 'common/modules/AppContainer';
import NAPI from 'nadaptor';
/*
  是否显示二级导航
*/
const isShowNavFlag = true;
/**
 * 应用容器
*/
const defaultSettings = {
  // 导航
  logoNav: {
    isShowNav: isShowNavFlag,
    logoTitle: '培训',
    // 默认高亮
    activeNav: 'allcourse',
    navMap: {
      allcourse: {
        link: '#/allcourse',
        name: '全部课程',
        className: 'allcourse',
        target: '_self',
        isShowTip: false,
        // tracker: {
        //   className: 'maidian_ajax_page',
        //   pad: 'aw601'
        // }
      },

      mycourse: {
        link: '#/mycourse',
        name: '我的课程',
        className: 'mycourse',
        target: '_self',
        isShowTip: false,
        // tracker: {
        //   className: 'maidian_ajax_page',
        //   pad: 'aw603'
        // }
      },

      manage: {
        link: '#/manage',
        name: '培训管理',
        className: 'manage',
        target: '_self',
        isShowTip: false,
        // tracker: {
        //   className: 'maidian_ajax_page',
        //   pad: 'aw605'
        // },
        hasPrivilege: function () {
          if (NAPI.user.get().roles.join().indexOf('manage') ===-1) {
            return false;
          } else{
            return true;
          }
        }
      }
    }
  },
  // 头部
  appHeader: {
    // 培训
    activeHeader: 'train',
    isShowNav: isShowNavFlag
  },

  appBodyStyle: {
    // 'box-sizing': 'border-box',
    // 'padding-left': '160px',
    'margin-bottom': '0',
    'width': 'auto'
  },

  mainContainer: {
    oStyle: {
      padding: 0
    }
  }

};

export default {

  props: {
    'appContainer': {
      type: Object,
      // default: {

      // }
    }
  },

  components: {
    AppContainer
  },

  computed: {
    '$appContainer': {
      get () {
        return this.$common.copy(true, defaultSettings, this.appContainer);
      }
    }
  },

  data () {
    return {
      defaultSettings
    };
  },

  methods: {

    setActiveNav (meta) {
      let activeNav = meta.activeNav
      if (activeNav) {
        defaultSettings.logoNav = defaultSettings.logoNav || {}
        defaultSettings.logoNav.activeNav = activeNav
      }
    }
  },

  events: {

  },

  mounted () {

  },

  watch: {
    $route (to, from, next) {
      let meta = to && to.meta && to.meta
      meta && this.setActiveNav(meta)
    }
  },

  render (h) {
    let $appContainer = this.$appContainer;
    // console.log(h);
    // demo1 h|createElement 用js的思想写模板, 比template更接近编译器的模板, 很牛逼的
    // @example https://cn.vuejs.org/v2/guide/render-function.html
    // return h('app-container', {
    //   class: {
    //     'org-center-container': true
    //   },
    //   props: {
    //     'app-header': $appContainer.appHeader,
    //     'logo-nav': $appContainer.logoNav,
    //     'main-container': $appContainer.mainContainer,
    //     'app-body-style': $appContainer.appBodyStyle,
    //   }
    // }, [
    //   h('div',
    //     { slot: 'app-body-side' },
    //     [h('side-bar', {
    //       props: {
    //         'settings': $appContainer.sideBar
    //       }
    //     })]
    //   ),
    //   h(
    //     'div',
    //       {
    //         slot: 'main-container',
    //         attrs: {

    //         },
    //         style: {

    //         }
    //       },
    //     [this.$slots['main-container']]
    //   )
    // ]);
    // demo2 用jsx语法写模板
        // id="org"
    return (
      <app-container
        class="org-center-container"
        app-header={$appContainer.appHeader}
        logo-nav={$appContainer.logoNav}
        main-container={$appContainer.mainContainer}
        app-body-style={$appContainer.appBodyStyle}
        banner={{isShow: false}}
        >

        <div slot="main-container">
          {this.$slots['main-container']}
        </div>
      </app-container>
    );
  }
}

</script>


<style lang="less">
.org-center-container {

  .app-body {
    min-width: 1200px;
    .banner,
    .main-container-content {
      margin-bottom: 0;
    }

  }

}
</style>