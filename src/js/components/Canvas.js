var
   React = require('react')
   ,doStore = require('../stores/designObjectStore')
   ,svgRenderer = require('../svgRenderer')
   ,SelectionBox = require('./SelectionBox')
   ,appActions = require('../actions/AppActions')
;

var Canvas = React.createClass({
	
	getState: function() {
		var 
			selectionSet = doStore.getSelectionSet(),
			selectionAABB = selectionSet.length > 0 ? this.selectionAABB(selectionSet) : null
		;
		
		return {
			designObjects: doStore.getObjects(),
			selectionAABB: selectionAABB,
			canvasSize: doStore.getCanvasSize()
		};
	},
	
	getInitialState: function() {
		return this.getState();
	},
	
	componentDidMount: function() {
		doStore.addChangeListener(this._onChange);
	},
	
	componentWillUnmount: function() {
		doStore.removeChangeListener(this._onChange);
	},
	
	_onChange: function() {
		this.setState(this.getState());
	},
	
	render: function() {
		console.log(this.state);
		var designObjectsRep = this.state.designObjects.map(svgRenderer);
		
		if (this.state.selectionAABB !== null) {
			var 
				b = this.state.selectionAABB,
				selectionBox = <SelectionBox x={b.x} y={b.y} w={b.w} h={b.h} key='selbox' />
			;
			designObjectsRep.push(selectionBox);
		}
		
		return (
			<svg 
				className="canvas" 
				width={this.state.canvasSize[0]} 
				height={this.state.canvasSize[1]}
				onMouseDown={null/*this.onMouseDown*/}
				onClick={this.onClick}
			>
				{designObjectsRep}
			</svg>
		);
	},
	
	onMouseDown: function(e) {
		e.stopPropagation();
		
		// Is user dragging the selection box?
		if (this.state.selectionAABB !== null) {
			var xy = this.getMousePosInCanvasSpace(e);
			if (this.isPointInSelectionBox(xy)) {
				console.log(xy);
				
				this.mouseX = e.clientX;
				this.mouseY = e.clientY;
				
				document.addEventListener('mousemove', this.onMouseMove, false);
				document.addEventListener('mouseup', this.onMouseUp, false);
			}
		}
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
	},
	
	onClick: function(e) {
		console.log('onClick');
		e.stopPropagation();
		
		appActions.selection.clear();
	},
	
	selectionAABB: function(sel) {
		var 
			xmin = this.state.canvasSize[0], xmax = -1,
			ymin = this.state.canvasSize[1], ymax = -1
		;
		
		sel.forEach(o => {
			var 
				aabb = o.getAABB(),
				x1 = aabb.x,
				y1 = aabb.y,
				x2 = x1 + aabb.w - 1,
				y2 = y1 + aabb.h - 1
			;
			
			if (x1 < xmin)
				xmin = x1;
			
			if (x2 > xmax)
				xmax = x2;
			
			if (y1 < ymin)
				ymin = y1;
			
			if (y2 > ymax)
				ymax = y2;
		});
		
		return {
			x: xmin,
			y: ymin,
			w: xmax - xmin + 1,
			h: ymax - ymin + 1
		};
	},
	
	getMousePosInCanvasSpace: function(e) {
		return [e.clientX, e.clientY - 40];
	},
	
	isPointInSelectionBox: function(xy) {
		var b = this.state.selectionAABB;
		
		return b.x <= xy[0] && xy[0] < b.x + b.w && b.y <= xy[1] && xy[1] < b.y + b.h;
	}

});

module.exports = Canvas;