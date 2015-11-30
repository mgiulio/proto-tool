var
	React = require('react')
	,Panel = require('./Panel')
	,Inspector = require('./Inspector')
	,Settings = require('./Settings')
;

var SidePanelContainer = React.createClass({
	
	render: function() {
		var 
			panels = []
		;
	
		if (this.props.inspector)
			panels.push(
				<Panel onTop={this.props.panelOnTop === 'INSPECTOR'} key={1} >
					<Inspector />
				</Panel>
			);
	
		if (this.props.settings)
			panels.push(
				<Panel onTop={this.props.panelOnTop === 'SETTINGS'} key={2} >
					<Settings />
				</Panel>
			);
	
		return panels.length > 0 ? <div className="sidepanel-container">{panels}</div> : null;
	}

});

module.exports = SidePanelContainer;
