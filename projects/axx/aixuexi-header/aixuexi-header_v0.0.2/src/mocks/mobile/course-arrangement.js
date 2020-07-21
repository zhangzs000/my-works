export const get_signin_course = {
  url: /\/course\/arrangement/,
  type: 'post',
  template: {
    "body": {
      "arrangementId": 1,
      "arrangementName": "课堂氛围营造",
      "courseId": 1, 		
      "courseName": "第29磨课训练营小学数学专场",
      'startTime': 1495812600000,//接口待添加
      'signTime': 1495812600000,
      'endTime': 1495827000000,//接口待添加
      "userApplyStatus": 6,
    },
    "errorCode": 0,
    "errorMessage": "",
    "status": 1
  }
};

export const apiGetUserHeader2 = {}