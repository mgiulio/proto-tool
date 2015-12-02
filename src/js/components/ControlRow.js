var
	React = require('react')
;

var ControlRow = React.createClass({

	render: function() {
		var classes = ['control-row'];
		if (this.props.className)
			classes.push(this.props.className);
		
		return (
			<div className={classes.join(' ')}>
				<div className="control-row__label">{this.props.label}</div>
				<div className="control-row__controls">
					{this.props.children}
				</div>
			</div>
		);
	}
	
});

module.exports = ControlRow;