export const courseUser_account0 = {
  url: /\/courseUser\/0\/submit/,
  type: 'post',
  template: function(params) {
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