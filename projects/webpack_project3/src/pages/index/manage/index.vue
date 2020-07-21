<template>
 <div class="p-mycourse-deatail">
    <el-button type="primary">管理员页面</el-button>
  </div> 
</template>

<script>
import S from 'service';
import NAPI from 'nadaptor';
import { Button } from "element-ui";

export default {
  mixins: [],

  props: {

  },
  components: {
    [Button.name]: Button
  },
  computed: {

  },
  data () {
    return {
       params: {
          page: 1, 
          scanType: 3, 
          userId: NAPI.user.get().userId,
          insId: NAPI.user.get().insId  
        }
    };
  },

  methods: {
    getData(){
      S.course_list(
        this.params, {
        isToast: false
      }).then((data)=>{
        console.log('getData: ',data)
      });
    }
  },

  watch: {

  },

  created () {

  },

  mounted () {
     this.getData();
  },

  render (h) {

  }
}
</script>

<style>

</style>
