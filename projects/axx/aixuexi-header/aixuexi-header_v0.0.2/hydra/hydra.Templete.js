;(function(){
	Gaosi.template = {
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
	};
})();