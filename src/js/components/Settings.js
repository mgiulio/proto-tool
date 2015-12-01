var
   React = require('react')
   ,doStore = require('../stores/designObjectStore')
   NumericControl = require('./NumericControl')
;

var Settings = React.createClass({
	
	getInitialState: function() {
		return {
			canvasSize: doStore.getCanvasSize()
		};
	},
	
	componentDidMount: function() {
		doStore.addChangeListener(this._onChange);
	},
	
	componentWillUnmount: function() {
		doStore.removeChangeListener(this._onChange);
	},
	
	_onChange: function() {
		this.setState({canvasSize: doStore.getCanvasSize()});
	},
	
	render: function() {
		return (
			<div className="settings">
				<Header />
				<Body canvasWidth={this.state.canvasSize[0]} canvasHeight={this.state.canvasSize[1]} />
			</div>
		);
	}
	
});

var Header = React.createClass({

	render: function() {
		return (
			<h1 className="settings-header">Settings</h1>
		);
	}

});

var Body = React.createClass({

	render: function() {
		return (
			<div className="settings-body">
				<CanvasSize canvasWidth={this.props.canvasWidth} canvasHeight={this.props.canvasHeight} />
			</div>
		);
	}
	
});

var CanvasSize = React.createClass({

	render: function() {
		return (
			<div className="settings-section settings-canvas-size">
				<div className="inspector-position">
					<span className="inspector-geo-label">Canvas size</span>
					<div className="inspector-geo-ctrl-wrap">
						<NumericControl id="canvas-w" value={this.props.canvasWidth} onChange={appActions.setCanvasWidth.bind(appActions)} />
						<label className="inspector-geo-ctrl-label" htmlFor="canvas-w">x</label>
					</div>
					<div className="inspector-geo-ctrl-wrap">
						<NumericControl id="canvas-h" value={this.props.canvasHeight} onChange={appActions.setCanvasHeight.bind(appActions)} 
						/>
						<label className="inspector-geo-ctrl-label" htmlFor="inspector-y">y</label>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Settings;