<template>
<div class="select-line">
  <div class="select-key" v-html="title + ':'">
  </div>
  <div class="select-value">
    <span
      v-if="hasAllSelection"
      @click = "selectKey({id: -1, name: '全部'}, -1, searchKey)"
      :class = '{"active": location === -1}'
    >
      全部
    </span>
    <span
      v-if="isShowClassType || searchKey !== 'ClassType'"
      v-for="(item, index) in info"
      @click = "selectKey(item, index, searchKey)"
      :class = '{"active": location === index }'
    >
      {{ item.name }}
    </span>
    <span class="belong-class-type" v-if="!isShowClassType && searchKey === 'ClassType'" style="color:#aaa;">
      学科，年级，学期有一个为"全部"时，无法显示班型列表
    </span>
  </div>
</div>
</template>

<script>

const props = {

  hasAllSelection: {// 是否含有“全部”这个选项,默认有
    type: Boolean,
    default: true
  },
  title: {// 左边的标题，比如：年纪，学科，学期等
    type: String,
    default: ''
  },

  // 搜索关键字，用于纵向区分各个selection
  searchKey: {
    type: String,
    default: ''
  },
  isShowClassType: {// 是否显示班型列表，用于避免班型过多，显示太多行，不利于用户体验
    type: Boolean,
    default: true
  },
  active: {//控制哪个选项高亮
    type: Number
  },

  /**
   * 列表信息
   */
  info: {
    type: Array,
    default: [
      {
        id: '',
        name: ''
      }
    ] 
  }
};

export default {
  props: props,
  components: {

  },

  computed: {
    
  },

  data () {
    // console.log(this.active)
    return {
      location: this.getLocationVal(this.active)
    };
  },

  methods: {
    /**
     * 重置被选中项的位置为第一个，即初始化位置
     */
    refreshList(activeIndex){
      this.location = activeIndex;
    },

    /**
     * 选择当前选项 当前选中的信息派发到父层
     */
    selectKey (selectedItem, activeIndex, searchKey) {
      this.location = activeIndex;
      this.$emit('selected', selectedItem, activeIndex, searchKey);
    },

    getLocationVal (val) {
      return val || val === 0 ? val : -1
    },

    setLocation(val) {
      // 处理为0的情况
      // -1：“全部”; 0：选第一个; 1：选第二个;       
      this.location = this.getLocationVal(val)
    }
  },

  watch: {
    active (newVal) {
      // 只有当不等于情况才赋值
      newVal !== this.location && this.setLocation(newVal)
    }
  },

  mounted () {

  }
}

</script>


<style lang="less" scoped>
@import '~commonStyleLess/variable.less';
.select-line{
  padding: 5px 15px 5px;
  line-height: 25px;
  .select-key{
    float: left;
    margin-right: 15px;
  }
  .select-value {
    float: left;
    width: 90%;
    span{
      display: inline-block;
      margin: 0 5px 5px 0;
      padding: 0 20px;
      border-radius: 30px;
    }
    /*span:hover, span[class='active']{*/
    span:hover, span.active{
      background: @var-theme-color;
      cursor: pointer;
      color: #fff;
    }
    .belong-class-type:hover{
      color: @var-text-color;
      background: #fff;
      cursor: default;
    }
  }
  &:after{
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  } 
}

</style>