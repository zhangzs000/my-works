import decorator from 'service/decorator'
import serviceConfig from 'service/config'

const { SHORT_PARAMS_LIST } = serviceConfig

/**
 * 生成Service单例
 */
let __instance__ = (function () {
  let instance;

  return (newInstance) => {
    // 第一步 传入null, 不进行赋值, 第一次返回null, 根据该返回, 判断没有实例
    // 第二部 传入单例值, 进行实例赋值, 
    // 之后 每次调用之前传入null值, 如果传null, 不进行赋值, 返回上一次的实例值, 根据该返回, 判断是否已有实例
    if (newInstance) {
      instance = newInstance;
    }
    return instance;
  } 
} ())

/**
 * Service 类
 * 提供和后端交互
 * @param reqInstance 传入执行请求的实体对象
 * @return 经过装饰器后的Service对象
 */
class Service {

  constructor (reqInstance) {
    if (__instance__(null)) {
      return __instance__(null);
    }
    __instance__(this);
  }

  setDecorator (decoratorStr) {
    this.decoratorStr = decoratorStr;
  }

  setReqInstance (reqInstance) {
    this.ajax = reqInstance;
  }

  setLogInstance (logInstance) {
    this.log = logInstance;
  }

  /**
   * ajax的方法封装
   */
  request (params, done, err, appId) {
    
    this.ajax({
      url: params.url,
      type: params.type,
      dataType: 'json',
      data: params.data,
      beforeSend: params.beforeSend,
      success: done,
      error: err
    }, appId);

  }

  /**
   * 传入异步请求方式 Vue.http
   *  Vue.http.get(url, [options])
   *  Vue.http.head(url, [options])
   *  Vue.http.delete(url, [options])
   *  Vue.http.jsonp(url, [options])
   *  Vue.http.post(url, [body], [options])
   *  Vue.http.put(url, [body], [options])
   *  Vue.http.patch(url, [body], [options]).then(successCallback, errorCallback).catch(function(e){})
   * 
   *  @param {Vue.http } vueHttp Vue.http 下的异步请求方法
   */
  setVueResourceInstance (vueHttp) {
    this.vueHttp = vueHttp;
  }

  vueResource (params, done, error) {
    const resourceFunc = this.vueHttp[params.type];
    // 两个参数的请求
    const isShort = SHORT_PARAMS_LIST.indexOf(params.type) > -1

    if (typeof resourceFunc === 'function') {
      resourceFunc.bind(this.vueHttp)
      (params.url, isShort ? params.options : params.data, params.options)
      .then((response) => {
        if (response.status === 200) {
          // 响应成功回调
          done(response);
        } else {
          error(response);
        }
      })
      // .catch((e) => {
      //   console.error('[service]: ', e)
      //   error(e)
      // });

    } else {
      console.warn('this vue-resouce http function is not possible : ' + resourceFunc);
    }

  }
}

export default new Service();