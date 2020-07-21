export const role_list = {
  url: /\/role\/list/,
  type: 'post',
  template: {
    "body": [
        {
            "name": "超级管理员",
            "type": 1,
            "remark": "超级管理员",
            "code": "super_manager",
            "id": 1,
            "status": 1
        },
        {
            "name": "管理员",
            "type": 1,
            "remark": "管理员",
            "code": "manage",
            "id": 2,
            "status": 1
        },
        {
            "name": "教师",
            "type": 1,
            "remark": "教师",
            "code": "teacher",
            "id": 3,
            "status": 1
        },
        {
            "name": "教务",
            "type": 1,
            "remark": "教务",
            "code": "jiaowu",
            "id": 4,
            "status": 1
        },
        {
            "name": "招生负责人",
            "type": 1,
            "remark": "招生负责人",
            "code": "admissions_officer",
            "id": 5,
            "status": 1
        },
        {
            "name": "前台",
            "type": 1,
            "remark": "前台",
            "code": "kefu",
            "id": 6,
            "status": 1
        }
    ],
    "errorCode": 0,
    "status": 1,
    "errorMessage": ""
    }
};

export const apiGetUserHeader2 = {}