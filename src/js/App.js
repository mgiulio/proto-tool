var
   React = require('react')
   ,Canvas = require('./Canvas')
   ,designObjects = require('./DesignObjects')
   ,SVGRectangle = require('./SVGRectangle')
   ,KeyboardInput = require('./KeyboardInput')
;

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
	
	findSpeed: function(speed) {
		var 
			d = 10,
			speeds = {
				'slow': 0.1,
				'normal': 1,
				'fast': 10
			};
		
		return d * speeds[speed];
	},

	render: function() {
		var objects = this.state.objects.map(this.visualRep);
		
		return (
			<div className="app">
				<Canvas>
					{objects}
				</Canvas>
				<KeyboardInput 
					on={{
						translateUp: (speed) => { this.translateUp(this.findSpeed(speed)); },
						translateRight: (speed) => { this.translateRight(this.findSpeed(speed)); },
						translateDown: (speed) => { this.translateDown(this.findSpeed(speed)); },
						translateLeft: (speed) => { this.translateLeft(this.findSpeed(speed)); },
						selectNext: this.selectNext,
						selectPrev: this.selectPrev,
						addObject: () => { this.addObject('Rectangle', ...(this.getMouseClientPos().concat([100, 50]))); }
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