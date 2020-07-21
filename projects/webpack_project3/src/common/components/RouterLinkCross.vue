
<!--
  跨路由通用组件
 zhangjian 2017-3-20

-->



<template>

  <a :href="result" :target="target" >{{ title }}
    <slot></slot>
  </a>

</template>

<script>

import SRC_CONFIG from 'src/config';

const CONFIG_ROOT = SRC_CONFIG.ROUTE && SRC_CONFIG.ROUTE.ROUTER_PATH || '';

export default {
  
  props: {
    /**
     *
     *
     */
    to: {
      type: Object | String,
      default: {
        /**
         *
         * @type {String}
         */
        path: '',


        query: {},
        

        param: {}
      }
    },

    /**
     *
     */
    title: {
      type: String,
      // required: true
    },

    /**
     *
     */
    root: {
      type: String,
      default: ''
    },
    /**
     *是否打开空白页
     */
    target: {
      type: String,
      default: '_self'
    }
  },
  
  components: {

  },

  computed: {
    //最后生成的url,格式：path/？params=***&params2=***
    result: {
      get () {
        if (typeof this.to === 'string') {
          return this.to
        } else if (this.to && this.to.constructor === Object) {
          let _path = this.to.path
          let _query = this.to.query
          let _url = this.$common.stringifyParams(_query)
          let _root;

          _root = this.root || CONFIG_ROOT
          return _root + _path + '?' + _url
        }
      }
    },
   
  },

  data () {
    return {};
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
