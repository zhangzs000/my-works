
var QuestionItem=require('./QuestionItem.js');

var QuestionList=React.createClass({
	render:function(){
		var questions=this.props.questions;
		var arr=[];
		if(questions.length){
			for (var i=0;i<questions.length;i++) {
				arr.push(<QuestionItem controlHot={this.props.controlHot} info={questions[i]} />)
			}
		}
		return (
			<div className="questionBox main">
				{arr}
			</div>
		)
	}
})

module.exports=QuestionList;
