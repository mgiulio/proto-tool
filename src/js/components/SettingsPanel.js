var
   React = require('react')
   ,doStore = require('../stores/designObjectStore')
   ,Panel = require('./Panel')
   ,PanelHeader = require('./PanelHeader')
   ,PanelBody = require('./PanelBody')
   ,PanelSection = require('./PanelSection')
   ,ControlRow = require('./ControlRow')
   ,NumericControl = require('./NumericControl')
   ,VerticalLabel = require('./VerticalLabel')
;

var SettingsPanel = React.createClass({
	
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
							<VerticalLabel text="w" align="top">
								<NumericControl value={this.state.canvasSize[0]} onChange={appActions.setCanvasWidth.bind(appActions)} />
							</VerticalLabel>
							<VerticalLabel text="h" align="top">
								<NumericControl value={this.state.canvasSize[1]} onChange={appActions.setCanvasHeight.bind(appActions)} />
							</VerticalLabel>
						</ControlRow>
					</PanelSection>
				</PanelBody>
			</Panel>
		);
	}
	
});

module.exports = SettingsPanel;