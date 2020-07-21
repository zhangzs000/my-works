<!--
  到页面顶部
  libaoxu@gaosiedu.com 2017-04-17
-->
<script>
import _throttle from 'lodash/throttle'
const getScrollTop = function () {
  let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
  return scrollTop = typeof scrollTop === 'number' ? scrollTop : +scrollTop.replace('px', '')
}
const setScrollTop = function (num) {
  let target = num === 0 ? num : (num + 'px')
  document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = target
}
const scrollThrottled = (vm) => _throttle((e) => {
  if (getScrollTop() > 100) {
    vm.pageUpShow = true
  } else {
    vm.pageUpShow = false
  }
}, 300)
const getPxByNum = (num) => {
  return typeof num === 'number' ? (num + 'px') : num
}
//线性运动函数（用于scrolltop 0 的缓冲效果）
const scrollToTop = (scrollDuration, target) => {
  let scrollStep = -window.pageYOffset / (scrollDuration / 15);
  let scrollInterval = setInterval(function() {
  if (window.pageYOffset != target) {
  if(window.pageYOffset < -scrollStep){
  scrollStep = -window.pageYOffset
  }
  //第一个参数向右滚动距离，第二个参数向下滚动距离
  window.scrollBy(0, scrollStep);
  } else clearInterval(scrollInterval);
  }, 10);
};
export default {
  
  mixins: [],
  props: {
  },
  
  components: {
  },
  computed: {
    mobileStyle() {
      if (!this.$common.isPc) {
        const commonWidth = 44
        return {
          pageUp: {
            width: getPxByNum(commonWidth),
            height: getPxByNum(commonWidth),
            right: getPxByNum(10),
            opacity: 1
          },
          icon: {
            'height': getPxByNum(commonWidth),
            'line-height': getPxByNum(commonWidth),
            'font-size': getPxByNum(20)
          }
        }
      }
      return {}
    }
  },
  data () {
    return {
      pageUpShow: false
    };
  },
  methods: {
    bindScroll () {
      window.addEventListener('scroll', scrollThrottled(this))
    },
    backToTop () {
      scrollToTop(300,0)
    }
  },
  watch: {
  },
  created () {
    this.bindScroll()
  },
  mounted () {
    
  },
  render (h) {
    return (
      <transition name="back-top-fade">
        <div class="page-up" 
          v-show={this.pageUpShow}
          on-click={this.backToTop}
          style={this.mobileStyle.pageUp}
        >
          <i class="el-icon-caret-top" style={this.mobileStyle.icon}></i>
        </div>
      </transition>
    )
      
  }
}
</script>
<style lang="less" scoped>
@import '~commonStyleLess/variable.less';
.page-up {
  display: block;
  background-color: @var-theme-color;
  position: fixed;
  right: 40px;
  bottom: 100px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  opacity: .4;
  transition: opacity 300ms, transform 300ms;
  z-index: 999;
  &:hover {
    opacity: 1;
  }
  i {
    color: #fff;
    display: block;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
  }
}
.back-top-fade-enter,
.back-top-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0!important;
}
</style>