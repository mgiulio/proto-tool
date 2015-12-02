var
	React = require('react')
;

var VerticalLabel = React.createClass({

	render: function() {
		var classes = ['vertical-label'];
		if (this.props.align === 'bottom')
			classes.push('bottom');
		else
			classes.push('top');
		
		return (
			<div className={classes.join(' ')}>
				{this.props.children}
				<label className="vertical-label__text" >{this.props.text}</label>
			</div>
		);
	}
	
});

module.exports = VerticalLabel;