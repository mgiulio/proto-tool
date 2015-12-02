var
   React = require('react')
   ,doStore = require('../stores/designObjectStore')
   NumericControl = require('./NumericControl')
   ,Panel = require('./Panel')
   ,PanelHeader = require('./PanelHeader')
   ,PanelBody = require('./PanelBody')
   ,PanelSection = require('./PanelSection')
   ,ControlRow = require('./ControlRow')
;

var Inspector = React.createClass({
	
	getInitialState: function() {
		return {
			selectedObject: doStore.getSelectedObject()
		};
	},
	
	componentDidMount: function() {
		doStore.addChangeListener(this._onChange);
	},
	
	componentWillUnmount: function() {
		doStore.removeChangeListener(this._onChange);
	},
	
	_onChange: function() {
		this.setState({selectedObject: doStore.getSelectedObject()});
	},
	
	render: function() {
		return (
			<Panel className="inspector">
				<PanelHeader>{this.state.selectedObject ? this.state.selectedObject.getType() : 'no object selected'}</PanelHeader>
				<PanelBody>
					<Geometry selectedObject={this.state.selectedObject} />
						{/* <Color selectedObject={this.state.selectedObject} /> */}
				</PanelBody>
			</Panel>
		);
	}
	
});

var Geometry = React.createClass({

	render: function() {
		if (!this.props.selectedObject)
			return null;
		
		return (
			<PanelSection className="inspector-geometry">
				<ControlRow label="Position">
					<NumericControl id="inspector-x" value={this.props.selectedObject.x} onChange={this.onChangeX} />
					<NumericControl id="inspector-y" value={this.props.selectedObject.y} onChange={appActions.setPosition.bind(appActions, this.props.selectedObject.x)} />
				</ControlRow>
				<ControlRow label="Size">
					<NumericControl id="inspector-w" value={this.props.selectedObject.w} onChange={appActions.setWidth.bind(appActions)} />
					<NumericControl id="inspector-h" value={this.props.selectedObject.h} onChange={appActions.setHeight.bind(appActions)} />
				</ControlRow>
			</PanelSection>
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
			<PanelSection className="inspector-color">
				<ControlRow label="Bg Color">
					<NumericControl value={999} onChange={null} />
				</ControlRow>
				<ControlRow label="Fg Color">
					<NumericControl value={999} onChange={null} />
				</ControlRow>
			</PanelSection>
		);
	}

});

module.exports = Inspector;