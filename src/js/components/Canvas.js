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
		
		this.root = this.getDOMNode();
		this.root.addEventListener('click', this.onClick, false);
		this.root.addEventListener('mousedown', this.onMouseDown, false);
	},
	
	componentWillUnmount: function() {
		doStore.removeChangeListener(this._onChange);
	},
	
	_onChange: function() {
		this.setState(this.getState());
	},
	
	render: function() {
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
			>
				{designObjectsRep}
			</svg>
		);
	},
	
	onMouseDown: function(e) {
		e.stopPropagation();
		
		this.dragged = false;
		
		if (e.shiftKey)
			return;
	
		var target = this.findTarget(e.target);
		
		if (target.classList.contains('object')) {
			console.log('start drag');
		

			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
				
			this.root.addEventListener('mousemove', this.onMouseMove, false);
			this.root.addEventListener('mouseup', this.onMouseUp, false);
			
			if (!target.classList.contains('selected'))
				appActions.selection.select(target.id);
		}
	},
	
	onMouseMove: function(e) {
		this.dragged = true;
		
		e.stopPropagation();
		
		var dx = e.clientX - this.mouseX;
		var dy = e.clientY - this.mouseY;
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		
		appActions.translate(dx, dy);
	},
	
	onMouseUp: function(e) {
		e.stopPropagation();
		
		this.root.removeEventListener('mousemove', this.onMouseMove, false);
		this.root.removeEventListener('mouseup', this.onMouseUp, false);
	},
	
	findTarget: function(n) {
		while (!n.classList.contains('object') && !n.classList.contains('canvas'))
			n = n.parentElement;
		return  n;
	},
	
	onClick: function(e) {
		if (this.dragged)
			return;
		
		console.log('onClick');
		
		e.stopPropagation();
		
		var target = this.findTarget(e.target);
		
		if (target === this.root) // clicked on canvas(bg)
			appActions.selection.clear();
		else //clicked on an object
			if (e.shiftKey)
				appActions.selection.toggle(target.id);
			else
				appActions.selection.select(target.id);
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