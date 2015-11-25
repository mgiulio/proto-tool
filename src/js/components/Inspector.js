var
   React = require('react')
   NumericControl = require('./NumericControl')
;

var Inspector = React.createClass({
	
	render: function() {
		return (
			<div className="inspector">
				<Header selectedObject={this.props.selectedObject} />
				<Body selectedObject={this.props.selectedObject} />
			</div>
		);
	}
	
});

var Header = React.createClass({

	render: function() {
		var title;
		if (this.props.selectedObject)
			title = 'An object is selected';
		else
			title = 'no object selected';
		
		return (
			<h1 className="inspector-header">{title}</h1>
		);
	}

});

var Body = React.createClass({

	render: function() {
		return (
			<div className="inspector-body">
				<Geometry selectedObject={this.props.selectedObject} />
			</div>
		);
	}
	
});

var Geometry = React.createClass({

	render: function() {
		return (
			<div className="inspector-section inspector-geometry">
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
		);
	},
	
	onChangeX: function(newValue) {
		appActions.setPosition(newValue, this.props.selectedObject.y);
	}

});

module.exports = Inspector;