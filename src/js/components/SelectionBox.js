var
   React = require('react')
   ,AppActions = require('../actions/AppActions')
;

var SelectionBox = React.createClass({
	
	render: function() {
		return (
			<rect 
				className="selection-box"
				x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h} 
			/>
		);
	}

});

module.exports = SelectionBox;