/**
 * Body Interceptor.
 */

import Url from '../../url/index'
import { when, isString, isArray, isObject, isFormData } from '../../util'

export default function (request, next) {
  let _body = isArray(request.body) ? request.body : Object.assign({}, request.body)

  // 删除url匹配的参数
  let
  exepArr = request.url.match(/\{([^\{\}]+)\}|([^\{\}]+)/g)
  exepArr.shift()
  exepArr.forEach(exep => {
    for(var key in _body) {
      if(exep.indexOf(key) >= 0) {
        delete _body[key]
      }
    }
  })

  if (isFormData(_body)) {

    request.headers.delete('Content-Type')

  } else if (isObject(_body) || isArray(_body)) {

    if (request.emulateJSON) {
        request.body = Url.params(_body)
        request.headers.set('Content-Type', 'application/x-www-form-urlencoded')
    } else {
        request.body = JSON.stringify(_body)
    }
  }

  next((response) => {

    Object.defineProperty(response, 'data', {

      get() {
        return this.body
      },

      set(body) {
        this.body = body
      }

    })

    request.after && request.after.call(this, request, response)

    return response.bodyText ? when(response.text(), text => {

      var type = response.headers.get('Content-Type')

      if (isString(type) && type.indexOf('application/json') === 0) {

        try {
          response.body = JSON.parse(text)
        } catch (e) {
          response.body = JSON.parse(text.replace(")]}'", ""))
        }

      } else {
        response.body = text
      }

      return response

    }) : response

  })
}
