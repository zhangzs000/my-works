import API from 'apis'
export const logo_event = 'logo_event' //触发改变logo的事件

//触发logo标识事件
export function changeLogoEvent(logoData) {
  return (dispatch, getState) => {
    dispatch(setGoods({type: logo_event, data: logoData}))
  }
}

//公用触发函数
export function setGoods(action) {
  return {
    type: action.type,
    data: action.data
  }
}
