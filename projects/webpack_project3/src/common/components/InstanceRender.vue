<!--
  v-if 和 v-show的结合的单例渲染模板
  @author libaoxu@gaosiedu.com 2017-01-04

-->
<template>

  <div class="instance-render" v-if="_isShowInstance" v-show="isShow" >
    <slot name="instance-render"></slot>
  </div>

</template>

<script>

/**
 * 模板渲染单例标记
 * @type {Boolean | undefined}
 */ 
let _isShowInstance;

export default {
  
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  
  components: {

  },

  computed: {
    _isShowInstance () {
      // 如果为true 把渲染标识置为真
      if (this.isShow) {
        _isShowInstance = this.isShow;
      }

      // 一旦渲染成功了, 就一直为真了,
      return _isShowInstance || this.isShow;
    }
  },

  data () {
    return {

    };
  },


  methods: {

  },

  events: {
    
  },

  mounted () {

  }
}

</script>


<style lang="less" scoped>



</style>