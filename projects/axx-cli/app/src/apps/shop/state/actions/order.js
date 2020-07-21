import API from 'apis'
export const logo_event = 'logo_event' //触发改变logo的事件
export const config_event = 'config_event' //触发改变文件处理中心


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
