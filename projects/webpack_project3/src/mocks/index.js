import Mock from 'mockjs'
import * as token from 'mocks/token';
import dd from 'mocks/dd'
/**
 * 模拟数据的map集合
 * @type {Object}
 */ 
console.log('token: ',token)
console.log('dd: ',dd)
const MOCK_OBJECT = Object.assign(
  token,
  {T5: dd}
)
console.log('MOCK_OBJECT: ',MOCK_OBJECT)
export default {
  intercept (key, params) {
    let mockItem = MOCK_OBJECT[key]

    mockItem && Mock.mock(mockItem.url, mockItem.type, function () {

      let template = mockItem.template

      return typeof template === 'function' ? template(params) : template
    })
  }
}