<!-- 加载中 -->
<template>
  <div class="loading"
    v-show="loading"
    :transiton="loading"
  >
    <div class="loading-wraper">
      <div class="loading-spinner">
        <span class="loading-shake"></span>
      </div>

      <!-- 文案 -->
      <span class="loading-text"
        v-if="loadingTextShow"
        v-text="loadingText"
      >
      </span>
    </div>

    <!-- 弹层 -->
    <div class="loading-mask"></div>
  </div>

</template>

<script>

export default {

  props: {
    /**
     * 是否显示loading
     */
    loading: {
      type: Boolean,
      default: false
    },

    /**
     * loading文案是否显示
     */
    loadingTextShow: {
      type: Boolean,
      default: false
    },

    /**
     * loading文案
     */
    loadingText: {
      type: String,
      default: '加载中...'
    }
  },

  components: {

  },

  data () {
    return {

    };
  },

  methods: {

  }
}

</script>


<style lang="less" scoped>

.loading {
  opacity: 1;

  .loading-wraper {
    position: fixed;
    top: 50%;
    left: 50%;
    
    padding: .3rem;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: .1rem;
    background-color: rgba(0, 0, 0, .66);
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    z-index: 8888;

    .loading-spinner {
      display: inline-block;
      text-align: center;

      .loading-shake {
        display: block;
        border: .04rem solid #53aaf3;
        border-right-color: transparent;
        border-radius: 999px;
        width: .64rem;
        height: .64rem;

        -webkit-animation: loading-spinner-roate .8s infinite linear;
                     animation: loading-spinner-roate .8s infinite linear;

      }

    }

    .loading-text {
      display: block;
      color: #fff;
      text-align: center;
      font-size: .32rem;
      margin-top: .2rem;
    }
  }

  /* 遮罩 */
  .loading-mask {

  }

}

.loading-transition {
  transition: opacity .2s linear;
}
.loading-leave,
.loading-enter {
  opacity: 0;
}

/* 循环动画 */
@-webkit-keyframes loading-spinner-roate {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes loading-spinner-roate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}


</style>