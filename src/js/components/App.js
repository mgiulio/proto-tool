var
   React = require('react')
	,HotKeys = require('./HotKeys')
	,AppBar = require('./AppBar')
	,AppBody = require('./AppBody')
;

var App = React.createClass({
	
	render: function() {
		var classes = ['app'];

		return (
			<div className={classes.join(' ')}>
				<AppBar />
				<AppBody />
				<HotKeys />
			</div>
		);
	}
	
});

module.exports = App;