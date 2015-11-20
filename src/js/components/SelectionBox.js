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
			mp = [ // handle midpoints
				[hw, 0], // top edge
				[w , hh], // right
				[hw, h], // bottom
				[0 , hh], // left
			],
			onDragHandle = [
				this.onDragHandle.bind(this, appConstants.TOP),
				this.onDragHandle.bind(this, appConstants.RIGHT),
				this.onDragHandle.bind(this, appConstants.BOTTOM),
				this.onDragHandle.bind(this, appConstants.LEFT)
			],
			handles = mp.map((mp, i) => <Handle x={mp[0]} y={mp[1]} onDrag={onDragHandle[i]} key={i} />);
		;
		
		return (
			<g className="selection-box" transform={`translate(${x}, ${y})`} >
				<rect x="0" y="0" width={w} height={h} />
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
				className="handle" 
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