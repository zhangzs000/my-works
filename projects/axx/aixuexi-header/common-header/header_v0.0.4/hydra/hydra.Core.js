;(function(){

  var Gaosi = {
      /**
       * The version of the framework
       * @type String
       */
      version : '1.0',
      /**
       * The description of the framework
       * @type String
       */
      des : 'Previously on Marvels agents of Shield',
      
      /**
       * namespace
       * @param {ns} 命名空间,支持多级,都属于gaosi下
       */    
      namespace: function(ns) {
         if (!ns || !ns.length) {
            return null;
         }
         var levels = ns.split(".");
         var nsobj = Gaosi;
         for (var i=(levels[0] == "Gaosi") ? 1 : 0; i<levels.length; ++i) {
               nsobj[levels[i]] = nsobj[levels[i]] || {};
               nsobj = nsobj[levels[i]];
         }
         return nsobj;
    },

    /**
     * 日志
     * @param {info} 打印的日志内容
     */     
    log: function(info){
      if(this.config.logger){
        return console.log('***Gaosi LOG.INFO***', info);
      }else{
        return false;
      }
    } 
  };
  Gaosi.namespace("config");
 
  Gaosi.namespace("util");

  Gaosi.namespace("window");

  Gaosi.namespace('header');

  Gaosi.namespace('footer');

  Gaosi.namespace('template');

  Gaosi.namespace('style');

  window.Gaosi = Gaosi;

})();

/**
 * 页面初始化完成后执行
 */

 /**
 * @desc 封装给开发者,工厂总代理
 */

/**
   * 插件列表
   */