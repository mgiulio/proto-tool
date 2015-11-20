var
   React = require('react')
   ,AppActions = require('../actions/AppActions')
;

var SVGRectangle = React.createClass({
	
	render: function() {
		var
			osWidth= 600,
			osHeight = 300,
			headerHeight = 60, // use %?
			statusBarHeight = 25,
			{x: x, y: y, width: w, height: h} = this.props
		;
		
		return (
			<g id={this.props.id} className="object browser" transform={`translate(${x}, ${y})`} >
				<rect x="0" y="0" width={osWidth} height={osHeight} />
				<rect x="0" y="0" width={osWidth} height={headerHeight} />
				<rect x="0" y={osHeight - statusBarHeight} width={osWidth} height={statusBarHeight} />
			</g>
		);
	},
	
	onClick: function(e) {
		e.stopPropagation();
		
		AppActions.selectObject(this.props.id);
	},
	
	onMouseDown: function(e) {
		e.stopPropagation();
		
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		
		document.addEventListener('mousemove', this.onMouseMove, false);
		document.addEventListener('mouseup', this.onMouseUp, false);
		
		AppActions.selectObject(this.props.id);
	},
	
	onMouseMove: function(e) {
		e.stopPropagation();
		
		var dx = e.clientX - this.mouseX;
		var dy = e.clientY - this.mouseY;
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		
		AppActions.translate(dx, dy);
	},
	
	onMouseUp: function(e) {
		e.stopPropagation();
		
		document.removeEventListener('mousemove', this.onMouseMove, false);
		document.removeEventListener('mouseup', this.onMouseUp, false);
	}

});

module.exports = SVGRectangle;