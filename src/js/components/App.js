var
   React = require('react')
	,AppBar = require('./AppBar')
	,AppBody = require('./AppBody')
	,SVGSprite = require('./SVGSprite')
	,HotKeys = require('./HotKeys')
;

var App = React.createClass({
	
	render: function() {
		var classes = ['app'];

		return (
			<div className={classes.join(' ')}>
				<SVGSprite />
				<AppBar />
				<AppBody />
				<HotKeys />
			</div>
		);
	}
	
});

module.exports = App;