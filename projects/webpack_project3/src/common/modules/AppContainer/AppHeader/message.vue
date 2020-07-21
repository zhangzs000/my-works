<!--
  任务列表
  libaoxu@gaosi.edu.com 2016-12-23

-->
<template>

  <div class="message-list-container">
    <ul class="message-list">
      <li class="item" 
        v-for="obj in messageData.pageData"
        :class="{
          'normal': obj.status === 0 && obj.level === 0, 
          'important': obj.status === 0 && obj.level === 1, 
          'readed': obj.status !== 0}"
        >
        <p class="message-content" v-html="obj.content"></p>
        <span class="message-time">{{ obj.createDate | timeFormat}}</span>
      </li>
    </ul>

    <p v-if="messageData.pageIndex < messageData.totalPage" class="bottom-more">
      <a @click="loadMore">加载更多</a>
    </p>
    <p  v-else class="bottom-more">
      已加载全部<br> 只保存最近30天消息
    </p>
  </div>

</template>

<script>
// const mock =  {
//   pageData: [{
//     content: '齐亚静为您新建班级：<a target="_blank" href="http://ke.aixuexi.com/shouke/classList">齐齐测试专用班型数学一年级</a>',
//     createDate: 1480327067000,
//     id: 299437,
//     level: 1,
//     status: "1",
//     telphone: "15201569320",
//     updateDate: 1480417923000,
//     xsType:0
//   },{
//     content: '李宝旭为您新建班级：<a target="_blank" href="http://ke.aixuexi.com/shouke/classList">齐齐测试专用班型数学一年级</a>',
//     createDate: 1480327067000,
//     id: 299437,
//     level: 1,
//     status: "1",
//     telphone: "15201569320",
//     updateDate: 1480417923000,
//     xsType:0
//   }],
//   pageIndex: 2,
//   pageSize: 20,
//   startRow: 0,
//   totalCount: 1,
//   totalPage: 2
// };
export default {
  
  props: {
    /**
     * 列表数据 
     */
    messageData: {

    }
  },
  
  components: {

  },

  data () {
    return {
    };
  },

  computed: {
   
  },

  methods: {
    loadMore (e) {

      this.$emit('load-more', e, { pageIndex: ++this.messageData.pageIndex });

    }
  },

  events: {
    
  },

  mounted () {

  },

  filters: {
    timeFormat (time) {
      return new Date(time).format('MM-dd hh:mm');
    }
  }
}

</script>


<style lang="less" scoped>

.message-list {
  position: relative;

  .item {
    padding: 10px 15px;
    min-height: 40px;
    border-bottom: 1px solid #E3E8E9;
    text-align: left;
    line-height: 22px;
    font-size: 14px;
  
    &:hover {
      background-color: #ECF5EF;
    }

  }



  .message-time {
    font-size: 10px;
    color: #838C86;
  }

  .bottom-more {

    position: absolute;
    width: 100%;
    bottom: 0;
    margin-top: 70px;
    font-size: 14px;
    color: #4c587B;
    line-height: 20px;
    margin-bottom: 10px;

  }
}


</style>

<style lang="less">

.message-list {
  .item {
    .message-content {
      a {
        font-size: 12px;
      }
    }
 
    &.readed .message-content {
      @color: #838C86;
      color: @color;

      a {
        color: @color;
      }
    }

    &.normal .message-content {
      @color: #4c587B;
      color: @color;

      a {
        color: @color;
      }
    }

    &.important .message-content {
      @color: red;
      color: @color;

      a {
        color: @color;
      }
    }

  }
}  
</style>