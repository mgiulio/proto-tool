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
				<Color selectedObject={this.props.selectedObject} />
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
				<div className="inspector-position">
					<span className="inspector-geo-label">Position</span>
					<div className="inspector-geo-ctrl-wrap">
						<NumericControl id="inspector-x" value={this.props.selectedObject.x} onChange={this.onChangeX} />
						<label className="inspector-geo-ctrl-label" htmlFor="inspector-x">x</label>
					</div>
					<div className="inspector-geo-ctrl-wrap">
						<NumericControl id="inspector-y" value={this.props.selectedObject.y} onChange={appActions.setPosition.bind(appActions, this.props.selectedObject.x)} 
						/>
						<label className="inspector-geo-ctrl-label" htmlFor="inspector-y">y</label>
					</div>
				</div>
				<div className="inspector-size">
					<span className="inspector-geo-label">Size</span>
					<div className="inspector-geo-ctrl-wrap">
						<NumericControl id="inspector-w" value={this.props.selectedObject.w} onChange={appActions.setWidth.bind(appActions)} />
						<label className="inspector-geo-ctrl-label" htmlFor="inspector-w">w</label>
					</div>
					<div className="inspector-geo-ctrl-wrap">
						<NumericControl id="inspector-h" value={this.props.selectedObject.h} onChange={appActions.setHeight.bind(appActions)} />
						<label className="inspector-geo-ctrl-label" htmlFor="inspector-h">h</label>
					</div>
				</div>
			</div>
		);
	},
	
	onChangeX: function(newValue) {
		appActions.setPosition(newValue, this.props.selectedObject.y);
	}

});

var Color = React.createClass({

	render: function() {
		if (!this.props.selectedObject)
			return null;
		
		return (
			<div className="inspector-section inspector-color">
			</div>
		);
	}

});

module.exports = Inspector;