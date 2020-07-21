import React from 'react'
import {Router, Route, IndexRedirect, hashHistory} from 'react-router'
import Entry from '../entry'
import ShopGoods from './goods/index.jsx'
import rootReducer from './state/reducers/index'
import './index.less'

/**
 * ST页面入口router
 */
var routes = [
  { path: '/shopGoods', component: ShopGoods, name: '商品列表'},
]

class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
     <div>
        <Router history={hashHistory} children={routes} />
     </div>
    )
  }
}

Entry(App, rootReducer)
