var
   React = require('react')
   ,Canvas = require('./Canvas')
;

var CanvasViewport = React.createClass({
	
	render: function() {
		return (
			<div className="canvas-viewport">
				<Canvas />
			</div>
		);
	}
	
});

module.exports = CanvasViewport;