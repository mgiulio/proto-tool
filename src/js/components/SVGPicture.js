var
   React = require('react')
   ,AppActions = require('../actions/AppActions')
;

var SVGPicture = React.createClass({
	
	render: function() {
		var
			{x: x, y: y, width: width, height: height, title: title} = this.props
		;
		
		return (
			<g 
				id={this.props.id} 
				className="object picture" 
				transform={`translate(${x}, ${y})`} 
				onClick={this.onClick}
			>
				<rect x={0} y={0} width={width} height={height} />
				<line x1={0} y1={0} x2={width} y2={height} />
				<line x1={width} y1={0} x2={0} y2={height} />
			</g>
		);
	},
	
	onClick: function(e) {
		e.stopPropagation();
		
		AppActions.selectObject(this.props.id);
	}

});

module.exports = SVGPicture;