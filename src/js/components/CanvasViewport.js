var
   React = require('react')
   ,Canvas = require('./Canvas')
   ,SelectionBox = require('./SelectionBox')
;

var CanvasViewport = React.createClass({
	
	render: function() {
		var designObjectsRep = this.props.designObjects.map(this.props.doRender);
		
		var selectionBox;
		if (this.props.selectedObject) {
			var aabb = this.props.selectedObject.getAABB();
			selectionBox = <SelectionBox x={aabb.x} y={aabb.y} w={aabb.w} h={aabb.h} />;
		}
		
		return (
			<div className="canvas-viewport">
				<Canvas>
					{designObjectsRep}
					{selectionBox}
				</Canvas>
			</div>
		);
	}
	
});

module.exports = CanvasViewport;