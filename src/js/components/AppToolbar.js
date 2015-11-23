var
   React = require('react')
;

var AppToolbar = React.createClass({
	
	render: function() {
		return (
			<div className="toolbar-app">
				<h1 className="logo">Bc</h1>
				
				<a className="about" href="#">About</a>
				
				<div className="panels">
					<label htmlFor="inspector">Inspector</label>
					<input id="inspector" type="checkbox" onChange={this.toggleInspectorPanel} />
					<label htmlFor="settings">Settings</label>
					<input id="settings" type="checkbox" onChange={this.toggleSettingsPanel} />
				</div>
			</div>
		);
	},
	
	toggleInspectorPanel: function(e) {
		e.stopPropagation();
		
		//console.log(e.target, e.target.checked, e.target.value);
		
		if (e.target.checked)
			appActions.showInspector();
		else
			appActions.hideInspector();
	},
	
	toggleSettingsPanel: function(e) {
		e.stopPropagation();
		
		if (e.target.checked)
			appActions.showSettings();
		else
			appActions.hideSettings();
	}

});

module.exports = AppToolbar;