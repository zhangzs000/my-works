export const get_evaluate_list = {
  url: /\/courserUser\/evaluate\/list/,
  type: 'get',
    template: {
      "body": [
            {
                "userId":125,			
                "userName":"张三",			
                "totalScore":100,		
            },
            {
                "userId":15,			
                "userName":"李四",			
                "totalScore":80,		
            },
            {
                "userId":43,			
                "userName":"王云",			
                "totalScore":66,		
            },
            {
                "userId":1,			
                "userName":"小鱼",			
                "totalScore":50,		
            } 			
        ],
      "errorCode": 0,
      "errorMessage": "",
      "status": 1
    }
};

export const apiGetUserHeader2 = {}