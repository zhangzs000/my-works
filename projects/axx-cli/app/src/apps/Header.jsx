import React, { PropTypes } from 'react'
import API from 'apis'
import Storage from 'apis/storage'

import { Icon, Dropdown, Input, Select } from 'antd'
import { Link } from 'react-router'

const Option = Select.Option

/**
 * 组件属性申明
 */
const propTypes = {
  /**
   * 顶部菜单列表
   */
  items: PropTypes.array.isRequired,

  /**
   * 菜单点击事件
   */
  handleClick: PropTypes.func.isRequired
}

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    const { subitems } = this.props
    const current = location.href.match(/\/(\w+).html/i)

    let subCurrent = ''

    // 设置当前选中的子路由
    if (location.hash === '') {
      subCurrent = subitems ? subitems.filter(sub => {
        return sub.path === '*'
      })[0].indexRoute.default : ''
    } else {
      subCurrent = location.hash
    }

    this.state = {
      // 当前选中的顶部导航项
      current: current && current[1],
      subCurrent
    }
  }

  render() {
    const { subitems } = this.props

    return (
      <div className="gaosi-layout-header" style={{backgroundColor: 'red'}}>
        HEADER
      </div>
    )
  }
}
