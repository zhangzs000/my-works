
import React, {PropTypes} from 'react'
import { Provider } from 'react-redux'
import { Row, Col, Breadcrumb} from 'antd'

import { render } from 'react-dom'
import { storeFactory } from './redux-common'

import Header from './Header'
import views from '../views'

import './base.less'

export default (App, RootReducer, Routes) => {
  const store = storeFactory(RootReducer)

  class Entry extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        // 面包屑导航
        navpath: []
      }
    }

    // 顶部按钮点击
    onTopItemClick(item) {
      console.log('item: ',item)
      location = `${item.key}.html`
    }

    // 页面面包屑
    getBreadcrumb() {
      const { navpath } = this.state

      const bread = navpath.map((item)=>{
        return (
          <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>
        )
      })

      return (
        <div className="gaosi-layout-breadcrumb">
          <Breadcrumb>
            {bread}
          </Breadcrumb>
        </div>
      )
    }

    // 页面底部
    getFooter() {
      return (
        <div className="gaosi-layout-footer">
          爱学习 版权所有 © 2016 aixuexi.com
        </div>
      )
    }

    render() {
      return (
        <div className="gaosi-layout-main">
          <Header
            items={views}
            subitems={Routes}
            handleClick={this.onTopItemClick}
          />
          {this.getBreadcrumb()}
          <div className="gaosi-layout-container gaosi-layout-content">
            <Provider store={store}>
              <App></App>
            </Provider>
            {this.getFooter()}
          </div>
        </div>
      )
    }
  }

  render(
    <Entry></Entry>,
    document.getElementById('root')
  )
}
