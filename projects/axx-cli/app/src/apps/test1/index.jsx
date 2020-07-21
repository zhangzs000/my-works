import React from 'react'

import { render } from 'react-dom'
import LoginInput from './login-input'
import { Row, Col } from 'antd'
import jsonp from './jsonp'
import './index.less'
import { Provider } from 'react-redux'
import { connectFactory, storeFactory } from '../redux-common'
import * as admCalendarActions from './state/actions/adm-calendar'
import admCalendarReducers from './state/reducers/adm-calendar'
import API from 'apis'
class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }
  async handleJsonp(){
   let data =  await jsonp({
      url: 'http://localhost:8080/getinfo',
      data: {
        name: 'zzz'
      }
    })
    this.setState({data})
    console.log('data: ',data)
  }
  handleRedux=()=>{
    let value = {name: '1'}
    // API.CRM.agencyPhoto.admCalendar.getAdmCalendar(value).then(json => {
      API.code.common.login.save(value).then(res =>{
      const data = res.body.body
      if (data) {
        let info = data
        // 触发action(有redux-thunk中间件自然也可以在actions做异步请求)=>  reducer更改状态 =>
        // connect内部含有 HOC 将acticon 和 state传到当前组件方便使用
        this.props.admCalendarActions.admFinishRate(info)
      }
    })
  }
  render() {
    console.log('this.props: ',this.props)
    let  { admfinishRate } = this.props
    return(
      <div className="xly-access form-xly-container has-feedback animated fadeIn">
        <Row>
          <Col span={10} className="content">
            <button onClick={()=>{this.handleJsonp()}}>测试jsonp</button>
            <span>测试jsonp: {JSON.stringify(this.state.data)}</span>
            <br></br>
            <button onClick={()=>{this.handleRedux()}}>测试Redux</button>
            <span>测试Redux: {admfinishRate}</span>
            <a href="javascript:void(0)" className="xly-logo"> </a>
            <div className="form-box">
            <LoginInput />
            </div>
          </Col>
          <Col span={14} className="intro intro-login"> </Col>
        </Row>
      </div>
    )
  }
}
Login = connectFactory(
  state => {
    return state
  },
  { admCalendarActions }
)(Login)
// render(<Login />,  document.getElementById('root'))

const store = storeFactory(admCalendarReducers)

render(<Provider store={store}>
  <Login />
</Provider>,  document.getElementById('root'))

