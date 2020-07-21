import { combineReducers } from 'redux'
import order from './order.js'
import goods from './goods.js'

export default combineReducers({
  order,
  goods
})
