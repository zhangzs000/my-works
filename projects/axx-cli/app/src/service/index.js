import Http from './http/index'
import Resource from './resource'

export default {

  /**
   * ajax请求函数
   * 请求参数说明
   * @param url	string	请求URL
   * @param body	Object, FormData, string	Data to be sent as the request body
   * @param headers	Object	Headers object to be sent as HTTP request headers
   * @param params	Object	Parameters object to be sent as URL parameters
   * @param method	string	HTTP method (e.g. GET, POST, ...)
   * @param timeout	number	Request timeout in milliseconds (0 means no timeout)
   * @param before	function(request)	Callback function to modify the request options before it is sent
   * @param progress	function(event)	Callback function to handle the ProgressEvent of uploads
   * @param credentials	boolean	Indicates whether or not cross-site Access-Control requests should be made using credentials
   * @param emulateHTTP	boolean	Send PUT, PATCH and DELETE requests with a HTTP POST and set the X-HTTP-Method-Override header
   * @param emulateJSON	boolean	Send request body as application/x-www-form-urlencoded content type
   * @return function
   */
  Http,

  /**
   * RESTful API请求实体
   * 如：Resource('someItem{/id}')
   * @return object
   * { get save update remove } 几个rest方法
   */
  Resource

}
