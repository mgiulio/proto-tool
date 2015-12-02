var
	React = require('react')
;

var VerticalLabel = React.createClass({

	render: function() {
		return (
			<div className="control-row">
				{this.props.children}
			</div>
		);
	}
	
});

module.exports = VerticalLabel;