import React from 'react'
import {Router, Route, IndexRedirect, hashHistory} from 'react-router'
import Entry from '../entry'

import './index.less'

import ApplyMgr from './apply-mgr'
import uploadCourse from './upload-course'


/**
 * teacher页面入口router
 */
var routes = [
  { path : '/applyMgr/:applyId', component: ApplyMgr, name: '报名管理'},
  { path : '/uploadCourse', component: uploadCourse, name: '录播课程上传'},
]

class App extends React.Component {
  constructor () {
    super()
  }

  componentWillUnmount() {
    sessionStorage.removeItem('courseId')
  }

  render () {
    return (
     <div>
        <Router history={hashHistory} children={routes} />
     </div>
    )
  }
}

Entry(App, ()=> {})
