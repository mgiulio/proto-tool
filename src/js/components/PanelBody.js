var
	React = require('react')
;

var PanelBody = React.createClass({

	render: function() {
		return (
			<div className="panel__body">{this.props.children}</div>
		);
	}
	
});

module.exports = PanelBody;