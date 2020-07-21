export const courseUser_account1 = {
  url: /\/courseUser\/1\/submit/,
  type: 'post',
  template: function(params) {
    //console.log(params)
		let uid = params.courseId;
		return {
		'1': {
          "errorCode": 0,
          "status": 1,
          "body": 1,
          "errorMessage": ""
      },
    '2': {
          "errorCode": 0,
          "status": 1,
          "body": 0,
          "errorMessage": ""
      },
       '3': {
              "errorCode": 0,
              "status": 1,
              "body": 0,
              "errorMessage": ""
          }
	  }[uid]
  }
};

export const apiGetUserHeader2 = {}