var
   React = require('react')
	,doStore = require('../stores/designObjectStore')
   ,Canvas = require('./Canvas')
   ,SVGRectangle = require('./SVGRectangle')
   ,KeyboardInput = require('./KeyboardInput')
;

var App = React.createClass({
	
	getAppState: function() {
		return {
			designObjects: doStore.getObjects()
		};
	},
	
	getInitialState: function() {
		return this.getAppState();
	},
	
	componentDidMount: function() {
		doStore.addChangeListener(this._onChange);
	},
	
	componentWillUnmount: function() {
		doStore.removeChangeListener(this._onChange);
	},
	
	_onChange: function() {
		this.setState(this.getAppState());
	},
	
	render: function() {
		var designObjectsRep = this.state.designObjects.map(this.visualRep);
		
		return (
			<div className="app">
				<Canvas>
					{designObjectsRep}
				</Canvas>
				<KeyboardInput />
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
				/>;
				break;
			default:
				console.log(om);
		}
		
		return compo;
	}
	
});

module.exports = App;