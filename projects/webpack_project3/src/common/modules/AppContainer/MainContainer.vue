<!--
  主容器: 页面开发主要内容和逻辑在此区域
  @author libaoxu@gaosiedu.com 2016-12-15

-->
<template>
  <div class="main-container-content">
    <slot></slot>
  </div>

</template>

<script>

import NAPI from 'nadaptor';

export default {
  
  props: {

    /**
     * 主容器个别组件所占用的高度
     */ 
    compStaticHeight: {
      type: Number,
      default: 0
    },

    topHeight: {
      type: Number,
      default: 0
    },

    bottomHeight: {
      type: Number,
      default: 0
    }
  },
  
  components: {

  },

  data () {
    return {

    };
  },

  methods: {

    /**
     * 设置主容器最小高度
     * 当数据量小的时候, 控制主容器最小高度, 使当前页正好需要撑开整个可视区
     */ 
    setContainerMinHeight () {
      let innerHeight = window.innerHeight;
     
      var offsetParentTop = this.$common.getOffsetParent(this.$el).top;
      this.$el.style.minHeight = (innerHeight - this.bottomHeight - offsetParentTop) + 'px';
    },
    // ???????????
    // watchWindowResize (func) {

    //   NAPI.listener.on(window, 'resize', (e) => {

    //     // 上一百毫秒还没执行, 则清除定时器, 执行本次, 防止resize频率过高
    //     this.timer && clearTimeout(this.timer);

    //     this.timer = setTimeout(func, 16.67);

    //   });

    // }

  },

  events: {
    
  },

  mounted () {

    this.$nextTick(this.setContainerMinHeight);

    // this.watchWindowResize(this.setContainerMinHeight.bind(this));

  }
}

</script>


<style lang="less" scoped>

.main-container-content {
  margin: 0 auto 18px;
  background-color: #fff;
  padding: 10px 40px 40px;
  box-sizing: border-box;
}


</style>