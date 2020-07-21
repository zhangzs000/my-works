<!--
  横幅区域
  @author libaoxu@gaosiedu.com 2016-12-15

-->
<template>

  <div class="banner" :class="{'banner-width': projectName === 'AIXUEXI_MALL'}">
    <!-- 折叠 -->
    <a class="link fold"
      v-show="!isSpread"
      :href="fold.link || 'javascript:void(0)'" 
      @click="!fold.link && (isSpread = !isSpread)"
    >
      <img v-if="fold.imgUrl" :src="fold.imgUrl" alt="">
    </a>

    <!-- 展开 -->
    <a class="link spread"
      v-show="isSpread"
      :href="spread.link || 'javascript:void(0)'"
    >
      <img v-if="spread.imgUrl" :src="spread.imgUrl" alt="">
    </a>

    <span class="btn" @click="isSpread = !isSpread;">∨&nbsp;&nbsp;{{ isSpread ? '收起': '展开' }}</span>

  </div>
</template>

<script>

import S from 'service';
import SRC_CONFIG from 'src/config'
const ROOT_URL = SRC_CONFIG.PC_SCHEME;
export default {
  
  props: {
    
  },
  
  components: {

  },

  data () {
    return {
      projectName: ROOT_URL,
      /**
       * 是否展开
       * @type {Boolean}
       */ 
      isSpread: false,

      fold: {
        link: null,
        imgUrl: ''
      },

      spread: {
        link: null,
        imgUrl: ''
      }
    };
  },

  methods: {

    initService () {
      S.servicDisplayColumn(null, {
        isToast: false
      })
      .then((data) => {
        this.fold.imgUrl = data.smallImgUrl;

        this.spread.link = data.largeImgClickUrl;
        this.spread.imgUrl = data.largeImgUrl;
      });
    }

  },

  events: {
    
  },

  mounted () {

    this.initService();

  }
}

</script>


<style lang="less" scoped>
// @import '~commonStyleLess/variable.less';

.banner {
  // width: @var-content-width-num * 1px;
  margin: 0 auto 18px;
  position: relative;
  max-width: 1200px;
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 38px;
    width: 76px;
    background-color: rgba(0, 0, 0, .7); 
    text-align: center;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  .fold {
    min-height: 60px;
  }

  .link {
    display: block;
    cursor: pointer;
  }
}
.banner-width {
  width: 1200px;
}

</style>