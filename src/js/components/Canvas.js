var
   React = require('react')
;

var Canvas = React.createClass({
	
	render: function() {
		return (
			<svg className="canvas">
				{this.props.children}
			</svg>
		);
	}

});

module.exports = Canvas;