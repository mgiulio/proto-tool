var
   React = require('react')
;

var AppBar = React.createClass({
	
	render: function() {
		return (
			<div className="app-bar">
				<h1 className="logo">Bc</h1>
				
				<a className="about" href="#">About</a>
				
				<SidePanelButtons />
			</div>
		);
	}
	
});

var SidePanelButtons = React.createClass({

	render: function() {
		return (
			<div className="panels">
				<label htmlFor="inspector">Inspector</label>
				<input id="inspector" type="checkbox" onChange={e => { e.stopPropagation(); appActions.toggleInspector(); }} />
				<label htmlFor="settings">Settings</label>
				<input id="settings" type="checkbox" onChange={e => { e.stopPropagation(); appActions.toggleSettings(); }} />
			</div>
		);
	}

});

module.exports = AppBar;