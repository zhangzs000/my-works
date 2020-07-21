/**
 * HTTP Request.
 */

import Url from '../url/index'
import Headers from './headers'
import Response from './response'
import { assign, toUpper } from '../util'

export default class Request {

  constructor(options) {
    this.body = null
    this.params = {}
// debugger
    assign(this, options, {
      method: toUpper(options.method || 'GET')
    })

    if (!(this.headers instanceof Headers)) {
      this.headers = new Headers(this.headers)
    }
  }

  getUrl(){
    let template = Url(this)
    this.variables = template.variables
    return template.url
  }

  getBody(){
    return this.body
  }

  respondWith(body, options) {
    return new Response(body, assign(options || {}, {url: this.getUrl()}))
  }

}
