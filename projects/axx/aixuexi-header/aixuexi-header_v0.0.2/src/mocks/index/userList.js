export const user_list = {
  url: /\/user\/list/,
  type: 'post',
  template: function(params) {
		let uid = params.courseId;
		return {
		'1': {
            "errorCode": 0,
            "status": 1,
            "errorMessage": "",
            "body": [
                {
                    "subjectProductNames": [
                        "小学语文",
                        "小学历史"
                    ],
                    "roleNames": [
                        "管理员"
                    ],
                    "status": 1,
                    "telephone": "13333333333",
                    "name": "a刘老师",
                    "id": 2450
                },
                {
                    "subjectProductNames": [
                        "小学语文"
                    ],
                    "roleNames": [
                        "管理员"
                    ],
                    "status": 0,
                    "telephone": "13699998887",
                    "name": "b刘老师",
                    "id": 2470
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "c刘德华",
                    "id": 2471
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "d刘德华",
                    "id": 3471
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "e刘德华",
                    "id": 3472
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "f刘德华",
                    "id": 3473
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "g刘德华",
                    "id": 3474
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "h刘德华",
                    "id": 3475
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "i刘德华",
                    "id": 3476
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "j刘德华",
                    "id": 3477
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "k刘德华",
                    "id": 3478
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "l刘德华",
                    "id": 3479
                },
                {
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "roleNames": [
                        "教师"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "name": "m刘德华",
                    "id": 3480
                }
            ]
        },
        '2': {
            "errorCode": 0,
            "errorMessage": "",
            "status": 1,
            "body": [
                {
                    "roleNames": [
                        "教师"
                    ],
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "status": 0,
                    "telephone": "13333333333",
                    "id": 1450,
                    "name": "刘老师"
                },
                {
                    "roleNames": [
                        "教师"
                    ],
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "status": 0,
                    "telephone": "13699998887",
                    "id": 1470,
                    "name": "刘老师"
                },
                {
                    "roleNames": [
                        "教师"
                    ],
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "status": 0,
                    "telephone": "13866668887",
                    "id": 1471,
                    "name": "刘德华"
                }
            ]
        },
        '3': {
            "errorMessage": "",
            "status": 1,
            "errorCode": 0,
            "body": [
                {
                    "roleNames": [
                        "教师"
                    ],
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "telephone": "13333333333",
                    "name": "刘老师",
                    "id": 1450,
                    "status": 0
                },
                {
                    "roleNames": [
                        "教师"
                    ],
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "telephone": "13699998887",
                    "name": "刘老师",
                    "id": 1470,
                    "status": 0
                },
                {
                    "roleNames": [
                        "教师"
                    ],
                    "subjectProductNames": [
                        "小学数学"
                    ],
                    "telephone": "13866668887",
                    "name": "刘德华",
                    "id": 1471,
                    "status": 0
                }
            ]
        }
	  }[uid]
  }
};

export const apiGetUserHeader2 = {}