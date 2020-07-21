

var ControlBox=React.createClass({
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
			<div className="controlBox">
				<button onClick={this.controlSort('up')} style={style.buttonUp}  className="btn btn-default"><span className="glyphicon glyphicon-chevron-up"></span></button>
				<button onClick={this.controlSort('down')} style={style.buttonDown} className="btn btn-default"><span className="glyphicon glyphicon-chevron-down"></span></button>
			</div>
		)
	}
})

module.exports=ControlBox;
