var
   React = require('react')
   ,doStore = require('../stores/designObjectStore')
   ,Panel = require('./Panel')
   ,PanelHeader = require('./PanelHeader')
   ,PanelBody = require('./PanelBody')
   ,PanelSection = require('./PanelSection')
   ,ControlRow = require('./ControlRow')
   ,NumericControl = require('./NumericControl')
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
			<Panel className="settings">
				<PanelHeader>Settings</PanelHeader>
				<PanelBody>
					<PanelSection>
						<ControlRow label="Size">
							<NumericControl id="canvas-w" value={this.state.canvasSize[0]} onChange={appActions.setCanvasWidth.bind(appActions)} />
							<NumericControl id="canvas-h" value={this.state.canvasSize[1]} onChange={appActions.setCanvasHeight.bind(appActions)} />
						</ControlRow>
					</PanelSection>
				</PanelBody>
			</Panel>
		);
	}
	
});

module.exports = Settings;