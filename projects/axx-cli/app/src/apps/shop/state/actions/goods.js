import API from 'apis'
export const logo_event = 'logo_event' //触发改变logo的事件
export const config_event = 'config_event' //触发改变文件处理中心
export const book_detail = 'book_detail' //修改教材详情弹窗model
export const detail_record = 'detailRecord' //详情id
export const nail_detail = 'nail_detail' //修改钉子详情弹窗model

//修改钉子详情弹窗model
export function toggleNailDetailEvent(status) { //status为 true 或者 false
  return (dispatch, getState) => {
    dispatch(setGoods({type: nail_detail, data: status}))
  }
}

//触发logo标识事件
export function changeLogoEvent(logoData) {
  return (dispatch, getState) => {
    dispatch(setGoods({type: logo_event, data: logoData}))
  }
}

//触发config文件事件
export function changeConfigEvent(config) {
  return (dispatch, getState) => {
    dispatch(setGoods({type: config_event, data: config}))
  }
}

//修改教材详情弹窗model
export function toggleBookDetailEvent(status) { //status为 true 或者 false
  return (dispatch, getState) => {
    dispatch(setGoods({type: book_detail, data: status}))
  }
}

//点击查看详情，记录当前数据
export function getRecordDetailEvent(record) {
  return (dispatch, getState) => {
    dispatch(setGoods({type: detail_record, data: record}))
  }
}

//选择性触发事件(公共方法)
export function changeEvent(ation) {
  return (dispatch, getState) => {
    dispatch(setGoods(ation))
  }
}

//公用触发函数
export function setGoods(action) {
  return {
    type: action.type,
    data: action.data
  }
}
