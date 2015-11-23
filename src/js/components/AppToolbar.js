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
					<input id="inspector" type="checkbox" />
					<label htmlFor="settings">Settings</label>
					<input id="settings" type="checkbox" />
				</div>
			</div>
		);
	}

});

module.exports = AppToolbar;