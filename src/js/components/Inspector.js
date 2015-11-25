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
		var title = this.props.selectedObject ? this.props.selectedObject.getType() : 'no object selected';
		
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
		if (!this.props.selectedObject)
			return null;
		
		return (
			<div className="inspector-section inspector-geometry">
				<p>
					<span>Position</span>
					<NumericControl
						value={this.props.selectedObject.x} 
						onChange={this.onChangeX} 
					/>
					<NumericControl
						value={this.props.selectedObject.y} 
						onChange={appActions.setPosition.bind(appActions, this.props.selectedObject.x)} 
					/>
				</p>
				<p>
					<span>Size</span>
					<NumericControl
						value={this.props.selectedObject.w} 
						onChange={appActions.setWidth.bind(appActions)} 
					/>
					<NumericControl
						value={this.props.selectedObject.h} 
						onChange={appActions.setHeight.bind(appActions)} 
					/>
				</p>
			</div>
		);
	},
	
	onChangeX: function(newValue) {
		appActions.setPosition(newValue, this.props.selectedObject.y);
	}

});

module.exports = Inspector;