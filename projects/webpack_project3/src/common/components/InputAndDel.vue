<!-- 带删除输入框 -->
<template>
  <div class="input-row"
    :class="{'active': inputVal}"
  >
    <label v-html="inputLabel"></label>

    <div class="input-box">
      <input 
        :class="addClass"
        :type="inputType" 
        :maxlength="maxLength"
        :placeholder="placeholder"
        v-model="inputVal"
        :value="inputVal"
        autocomplete="off"
      >

      <div class="del-wraper"
        :class="{'show': inputVal}"
      >
        <em class="del-input-val" 
        @click="this.inputVal = '';"></em>
      </div>  
    </div>
      
    </div>

</template>

<script>

export default {
  
  props: {
    
    /**
     * input 输入类型
     */
    inputType: {
      type: String,
      default: 'text'
    },

    /**
     * 最大长度
     */
    maxLength: {
      type: String
    },

    /**
     * 该行中label显示的文案
     */
    inputLabel: {
      type: String,
      default: ''
    },

    /**
     * input 输入的值, 根据该值判断是否显示高亮, 及删除按钮
     */
    inputVal: {
      type: String,
      default: ''
    },

    /**
     * 输入框focus之前显示
     */
    placeholder: {
      type: String
    },

    /**
     * 需要绑定的class
     */
    addClass: {
      type: Object
    }

  },

  components: {

  },

  data () {
    return {

    };
  },

  events: {
    'value-change' (msg) {
      
    }
  },

  watch: {

    /**
     * input值的变化监听,
     */
    inputVal (val) {
      // 1 发出定义事件input-change, 并传入的新值
      //    1.1 不能用dispatch统一派发事件给父级, 需要用$emit 让父级监听每个组件自己的事件
      this.$emit('input-watch', val);

    },

    receiveVal () {
      this
    }
  }
}

</script>


<style lang="less" scoped>
@import '../assets/less/variable.less';
@import '../assets/less/common.less';  

@bottom-num: .18;
@bottom: .18rem;
@top: .58rem;
@top-num: .58;

.absolute-middle {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.active-color {
  color: @blue-color;
}
.active-bg-color {
  background-color: @blue-color;
}
.active-border-color {
  border-color: @blue-color;
}

.input-row {
  @font-num: .3;
  @height: (@top-num + @bottom-num + @font-num) * 1rem;
  position: relative;
  border-bottom: 1px solid @border-color;
  color: @grey-color;
  font-size: .3rem;

  .active-border-color();
  .active-color();
  /*&.active {*/
  /*}*/

  label {
    position: absolute;
    width: 1.1rem;
    /*bottom: @bottom;*/
    top: @top;
    padding-left: .16rem;
  }

  .input-box {
    padding: 0;
    position: relative;
    height: @height;
    overflow: hidden;
    /*border: 1px solid red;*/

    input {
      position: absolute;
      // 因为input边框默认会给字体上下流出空隙, padding-bottom: 0; 会隐藏一部分问题, 所以 减去字体的一半左右
      top: (@top-num - @font-num / 1.8) * 1rem;
      bottom: 0;
      left: 1.5rem;
      font-size: .3rem;
      line-height: initial;
      border: 0 none;
      /*.com-padding-y(@top, @bottom);*/
      outline: none;
      padding-top: 0;
      /*border: 1px solid #000;*/
      border-radius: 0;
    }

    .del-input-val {
      top: (@top-num - @font-num / 1.8) * 1rem;
    }

  }

  /* 删除按钮 */
  .del-wraper {
    position: absolute;
    height: 100%;
    width: .7rem;
    right: 0;
    bottom: 0;
    display: none;
  }

  .del-input-val {
    position: absolute;
    width: .32rem;
    height: .32rem;
    /* 手机显示不居中, 往上偏移点 */
    text-align: center;
    border-radius: 999px;
    background-color: #cacacf;
    .absolute-middle();

    &:before,
    &:after {
      content: '';
      display: block;
      background-color: #fff; 
      width: .22rem;
      height: 1px;
      .absolute-middle();
    }

    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
  
}

</style>