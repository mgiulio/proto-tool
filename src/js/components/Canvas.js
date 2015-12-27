var
   React = require('react')
   ,doStore = require('../stores/designObjectStore')
   ,svgRenderer = require('../svgRenderer')
   ,SelectionBox = require('./SelectionBox')
   ,appActions = require('../actions/AppActions')
   ,compose = require('../lib/func').compose
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
			canvasSize: doStore.getCanvasSize(),
			selRect: null
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
		
		this.dragged = false;
		
		this.cvp = document.querySelector('.canvas-viewport');
	},
	
	componentWillUnmount: function() {
		doStore.removeChangeListener(this._onChange);
		
		this.root.removeEventListener('click', this.onClick, false);
		this.root.removeEventListener('mousedown', this.onMouseDown, false);
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
		
		var selRect;
		if (this.state.selRect !== null/*'selRect' in this.state*/) {
			var
				s = this.state.selRect.startVertex,
				e = this.state.selRect.endVertex,
				x = s[0] <= e[0] ? s[0] : e[0],
				y = s[1] <= e[1] ? s[1] : e[1],
				w = Math.abs(e[0] - s[0]),
				h = Math.abs(e[1] - s[1])
			;
			selRect = <rect className="selrect" x={x} y={y} width={w} height={h} />
		}
		
		return (
			<svg 
				className="canvas" 
				width={this.state.canvasSize[0]} 
				height={this.state.canvasSize[1]}
			>
				{designObjectsRep}
				{selRect}
			</svg>
		);
	},
	
	onMouseDown: function(e) {
		e.stopPropagation();
		
		this.dragged = false;
		
		var target = this.findTarget(e.target);
		
		if (target.classList.contains('object')) {
			if (!e.shiftKey) {
				this.root.addEventListener('mousemove', this.onMouseMove, false);
				this.root.addEventListener('mouseup', this.onMouseUp, false);
				
				this.mouseX = e.clientX;
				this.mouseY = e.clientY;
				
				if (!target.classList.contains('selected'))
					appActions.selection.select(target.id);
			}
		}
		else if (target.classList.contains('handle')) {
			this.root.addEventListener('mousemove', this.dragHandle, false);
			this.root.addEventListener('mouseup', this.dragHandleEnd, false);
				
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
			
			if (target.classList.contains('top'))
				this.resizeSide = compose(appActions.resizeTop, function(dx, dy) { return - dy; });
			else if (target.classList.contains('right'))
				this.resizeSide = compose(appActions.resizeRight, function(dx, dy) { return dx; });
			else if (target.classList.contains('bottom'))
				this.resizeSide = compose(appActions.resizeBottom, function(dx, dy) { return dy; });
			else if (target.classList.contains('left'))
				this.resizeSide = compose(appActions.resizeLeft, function(dx, dy) { return - dx; });
		}
		else { // Dragging on canvas
			this.root.addEventListener('mousemove', this.onMouseMoveSelRect, false);
			this.root.addEventListener('mouseup', this.onMouseUpSelRect, false);
			
			if (e.shiftKey)
				this.addToSelection = true;
			
			var xy = this.clientSpaceToCanvasSpace(e.clientX, e.clientY);
			this.setState({selRect: {startVertex: xy, endVertex: xy}});
		}
	},
	
	onMouseMove: function(e) {
		e.stopPropagation();
		
		this.dragged = true;
		
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
	
	onMouseMoveSelRect: function(e) {
		e.stopPropagation();
		
		this.dragged = true;
		
		var xy = this.clientSpaceToCanvasSpace(e.clientX, e.clientY);
		this.setState({selRect: {startVertex: this.state.selRect.startVertex, endVertex: xy}});
	},
	
	onMouseUpSelRect: function(e) {
		e.stopPropagation();
		
		this.root.removeEventListener('mousemove', this.onMouseMoveSelRect, false);
		this.root.removeEventListener('mouseup', this.onMouseUpSelRect, false);
		
		if (this.dragged) {
			var selRect = this.state.selRect;
			this.setState({selRect: null});
			appActions.selection.inRect(selRect.startVertex, selRect.endVertex, this.addToSelection);
			this.addToSelection = false;
		}
	},
	
	dragHandle: function(e) {
		e.stopPropagation();
		
		this.dragged = true;
		
		var dx = e.clientX - this.mouseX;
		var dy = e.clientY - this.mouseY;
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		
		this.resizeSide(dx, dy);
	},
	
	dragHandleEnd: function(e) {
		e.stopPropagation();
		
		this.root.removeEventListener('mousemove', this.dragHandle, false);
		this.root.removeEventListener('mouseup', this.dragHandleEnd, false);
	},
	
	
	onClick: function(e) {
		e.stopPropagation();
		
		if (this.dragged)
			return;
		
		var target = this.findTarget(e.target);
		
		if (target === this.root) // clicked on canvas(bg)
			appActions.selection.clear();
		else //clicked on an object
			if (e.shiftKey)
				appActions.selection.toggle(target.id);
			else
				appActions.selection.select(target.id);
	},
	
	findTarget: function(n) {
		while (!n.classList.contains('object') && !n.classList.contains('handle') && !n.classList.contains('canvas'))
			n = n.parentElement;
		return  n;
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
	
	clientSpaceToCanvasSpace: function(x, y) {
		var cvpcr = this.cvp.getBoundingClientRect();
		return [
			x - cvpcr.left + this.cvp.scrollLeft,
			y - cvpcr.top  + this.cvp.scrollTop
		];
	}

});

module.exports = Canvas;