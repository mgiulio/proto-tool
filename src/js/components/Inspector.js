var
   React = require('react')
   ,ENTER_KEY_CODE = 13
;

var Inspector = React.createClass({
	
	getInitialState: function() {
		return this.getObjectInfo(this.props.selectedObject);
	},
	
	componentWillReceiveProps: function(nextProps) {
		this.setState(this.getObjectInfo(nextProps.selectedObject));
	},
	
	getObjectInfo: function(o) {
		return o ? {
			x: o.x
		} 
			: {}
		;
	},
	
	render: function() {
		var content = this.props.selectedObject ?
			<input 
				type="text" 
				value={this.state.x === null ? '' : String(this.state.x)} 
				onChange={this.onChangeX} 
				onKeyDown={this.onKeyDown}
			/>
		:
			<p>no selected object</p>
		;
		
		return (
			<div className="inspector">
				{content}
			</div>
		);
	},
	
	onChangeX: function(e) {
		e.stopPropagation();
		
		var 
			npv = e.target.value // // newProposedValue
		;
		
		this.setState({x: npv === '' ? null: parseInt(npv)});
	},
	
	onKeyDown: function(e) {
		e.stopPropagation();
		
		if (e.keyCode === ENTER_KEY_CODE)
			appActions.setPosition(this.state.x, this.props.selectedObject.y);
	}
	
});

module.exports = Inspector;