<!--
  组件功能
  libaoxu 2017-3-28

-->
<template>
  <div >
    <el-dialog  v-model="searchDialogVisible" >
      <div>
      <el-input
      class="input-style"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
      </el-input>
      <el-button type="primary" @click='searchTeacher'>搜索</el-button>
      <el-button type="text" @click='showAllTeachers'>显示全部</el-button>
      </div>
      <el-tree
        class="filter-tree"
        :data="teacherList"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree">
      </el-tree> 
    </el-dialog>
  </div>
</template>

<script>
import { Button, Dialog, Input ,Tree} from 'element-ui';
import S from 'service'
import NAPI from 'nadaptor'

export default {
  
  mixins: [],

  props: {
    /*请求参数 */
    apiParams: {
      type: Object,
      default: {
      }
    },

    /*控制教师列表对话框显示*/
    value: {
      type: Boolean,
      default: false
    },

     teacherType: {
      type: Number,
      
    }
    
  },
  
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Input.name]: Input,
    [Tree.name]: Tree
  },

  computed: {

  },

  data () {
    return {
      /*搜索教师列表*/
      teacherList:[],
     /*搜索框输入文本*/
      filterText: '',
      defaultProps: {
          children: 'children',
          label: 'label'
        },
      searchDialogVisible:false
    };
  },

  methods: {
    /*初始化 获得教师列表*/
    getTeachersList () {
     
    },
    /*点击搜索，获取符合条件的选项*/
    searchTeacher () {

    },
    /*获得教师列表*/
    showAllTeachers () {

    },
    /*输入关键字进行过滤*/
    filterNode () {

    }
    
  },

  watch: {
    value (newVal) {
      if (newVal) {
      this. searchDialogVisible = true
     
      }
    }
  },

  created () {

  },

  mounted () {

  },

  render (h) {

  }
}

</script>


<style lang="less" scoped>

.my-input {
  width:50px;
  margin:12px;
  height:10px;
}
.warning {
  color:red;
  margin:10px;
}
.input-style {
  width:300px;
}

</style>