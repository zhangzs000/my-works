/**
 * 本地存储管理
 */

const SUBJECT_NAME = 'GAOSI_SUBJECT_ID'

const ACCESSTOKEN = 'ACCESSTOKEN'

window.STORAGE_KEY = 'widget_knowledge_key'
window.STORAGE_TYPE = 'widget_upload_type'

const SEASON = [
  {id: '2', name: '暑假'},
  {id: '3', name: '秋季'},
  {id: '4', name: '寒假'},
  {id: '1', name: '春季'},
]

export default {
  // 获取当前学科ID
  getSubjectId() {
    return localStorage.getItem(SUBJECT_NAME) || '7'
  },

  getSubjectName() {
    const subjectId = this.getSubjectId()

    try {
      return GLOBAL_DATA.subjectProduct.filter(item => item.id == subjectId)[0].name
    } catch (e) {
      console.log(e)
      return false
    }
  },

  // 保存学科Id
  saveSubjectId(id) {
    localStorage.setItem(SUBJECT_NAME, `${id}`)
  },

  //获取当前学科的体系
  getSchemeList() {
    const subjectId = this.getSubjectId()
    return GLOBAL_DATA.scheme
              .filter(item => item.subjectProductId == subjectId)
              .map(item => {
                item.key = item.id + ''
                item.name = item.name
                return item
              })

  },

  //获取当前学科的教材版本
  getBookVersionList() {
    const subjectId = this.getSubjectId()
    return GLOBAL_DATA.bookVersion
              .map(item => {
                item.key = item.id + ''
                return item
              })
  },

  //获取课时
  getCourseTimeList(){
    const subjectId = this.getSubjectId()
    return GLOBAL_DATA.courseTime
              .filter(item => item.subjectProductId == subjectId)
              .map(item => {
                item.key = item.id + ''
                item.name = item.content
                return item
              })
  },

  //获取年级
  getGradeList(){
    const subjectId = this.getSubjectId()

    switch (subjectId) {
      case '22':
        return [
          {
            key: '2',
            name: '一年级',
            options: SEASON
          },
          {
            key: '3',
            name: '二年级',
            options: SEASON
          },
          {
            key: '4',
            name: '三年级',
            options: SEASON
          },
          {
            key: '5',
            name: '四年级',
            options: SEASON
          },
          {
            key: '6',
            name: '五年级',
            options: SEASON
          },
          {
            key: '7',
            name: '六年级',
            options: SEASON
          },
        ]
      case '7':
      case '11':
      case '13':
        return [
          {
            key: '65',
            name: '初一',
            options: SEASON
          },
          {
            key: '66',
            name: '初二',
            options: SEASON
          },
          {
            key: '67',
            name: '初三',
            options: SEASON
          },
          {
            key: '73',
            name: '初四',
            options: SEASON
          },
        ]
      case '30':
      case '31':
      case '32':
      case '33':
        return [
          {
            key: '68',
            name: '高一',
            options: SEASON
          },
          {
            key: '70',
            name: '高二',
            options: SEASON
          },
          {
            key: '71',
            name: '高三',
            options: SEASON
          },
        ]
      default:
        return false
    }
  },

  //存储token
  getToken() {
    return localStorage.getItem(ACCESSTOKEN) || false
  },

  //获取token
  saveToken(token) {
    localStorage.setItem(ACCESSTOKEN, token)
  },

  //获取上传id
  getPointId() {
    return localStorage.getItem(STORAGE_KEY) || false
  },

  // 获取上传type
  getPointType() {
    return localStorage.getItem(STORAGE_TYPE) || false
  },

  // 获取题目的 buckName
  getTopicBucket() {
    return JSON.parse(localStorage.getItem('BucketName'))['topicBucket']
  },

  // 获取碎片（如教材）的 buckName
  getDiyBucket() {
    return JSON.parse(localStorage.getItem('BucketName'))['diyBucket']
  },

}
