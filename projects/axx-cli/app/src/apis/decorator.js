/**
 * 请求装饰器
 * 处理所有 get post 请求的前后
 * 如 loading 动画等
 * */
// import AL from './autoloading'
import { notification } from 'antd'
import Utils from 'utils/utils'

import Storage from './storage'

export default {
  before: (al, ae) => {
    return (req, res, next) => {
      const token = Storage.getToken()
      const XSRF_TOKEN = Utils.getCookie('XSRF_TOKEN')
      const Authorization = Utils.getCookie('Authorization')
      if(token) {
        req.headers.map['x-auth-token'] = [token]
      }
      if(XSRF_TOKEN){
        req.headers.map['X-Gerrit-Auth'] = [XSRF_TOKEN]
        req.headers.map['Authorization'] = [Authorization]
      }
    }
  },

  after: (al, ae) => {
    return (req, res, next) => {
      if(res.status === 401 || res.status === 400) {
        window.location.href = '/login.html'
      }
      if(ae && res.status >= 300 || res.status < 200) {
        return handleErr(res.statusText)
      }
      res.text()
        .then(text => {
          try {
            const body = JSON.parse(text)
            if(body.status !== 1 && ae ){
              handleErr(body.errorMessage)
            } 
            
            const token = res.headers.map['x-auth-token']            
            if(token) {
              Storage.saveToken(token[0])
            }
            if( body.errorCode === -1000000 ) {
              window.location.href = 'login.html'
            }
            if(body.errorCode === 401) {
              window.location.href = '/login.html'
            }
            
          } catch (e) {
            console.log(e)
          }
        })
    }
  }
}

function handleErr(msg) {
  notification.error({
    message: '出错啦!',
    description: msg || `操作失败，请重试`,
    duration: 3,
  })
}