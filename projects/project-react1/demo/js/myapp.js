/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var ShowFormButton=__webpack_require__(1)
	var ControlBox=__webpack_require__(2)
	var Form=__webpack_require__(3)
	var QuestionList=__webpack_require__(4)

	var Root=React.createClass({displayName: "Root",
		getDefaultProps:function(){
			return {
				url:'./json/text.json'
			}
		},
		getInitialState:function(){
			return {
				sortStyle:'down',
				isFormShow:false,
				questions:[]
			}
		},
		onToggleForm:function(){
			this.setState({
				isFormShow:!this.state.isFormShow
			})
		},
		controlSort:function(type){
			this.setState({
				sortStyle:type
			})
		},
		controlHot:function(id,newHot){
			var arr=this.state.questions
			for(var i=0;i<arr.length;i++){
				if(arr[i].id==id){
					arr[i].hot=newHot;
					break;
				}
			}
			this.setState({
				questions:arr
			})
		},
		addQuestion:function(newQuestion){
			newQuestion.key=this.state.questions.length+1;
			var arr=this.state.questions;
			arr.push(newQuestion);
			this.setState({
				questions:arr
			})
		},
		sortQuestions:function(arr){
			var that=this;
			var _arr=arr.sort(function(a,b){
				if(that.state.sortStyle=='down'){
					return b.hot-a.hot
				}else{
					return a.hot-b.hot
				}
			})
			return _arr;
		},
		componentWillMount:function(){
			var that=this;
			$.ajax({
				url:this.props.url,
				dataType:'json',
				success:function(data){
					that.setState({
						questions:data
					})
				}
			})
		},
		render:function(){
			var questions=this.state.questions;
			if(questions.length){
				questions=this.sortQuestions(questions);
			}
			return (
				React.createElement("div", null, 
					React.createElement("header", {className: "container-fluid bg-primary"}, 
						React.createElement("div", {className: "headBox main clearfix"}, 
							React.createElement("h1", {className: "text-center"}, "React问答"), 
							React.createElement(ShowFormButton, {onToggleForm: this.onToggleForm})
						)
					), 
					React.createElement("section", {className: "container-fluid "}, 
						React.createElement(ControlBox, {
							controlSort: this.controlSort, 
							sortStyle: this.state.sortStyle}), 
						React.createElement(Form, {
							addQuestion: this.addQuestion, 
							onToggleForm: this.onToggleForm, 
							isFormShow: this.state.isFormShow}), 
						React.createElement(QuestionList, {
							controlHot: this.controlHot, 
							questions: questions})
					)
				)
			)
		}
	})



	ReactDOM.render(React.createElement(Root, null),document.getElementById('app'))




/***/ },
/* 1 */
/***/ function(module, exports) {

	

	var ShowFormButton=React.createClass({displayName: "ShowFormButton",
		render:function(){
			return (
				React.createElement("button", {onClick: this.props.onToggleForm, className: "btn btn-info pull-right"}, "提问")
			)
		}
	})

	module.exports=ShowFormButton;


/***/ },
/* 2 */
/***/ function(module, exports) {

	

	var ControlBox=React.createClass({displayName: "ControlBox",
		controlSort:function(type){
			var that=this;
			return function(){
				that.props.controlSort(type)
			}
			
		},
		render:function(){
			var style={
				buttonUp:{
					background:this.props.sortStyle=='up'?'#31b0d5':'#e6e6e6'
				},
				buttonDown:{
					background:this.props.sortStyle=='down'?'#31b0d5':'#e6e6e6'
				},
			}
			return (
				React.createElement("div", {className: "controlBox"}, 
					React.createElement("button", {onClick: this.controlSort('up'), style: style.buttonUp, className: "btn btn-default"}, React.createElement("span", {className: "glyphicon glyphicon-chevron-up"})), 
					React.createElement("button", {onClick: this.controlSort('down'), style: style.buttonDown, className: "btn btn-default"}, React.createElement("span", {className: "glyphicon glyphicon-chevron-down"}))
				)
			)
		}
	})

	module.exports=ControlBox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	var MyMixin={
		changeValue:function(type){
			var that=this;
			return function(e){
				var obj={};
				obj[type]=e.target.value
				that.setState(obj)
			}
		}
	}

	var Form=React.createClass({displayName: "Form",
		mixins:[MyMixin],
		getInitialState:function(){
			return {
				title:'',
				description:''
			}
		},
		changeValueBind:function(type,e){
			var obj={};
			obj[type]=e.target.value
			this.setState(obj)
		},
		changeValueRef:function(e){
			var obj={};
			var type=this.refs.descInp.getAttribute('data-type')
			obj[type]=e.target.value
			this.setState(obj)
		},
		addQuestion:function(){
			var obj={
				title:this.state.title,
				description:this.state.description,
				hot:0
			}
			this.props.addQuestion(obj);
			this.refs.goodForm.reset();
			
		},
		render:function(){
			var style={
				disppear:{
					display:this.props.isFormShow?'block':'none'
				}
			}
			return (
				React.createElement("form", {ref: "goodForm", style: style.disppear, className: "formBox main"}, 
					React.createElement("p", {className: "text-info"}, "问题:"), 
					React.createElement("input", {onChange: this.changeValue('title'), type: "text", className: "form-control", placeholder: "请输入您的问题"}), 
				/*<input ref='descInp' data-type='description' onChange={this.changeValueRef} type="text" className="form-control" placeholder="请输入您的问题"/>*/
					React.createElement("textarea", {onChange: this.changeValueBind.bind(this,'description'), className: "form-control", placeholder: "请输入问题的描述"}), 
					React.createElement("div", {className: "btnBox clearfix"}, 
						React.createElement("button", {type: "button", onClick: this.addQuestion, className: "btn btn-info pull-right"}, "提交"), 
						React.createElement("button", {type: "button", onClick: this.props.onToggleForm, className: "btn btn-default pull-right"}, "取消")
					)
				)
			)
		}
	})

	module.exports=Form;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	var QuestionItem=__webpack_require__(5);

	var QuestionList=React.createClass({displayName: "QuestionList",
		render:function(){
			var questions=this.props.questions;
			var arr=[];
			if(questions.length){
				for (var i=0;i<questions.length;i++) {
					arr.push(React.createElement(QuestionItem, {controlHot: this.props.controlHot, info: questions[i]}))
				}
			}
			return (
				React.createElement("div", {className: "questionBox main"}, 
					arr
				)
			)
		}
	})

	module.exports=QuestionList;


/***/ },
/* 5 */
/***/ function(module, exports) {

	

	var QuestionItem=React.createClass({displayName: "QuestionItem",
		controlHot:function(type,e){
			var id=this.props.info.id;
			var newHot;
			if(type=='up'){
				newHot=parseInt(this.props.info.hot)+1
			}else{
				newHot=parseInt(this.props.info.hot)-1;
				if(newHot<0){
					newHot=0;
				}
			}
			this.props.controlHot(id,newHot)
		},
		render:function(){
			return (
				React.createElement("div", {className: "questionItem clearfix", "data-id": this.props.info.id}, 
					React.createElement("div", {className: "btnBox pull-left"}, 
						React.createElement("button", {onClick: this.controlHot.bind(null,'up'), className: "btn btn-default"}, React.createElement("span", {className: "glyphicon glyphicon-chevron-up"})), 
						React.createElement("button", {className: "btn btn-default"}, this.props.info.hot), 	
						React.createElement("button", {onClick: this.controlHot.bind(null,'down'), className: "btn btn-default"}, React.createElement("span", {className: "glyphicon glyphicon-chevron-down"}))
					), 
					React.createElement("div", {className: "textBox pull-left"}, 
						React.createElement("h3", null, React.createElement("strong", null, this.props.info.title)), 
						React.createElement("p", null, this.props.info.description)
					)
				)
					
			)
		}
	})

	module.exports=QuestionItem;


/***/ }
/******/ ]);