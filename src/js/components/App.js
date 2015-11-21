var
   React = require('react')
	,KeyboardInput = require('./KeyboardInput')
   ,Canvas = require('./Canvas')
   //,SVGBrowser = require('./SVGBrowser')
   ,SelectionBox = require('./SelectionBox')
	,AppDispatcher = require('../dispatcher/AppDispatcher')
	,appConstants = require('../constants/appConstants')
	,Panel = require('./Panel')
	,Inspector = require('./Inspector')
	,Settings = require('./Settings')
;

var App = React.createClass({
	
	getInitialState: function() {
		return {
			inspectorPanel: false,
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

		var sidePanelContainer = this.renderSidePanelContainer();
		if (sidePanelContainer)
			classes.push('sidepanel-visible');
		
		var designObjectsRep = this.props.designObjects.map(this.props.doRender);
		
		var selectionBox;
		if (this.props.selectedObject) {
			var aabb = this.props.selectedObject.getAABB();
			selectionBox = <SelectionBox x={aabb.x} y={aabb.y} w={aabb.w} h={aabb.h} />;
		}
		
		return (
			<div className={classes.join(' ')}>
				<Canvas>
					{designObjectsRep}
					{selectionBox}
				</Canvas>
				{sidePanelContainer}
				<KeyboardInput />
			</div>
		);
	},
	
	renderSidePanelContainer: function() {
		var 
			panels = []
		;
		
		if (this.state.inspectorPanel) {
			panels.push(
				<Panel onTop={this.state.panelOnTop === 'INSPECTOR'} key={1} >
					<Inspector selectedObject={this.props.selectedObject} />
				</Panel>
			);
		}
		
		if (this.state.settingsPanel) {
			panels.push(
				<Panel onTop={this.state.panelOnTop === 'SETTINGS'} key={2} >
					<Settings />
				</Panel>
			);
		}
		
		return panels.length > 0 ? <div className="sidepanel-container">{panels}</div> : null;
	},
	
	handlePanelActions: function(action) {
		switch (action.actionType) {
			case appConstants.SHOW_INSPECTOR:
				this.setState({inspectorPanel: true, panelOnTop: 'INSPECTOR'});
				break;
			case appConstants.HIDE_INSPECTOR:
				this.setState({inspectorPanel: false});
				break;
			case appConstants.SHOW_SETTINGS:
				this.setState({settingsPanel: true, panelOnTop: 'SETTINGS'});
				break;
			case appConstants.HIDE_SETTINGS:
				this.setState({settingsPanel: false});
				break;
		}
	}
	
});

module.exports = App;