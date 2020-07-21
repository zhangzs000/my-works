/**
 * URL Template (RFC 6570) Transform.
 */

import { expand } from './url-template'

export default function (options, next) {
  var variables = [], url = expand(options.url, options.params, variables)

  variables.forEach((key) => {
    delete options.params[key]
  })

  options.variables = variables

  return { url, variables }
}
