import order from './backupStore/order.js'

import {
  logo_event,
  config_event
} from '../actions/order'

const initialState = {
  order: order,  //order项目的备份储存中心
  crudConfig: order.config, //crud的config文件
  logo: ''   //select的标识
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case logo_event: //select的标识
      return {
        ...state,
        logo: action.data
      }
      break
    case config_event: //crud的config文件
      return {
        ...state,
        crudConfig: action.data
      }
      break
    default:
      return state
  }
}
