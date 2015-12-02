var
	React = require('react')
;

var PanelHeader = React.createClass({

	render: function() {
		return <h1 className="panel__header">{this.props.children}</h1>;
	}

});

module.exports = PanelHeader;
