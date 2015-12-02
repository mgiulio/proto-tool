var
	React = require('react')
	,InspectorPanel = require('./InspectorPanel')
	,SettingsPanel = require('./SettingsPanel')
;

var SidePanelContainer = React.createClass({
	
	render: function() {
		var 
			panels = []
		;
	
		if (this.props.inspector)
			panels.push(<InspectorPanel onTop={this.props.panelOnTop === 'INSPECTOR'} key={1} />);
	
		if (this.props.settings)
			panels.push(<SettingsPanel onTop={this.props.panelOnTop === 'SETTINGS'} key={2} />);
	
		return panels.length > 0 ? <div className="sidepanel-container">{panels}</div> : null;
	}

});

module.exports = SidePanelContainer;
