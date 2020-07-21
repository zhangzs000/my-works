import React from 'react'
import { Modal, Select, Spin, message, Breadcrumb } from 'antd'
import { hashHistory, Link } from 'react-router'
import './index.less'

/**
 * 题模页面
 */
export default class ApplyMgr extends React.Component {
  constructor (props) {
    super()
    this.state= {
      addStudent: false,
      modal: {}, //提示弹窗
      loading: false
    }
  }
  render () {
    const { addStudent } = this.state
    return (
      <div>
        {
          //加载器
        }
        {
          this.state.loading ?
            <div className="gs-loading">
              <Spin  className="gs-loading_spin"/>
            </div> : ''
        }
        <div>
          <Breadcrumb separator=">"  style={{marginLeft: 15}}>
            <Breadcrumb.Item><Link to="/courseMgr">培训管理</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/courseMgr">课程管理</Link></Breadcrumb.Item>
            <Breadcrumb.Item>报名管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    )
  }
}
