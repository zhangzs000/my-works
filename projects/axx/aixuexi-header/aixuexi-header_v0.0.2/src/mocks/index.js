/**
 * 新写的mock 需要import一下, 并放入Object.assign中
 */

import Mock from 'mockjs'

import * as header from 'mocks/header'
import * as courseDetail from 'mocks/index/courseDetail'
import * as loginInfo from 'mocks/index/loginInfo'
import * as signUpRecords from 'mocks/index/signUpRecords'
import * as getCourseList from 'mocks/index/getCourseList'
import * as userList from 'mocks/index/userList'
import * as subjectProductList from 'mocks/index/subjectProductList'
import * as roleList from 'mocks/index/roleList'
import * as courseUserSignUpConfirm from 'mocks/index/courseUserSignUpConfirm'
import * as courseUserAccount1 from 'mocks/index/courseUserAccount1'
import * as courseUserAccount0 from 'mocks/index/courseUserAccount0'
import * as courseDetailMobile from 'mocks/mobile/course-detail'
import * as homeworkList from 'mocks/mobile/homework-list'
import * as courseList from 'mocks/mobile/course-list'
import * as getInsInfo from 'mocks/mobile/get-insinfo'
import * as getMyNotDoneHomeworkList from 'mocks/mobile/nodone-homework-list'
import * as courseArrangement from 'mocks/mobile/course-arrangement'
import * as userAttendance from 'mocks/mobile/user-attendance'
import * as evaluateList from 'mocks/mobile/evaluate-list'
import * as homeworkDetail from 'mocks/mobile/homework-detail'
/**
 * 模拟数据的map集合
 * @type {Object}
 */ 
const MOCK_OBJECT = Object.assign(
  header,
  courseDetail,
  loginInfo,
  signUpRecords,
  getCourseList,
  userList,
  subjectProductList,
  roleList,
  courseUserSignUpConfirm,
  courseUserAccount0,
  courseUserAccount1,
  courseDetailMobile,
  homeworkList,
  courseList,
  getInsInfo,
  getMyNotDoneHomeworkList,
  courseArrangement,
  userAttendance,
  evaluateList,
  homeworkDetail
)

export default {
  intercept (key, params) {
    let mockItem = MOCK_OBJECT[key]

    mockItem && Mock.mock(mockItem.url, mockItem.type, function () {
      let template = mockItem.template

      return typeof template === 'function' ? template(params) : template
    })
  }
}