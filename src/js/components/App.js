var
   React = require('react')
	,KeyboardInput = require('./KeyboardInput')
   ,Canvas = require('./Canvas')
   //,SVGBrowser = require('./SVGBrowser')
   ,SelectionBox = require('./SelectionBox')
;

var App = React.createClass({
	
	render: function() {
		var designObjectsRep = this.props.designObjects.map(this.props.doRender);
		
		var selectionBox;
		if (this.props.selectedObject) {
			var aabb = this.props.selectedObject.getAABB();
			selectionBox = <SelectionBox x={aabb.x} y={aabb.y} w={aabb.w} h={aabb.h} />;
		}
		
		return (
			<div className="app">
				<Canvas>
					{designObjectsRep}
					{selectionBox}
				</Canvas>
				<KeyboardInput />
			</div>
		);
	}
	
});

module.exports = App;