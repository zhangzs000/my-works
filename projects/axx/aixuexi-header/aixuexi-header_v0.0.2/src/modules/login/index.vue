<!--
  开发人员登录页
  libaoxu
-->
<template>
  <div class="">
    <div class="login-form-container">
      <el-form ref="form" :model="form" label-width="80px" action="" method="post" onsubmit="">

        <el-form-item label="用户名" prop="telephone">
          <el-input type="text" v-model="form.telephone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">登录</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="table-container">
      <el-table :data="table.data" border style="width: 100%" max-height="300">
        <el-table-column prop="username" label="用户名" width="160">
        </el-table-column>
        <el-table-column prop="telephone" label="手机号" width="160">
        </el-table-column>
        <el-table-column prop="insName" label="机构名" width="188">
        </el-table-column>
        <el-table-column prop="doubleTeacherStatus" label="机构类型" width="160"
          :filters="table.filters"
          :filter-method="filterDoubleTeacherStatus">
          <template scope="scope">
            <el-tag :type="scope.row.doubleTeacherStatus === '1' ? 'primary' : 'success'" close-transition>{{scope.row.doubleTeacherStatus | doubleTeacherStatusFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="insName" label="操作" width="130">
          <template scope="scope">
            <el-button type="success" size="mini" @click="tableRowSubmitHandle(scope)">登录</el-button>
            <el-button type="danger" size="mini" @click="deleteTableRowHandle(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>

</template>

<script>
import S from 'service';
import NAPI from 'nadaptor';
import { getLocalStorage } from 'utils/getStorage'
import { Input, FormItem, Form, Button, Message, TableColumn, Table, Tag } from 'element-ui';

import * as apis from './apis'
import commonApis from 'common/entry/apis'

S.extend(apis)
S.extend(commonApis)

const loginStorage = getLocalStorage('LOGIN', Array)

const MESSAGE_DEFAULT = {
  showClose: true,
  duration: 2000
};

const SUCCESS_MSG = function (message, func) {
  return Message(Object.assign({
    type: 'success',
    message,
    onClose: func
  }, MESSAGE_DEFAULT));
};

const ERROR_MSG = function (message, func) {
  return Message(Object.assign({
    type: 'error',
    message,
    onClose: func
  }, MESSAGE_DEFAULT));
};

const doubleTeacherStatusMap = {
  0: '普通机构',
  1: '听课机构',
  2: '主讲机构'
}

const maxTableRow = 20

export default {

  props: {

  },

  components: {
    [Input.name]: Input,
    [FormItem.name]: FormItem,
    [Form.name]: Form,
    [Button.name]: Button,
    [TableColumn.name]: TableColumn,
    [Table.name]: Table,
    [Tag.name]: Tag
  },

  data() {
    const tableData = loginStorage.fetch()
    const firstInfo = tableData[0] || {
      telephone: '',
      password: ''
    }

    return {
      form: {
        telephone: firstInfo.telephone,
        password: firstInfo.password
      },

      table: {
        filters: [
          { text: '主讲机构', value: 2 },
          { text: '听课机构', value: 1 },
          { text: '普通机构', value: 0 }
        ],
        data: loginStorage.fetch()
      }
    };
  },

  computed: {
    api() {
      return {
        form: {
          // 数据请求的 username字段, 就是用户信息的 telephone
          username: this.form.telephone,
          password: this.form.password
        }
      }
    }
  },

  watch: {
    'table.data': {
      handler(data) {
        loginStorage.save(data)
      },
      deep: true
    }
  },

  methods: {
    isExcludeTableData (info) {
      return this.table.data.findIndex(item => item.telephone === info.telephone) === -1
    },

    sortTableData (info) {
      let data = this.table.data
      let index = data.findIndex(item => item.telephone === info.telephone)

      if (index > -1) {
        this.table.data = data.splice(index, 1).concat(data)
      }

    },

    saveInfo (info) {
      if (info && typeof info === 'object') {
        const data = this.table.data
        data.unshift(Object.assign({}, this.form, info))

        // 最多maxTableRow条吧
        if (data.length > maxTableRow) {
          this.table.data = data.splice(0, maxTableRow)
        }
      }
    },

    /**
      * 重置
      */
    handleReset(e) {
      this.$refs.form.resetFields();
    },

    /**
     * 提交
     */
    handleSubmit(e) {
      const DAY = 24 * 3600;

      this.trimFormValue()

      S.passwordLogin(this.api.form, {
        beforeSend: function (params) {
          const { options } = params
          if (options && options.headers && options.headers.token) {
            NAPI.user.setToken('')
            delete options.headers.token
          }
        }
      })
      .then(res => {
        // 将token放入user中
        NAPI.user.setToken(res.token, res.expireDays * DAY);

        SUCCESS_MSG('登录成功');

        return this.isExcludeTableData(this.form)
          ? S.loginInfo(null, {loading: false})
          : this.sortTableData(this.form)
      }, res => {
        ERROR_MSG('登录失败')
        return Promise.reject(res)
      })
      .then((info) => {
        this.saveInfo(info)
      })
      // .catch((e) => {
      //   console.warn(e)
      // })
    },

    trimFormValue (arr = ['telephone', 'password']) {
      arr.forEach(key => {
        this.form[key] = this.form[key].trim()
      })
    },

    filterDoubleTeacherStatus(value, row) {
      return row.doubleTeacherStatus === value;
    },

    tableRowSubmitHandle(scope) {
      Object.assign(this.form, scope.row)
      this.handleSubmit(scope)
    },

    deleteTableRowHandle(scope) {
      var data = this.table.data
      data.splice(scope.$index, 1)

      let nowForm = data[0] || {}
      Object.keys(this.form).forEach((key, index) => {
        this.form[key] = nowForm[key] || ''
      })
    }
  },

  filters: {
    doubleTeacherStatusFilter(val) {
      return doubleTeacherStatusMap[val] || '无'
    }
  },

  events: {

  },

  created () {

  },

  mounted() {

  }
}

</script>


<style lang="less" scoped>
  .login-form-container {
    width: 400px;
    margin: 100px auto 50px;
  }
  .table-container {
    width: 800px;
    margin: 0px auto;
  }
</style>

<style>
  body {
    background-color: #fff;
  }
</style>