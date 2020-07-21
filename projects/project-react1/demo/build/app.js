
var ShowFormButton=require('./ShowFormButton.js')
var ControlBox=require('./ControlBox.js')
var Form=require('./Form.js')
var QuestionList=require('./QuestionList.js')

var Root=React.createClass({
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
			<div>
				<header className="container-fluid bg-primary">
					<div className="headBox main clearfix">
						<h1 className="text-center">React问答</h1>
						<ShowFormButton onToggleForm={this.onToggleForm}/>
					</div>
				</header>
				<section className="container-fluid ">
					<ControlBox  
						controlSort={this.controlSort}
						sortStyle={this.state.sortStyle}/>
					<Form
						addQuestion={this.addQuestion}
						onToggleForm={this.onToggleForm}
						isFormShow={this.state.isFormShow}/>
					<QuestionList 
						controlHot={this.controlHot}
						questions={questions}/>
				</section>
			</div>
		)
	}
})



ReactDOM.render(<Root/>,document.getElementById('app'))


