import Goods from './backupStore/goods.js'

import {
  logo_event,
  config_event,
  nail_detail,
  book_detail,
  detail_record
} from '../actions/goods'

const initialState = {
  goods: Goods,  //goods项目的备份储存中心
  crudConfig: Goods.config, //crud的config文件
  logo: '',   //select的标识,
  nailDetail: false, //用于标识钉子详情的弹窗标识
  bookDetail: false, //用于标识教材详情的弹窗标识
  detailRecord: '', //用于标识教材详情的弹窗标识
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case logo_event: //select的标识
      return {
        ...state,
        logo: action.data
      }
    case config_event: //crud的config文件
      return {
        ...state,
        crudConfig: action.data
      }
    case nail_detail: //钉子详情事件
      return {
        ...state,
        nailDetail: action.data
      }
    case book_detail: //教材详情事件
      return {
        ...state,
        bookDetail: action.data
      }
    case detail_record: //记录点击详情当前页数据
      return {
        ...state,
        detailRecord: action.data
      }
    default:
      return state
  }
}
