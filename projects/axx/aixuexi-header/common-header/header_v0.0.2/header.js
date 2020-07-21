
const GS_header_template = 
	`<div class="header-bg" >
      <!-- 头部容器 -->
      <div class="header-container clearfix" style="width: 1200px;min-width: 1200px">
        <!--2017 头部的logo-->
        <a class="header-left-logo" href="http://xuexia0.aixuexi.com/"></a>
        <div class="header-left-list" >
          <!-- 服务端的数据 该菜单为1的时候, 有权限, 能看到; active-noNav:如果没有二级导航-->     
          <div class="part">
            <!-- linkKey 限制链接 -->
            <%= for (var key in p.LINK_MAP) { 
            	var LINK_ITEM = p.LINK_MAP[key]; 
            =%>
            <span class="part-item">
              <a href="javascript: void(0)"
              ><%==LINK_ITEM.name=%></a>
                <!-- 二级导航部分-->  
                  <div class="nav-content-list clearfix">
                    <div class="item" >
                      <a class="link" target="_self" href="javascript:void(0)">                   
                        <span>课件</span>
                      </a>
                    </div>
                  <div class="active-bar"></div>
                </div>
             </span>
            <%=
			  }
            =%>
          </div>
        </div>

        <!-- 右侧 -->
        <ul class="header-right">
          <!-- 用户 -->
          <li class="part user">
            <span class="text"><b class="text-username"></b></span>
            <ul class="user-oparate">
              <li class="item pass" >
                <a href="http://i.aixuexi.com/modifyPwd/toModifyPwd">修改密码</a>
              </li>
              <li class="item logout">
                <a href="javascript:void(0)">退出</a>
              </li>
            </ul>
          </li>
          <!--帮助-->
          <li class="part help">
            <a class="text" href="http://help.aixuexi.com">帮助</a>
          </li>
          <!-- 任务 -->
          <!--@click="headerListClick($event, task)"-->
          <li class="part task">
            <div class="text-wraper">
              <span class="text">任务
                <i class="mini-num-tast">0</i>  
              </span>
            </div>

            <div class="click-block tast-list">
              <!-- 任务列表 -->
            </div>
          </li>
          <!-- 消息 -->
          <li class="part message">
            <div class="text-wraper">
              <span class="text"></span> 
              <i class="mini-num" >0</i>
            </div> 
            <div class="click-block message-list">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="logo-nav-conatiner"></div>
  </div>`;
(function(){
  window.undefined = window.undefined;
  var gaosi = {
      /**
       * The version of the framework
       * @type String
       */
      version : '1.0',
      
      /**
       * namespace
       * @param {ns} 命名空间
       */    
    namespace: function(ns) {
         if (!ns || !ns.length) {
            return null;
         }
         var levels = ns.split(".");
         var nsobj = gaosi;
         for (var i=(levels[0] == "gaosi") ? 1 : 0; i<levels.length; ++i) {
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
        return console.log('***GAOSI LOG.INFO***', info);
      }else{
        return false;
      }
    } 
  };

  gaosi.namespace("config");

  gaosi.namespace("util");

  gaosi.namespace("window");

  gaosi.namespace('header');

  gaosi.namespace('template');

  window.gaosi = gaosi;

})();
(function(){
	gaosi.header = function (html) {
		var oDiv = document.createElement("div");
		oDiv.innerHTML = html
		document.body.insertBefore(oDiv,document.body.firstChild);
	}
})()

var JTemp = function(){
	console.log('JTemp: ',this)
	function Temp(htmlId, p){
		p = p || {};//配置信息，大部分情况可以缺省
		this.htmlId = htmlId;
		this.fun;
		this.oName = p.oName || 'p';
		this.TEMP_S = p.tempS || '<%=';
		this.TEMP_E = p.tempE || '=%>';
		this.getFun();
	}
	Temp.prototype = {
		getFun : function(){
			var _ = this,
				// str = $('#' + _.htmlId).html();
				// str = GS_header_template;
				str = gaosi.template.header;
			if(!str) _.err('error: no temp!!');
			var str_ = 'var ' + _.oName + '=this,f=\'\';',
				s = str.indexOf(_.TEMP_S),
				e = -1,
				p,
				sl = _.TEMP_S.length,
				el = _.TEMP_E.length;
			for(;s >= 0;){
				e = str.indexOf(_.TEMP_E);
				if(e < s) alert(':( ERROR!!');
				str_ += 'f+=\'' + str.substring(0, s) + '\';';
				p = _.trim(str.substring(s+sl, e));
				if(p.indexOf('=') !== 0){//js语句
					str_ += p;
				}else{//普通语句
					str_ += 'f+=' + p.substring(1) + ';';
				}
				str = str.substring(e + el);
				s = str.indexOf(_.TEMP_S);
			}
			str_ += 'f+=\'' + str + '\';';
			str_ = str_.replace(/\n/g, '');//处理换行
			var fs = str_ + 'return f;';
			this.fun = Function(fs);
		},
		build : function(p){
			return this.fun.call(p);
		},
		err : function(s){
			alert(s);
		},
		trim : function(s){
			return s.trim?s.trim():s.replace(/(^\s*)|(\s*$)/g,""); 
		}
	};
	console.log('return temp v2: ',Temp)
	return Temp;
}();

// function completed() {
// 	document.removeEventListener( "DOMContentLoaded", completed );
// 	window.removeEventListener( "load", completed );
// 	initHeader()
// }

// if ( document.readyState === "complete" ||
// 	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

// 	// Handle it asynchronously to allow scripts the opportunity to delay ready
// 	window.setTimeout( initHeader() );

// } else {

// 	// Use the handy event callback
// 	document.addEventListener( "DOMContentLoaded", completed );

// 	// A fallback to window.onload, that will always work
// 	window.addEventListener( "load", completed );
// }

// var initHeader = function(html){
// 	var oDiv = document.createElement("div");
// 	oDiv.innerHTML = html
// 	document.body.insertBefore(oDiv,document.body.firstChild);
// }


(function(){
	gaosi.template = {
		header: `<div class="header-bg" >
	      <!-- 头部容器 -->
	      <div class="header-container clearfix" style="width: 1200px;min-width: 1200px">
	        <!--2017 头部的logo-->
	        <a class="header-left-logo" href="http://xuexia0.aixuexi.com/"></a>
	        <div class="header-left-list" >
	          <!-- 服务端的数据 该菜单为1的时候, 有权限, 能看到; active-noNav:如果没有二级导航-->     
	          <div class="part">
	            <!-- linkKey 限制链接 -->
	            <%= for (var key in p.LINK_MAP) { 
	            	var LINK_ITEM = p.LINK_MAP[key]; 
	            =%>
	            <span class="part-item">
	              <a href="javascript: void(0)"
	              ><%==LINK_ITEM.name=%></a>
	                <!-- 二级导航部分-->  
	                  <div class="nav-content-list clearfix">
	                    <div class="item" >
	                      <a class="link" target="_self" href="javascript:void(0)">                   
	                        <span>课件</span>
	                      </a>
	                    </div>
	                  <div class="active-bar"></div>
	                </div>
	             </span>
	            <%=
				  }
	            =%>
	          </div>
	        </div>

	        <!-- 右侧 -->
	        <ul class="header-right">
	          <!-- 用户 -->
	          <li class="part user">
	            <span class="text"><b class="text-username"></b></span>
	            <ul class="user-oparate">
	              <li class="item pass" >
	                <a href="http://i.aixuexi.com/modifyPwd/toModifyPwd">修改密码</a>
	              </li>
	              <li class="item logout">
	                <a href="javascript:void(0)">退出</a>
	              </li>
	            </ul>
	          </li>
	          <!--帮助-->
	          <li class="part help">
	            <a class="text" href="http://help.aixuexi.com">帮助</a>
	          </li>
	          <!-- 任务 -->
	          <!--@click="headerListClick($event, task)"-->
	          <li class="part task">
	            <div class="text-wraper">
	              <span class="text">任务
	                <i class="mini-num-tast">0</i>  
	              </span>
	            </div>

	            <div class="click-block tast-list">
	              <!-- 任务列表 -->
	            </div>
	          </li>
	          <!-- 消息 -->
	          <li class="part message">
	            <div class="text-wraper">
	              <span class="text"></span> 
	              <i class="mini-num" >0</i>
	            </div> 
	            <div class="click-block message-list">
	            </div>
	          </li>
	        </ul>
	      </div>
	    </div>
	    <div class="logo-nav-conatiner"></div>
	  </div>`
	}
})()