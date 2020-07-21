import React from 'react'

import { Form, Input, Button, message } from 'antd'
import API from 'apis'
import Utils from 'utils/utils'

const FormItem = Form.Item;

class LoginInput extends React.Component {
  constructor() {
    super()
  }

  async handleSubmit() {
    // debugger
    let result = this.props.form.getFieldsValue()
    let list = {}
    try{
      let res = await API.code.common.login.save(result)
      let cookieList = JSON.parse(res.body)
      list['GerritAccount'] = cookieList['Cookie'].split('=')[1]
      list['XSRF_TOKEN'] = cookieList['X-Gerrit-Auth']
      list['Authorization'] = cookieList['Authorization']
      Utils.setCookie(list, 1)
      // window.location.href = '/code.html#/project'
    }catch (e) {
      message.error('用户名或密码错误')
    }
  }

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 0,
        },
      },
    }

    const { getFieldDecorator } = this.props.form;

    return(
      <Form>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('username', { initialValue: '' })(
            <Input placeholder="请输入用户名" style={{ height: 40 }}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', { initialValue: '' })(
            <Input type="password" placeholder="请输入密码"  style={{ height: 40 }}/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button onClick={this.handleSubmit.bind(this)} type="primary" htmlType="submit">登录</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({})(LoginInput);