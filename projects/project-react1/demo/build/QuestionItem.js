

var QuestionItem=React.createClass({
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
			<div className="questionItem clearfix" data-id={this.props.info.id}>
				<div className="btnBox pull-left">
					<button onClick={this.controlHot.bind(null,'up')} className="btn btn-default"><span className="glyphicon glyphicon-chevron-up"></span></button>
					<button className="btn btn-default">{this.props.info.hot}</button>	
					<button onClick={this.controlHot.bind(null,'down')} className="btn btn-default"><span className="glyphicon glyphicon-chevron-down"></span></button>
				</div>
				<div className="textBox pull-left">
					<h3><strong>{this.props.info.title}</strong></h3>
					<p>{this.props.info.description}</p>
				</div>
			</div>
				
		)
	}
})

module.exports=QuestionItem;
