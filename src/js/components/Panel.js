var
   React = require('react')
;

var Panel = React.createClass({
	
	render: function() {
		var classes = ['panel'];
		if (this.props.className)
			classes.push(this.props.className);
		
		return (
			<div className={classes.join(' ')}>
				{this.props.children}
			</div>
		);
	}

});

module.exports = Panel;