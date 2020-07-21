<!-- 底部加载更多 -->
<template>

  <div class="page-infinite-loading"
    v-show="loadingMore"
  >
    <span
    v-if="!ended">
      <div class="fading-circle">
          <div class="fading-circle-circle is-circle2"></div>
          <div class="fading-circle-circle is-circle3"></div>
          <div class="fading-circle-circle is-circle4"></div>
          <div class="fading-circle-circle is-circle5"></div>
          <div class="fading-circle-circle is-circle6"></div>
          <div class="fading-circle-circle is-circle7"></div>
          <div class="fading-circle-circle is-circle8"></div>
          <div class="fading-circle-circle is-circle9"></div>
          <div class="fading-circle-circle is-circle10"></div>
          <div class="fading-circle-circle is-circle11"></div>
          <div class="fading-circle-circle is-circle12"></div>
          <div class="fading-circle-circle is-circle13"></div>
      </div>
    </span>
    <span class="text" v-if="ended">{{endedText}}</span>
    <em class="text" v-if="loadingText" v-text="loadingText"></em>
  </div>
</template>

<script>

export default {
  
  props: {

    /**
     * 是否显示加载动画
     * 默认不显示
     */
    loadingMore: {
      type: Boolean,
      default: true
    },

    /**
     * 加载中的文案
     */
    loadingText: {
      type: String
    },

    /**
     * 是否到底
     */
    ended: {
      type: Boolean,
      default: false
    },

    endedText: {
      type: String,
      default: '没有更多啦'
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
@import '../assets/less/variable.less';
@import '../assets/less/common.less';  


.page-infinite-loading {
  text-align: center;
  height: 1rem;
  line-height: 1rem;

  div {
    display: inline-block;
    vertical-align: middle;
    margin-right: .1rem;
  }

  .text {
    position: relative;
    font-size: .24rem;
    color: #b4b4b4;
    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: .5rem;
      height: 1px;
      top: 38%;
    }

    &:before {
      left: -.7rem;
      background-image: linear-gradient(to left, #b4b4b4 20%, rgba(180, 180, 180, 0.5) 60%, rgba(180, 180, 180, 0) 100%);
    }

    &:after {
      right: -.7rem;
      background-image: linear-gradient(to right, #b4b4b4 20%, rgba(180, 180, 180, 0.5) 60%, rgba(180, 180, 180, 0) 100%);
    }
  }

}

.fading-circle {
  position: relative;
  width: .28 * 2rem;
  height: .28 * 2rem;

  div::before {
    background-color: #53aaf3;
  }
}
.fading-circle-circle {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;

}
.fading-circle-circle::before {
  content: "";
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  border-radius: 100%;
  -webkit-animation: fading-circle 1.2s infinite ease-in-out both;
          animation: fading-circle 1.2s infinite ease-in-out both;
}
.fading-circle-circle.is-circle2 {
  -webkit-transform: rotate(30deg);
          transform: rotate(30deg)
}
.fading-circle-circle.is-circle2::before {
  -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s
}
.fading-circle-circle.is-circle3 {
  -webkit-transform: rotate(60deg);
          transform: rotate(60deg)
}
.fading-circle-circle.is-circle3::before {
  -webkit-animation-delay: -1s;
          animation-delay: -1s
}
.fading-circle-circle.is-circle4 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg)
}
.fading-circle-circle.is-circle4::before {
  -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s
}
.fading-circle-circle.is-circle5 {
  -webkit-transform: rotate(120deg);
          transform: rotate(120deg)
}
.fading-circle-circle.is-circle5::before {
  -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s
}
.fading-circle-circle.is-circle6 {
  -webkit-transform: rotate(150deg);
          transform: rotate(150deg)
}
.fading-circle-circle.is-circle6::before {
  -webkit-animation-delay: -0.7s;
          animation-delay: -0.7s
}
.fading-circle-circle.is-circle7 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg)
}
.fading-circle-circle.is-circle7::before {
  -webkit-animation-delay: -0.6s;
          animation-delay: -0.6s
}
.fading-circle-circle.is-circle8 {
  -webkit-transform: rotate(210deg);
          transform: rotate(210deg)
}
.fading-circle-circle.is-circle8::before {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s
}
.fading-circle-circle.is-circle9 {
  -webkit-transform: rotate(240deg);
          transform: rotate(240deg)
}
.fading-circle-circle.is-circle9::before {
  -webkit-animation-delay: -0.4s;
          animation-delay: -0.4s
}
.fading-circle-circle.is-circle10 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg)
}
.fading-circle-circle.is-circle10::before {
  -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s
}
.fading-circle-circle.is-circle11 {
  -webkit-transform: rotate(300deg);
          transform: rotate(300deg)
}
.fading-circle-circle.is-circle11::before {
  -webkit-animation-delay: -0.2s;
          animation-delay: -0.2s
}
.fading-circle-circle.is-circle12 {
  -webkit-transform: rotate(330deg);
          transform: rotate(330deg)
}
.fading-circle-circle.is-circle12::before {
  -webkit-animation-delay: -0.1s;
          animation-delay: -0.1s
}

@-webkit-keyframes fading-circle {
  0%, 39%, 100% {
      opacity: 0
  }
  40% {
      opacity: 1
  }
}
@keyframes fading-circle {
  0%, 39%, 100% {
      opacity: 0
  }
  40% {
      opacity: 1
  }
}
</style>