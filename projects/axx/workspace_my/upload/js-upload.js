
/**
 * 将base64转换为文件
 */
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
/**
 * 上传文件
 * @param {String} bucket 
 * @param {File} File 
 */
export function upload(bucket, file, fileName){
    return getUploadInfos(bucket, fileName)
    .then(data => {
      let infos = {};
      data[0]['uploadInfo']['bodyArrs'].forEach((item)=>{
        infos[item.key] = item.value
      })
      let postData = {
        key: infos['key'],
        token: infos["token"],
        policy: infos["policy"],
        OSSAccessKeyId: infos["OSSAccessKeyId"],
        callback: infos["callback"],
        signature: infos["signature"],
        success_action_status: '200',
        host: data[0]['uploadInfo']['url']
      }
      return uploadFile(file, postData)
        
    })
  }
  /**
   * 获取七牛上传需要的token
   * @param {String} bucket 
   * @param {String} key 
   */
  function getUploadInfos(bucket, filename) {
    // let loginCookie = cookies.getItem('token');
    // cookies.setItem('token_oss', loginCookie, 30);
    return new Promise((resolve, reject)=>{
      var xhr = new XMLHttpRequest();
      xhr.open("POST", '//home.aixuexi.com/Hulk/app/teaching/v1/getToken', true)
      xhr.send(null);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            let json = JSON.parse(xhr.responseText);
            if (json.status === 1) {
              resolve(json.body)
            } else {
              reject(json)
            }
          } else {
            reject(xhr)
          }
        }
      }
      
    }).then((res)=>{
      // UPLOAD_STORAGE_KEY = res.token;
      return ajaxRequest({
        url: "//storage.aixuexi.com/api/upload/post/signature",
        method: "POST",
        data: {
          businessKey: res.bussinessKey,
          uploadFiles: [
            {
              "fileNameOrSuffix": filename
            }
          ]
        },
        openApiToken: res.token
      })
    })
    
  }
  /**
   * 上传到阿里云
   * {File} file 文件流 
   * {Object} uploadInfo 阿里需要的参数
   */
  function uploadFile(file, uploadInfo) {
    return new Promise((resolve, reject) => {
      let formdata = new FormData()
      formdata.append('key', uploadInfo.key)
      formdata.append('policy', uploadInfo.policy)
      formdata.append('OSSAccessKeyId', uploadInfo.OSSAccessKeyId)
      formdata.append('callback', uploadInfo.callback)
      formdata.append('signature', uploadInfo.signature)
      formdata.append("file", file)
      formdata.append('token', uploadInfo.token)
      
      var xhr = new XMLHttpRequest();
      xhr.open("POST", uploadInfo.host, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            let json = JSON.parse(xhr.responseText);
            if (json.status === 1) {
              resolve(json.body.url)
            } else {
              reject(json)
            }
          } else {
            reject(xhr)
          }
        }
      }
      xhr.send(formdata)
    })
  }
export function ajaxRequest(opt) {
  opt.async = opt.async === undefined ? true : false
  opt = opt || {}
  opt.method = opt.method.toUpperCase() || 'GET'
  opt.url = opt.url || ''
  opt.data = opt.data || null
  let xmlHttp = null
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest()
  }
  else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  let params = {}
  for (let key in opt.data) {
    params[key] = opt.data[key]
  }
  let postData = JSON.stringify(params)  
  return new Promise((resolve, reject) => {
    if (opt.method.toUpperCase() === 'POST') {
      xmlHttp.open(opt.method, opt.url, opt.async)
      xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
      // xmlHttp.withCredentials = true;
      if(opt.openApiToken) 
      xmlHttp.setRequestHeader('X-Storage-Authorization', opt.openApiToken)
      xmlHttp.send(postData)
    }
    else if (opt.method.toUpperCase() === 'GET') {
      xmlHttp.open(opt.method, opt.url + (postData ? '?' + postData : ''), opt.async)
      xmlHttp.withCredentials = true
      xmlHttp.send(null)

    }

    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0)) {
        if (!xmlHttp.responseText) reject()
        resolve(JSON.parse(xmlHttp.responseText).body)
      }
    }
  })
}