var
   React = require('react')
   ,doStore = require('../stores/designObjectStore')
   ,svgRenderer = require('../svgRenderer')
   ,SelectionBox = require('./SelectionBox')
;

var Canvas = React.createClass({
	
	getState: function() {
		return {
			designObjects: doStore.getObjects(),
			selectedObject: doStore.getSelectedObject(),
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
		var designObjectsRep = this.state.designObjects.map(svgRenderer);
		
		var selectionBox;
		if (this.state.selectedObject) {
			var aabb = this.state.selectedObject.getAABB();
			selectionBox = <SelectionBox x={aabb.x} y={aabb.y} w={aabb.w} h={aabb.h} />;
		}
		
		return (
			<svg className="canvas" width={this.state.canvasSize[0]} height={this.state.canvasSize[1]}>
				{designObjectsRep}
				{selectionBox}
			</svg>
		);
	}

});

module.exports = Canvas;