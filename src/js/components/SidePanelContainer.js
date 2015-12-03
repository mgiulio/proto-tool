var
	React = require('react')
	,sidePanelStore = require('../stores/sidePanelStore')
	,InspectorPanel = require('./InspectorPanel')
	,SettingsPanel = require('./SettingsPanel')
;

var SidePanelContainer = React.createClass({
	
	getState: function() {
		var visiblePanel;
		if (!sidePanelStore.isSidePanelVisible())
			visiblePanel = null;
		else if (sidePanelStore.isInspectorVisible())
			visiblePanel = 'INSPECTOR';
		else if (sidePanelStore.isSettingsVisible())
			visiblePanel = 'SETTINGS';
		
		return {
			visiblePanel: visiblePanel
		};
	},
	
	getInitialState: function() {
		return this.getState();
	},
	
	componentDidMount: function() {
		sidePanelStore.addChangeListener(this._onChange);
	},
	
	componentWillUnmount: function() {
		sidePanelStore.removeChangeListener(this._onChange);
	},
	
	_onChange: function() {
		this.setState(this.getState());
	},
	
	render: function() {
		if (!this.state.visiblePanel)
			return null;
		
		var panel;
		if (this.state.visiblePanel === 'INSPECTOR')
			panel = <InspectorPanel />;
		else if (this.state.visiblePanel === 'SETTINGS')
			panel = <SettingsPanel />;
	
		return (
			<div className="sidepanel-container">
				{panel}
			</div>
		);
	}

});

module.exports = SidePanelContainer;
