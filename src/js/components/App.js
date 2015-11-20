var
   React = require('react')
	,KeyboardInput = require('./KeyboardInput')
   ,Canvas = require('./Canvas')
   //,SVGBrowser = require('./SVGBrowser')
;

var App = React.createClass({
	
	render: function() {
		var designObjectsRep = this.props.designObjects.map(this.props.doRender);
		
		return (
			<div className="app">
				<Canvas>
					{designObjectsRep}
				</Canvas>
				<KeyboardInput />
			</div>
		);
	}
	
});

module.exports = App;