var
   React = require('react')
   NumericControl = require('./NumericControl')
;

var Inspector = React.createClass({
	
	render: function() {
		var content = this.props.selectedObject ?
			<NumericControl
				value={this.props.selectedObject.x} 
				onChange={this.onChangeX} 
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
	
	onChangeX: function(newValue) {
		appActions.setPosition(newValue, this.props.selectedObject.y);
	}
	
});

module.exports = Inspector;