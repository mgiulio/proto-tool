var
   React = require('react')
   ,appActions = require('../actions/AppActions')
   ,appConstants = require('../constants/appConstants')
;

var SelectionBox = React.createClass({
	
	render: function() {
		var
			{x: x, y: y, w: w, h: h} = this.props,
			hw = w / 2,
			hh = h / 2,
			handles = [
				<Handle className="top"    x={hw} y={0}  key={0} />,
				<Handle className="right"  x={w}  y={hh} key={1} />,
				<Handle className="bottom" x={hw} y={h}  key={2} />,
				<Handle className="left"   x={0}  y={hh} key={3} />,
			]
		;
		
		return (
			<g className="selection-box" transform={`translate(${x}, ${y})`} >
				<rect 
					x="0" y="0" width={w} height={h} 
				/>
				{handles}
			</g>
		);
	}

});

var Handle = React.createClass({
	
	render: function() {
		var
			size = 5,
			hs = size / 2,
			{x: x, y: y} = this.props
		;
		
		return (
			<rect 
				className={`handle ${this.props.className}`} 
				x={x - hs} y={y - hs} width={size} height={size} 
			/>
		);
	}
	
});

module.exports = SelectionBox;