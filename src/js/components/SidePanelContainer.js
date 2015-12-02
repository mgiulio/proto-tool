var
	React = require('react')
	,Inspector = require('./Inspector')
	,Settings = require('./Settings')
;

var SidePanelContainer = React.createClass({
	
	render: function() {
		var 
			panels = []
		;
	
		if (this.props.inspector)
			panels.push(<Inspector onTop={this.props.panelOnTop === 'INSPECTOR'} key={1} />);
	
		if (this.props.settings)
			panels.push(<Settings onTop={this.props.panelOnTop === 'SETTINGS'} key={2} />);
	
		return panels.length > 0 ? <div className="sidepanel-container">{panels}</div> : null;
	}

});

module.exports = SidePanelContainer;
