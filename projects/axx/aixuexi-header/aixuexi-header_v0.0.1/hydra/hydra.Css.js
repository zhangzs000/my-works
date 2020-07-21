;(function(){
	Gaosi.Css = {
		reset: `
		/*
		  基本样式
		*/
		html, body, div, span, applet, object, iframe,
		h1, h2, h3, h4, h5, h6, p, blockquote, pre,
		a, abbr, acronym, address, big, cite, code,
		del, dfn, em, img, ins, kbd, q, s, samp,
		small, strike, strong, sub, sup, tt, var,
		b, u, i, center,
		dl, dt, dd, ol, ul, li,
		fieldset, form, label, legend,
		table, caption, tbody, tfoot, thead, tr, th, td,
		article, aside, canvas, details, embed, 
		figure, figcaption, footer, header, hgroup, 
		menu, nav, output, ruby, section, summary,
		time, mark, audio, video {
			margin: 0;
			padding: 0;
			border: 0;
			font-size: 16px;
			font: inherit;
			vertical-align: baseline;
		}
		button, input {
		  font-family: "微软雅黑", "Microsoft Yahei", sans-serif, "Helvetica Neue", Helvetica, STHeiTi;
		}
		/* 
		  HTML5 重置
		*/
		article, aside, details, figcaption, figure, 
		footer, header, hgroup, menu, nav, section {
			display: block;
		}
		body {
		  background-color: #f5f8fb;
			line-height: 1;
		}
		ol, ul {
			list-style: none;
		}
		blockquote, q {
			quotes: none;
		}
		blockquote:before, blockquote:after,
		q:before, q:after {
			content: '';
			content: none;
		}
		a {
		  text-decoration: none;
		  color: #333;
		}
		table {
			border-collapse: collapse;
			border-spacing: 0;
		}
		img {
		  vertical-align: top;
		  object-fit: cover;
		}


		/*
		  基础重写
		*/
		html {
		  background-color: #f5f8fb;
		  font-size: 50px; 
		  min-height: 100%;
		  /* ihpone overflow:scroll 流畅滑动 */
		  -webkit-overflow-scrolling: touch;
		          overflow-scrolling: touch;

		  /* 解决最小字体方案 */
		  -webkit-text-size-adjust: 100%;
		      -ms-text-size-adjust: 100%;

		  	/*解决移动端点击会有一闪的状态*/
		  -webkit-tap-highlight-color: transparent;
		     -moz-tap-highlight-color: transparent;
		      -ms-tap-highlight-color: transparent;
		       -o-tap-highlight-color: transparent;
		          tap-highlight-color: transparent;

		}

		body{
		  background-color: #f5f8fb;
		  font-size: 14px;
		  min-height: 100%;
		  font-family: "微软雅黑", Microsoft YaHei, sans-serif, Source Sans Pro, Helvetica, "Helvetica Neue", STHeiTi;
		  /* 禁止选中文本（如无文本选中需求，此为必选项） 
		  -webkit-user-select: none;   
		  user-select: none;*/

		  -webkit-overflow-scrolling: touch;
		}

		input,
		select,
		button,
		textarea {
		  margin: 0;
		  padding: 0;
			-webkit-appearance: none;
		      -moz-appearance: none;
		       -ms-appearance: none;
		        -o-appearance: none;
		           appearance: none;
		  border: 0 none;
		  outline: none;
		}
		button::focus {
		  outline: none;
		}
		input::-webkit-input-placeholder { /* WebKit browsers */ 
		  color: #e9eaee; 
		} 
		input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
		  color: #e9eaee; 
		} 
		input::-moz-placeholder { /* Mozilla Firefox 19+ */ 
		  color: #e9eaee; 
		} 
		input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
		  color: #e9eaee; 
		} 
		input::input-placeholder { /* Internet Explorer 10+ */ 
		  color: #e9eaee; 
		}

		/* 清楚表单自动填充之后出现的背景黄色 */
		input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
		  background-color: rgba(255, 255, 255, 0);
		  -webkit-box-shadow: 0 0 0 999px #fff inset; 
		          box-shadow: 0 0 0 999px #fff inset; 
		}

		/*
		  ui
		*/
		img {
		  width: 100%;
		  height: auto;
		}
		.show-important {
		  display: block !important;
		}
		.hide-important {
		  display: none !important;
		}
		.clearfix {
		  *zoom: 1;
		}
		.fl {
		  float: left;
		}
		.fr {
		  float: right;
		}
		.clearfix:before,
		.clearfix:after {
		  display: table;
		  height:0;
		  line-height: 0;
		  visibility:hidden;
		  content: "";
		}
		.clearfix:after {
		  clear: both;
		}

		.hide {
		  display: none;
		}

		.show {
		  display: block;
		}

		/*单行样式溢出*/
		.base-text-over {
		  word-break: break-all;
		  word-wrap: break-word;
		  white-space: nowrap;
		  overflow: hidden;
		  text-overflow: ellipsis;
		}

		/* 词内断句 */
		.base-break-text {
		  word-wrap: break-word;
		  word-break: break-all;
		}

		.base-width-1200 {
		  width: 1200px;
		  margin: 0 auto;
		}
		.base-width-960 {
		  width: 960px;
		}
		.base-margin-auto {
		  margin: 0 auto;
		}
		`,
		header: `
			.header-bg {
			  width: 100%;
			  height: 74px;
			  margin: 0 auto;
			  position: relative;
			  z-index: 3;
			  background-color: #fff;
			}
			.logoNavShadow {
			  box-shadow: 0 1px 6px #ccc;
			}
			.header-container {
			  margin: 0 auto;
			}
			.header-left-list {
			  position: relative;
			  float: left;
			}
			.header-left-list .part {
			  float: left;
			  height: 74px;
			  line-height: 74px;
			}
			.header-left-list .part .part-item {
			  display: inline-block;
			  position: relative;
			  height: 74px;
			  line-height: 74px;
			}
			.header-left-list .part a {
			  display: inline-block;
			  color: #333;
			  font-size: 15px;
			  padding: 0 15px;
			  position: relative;
			  z-index: 10;
			  font-family: '微软雅黑';
			  /*
			      &.active,
			      &:hover {
			        color: #fff;
			        cursor: pointer;
			        background-color: @var-theme-color;
			      }
			      */
			}
			.header-left-list .part a.active {
			  color: #fff;
			  cursor: pointer;
			  background-color: #89ba28;
			  background-image: url(../images/header/2017/active_arrow.png);
			  background-repeat: no-repeat;
			  background-position: bottom center;
			  height: 74px;
			  line-height: 74px;
			}
			.header-left-list .part a.active:hover {
			  color: #fff;
			}
			.header-left-list .part a.active-noNav {
			  color: #fff;
			  cursor: pointer;
			  background-color: #89ba28;
			  line-height: 74px;
			}
			.header-left-list .part a.active-noNav:hover {
			  color: #fff;
			}
			.header-left-list .part a:hover {
			  cursor: pointer;
			  color: #89ba28;
			}
			.header-left-list .part:first-of-type {
			  margin-left: 0;
			}
			.header-right {
			  float: right;
			}
			.header-right .part {
			  float: right;
			  font-size: 15px;
			  text-align: center;
			  color: #4c587B;
			  cursor: pointer;
			  position: relative;
			  height: 74px;
			  line-height: 74px;
			  box-sizing: border-box;
			}
			.header-right .part .text-wraper {
			  position: absolute;
			  width: 100%;
			  height: 74px;
			  line-height: 74px;
			  z-index: 30;
			}
			.header-right .part .text {
			  display: inline-block;
			  position: relative;
			  line-height: 74px;
			}
			.header-right .part .text .mini-num-tast {
			  content: '';
			  position: absolute;
			  top: 20px;
			  right: -18px;
			  background-color: #e60012;
			  width: 20px;
			  height: 20px;
			  line-height: 20px;
			  border-radius: 999px;
			  font-size: 10px;
			  font-style: normal;
			  color: #fff;
			}
			.header-right .part .mini-num {
			  content: '';
			  position: absolute;
			  top: 20px;
			  right: 3px;
			  background-color: #e60012;
			  width: 20px;
			  height: 20px;
			  line-height: 20px;
			  border-radius: 999px;
			  font-size: 10px;
			  font-style: normal;
			  color: #fff;
			}
			.header-right .part .click-block {
			  display: none;
			  position: absolute;
			  overflow: hidden;
			}
			.header-right .part.active .text-wraper {
			  background-color: #fff;
			  border: 1px solid #ddd;
			  border-bottom: 0;
			  border-top: 0;
			  box-shadow: none;
			}
			.header-right .part.active .click-block {
			  display: block;
			  position: relative;
			  top: 72px;
			  background-color: #fff;
			  border: 1px solid #ddd;
			  overflow: hidden;
			  z-index: 20;
			  /*padding: 4px;*/
			  /*border: 4px solid #fff;*/
			  color: #4c597b;
			}
			.header-right .part.active .messge .text-wrapper {
			  z-index: 23;
			}
			.header-right .service {
			  margin-right: 15px;
			}
			.header-right .task {
			  width: 66px;
			}
			.header-right .task .tast-list {
			  top: 74px;
			  left: -280px;
			  height: 440px;
			  width: 640px;
			  background-color: #fff;
			}
			.header-right .message {
			  width: 50px;
			}
			.header-right .message .text {
			  display: inline-block;
			  height: 74px;
			  width: 30px;
			  background-image: url(../images/header/2017/message.png);
			  background-repeat: no-repeat;
			  background-position: center center;
			}
			.header-right .message .message-list {
			  left: -143px;
			  height: 437px;
			  width: 338px;
			}
			.header-right .help {
			  width: 66px;
			}
			.header-right .help a:hover {
			  color: #89ba28;
			}
			.header-right .user {
			  width: 130px;
			  cursor: pointer;
			}
			.header-right .user .text {
			  left: -6px;
			  height: 74px;
			  line-height: 74px;
			}
			.header-right .user .text .text-username {
			  display: inline-block;
			  max-width: 90px;
			  height: 74px;
			  overflow: hidden;
			  line-height: 74px;
			  white-space: nowrap;
			  text-overflow: ellipsis;
			}
			.header-right .user .text:after {
			  display: block;
			  content: '';
			  position: absolute;
			  width: 12px;
			  height: 8px;
			  top: 50%;
			  margin-top: -3px;
			  right: -20px;
			  background-image: url(../images/header/arrow-down.png);
			  background-repeat: no-repeat;
			  transition-property: transform;
			  transition-duration: .3s;
			}
			.header-right .user:hover {
			  background-color: #fff;
			  border: 1px solid #ddd;
			  border-bottom: 0;
			  border-top: 0;
			  box-shadow: none;
			}
			.header-right .user:hover .text:after {
			  transform: rotate(180deg);
			}
			.header-right .user:hover .user-oparate {
			  display: block;
			  opacity: 1;
			}
			.header-right .user .user-oparate {
			  position: absolute;
			  border: 1px solid #ddd;
			  border-top: 0 none;
			  width: 100%;
			  top: 74px;
			  left: -1px;
			  background-color: #fff;
			  display: none;
			  opacity: 0;
			  transition: display .3s;
			  box-sizing: content-box;
			}
			.header-right .user .user-oparate .item {
			  background-repeat: no-repeat;
			  background-position: 14px center;
			  height: 50px;
			  line-height: 50px;
			}
			.header-right .user .user-oparate .item.pass {
			  background-image: url(../images/header/pass.png);
			}
			.header-right .user .user-oparate .item.logout {
			  background-image: url(../images/header/logout.png);
			}
			.header-right .user .user-oparate .item:hover {
			  background-color: #EDEDF0;
			}
			.header-right .user .user-oparate .item a {
			  display: inline-block;
			  width: 100%;
			  height: 100%;
			}
			.header-left-logo {
			  float: left;
			  margin-right: 62px;
			  height: 74px;
			  width: 148px;
			  cursor: pointer;
			  background-image: url(../images/header/2017/new-logo.png);
			  background-repeat: no-repeat;
			  background-color: #fff;
			  background-size: 100% 60%;
			  background-position: center center;
			}
			.nav-content-list {
			  position: absolute;
			  width: 500px;
			  height: 50px;
			}
			.nav-content-list .item {
			  float: left;
			  margin: 0 15px;
			  height: 50px;
			  line-height: 50px;
			}
			.nav-content-list .item .link {
			  display: inline-block;
			  position: relative;
			  padding: 0;
			  font-size: 14px;
			  line-height: 50px;
			}
			.nav-content-list .item .link:hover,
			.nav-content-list .item .link.nav-active {
			  color: #89ba28;
			}
			.nav-content-list .item .link.nav-active {
			  cursor: default;
			}
			.nav-content-list .item .link.no-active {
			  cursor: default;
			  color: #333;
			}
			.nav-content-list .active-bar {
			  position: absolute;
			  bottom: 5px;
			  left: 0;
			  height: 4px;
			  width: 0;
			  background-color: #89ba28;
			  z-index: 1;
			  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
			  list-style: none;
			}
			.logo-nav-conatiner {
			  width: 100%;
			  height: 50px;
			  background-color: #eaf3db;
			}
			.help-ac {
			  color: #89ba28;
			}
		`
	};
})();