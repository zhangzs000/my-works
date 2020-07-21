

var ShowFormButton=React.createClass({
	render:function(){
		return (
			<button onClick={this.props.onToggleForm} className="btn btn-info pull-right">提问</button>
		)
	}
})

module.exports=ShowFormButton;
