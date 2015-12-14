var
   React = require('react')
   ,AppActions = require('../actions/AppActions')
;

var SVGRectangle = React.createClass({
	
	render: function() {
		var classes = ['object', 'rectangle'];
		if (this.props.className)
			classes.push(this.props.className);
		
		return (
			<rect 
				id={this.props.id} 
				className={classes.join(' ')}
				x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} 
				onClick={this.onClick} 
				onMouseDown={null/*this.onMouseDown*/}
			/>
		);
	},
	
	onClick: function(e) {
		e.stopPropagation();
		
		if (e.shiftKey)
			AppActions.selection.toggle(this.props.id);
		else
			AppActions.selection.select(this.props.id);
	},
	
	onMouseDown: function(e) {
		e.stopPropagation();
		
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		
		document.addEventListener('mousemove', this.onMouseMove, false);
		document.addEventListener('mouseup', this.onMouseUp, false);
		
		AppActions.selection.select(this.props.id);
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