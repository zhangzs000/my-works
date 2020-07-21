export const COMMONFINISHRATEADM = 'commonFinishRateAdm'

// 获取招生日历的完成率
export function admFinishRate(value) {
  return (dispatch, getState)=>{
    dispatch({
      type: COMMONFINISHRATEADM,
      data: value
    })
  }
}
