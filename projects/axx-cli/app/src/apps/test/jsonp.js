
function jsonp({url, data}) {

  return new Promise((resolve) => {

    if (typeof data == 'string') {
      callback = data
      data = {}
    }
    
    // 创建 script 标签并加入到页面中
    let callbackName = ('_jsonp_' + Math.random()).replace(".", "");
  
    let hasParams = url.indexOf('?')
    url += hasParams ? '?' : '&'
    let params = ''
  
    for (let i in data) {
      params += i + '=' + data[i] + '&'
    }
  
    url += params + 'callback=' + callbackName
  
    // 创建标签
    let script = document.createElement('script')
    script.setAttribute('src', url)
    document.querySelector('head').appendChild(script)
    
    // 执行回调函数
    window[callbackName] = (response) => {
      window[callbackName] = null
      resolve(response)
    }
  })


}
export default jsonp