var
	React = require('react')
	,InspectorPanel = require('./InspectorPanel')
	,SettingsPanel = require('./SettingsPanel')
;

var SidePanelContainer = React.createClass({
	
	render: function() {
		var panel;
		if (this.props.panel === 'INSPECTOR')
			panel = <InspectorPanel />;
		else if (this.props.panel === 'SETTINGS')
			panel = <SettingsPanel />;
	
		return (
			<div className="sidepanel-container">
				{panel}
			</div>
		);
	}

});

module.exports = SidePanelContainer;
