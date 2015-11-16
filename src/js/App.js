var
   React = require('react')
   ,Canvas = require('./Canvas')
   ,designObjects = require('./DesignObjects')
   ,SVGRectangle = require('./SVGRectangle')
   ,Keyboard = require('./Keyboard')

var App = React.createClass({
	
	getInitialState: function() {
		return {
			objects: [],
			selected: null
		};
	},
	
	componentDidMount: function() {
		window.api = {
			addObject: this.addObject,
			select: this.select,
			setPos: this.setPos,
			translate: this.translate,
			translateUp: this.translateUp,
			translateRight: this.translateRight,
			translateDown: this.translateDown,
			translateLeft: this.translateLeft,
		};
		
		//this.setupKeyboardUI();
	},
	
	setupKeyboardUI: function() {
		document.addEventListener('keydown', this.onKeydown, false);
	},
	
	onKeydown: function(e) {
		//e.stopPropagation();
		//e.preventDefault();
		
		console.log(e.keyIdentifier);
		console.log(e);
		
		var
			amount = 10,
			multiplier = 10
		;
		
		if (e.shiftKey)
			amount *= multiplier;
		else if (e.ctrlKey)
			amount /= multiplier;
		
		switch (e.keyIdentifier) {
			case 'Up':
				this.translateUp(amount);
				break;
			case 'Right':
				this.translateRight(amount);
				break;
			case 'Down':
				this.translateDown(amount);
				break;
			case 'Left':
				this.translateLeft(amount);
				break;
			case 'U+0009':
				if (e.shiftKey)
					this.selectPrev();
				else
					this.selectNext();
				e.preventDefault();
				break;
			case 'U+0041': // a
				//this.addObject('Rectangle', ...this.getMouseClientPos(), 100, 50);
				
				//let [x, y] = this.getMouseClientPos();
				//this.addObject('Rectangle', x, y, 100, 50);
				
				//this.addObject('Rectangle', ...(this.getMouseClientPos().push(100, 50)));
				
				this.addObject('Rectangle', ...(this.getMouseClientPos().concat([100, 50])));
				break;
		}
	},
	
	getMouseClientPos: function() {
		return [800, 250];
	},
	
	addObject: function(type, x, y, w, h) {
		var o = new designObjects[type](x, y, w, h); 
		
		var 
			newObjects = this.state.objects.concat(o),
			newSelected = newObjects.length - 1
		;
		
		this.setState({
			objects: newObjects,
			selected: newSelected
		});
		
		return newSelected;
	},
	
	select: function(i) {
		this.setState({selected: i});
	},
	selectNext: function() {
		this.select((this.state.selected + 1) % this.state.objects.length);
	},
	selectPrev: function() {
		this.select((this.state.selected - 1) % this.state.objects.length);
	},
	
	setPos: function(x, y) {
		this.state.objects[this.state.selected].setPos(x, y);
		
		this.forceUpdate();
	},
	
	translate: function(x, y) {
		this.state.objects[this.state.selected].translate(x, y);
		
		this.forceUpdate();
	},	
	translateUp: function(d) { // translateUp.bind(this, 0)
		this.translate(0, -d);
	},
	translateRight: function(d) { // translateUp.bind(this, 0)
		this.translate(d, 0);
	},
	translateDown: function(d) { // translateUp.bind(this, 0)
		this.translate(0, d);
	},
	translateLeft: function(d) { // translateUp.bind(this, 0)
		this.translate(-d, 0);
	},

	render: function() {
		var objects = this.state.objects.map(this.visualRep);
		
		return (
			<div className="app">
				<Canvas>
					{objects}
				</Canvas>
				<Keyboard 
					on={{
						'translateUp': this.translateUp.bind(this, 10),
						'translateRight': this.translateRight.bind(this, 10),
						'translateDown': this.translateDown.bind(this, 10),
						'translateLeft': this.translateLeft.bind(this, 10),
						selectNext: this.selectNext,
						selectPrev: this.selectPrev
					}}
				/>
			</div>
		);
	},
	
	visualRep: function(om, i) {
		var compo;
		
		switch (om.type) {
			case 'Rectangle':
				compo = <SVGRectangle 
					id={i} 
					x={om.x} y={om.y} width={om.w} height={om.h} 
					key={i} 
					on={{
						select: this.select, 
						dragStart: this.onDragStart,
						drag: this.onDrag
					}}
				/>;
				break;
			default:
				console.log(om);
		}
		
		return compo;
	},
	
	onDragStart: function(i) {
		this.select(i);
	},
	
	onDrag: function(dx, dy) {
		this.translate(dx, dy);
	}

});

module.exports = App;