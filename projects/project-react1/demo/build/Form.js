
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

var Form=React.createClass({
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
			<form ref='goodForm' style={style.disppear}  className="formBox main">
				<p className="text-info">问题:</p>
				<input onChange={this.changeValue('title')} type="text" className="form-control" placeholder="请输入您的问题"/>
			{/*<input ref='descInp' data-type='description' onChange={this.changeValueRef} type="text" className="form-control" placeholder="请输入您的问题"/>*/}
				<textarea onChange={this.changeValueBind.bind(this,'description')}  className="form-control" placeholder="请输入问题的描述"></textarea>
				<div className="btnBox clearfix">
					<button type='button' onClick={this.addQuestion} className="btn btn-info pull-right">提交</button>
					<button type='button' onClick={this.props.onToggleForm} className="btn btn-default pull-right">取消</button>
				</div>
			</form>
		)
	}
})

module.exports=Form;
