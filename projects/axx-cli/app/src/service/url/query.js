/**
 * Query Parameter Transform.
 */

import Url from './index'
import { each } from '../util'

export default function (options, next) {
  var urlParams = Object.keys(Url.options.params), query = {}, template = next(options)

  if(options.method !== 'POST' && options.method !== 'PUT') {
    each(options.params, (value, key) => {
      if (urlParams.indexOf(key) === -1) {
        query[key] = value
      }
    })
    query = Url.params(query)
    if(query) {
      template.url += (template.url.indexOf('?') == -1 ? '?' : '&') + query
    }

  }

  return template
}
