/**
 * text的状态
 */
import { COMMONFINISHRATEADM } from '../actions/adm-calendar'


const initialState = {
  admfinishRate: 0,

}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case COMMONFINISHRATEADM:
      return {
        ...state,
        admfinishRate: action.data
      }
      break
    default:
      return state
  }
}
