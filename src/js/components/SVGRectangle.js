var
   React = require('react')
   ,AppActions = require('../actions/AppActions')
;

var SVGRectangle = React.createClass({
	
	render: function() {
		var classes = ['object', 'rectangle'];
		if (this.props.className)
			classes.push(this.props.className);
		
		return (
			<rect 
				id={this.props.id} 
				className={classes.join(' ')}
				x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} 
			/>
		);
	}

});

module.exports = SVGRectangle;