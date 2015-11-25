var
   React = require('react')
	,KeyboardInput = require('./KeyboardInput')
   ,Canvas = require('./Canvas')
   //,SVGBrowser = require('./SVGBrowser')
   ,SelectionBox = require('./SelectionBox')
	,AppDispatcher = require('../dispatcher/AppDispatcher')
	,appConstants = require('../constants/appConstants')
	,SidePanelContainer = require('./SidePanelContainer')
	,AppToolbar = require('./AppToolbar')
;

var App = React.createClass({
	
	getInitialState: function() {
		return {
			inspectorPanel: true,
			settingsPanel: false,
			panelOnTop: 'inspector'
		};
	},
	
	componentDidMount: function() {
		this.dispatcherCbId = AppDispatcher.register(this.handlePanelActions);
	},
	
	componentWillUnmount: function() {
		AppDispatcher.unregister(this.dispatcherCbId);
	},
	
	render: function() {
		var classes = ['app'];

		var sidePanel;
		if (this.isSidePanelVisible()) {
			classes.push('sidepanel-visible');
			
			sidePanel = <SidePanelContainer 
				inspector={this.state.inspectorPanel} 
				settings={this.state.settingsPanel} 
				panelOnTop={this.state.panelOnTop} 
				selectedObject={this.props.selectedObject}
			/>
		}
		
		var designObjectsRep = this.props.designObjects.map(this.props.doRender);
		
		var selectionBox;
		if (this.props.selectedObject) {
			var aabb = this.props.selectedObject.getAABB();
			selectionBox = <SelectionBox x={aabb.x} y={aabb.y} w={aabb.w} h={aabb.h} />;
		}
		
		return (
			<div className={classes.join(' ')}>
				<AppToolbar />
				<Canvas>
					{designObjectsRep}
					{selectionBox}
				</Canvas>
				{sidePanel}
				<KeyboardInput />
			</div>
		);
	},
	
	isSidePanelVisible: function() {
		return this.state.inspectorPanel || this.state.settingsPanel;
	},
		
	handlePanelActions: function(action) {
		switch (action.actionType) {
			case appConstants.SHOW_INSPECTOR:
				this.setState({inspectorPanel: true, panelOnTop: 'INSPECTOR'});
				break;
			case appConstants.HIDE_INSPECTOR:
				this.setState({inspectorPanel: false});
				break;
			case appConstants.TOGGLE_INSPECTOR:
				this.setState({inspectorPanel: !this.state.inspectorPanel});
				break;
			case appConstants.SHOW_SETTINGS:
				this.setState({settingsPanel: true, panelOnTop: 'SETTINGS'});
				break;
			case appConstants.HIDE_SETTINGS:
				this.setState({settingsPanel: false});
				break;
			case appConstants.TOGGLE_SETTINGS:
				this.setState({settingsPanel: !this.state.settingsPanel});
				break;
		}
	}
	
});

module.exports = App;