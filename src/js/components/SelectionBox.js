var
   React = require('react')
   ,appActions = require('../actions/AppActions')
   ,appConstants = require('../constants/appConstants')
;

var SelectionBox = React.createClass({
	
	render: function() {
		var
			{x: x, y: y, w: w, h: h} = this.props,
			hw = w / 2,
			hh = h / 2,
			handles = [
				<Handle className="top"    x={hw} y={0}  onDrag={this.onDragHandle.bind(this, appConstants.TOP)}    key={0} />,
				<Handle className="right"  x={w}  y={hh} onDrag={this.onDragHandle.bind(this, appConstants.RIGHT)}  key={1} />,
				<Handle className="bottom" x={hw} y={h}  onDrag={this.onDragHandle.bind(this, appConstants.BOTTOM)} key={2} />,
				<Handle className="left"   x={0}  y={hh} onDrag={this.onDragHandle.bind(this, appConstants.LEFT)}   key={3} />,
			]
		;
		
		return (
			<g className="selection-box" transform={`translate(${x}, ${y})`} >
				<rect 
					x="0" y="0" width={w} height={h} 
					onMouseDown={this.onMouseDown}
				/>
				{handles}
			</g>
		);
	},
	
	onDragHandle: function(side, dx, dy) {
		switch (side) {
			case appConstants.TOP:
				appActions.resizeTop(-dy);
				break;
			case appConstants.RIGHT:
				appActions.resizeRight(dx);
				break;
			case appConstants.BOTTOM:
				appActions.resizeBottom(dy);
				break;
			case appConstants.LEFT:
				appActions.resizeLeft(-dx);
				break;
			default:
		}
	},
	
	onMouseDown: function(e) {
		e.stopPropagation();
		
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		
		document.addEventListener('mousemove', this.onMouseMove, false);
		document.addEventListener('mouseup', this.onMouseUp, false);
	},
	
	onMouseMove: function(e) {
		e.stopPropagation();
		
		var dx = e.clientX - this.mouseX;
		var dy = e.clientY - this.mouseY;
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		
		appActions.translate(dx, dy);
	},
	
	onMouseUp: function(e) {
		e.stopPropagation();
		
		document.removeEventListener('mousemove', this.onMouseMove, false);
		document.removeEventListener('mouseup', this.onMouseUp, false);
	}

});

var Handle = React.createClass({
	
	render: function() {
		var
			size = 5,
			hs = size / 2,
			{x: x, y: y} = this.props
		;
		
		return (
			<rect 
				className={`handle ${this.props.className}`} 
				x={x - hs} y={y - hs} width={size} height={size} 
				onMouseDown={this.onMouseDown}
			/>
		);
	},
	
	onMouseDown: function(e) {
		e.stopPropagation();
		
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		
		document.addEventListener('mousemove', this.onMouseMove, false);
		document.addEventListener('mouseup', this.onMouseUp, false);
	},
	
	onMouseMove: function(e) {
		e.stopPropagation();
		
		var dx = e.clientX - this.mouseX;
		var dy = e.clientY - this.mouseY;
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		
		this.props.onDrag(dx, dy);
	},
	
	onMouseUp: function(e) {
		e.stopPropagation();
		
		document.removeEventListener('mousemove', this.onMouseMove, false);
		document.removeEventListener('mouseup', this.onMouseUp, false);
	}
	
});

module.exports = SelectionBox;