var
   React = require('react')
;

var Panel = React.createClass({
	
	render: function() {
		var classes = ['panel'];
		
		if (this.props.onTop)
			classes.push('ontop');
		
		return (
			<div className={classes.join(' ')}>
				{this.props.children}
			</div>
		);
	}

});

module.exports = Panel;