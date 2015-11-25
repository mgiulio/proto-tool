var
   React = require('react')
   NumericControl = require('./NumericControl')
;

var Inspector = React.createClass({
	
	render: function() {
		var content = this.props.selectedObject ?
			<div className="geometry">
				<h2>Geometry</h2>
				<NumericControl
					value={this.props.selectedObject.x} 
					onChange={this.onChangeX} 
				/>
				<NumericControl
					value={this.props.selectedObject.y} 
					onChange={appActions.setPosition.bind(appActions, this.props.selectedObject.x)} 
				/>
				<NumericControl
					value={this.props.selectedObject.w} 
					onChange={appActions.setWidth.bind(appActions)} 
				/>
				<NumericControl
					value={this.props.selectedObject.h} 
					onChange={appActions.setHeight.bind(appActions)} 
				/>
			</div>
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