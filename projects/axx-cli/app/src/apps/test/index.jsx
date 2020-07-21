import React from 'react'

import { render } from 'react-dom'
import LoginInput from './login-input'
import { Row, Col } from 'antd'
import jsonp from './jsonp'
import './index.less'

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
  render() {
    
    return(
      <div className="xly-access form-xly-container has-feedback animated fadeIn">
        <Row>
          <Col span={10} className="content">
            <button onClick={()=>{this.handleJsonp()}}>测试jsonp</button>
            <span>{JSON.stringify(this.state.data)}</span>
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

render(<Login />,  document.getElementById('root'))
