var
	React = require('react')
;

var PanelSection = React.createClass({

	render: function() {
		var classes = ['panel__body__section'];
		if (this.props.className)
			classes.push(this.props.className);
		
		return (
			<div className={classes.join(' ')}>
				{this.props.children}
			</div>
		);
	}

});

module.exports = PanelSection;
